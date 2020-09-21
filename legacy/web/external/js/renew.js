function themeInit() {
    var title = 'Renew';
    var image = 'https://db5e831739fa5d2a844e-7a140d1c660d39e9e255e42a20e1dfec.ssl.cf2.rackcdn.com/images/Renew-Hero.jpeg';
    var photoCredit = 'Matt Stark | New River Gorge, WV';
    var heroHTML = '<div class="slick-hero slick-initialized slick-slider renew-hero"> <div class="slick-list draggable"> <div class="slick-track" style="opacity: 1; width: 100%;"> <div class="bg slick-slide slick-active" style="width: 100%; background-image: url(' + image + ');" data-equalizer-watch="slide" data-slick-index="0" aria-hidden="false"> <div class="row text-center copy"> <h1 class="title">' + title + '</h1></div><span class="photo-credit show-for-medium-up"> <img src="https://www.accessfund.org/images/camera.png" class="credit-icon"/> <small class="credit text-right"><strong>Photo Courtesy of:</strong><br/>' + photoCredit + '</small> </span> </div></div></div></div>';
    var otherAmount = $('input[data-validate-type="otherAmount"]');

    $('form.container').before(heroHTML);

    // Add placeholder to other amount input
    otherAmount.attr('placeholder', 'Minimum $28 Donation');
}

$(document).ready(function() {
    themeInit();

    /* Hide Local climbing org field by default */
    $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().hide();
    $('.rc-name').click(function() {
        /* validate minimum amount $28 */
        if ($('[data-giving-frequency="One Payment"]').parent().find('btn-primary').html() == 'Other..') {
            if ($('[data-validate-type="otherAmount"]').val() < 28) {
                alert('You need to donate at least $28');
                return false;
            }
        }
        /* End of validate minimum amount $28 */
    });

    $('[name="t_shirt__c"]').parent().parent('.form-group').hide();

    /* Validate minimum amount $50 for T shirt */
    $('body').on('change', "[data-validate-type='otherAmount']", function() {
        if ($(this).val() < 50) {
            $('[name="t_shirt__c"]').parent().parent('.form-group').hide();
        } else {
            $('[name="t_shirt__c"]').parent().parent('.form-group').show();
        }
    });
    /* End Validate minimum amount $50 for T shirt */

    /* Check if $35 is selected and hide T shirt accordingly */
    $('body').on('click', '.btn-default.rc-toggle-primary.rc-amount', function() {
        var paymenthtml = $(this).text();
        if (paymenthtml == 'Other..') {
            $('[name="t_shirt__c"]').parent().parent('.form-group').hide();
        }
        else if (paymenthtml.length <= 0 || paymenthtml == '$35') {
            $('[name="t_shirt__c"]').parent().parent('.form-group').hide();
        } else {
            $('[name="t_shirt__c"]').parent().parent('.form-group').show();
        }
    });
    /* End of Check if $35 is selected and hide T shirt accordingly */

    /* Show local climbing org field if addition $15 checkbox checked */
    $('[name="joint_member_15_00__c"]').change(function() {
        if ($(this).is(':checked')) {
            $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().show();
        } else {
            $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().hide();
        }
    });
    /* End of Show local climbing org field if addition $15 checkbox checked */
});