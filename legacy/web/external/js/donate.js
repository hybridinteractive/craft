function themeInit() {
    var title = 'Donate';
    var image = 'https://db5e831739fa5d2a844e-7a140d1c660d39e9e255e42a20e1dfec.ssl.cf2.rackcdn.com/images/Donate-Hero.jpg';
    var photoCredit = 'Greg Epperson | Joshua Tree, CA';
    var heroHTML = '<div class="slick-hero slick-initialized slick-slider donate-hero"> <div class="slick-list draggable"> <div class="slick-track" style="opacity: 1; width: 100%;"> <div class="bg slick-slide slick-active" style="width: 100%; background-image: url(' + image + ');" data-equalizer-watch="slide" data-slick-index="0" aria-hidden="false"> <div class="row text-center copy"> <h1 class="title">' + title + '</h1></div><span class="photo-credit show-for-medium-up"> <img src="https://www.accessfund.org/images/camera.png" class="credit-icon"/> <small class="credit text-right"><strong>Photo Courtesy of:</strong><br/>' + photoCredit + '</small> </span> </div></div></div></div>';

    $('form.container').before(heroHTML);
}

$(document).ready(function() {
    themeInit();
    /* Hide Local climbing org field by default */
    if ($('[data-field-name="local_climbing_organizations__c"]').length > 0) {
        $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().hide();
        $('.rc-name').click(function() {
            /* validate minimum amount $5 */
            if ($('[data-giving-frequency="One Payment"]').parent().find('btn-primary').html() == 'Other..') {
                if ($('[data-validate-type="otherAmount"]').val() < 5) {
                    alert('You need to donate at least $5');
                    return false;
                }
            }
            /* End of validate minimum amount $5 */
        });
    }
});