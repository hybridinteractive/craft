// add additional choices for states.
// this will be the data-value -- and the value passed to Salesforce.
var extraStates = ['AA', 'AE', 'AP', 'AS', 'GU', 'MP', 'PR', 'VI'];

/**
 * Add polling function
 *
 */
function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
            // If the condition is met, we're done! 
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments));
            }
    })();
}

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
    }, 300);
}

/**
 * Better dropdowns
 *
 */

function dropdowns() {
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
}

var $config = $('.config');
var title = $config.data('title');
var image = $config.data('image');
var campaign = $config.data('campaign');
var photoCredit = $config.data('credit');
var heroHTML = '<div class="slick-hero slick-initialized slick-slider join-hero"> <div class="slick-list draggable"> <div class="slick-track" style="opacity: 1; width: 100%;"> <div class="bg slick-slide slick-active" style="width: 100%; background-image: url(' + image + ');" data-equalizer-watch="slide" data-slick-index="0" aria-hidden="false"> <div class="row text-center copy"> <h1 class="title">' + title + '</h1></div><span class="photo-credit show-for-medium-up"> <img src="https://www.accessfund.org/images/camera.png" class="credit-icon"/> <small class="credit text-right"><strong>Photo Courtesy of:</strong><br/>' + photoCredit + '</small> </span> </div></div></div></div>';
var $localOrg = $('[data-field-name="local_climbing_organizations__c"]');
var $otherAmount = $('input[data-validate-type="otherAmount"]');
var $tshirt = $('[name="t_shirt__c"]');
var $hoodie = $('[name="hoodie_size__c"]');
var $giftSelect = $('[name="t_shirt_or_hoodie__c"]');


var $holidayPack = $('[name="holiday_pack__c"]');
var $amount;
var friendFirstName = $('[name="holiday_pack_friend_first_name__c"]');
var friendLastName = $('[name="holiday_pack_friend_last_name__c"]');
var friendZip = $('[name="holiday_pack_friend_zip__c"]');
var friendFields = [friendFirstName, friendLastName, friendZip];

function themeInit() {
    $('form.container').before(heroHTML);
    $('.rc-toggle-primary').attr('data-campaign', campaign);
}

function localOrg() {
    
    if($localOrg.length && $('.config').data('local-org') == true ) {
        /* Hide Local climbing org field by default */
        $localOrg.parent().parent().parent().hide();

        /* Show local climbing org field if addition $15 checkbox checked */
        $('[name^="joint_member"]').change(function() {
            if ($(this).is(':checked')) {
                $localOrg.parent().parent().parent().show();
            } else {
                $localOrg.parent().parent().parent().hide();
            }
        });
        /* End of Show local climbing org field if addition $15 checkbox checked */
    }

    if ($holidayPack.length && $('.config').data('local-org') == true ) {
        toggleFriend();
        toggleGiftMessage();
    }
}

function toggleFriend(show) {
    if (show == 'show') {
        // holiday pack
        $('#4d5bc0d9-692a-4fb5-af71-d52403af2872').show();
        $('#22b74635-1944-4893-ab59-e745abf19525').show();

        // el cupitan
        $('#c2ba56dc-a209-4cb4-ab81-052ab132e48f').show();
        $('#12bb858f-b156-4dff-987d-8bc9a744c4cb').show();

        // on the nose
        $('#90aa2510-a77d-4c17-9db5-87fecc9c3fad').show();
        $('#0b85b8e1-370a-4259-861f-b0c492fe1ffe').show();
    } else {
        $('#4d5bc0d9-692a-4fb5-af71-d52403af2872').hide();
        $('#22b74635-1944-4893-ab59-e745abf19525').hide();

        $('#c2ba56dc-a209-4cb4-ab81-052ab132e48f').hide();
        $('#12bb858f-b156-4dff-987d-8bc9a744c4cb').hide();

        $('#90aa2510-a77d-4c17-9db5-87fecc9c3fad').hide();
        $('#0b85b8e1-370a-4259-861f-b0c492fe1ffe').hide();
    }

    $.each(friendFields, function(index, e) {
        e.parent().attr('data-required', show == 'show');
    });
}

function toggleGiftMessage(show) {
    if (show == 'show') {
        $('#70e52d45-5e27-44f4-9d2a-000846763af4').show();
        $('#ef193fd7-ae36-41e9-83d3-7d2dd167f687').show();
        $('#441dd773-6b75-427a-82d4-1dc33b0d1c70').show();
    } else {
        $('#70e52d45-5e27-44f4-9d2a-000846763af4').hide();
        $('#ef193fd7-ae36-41e9-83d3-7d2dd167f687').hide();
        $('#441dd773-6b75-427a-82d4-1dc33b0d1c70').hide();
    }
}

function selectAmount() {
    poll(
        function() {
            $amount = $('.rc-component-campaign-ask-item-list > .rc-amount');
            return $amount.length > 0;
        },
        function() {
            // Done, success callback
            $amount.click();
            $amount.hide();
        },
        function() {
            //console.log('NOT found!');
            // Error, failure callback
        },
        10000
    );
}

function giftToggle() {
    if ($holidayPack.length) {

        $('body').on('change', '[name="holiday_pack__c"]', function() {
            if ($(this).val() == 'Friend - Ship to me') {
                toggleFriend('show');
                toggleGiftMessage();
            } else if ($(this).val() == 'Friend - Ship to friend') {
                toggleFriend('show');
                toggleGiftMessage('show');
            } else { // 'Myself - Ship to me'
                toggleFriend();
                toggleGiftMessage();
            }
        });

    } else if ($tshirt.length) {
        var minTshirtAmount = $config.data('tshirt');
        $tshirt.parent().parent('.form-group').hide();

        if ($hoodie.length) {
            var minHoodieAmount = $config.data('hoodie');
            $hoodie.parent().parent('.form-group').hide();
            $giftSelect.parent().parent('.form-group').hide();

            /* Validate minimum amount for gift */
            $('body').on('change', "[data-validate-type='otherAmount']", function() {
                if ($(this).val() < minTshirtAmount) {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').hide();
                } else if ($(this).val() >= minTshirtAmount && $(this).val() < minHoodieAmount) {
                    $tshirt.parent().parent('.form-group').show();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').hide();
                } else {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').show();
                }
            });
            /* End Validate minimum amount for gift */

            /* Check if amount is selected and hide fields accordingly */
            $('body').on('click', '.btn-default.rc-toggle-primary.rc-amount', function() {
                var paymenthtml = $(this).text();
                var amountNum = paymenthtml.replace('$', '');
                if (paymenthtml == 'Other..') {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').hide();
                } else if (paymenthtml.length <= 0 || amountNum < minTshirtAmount) {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').hide();
                } else if (amountNum >= minTshirtAmount && amountNum < minHoodieAmount) {
                    $tshirt.parent().parent('.form-group').show();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').hide();
                } else {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').hide();
                    $giftSelect.parent().parent('.form-group').show();
                }
            });
            /* End of Check if amount is selected and hide fields accordingly */

            $giftSelect.change(function() {
                if ($(this).val() == 'Member T-Shirt') {
                    $tshirt.parent().parent('.form-group').show();
                    $hoodie.parent().parent('.form-group').hide();
                } else if ($(this).val() == 'Member Hoodie') {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').show();
                } else {
                    $tshirt.parent().parent('.form-group').hide();
                    $hoodie.parent().parent('.form-group').hide();
                }
            });
        } else {
            /* Validate minimum amount for T shirt */
            $('body').on('change', "[data-validate-type='otherAmount']", function() {
                if ($(this).val() < minTshirtAmount) {
                    $tshirt.parent().parent('.form-group').hide();
                } else {
                    $tshirt.parent().parent('.form-group').show();
                }
            });
            /* End Validate minimum amount for T shirt */

            /* Check if $35 is selected and hide T shirt accordingly */
            $('body').on('click', '.btn-default.rc-toggle-primary.rc-amount', function() {
                var paymenthtml = $(this).text();
                var amountNum = paymenthtml.replace('$', '');
                if (paymenthtml == 'Other..') {
                    $tshirt.parent().parent('.form-group').hide();
                }
                else if (paymenthtml.length <= 0 || amountNum < minTshirtAmount) {
                    $tshirt.parent().parent('.form-group').hide();
                } else {
                    $tshirt.parent().parent('.form-group').show();
                }
            });
            /* End of Check if $35 is selected and hide T shirt accordingly */
        }
    };
}

function minDonation() {
    if ($otherAmount.length) {
        var minAmount = $config.data('min-donation');
        // Add placeholder to other amount input
        $otherAmount.attr('placeholder', 'Minimum $' + minAmount + ' Donation');
        
        $('.rc-name').click(function() {
            /* validate minimum amount $28 */
            if ($('[data-giving-frequency="One Payment"]').parent().find('btn-primary').html() == 'Other..') {
                if ($otherAmount.val() < minAmount) {
                    alert('You need to donate at least $' + minAmount);
                    return false;
                }
            }
            /* End of validate minimum amount $28 */
        });
    }
}

function modifyStateDropdown() {

        // this will be the text value that appears to the user.
    var extraStatesNames = ['AA (U.S. Armed Forces – Americas)', 'AE (U.S. Armed Forces – Europe)', 'AP (U.S. Armed Forces – Pacific)', 'AS (American Samoa)', 'GU (Guam)', 'MP (Northern Mariana Islands)', 'PR (Puerto Rico)' , 'VI (Virgin Islands)', 'AB (Alberta)', 'BC (British Columbia)', 'MB (Manitoba)', 'NB (New Brunswick)', 'NL (Newfoundland and Labrador)', 'NS (Nova Scotia)', 'NT (Northwest Territories)', 'NU (Nunavut)', 'ON (Ontario)', 'PE (Prince Edward Island)','QC (Quebec)', 'SK (Saskatchewan)', 'YT (Yukon)'];

    // This is the UL element which is the State dropdown.
    var dropdown = $('[data-field-name=rc_connect__address_state__c] .dropdown UL')
    var classAddition = '';
    // Run through all our states. (the two arrays need to match though otherwise there will be problems)
    // Maybe a slightly less fragile thing would be to have an array of arrays, or an object array. [{'AA': '(U.S. Armed Forces – Americas)'}, {'AE': 'AE (U.S. Armed Forces – Europe)'}, etc...]
    for (var s=0; s < extraStates.length; s++) {
        classAddition = '';
     // I set classes bases on where we are in the states array. This could be set in the object array or something, maybe neater, but more data clutter.
        if (extraStates[s]=='AA') classAddition = ' state-divide territories';
        if (extraStates[s]=='AB') classAddition = ' state-divide canada';
     // append this new HTML to our dropdown element we referenced earlier.
        dropdown.append('<li><a class="rc-cascade-input-group' + classAddition + '" data-value="' + extraStates[s] + '">' + extraStatesNames[s] + '</a></li>');
    }

    // run the RC function to make sure that all the state drop down additions are clickable.
    // if you do not do this, all will be for nought.
    $('[data-field-name=rc_connect__address_state__c] .rc-cascade-input-group').on('click', rc.ui.cascadeInputGroup );
}
    
$(document).ready(function() {
    themeInit();
    minDonation();
    giftToggle();
    localOrg();
    loadElements();
    requiredIcon();
    navbarInit();
    modifyStateDropdown();
    dropdowns();
    if ($holidayPack.length) {
        selectAmount();
    }
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
    if (otherAmount.length > 0) {
        // If we are on the Join or Renew pages
        highlightError(otherAmount, false);
        if (otherAmountBtn.hasClass('btn-primary')) {
            var minAmount = $config.data('min-donation');
            // If we are on the Join or Renew pages
            if (parseInt(otherAmount.val()) < minAmount || $.trim(otherAmount.val()).length === 0) {
                highlightError(otherAmount);
                return displayCustomErrorMessage('Minimum $' + minAmount + ' Donation');
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

    $.each(friendFields, function(index, e) {
        if (e.parent().attr('data-required') == 'true') {
            elements_to_test.push(e);
        }
    });

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
           var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!regex.test(email.val())) {
                highlightError(email);
                return displayCustomErrorMessage('Email Address');
            }
        }

        // State
        if (state.length > 0) {
            highlightError(state, false);
            var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'].concat(extraStates);
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

    var value = $(selectedAmount[0]).data('value');
    
    if (ga) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Donation Button',
          eventAction: 'submit',
          eventLabel: 'Validate',
          eventValue: value
        });
    }

    if (fbq) {
        fbq('track', 'Purchase', {currency: 'USD', value: value});
    }
}


/**
 * Success Message for SalesForce forms
 *
 * @returns {boolean}
 */

 function rabbleSuccess(data) {
    $('#rc-container-list *').css("display", "none"); 

    $('#rc-container-list').after("<h4><strong>Thank you for your generous support of the Access Fund. An email confirmation of your gift will be sent to you in 24 hours or less.</strong></h4><p>You make our work possible! Your gift provides critical funding that allows us to continue to protect and conserve America's climbing.</p>");

    if (ga) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Donation Button',
          eventAction: 'submit',
          eventLabel: 'Success'
        });
    }

    if (fbq) {
        fbq('track', 'Lead');
    }
 }

 /**
 * Failure Message for SalesForce forms
 *
 * @returns {boolean}
 */

 function rabbleFailure() {

    var errorBox = $('.error-message');
    errorBox.html('There was an error and we could not process your information. Please try again. If the problem persists, please contact <a href="mailto:info@accessfund.org" style="color: #b94a48; text-decoration: underline;">info@accessfund.org</a>.');
    $('.alert-box').show();
    $('html, body').animate({
        scrollTop: (errorBox.offset().top - 140)
    }, 1000);

    return false;
 }
