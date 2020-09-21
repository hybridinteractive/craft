if(!isMobile()) {
    var parseFeatureCollection = function (data) {
        var features = data.layers[0].featureSet.features;
        var objectIdField = data.layers[0].layerDefinition.objectIdField;

        var geojson = featureCollectionToGeoJSON(features, objectIdField);

        geojson.features.forEach(function (location) {
            var solutionIds = location.properties.solutions ? location.properties.solutions.split(';') : [];
            var solutionIdString = '';
            for (index = 0; index < solutionIds.length; index++) {
                solutionIdString += " solution_" + solutionIds[index];
            }

            var iconImage = '/images/impact-map/StandardPin.png';
            var iconImage2x = '/images/impact-map/StandardPin@2x.png';
            var iconWidth = 20;
            var iconHeight = 31;
            var className = 'save-icon leaflet-marker-icon ' + solutionIdString;

            if (location.properties.thumbnailImage1x != null || location.properties.thumbnailImage2x != null) {
                iconImage = location.properties.thumbnailImage2x;
                iconImage2x = location.properties.thumbnailImage2x;

                iconWidth = 45;
                iconHeight = 35;
                className = 'save-icon leaflet-marker-icon-thumbnail ' + solutionIdString;
            }


            var myIcon = L.icon({
                iconUrl: iconImage,
                iconRetinaUrl: iconImage2x,
                iconSize: [iconWidth, iconHeight],
                iconAnchor: [9, 31],
                className: className
            });

            var usfsClassName = '';
            if (location.properties.milestoneName === "USFS Wilderness Climbing") {
                usfsClassName = ' usfs-area';
            }

            var popupTemplate = '<a href="#" class="popup-detail' + usfsClassName + '" id="' + location.properties.craftID + '">';
            if (location.properties.popupImage1x != null && location.properties.popupImage1x != null) {
                popupTemplate += '<div class="popup-custom--featured_image">';
                popupTemplate += '<img src="' + location.properties.popupImage1x + '" /></div>';
            } else {
                popupTemplate += '<div class="popup-custom--empty"></div>';
            }
            popupTemplate += '<div class="popup-custom--body">';
            popupTemplate += '<h1>' + location.properties.milestoneName + '</h1>';
            popupTemplate += '<div class="popup-custom--body__text">' + location.properties.mapPopupIntro + '<br /> <span class="learn-more__link">Learn More >></span></div>';
            popupTemplate += '</a>';
            popupTemplate += '</div>';

            var marker = L.marker([location.properties.latitude, location.properties.longitude], {icon: myIcon}).addTo(map);

            var popup = new L.Rrose({offset: new L.Point(12, -24), closeButton: false, autoPan: false})
                .setLatLng([location.properties.latitude, location.properties.longitude])
                .setContent(popupTemplate);
            marker.bindPopup(popup, {'className': 'popup-custom'});
            marker.on('click', function (e) {
                if (location.properties.milestoneName === "USFS Wilderness Climbing") {
                    toggleWildernessArea('show');
                }
                this.openPopup();

                this._popup.updateDirection();
                this._popup._updatePosition();
            });
            marker.on('popupclose', function (e) {
                if (e.popup._content.includes('usfs-area')) {
                    toggleWildernessArea('hide');
                }
            });
            map.on('drag', function () {
                if (this._popup) {
                    this._popup.updateDirection();
                    this._popup._updatePosition();
                }
            });
        });
    };

    var featureCollectionToGeoJSON = function (features, objectIdField) {
        var geojsonFeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };
        var featuresArray = [];
        var i, len;

        for (i = 0, len = features.length; i < len; i++) {
            var geojson = arcgisToGeoJSON(features[i], objectIdField);
            featuresArray.push(geojson);
        }

        geojsonFeatureCollection.features = featuresArray;

        return geojsonFeatureCollection;
    };
}