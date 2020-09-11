if(isMobile()) {
    var parseFeatureCollection = function (data) {
        var features = data.layers[0].featureSet.features;
        var objectIdField = data.layers[0].layerDefinition.objectIdField;

        var geojson = featureCollectionToGeoJSON(features, objectIdField);
        var sortedLocations = geojson.features.sort(function(first, last) {
            return moment.utc(first.properties.milestoneDate).diff(moment.utc(last.properties.milestoneDate));
        });

        var featureListHTML = '<ul class="featureList--mobile">';

        sortedLocations.forEach(function(location)
        {
            featureListHTML += '<li class="featureListItem--mobile">';
            featureListHTML += '<a href="#" class="popup-detail" id="' + location.properties.craftID + '">';
            featureListHTML += '<img class="featureListItemThumb--mobile" src="' + location.properties.mapMobileThumb + '" />';
            featureListHTML += '<span class="featureListItemText--mobile">';
            featureListHTML += '<h1>' + location.properties.milestoneName + '</h1>';
            featureListHTML += location.properties.solutions.split(';').reduce(function(acc, solution) {
                return acc + '<img class="epic-save__solutions-icon" src="/images/solutions/' + solution + '.png">';
            }, '');
            featureListHTML += '</span>';
            featureListHTML += '<span class="featureListItemDetail--mobile">></span>';
            featureListHTML += '</a>';
            featureListHTML += '</li>';
        });

        featureListHTML += '</ul>';

        $('.features-mobile').html(featureListHTML);
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
