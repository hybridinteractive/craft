var isMobile = function() {
    if ($(window).width() < 1026) {
        console.log($(window).width());
        return true;
    } else {
        return false;
    }
}

if(!isMobile()) {
    var map = L.map("map-canvas",
        {
            zoomControl: false,
            dragging: false
        }).setView([38, -98.35], 4);
    map.scrollWheelZoom.disable();

    L.control.zoom({
        position:'bottomright'
    }).addTo(map);

    L.esri.basemapLayer("DarkGray", {transparency: 0}).addTo(map);

    var statesFeatureLayer = L.esri.featureLayer({
        url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0'
    }).addTo(map);

    statesFeatureLayer.on('load', function(e) {
        this.setStyle({fillColor: '#dad7d0', color: '#ecf9ff'});
    });

    var wildernessFeatureLayer = L.esri.featureLayer({
        url: 'https://services3.arcgis.com/LjxW17ryOxd5Lbl9/arcgis/rest/services/WildernessAreas/FeatureServer/0'
    }).addTo(map);

    wildernessFeatureLayer.on('load', function(e) {
        this.setStyle({fillColor: 'transparent', color: 'transparent'});
    });

    map.on('zoomend', function(event) {
        if(map._zoom > 4) {
            map.dragging.enable();
        }else {
            map.dragging.disable();
        }
    });
}

// Epic Save Data From Arc
var itemId  = $('#epic-saves-id').val();
var url     = 'https://www.arcgis.com/sharing/rest/content/items/' + itemId + '/data';

var saves;

L.esri.request(url, {}, function (err, res) {
    if (err) {
    } else {
        saves = parseFeatureCollection(res);
    }
}, this);