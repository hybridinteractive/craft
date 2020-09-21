$(document).ready(function() {
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
