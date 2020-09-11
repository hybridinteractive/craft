$(document).ready(function() {
    $('select[name="t_shirt__c"]').parent().parent().hide();
    $('body').on('click', '.rc-component-campaign-ask .btn.btn-default.rc-toggle-primary.rc-cursor-pointer.rc-cascade-value.rc-amount', function() {
        if($(this).html().length > 0 && $(this).html() !== '$35') {
            $('select[name="t_shirt__c"]').parent().parent().show();
        } else {
            $('select[name="t_shirt__c"]').parent().parent().hide();
        }
    });

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

    /* Validate minimum amount $50 for T shirt */
    $("[data-validate-type='otherAmount']").change(function() {
        if ($(this).val() < 50) {
            $('[name="t_shirt__c"]').hide();
        } else {
            $('[name="t_shirt__c"]').show();
        }
    });
    /* End Validate minimum amount $50 for T shirt */

    /* Check if $35 is selected and hide T shirt accordingly */
    $('[data-giving-frequency="One Payment"]').click(function() {
        var paymenthtml = $(this).parent().find('btn-primary').html();
        if (paymenthtml.length <= 0 || paymenthtml == '$35') {
            $('[name="t_shirt__c"]').hide();
        } else {
            $('[name="t_shirt__c"]').show();
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
