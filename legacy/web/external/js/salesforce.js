/**
 * Add dynamic nav and footer to dom
 *
 */
function loadElements() {
    var $formContainter = $('form.container');
    $.ajax({
        type: "GET",
        url: "https://www.accessfund.org/external/top-nav",
        dataType:'html',
        success: function(response) {
            $formContainter.before(response);
            $('body').on('click', '.toggle-topbar a', function(e) {
                e.preventDefault();
            });
            loadScript();
        }
    });
    $.ajax({
        type: "GET",
        url: "https://www.accessfund.org/external/footer",
        dataType:'html',
        success: function(response) {
            $formContainter.after(response);
        }
    });
}

/**
 * Change exclamation point icons to asterisks
 *
 */
function requiredIcon() {
    $('.fa').removeClass('fa-exclamation-circle').addClass('fa-asterisk');
}

/**
 * Add navbar functionality
 *
 */

function navbarInit() {
    var $body = $('body');
    $body.on('click', '.tablet-toggle-topbar a', function(e) {
        e.preventDefault();
        $('.nav-wrapper').toggleClass('fixed');
        $('.top-bar').toggleClass('expanded fixed');
        $body.toggleClass('f-topbar-fixed');
        $('html, body').scrollTop(0);
    });
    $body.on('click', '.dropdown-toggle', function() {
        $(this).parent('.has-dropdown').toggleClass('open');
    });
}

function loadScript() {
    var bodyID = document.getElementsByTagName('body')[0]; 
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.1/js/foundation.min.js';
    bodyID.appendChild(scriptTag);
    setTimeout(function() {
        var depScript = document.createElement('script');
        depScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.1/js/foundation/foundation.topbar.min.js';
        bodyID.appendChild(depScript);
        $(document).foundation('reflow');
    }, 100);
}

$(document).ready(function() {
    loadElements();
    requiredIcon();
    navbarInit();
    /* Better dropdowns */
    $('form').on('click', 'input', function(e) {
        if ($(this).next().find('.dropdown').length > 0) {
            e.stopPropagation();
            $(this).next().find('[data-toggle="dropdown"]').dropdown('toggle');
        }
    });

    /* Better dropdowns */
    $('form').on('focus', 'input', function(e) {
        if ($(this).next().find('.dropdown').length > 0) {
            e.stopPropagation();
            $(this).keydown(function() {
                // Code to not allow typing in dropdown fields
                return false;
            });
        }
    });
});


/**
 * Validation error messages
 *
 * @param label
 * @returns {boolean}
 */
function displayCustomErrorMessage(label) {
    // Populate and display an error message box
    var errorBox = $('.error-message');
    errorBox.html('Please provide a valid "' + label + '".');
    $('.alert-box').show();
    $('html, body').animate({
        scrollTop: (errorBox.offset().top - 140)
    }, 1000);

    return false;
}

/**
 * Highlight a field that has an error
 *
 * @param element
 * @returns {*}
 */
function highlightError(element, add) {
    // Add an error class to the field
    if (typeof add == 'undefined' || add) {
        return element.parent().parent().addClass('has-error');
    } else {
        return element.parent().parent().removeClass('has-error');
    }
}

/**
 * Validation for SalesForce forms
 *
 * @returns {boolean}
 */
function rabbleValidate() {
    // Hide any alert box messages to start
    $('.alert-box').hide();

    // If "Other Amount" exists and the "Other.." button has been selected
    var otherAmount = $('input[data-validate-type="otherAmount"]');
    var otherAmountBtn = $('div:contains("Other..")');
    if (otherAmount.length > 0 && otherAmountBtn.hasClass('btn-primary')) {
        // If we are on the Join or Renew pages
        highlightError(otherAmount, false);
        if ($.trim(otherAmount.val()).length === 0) {
            if ($('.join-hero').length > 0 || $('.renew-hero').length > 0) {
                highlightError(otherAmount);
                return displayCustomErrorMessage('Minimum $28 Donation');
            }
            else if ($('.give-monthly-hero').length > 0) {
                highlightError(otherAmount);
                return displayCustomErrorMessage('Minimum $5 Donation');
            }
        }
        else if ($('.join-hero').length > 0 || $('.renew-hero').length > 0) {
            if (parseInt(otherAmount.val()) < 28) {
                highlightError(otherAmount);
                return displayCustomErrorMessage('Minimum $28 Donation');
            }
        } else if ($('.give-monthly-hero').length > 0) {
            if (parseInt(otherAmount.val()) < 5) {
                highlightError(otherAmount);
                return displayCustomErrorMessage('Minimum $5 Donation');
            }
        }
    }

    // Required fields validation
    var first_name = $('input[name="rc_connect__contact_1_first_name__c"]');
    var last_name = $('input[name="rc_connect__contact_1_last_name__c"]');
    var email = $('input[name="rc_connect__contact_1_email__c"]');
    var address = $('input[name="rc_connect__address_street_line_1__c"]');
    var city = $('input[name="rc_connect__address_city__c"]');
    var state = $('input[name="rc_connect__address_state__c"]');
    var zip = $('input[name="rc_connect__address_postal_code__c"]');
    var cardholder = $('input[name="rc_connect__payment_method_card_holder_name__c"]');
    var cardNum = $('input[data-name="rc_connect__payment_method_card_number__c"]');
    var cardExpMonth = $('input[name="rc_connect__payment_method_card_expiration_month__c"]');
    var cardExpYear = $('input[name="rc_connect__payment_method_card_expiration_year__c"]');
    var cardCVV = $('input[data-name="rc_connect__payment_method_card_security_code__c"]');
    var donationAmounts = $('.rc-component-campaign-ask-item-list').first();
    var selectedAmount = $(donationAmounts).find('.btn-primary');
    var elements_to_test = [first_name, last_name, email, address, city, state, zip, cardholder, cardNum, cardExpMonth, cardExpYear, cardCVV];
    var required_field_exist = true;

    // Test donation amount first
    if (selectedAmount.length === 0) {
        return displayCustomErrorMessage('Amount');
    } else {

        for (var i = 0; i < elements_to_test.length; i++) {
            if (elements_to_test[i].val().length <= 0) {
                required_field_exist = false;
                highlightError(elements_to_test[i]);
            } else {
                highlightError(elements_to_test[i], false);
            }
        }
        
        if (!required_field_exist) {
            // Populate and display an error message box
            var errorBox = $('.error-message');
            errorBox.html('Please fill out all required fields.');
            $('.alert-box').show();
            $('html, body').animate({
                scrollTop: (errorBox.offset().top - 140)
            }, 1000);

            return false;
        }

        // Email
        if (email.length > 0) {
            highlightError(email, false);
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!regex.test(email.val())) {
                highlightError(email);
                return displayCustomErrorMessage('Email Address');
            }
        }

        // State
        if (state.length > 0) {
            highlightError(state, false);
            var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
            if (states.indexOf(state.val().toUpperCase()) == -1) {
                highlightError(state);
                return displayCustomErrorMessage('State');
            }
        }

        // ZIP Code - check for 5 digits or 5-4 digits(including the -)
        if (zip.length > 0) {
            highlightError(zip, false);
            if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip.val())) {
                highlightError(zip);
                return displayCustomErrorMessage('ZIP Code');
            }
        }

        // Card Holder Name - check alpha, "'", and "-". Also check for multiple names(ie. "John Doe" not "John")
        if (cardholder.length > 0) {
            highlightError(cardholder, false);
            var parts = cardholder.val().split(' ');
            if (!/^[a-zA-Z-' ]+$/.test(cardholder.val()) || !parts.length > 1) {
                highlightError(cardholder);
                return displayCustomErrorMessage('Credit Card Holder Name');
            }
        }

        // Card Number
        if (cardNum.length > 0) {
            highlightError(cardNum, false);
            if (!$.payment.validateCardNumber(cardNum.val())) {
                highlightError(cardNum);
                return displayCustomErrorMessage('Credit Card Number');
            }
        }

        // Card Expiration
        if (cardExpMonth.length > 0 && cardExpYear.length > 0) {
            highlightError(cardExpMonth, false);
            highlightError(cardExpYear, false);
            if (!$.payment.validateCardExpiry(cardExpMonth.val(), cardExpYear.val())) {
                highlightError(cardExpMonth);
                highlightError(cardExpYear);
                return displayCustomErrorMessage('Credit Card Expiration');
            }
        }

        // Card CVV
        if (cardNum.length > 0) {
            var cardType = $.payment.cardType(cardNum.val());
            if (cardCVV.length > 0) {
                highlightError(cardCVV, false);
                if (!$.payment.validateCardCVC(cardCVV.val(), cardType)) {
                    highlightError(cardCVV);
                    return displayCustomErrorMessage('Credit Card CVV');
                }
            }
        }
    }
}
