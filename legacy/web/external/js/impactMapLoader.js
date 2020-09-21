if(!isMobile()) {
    var toggleWildernessArea = function(action)
    {
        if(action === undefined) {
            action = 'show';
        }

        if(action === 'show') {
            wildernessFeatureLayer.setStyle({color: '#ee4600', fillColor: '#ee4600'});
        }else if(action === 'hide') {
            wildernessFeatureLayer.setStyle({color: 'transparent', fillColor: 'transparent'});
        }
    };

    $('.map-navigation-link').on('click', function (event) {
        event.preventDefault();

        map.closePopup();

        var latitude    = $(this).data('latitude');
        var longitude   = $(this).data('longitude');
        var zoom        = $(this).data('zoom');

        map.flyTo([latitude, longitude], zoom, {animate: true});

        var show        = $(this).data('show').split(',');
        var hide        = $(this).data('hide').split(',');

        for (var index = 0; index < show.length; ++index) {
            $('.' + show[index] + '-link').show();
        }
        for (var index = 0; index < hide.length; ++index) {
            $('.' + hide[index]+ '-link').hide();
        }
    });

    // $('.tooltip').powerTip({
    //     placement: 'n',
    //     smartPlacement: true,
    //     offset: 110
    // });
    // $(document).ready(function() {
    //     Tipped.create('.ak-link', { size: 'large', stem: false, position: 'topright' });
    //     Tipped.create('.hi-link', { size: 'large', stem: false, position: 'topright' });
    //     Tipped.create('.cont-se-link', { size: 'large', stem: false, position: 'topleft' });
    //     Tipped.create('.cont-ne-link', { size: 'large', stem: false, position: 'topleft' });
    // });
}
