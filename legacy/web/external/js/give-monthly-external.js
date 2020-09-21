$(document).ready(function() {
    /* Hide Local climbing org field by default */
    $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().hide();
    $('.rc-name').click(function() {
        /* validate minimum amount $5 */
        if ($('[data-giving-frequency="Monthly"]').parent().find('btn-primary').html() == 'Other..') {
            if ($('[data-validate-type="otherAmount"]').val() < 5) {
                alert('You need to donate at least $5');
                return false;
            }
        }
        /* End of validate minimum amount $5 */
    });

    /* Show local climbing org field if addition $2 checkbox checked */
    if ($('[name="joint_member_2_00__c"]').length > 0) {
        $('[name="joint_member_2_00__c"]').change(function() {
            if ($(this).is(':checked')) {
                $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().show();
            } else {
                $('[data-field-name="local_climbing_organizations__c"]').parent().parent().parent().hide();
            }
        });
    }
    /* End of Show local climbing org field if addition $2 checkbox checked */
});
