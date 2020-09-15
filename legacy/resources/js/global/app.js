$(document).foundation({
  equalizer : {
    equalize_on_stack: true
  }
}, 'reflow');

// Facebook SDK
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=701351489975554";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk')
);

// Twitter
function twitterInit() {
    !function(d,s,id) {
        var js,
        fjs=d.getElementsByTagName(s)[0],
        p=/^http:/.test(d.location)?'http':'https';
        if(!d.getElementById(id)) {
            js=d.createElement(s);
            js.id=id;
            js.src=p+"://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    } (document, "script", "twitter-wjs");
}


// Sticky Footer
$(window).bind("load", function () {
    var footer = $(".footer-wrapper");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height();
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }
});

// Label the parents
function labelParents() {
    sliderPageSection();
    doNotPrintParent('.form-card');
}

// Remove / Don't Print Functions
function doNotPrint(element) {
    $(element).addClass('hide-for-print');
}

function doNotPrintParent(element) {
    $(element).parent().addClass('hide-for-print');
}

function removeMe(element) {
    $(element).remove();
}

function removeParent(element) {
    $(element).parent().remove();
}

// Label sections with a slider inside, for print styling purposes
function sliderPageSection() {
    $('.slick-slider').parent('.page-section').addClass('has-slider');
}

// Photo Credit Icon
$('.credit-icon').click(function() {
    if (window.matchMedia("(max-width: 40em)").matches) {
        $(this).siblings('.credit').toggleClass('visible');
    }
});

// Initialize Isotope for masonry grid
function initIsotope() {
  var $resourceList = $('#resource-list');

  if ($resourceList.length) {
    var $container = $resourceList.isotope({
        layoutMode: 'fitRows',
        itemSelector: '.item',
        masonry: {
            gutter: 20
        }
    });
    $('#filters').on('click', 'button', function(e) {
        var filterValue = $(this).attr('data-filter');
        // Sort the isotope elements
        $container.isotope({ filter: filterValue });
        // Re-runs the same filter once equalizing has been complete to maintain grid gutter consistency
        setTimeout(function() {
            $container.isotope({ filter: filterValue });
        }, 500);
    });
    $container.isotope( 'on', 'arrangeComplete',
        function( laidOutItems ) {
            // Labels non-hidden items with the class "equalize"
            equalizeIsotope('#resource-list .item');
            // Equalizes the labeled items
            equalheight('#resource-list .equalize');
    });
  }
}

// Rearrange isotope DOM for better equalizing
function equalizeIsotope(container) {
    $(container).each(function() {
        if ($(this).css('display')=='none') {
            $(this).removeClass('equalize');
        } else {
            $(this).addClass('equalize');
        }
    });
}

// Equal Height function
equalheight = function(container) {
    var currentTallest = 0,
         currentRowStart = 0,
         rowDivs = new Array(),
         $el,
         topPosition = 0;
     $(container).each(function() {

       $el = $(this);
       $($el).height('auto')
       topPostion = $el.position().top;

       if (currentRowStart != topPostion) {
         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
           rowDivs[currentDiv].height(currentTallest);
         }
         rowDivs.length = 0; // empty the array
         currentRowStart = topPostion;
         currentTallest = $el.height();
         rowDivs.push($el);
       } else {
         rowDivs.push($el);
         currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
     });
}

// Check for valid email.
function isValidEmail (s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

// eNews Form
function eNewsForm() {
  $('#enewsForm').submit(function(e) {
      e.preventDefault();

      var email = $('#email_field').val();
      var firstName = $('#first_name_field').val();
      var lastName = $('#last_name_field').val();
      var state = $('#zip_code_field').val();

      if (!isValidEmail(email)){
          alert('Please Enter a Valid Email Address');
      } else if (!firstName) {
          alert('Please Enter Your First Name');
      } else if (!lastName ) {
          alert('Please Enter Your Last Name');
      } else if (!state || state.length != 5) {
          alert('Please Enter a Valid Zip Code');
      } else {
          this.submit();
      }
  });
}

// Form web to lead
$('form.web-to-lead').submit(function(e) {
  if ( $('.web-to-lead textarea').val() === '' ) {
    alert('Please fill out all feilds');
    return false;
  } else if ( $('.web-to-lead #Campaign_ID').val() === '' ) {
    alert('Please fill out all feilds');
    return false;
  } else if( $('.web-to-lead input[type="text"]').val() === '' ) {
    alert('Please fill out all feilds');
    return false;
  } else {
    return true;
    alert('Thank You');
  }
});

// Slick Slider
function initSlick() {
    $('.slick-hero').slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false
    });
    $('.slick-single').slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnHover: false
    });
    $('.slick-triple').slick({
        dots: false,
        arrows: false,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1026,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }
        ]
    });
}

function scrollToContent() {
    let headerHeight = $('.fixed.nav-wrapper').outerHeight();
    let componentMargin = parseInt($('.page-section').css("margin-top"));

    //Scroll Destination Link
    $.fn.scrollView = function () {
        return this.each(function () {
            $("html, body").animate({
                scrollTop: $(this).offset().top - (componentMargin + headerHeight)
            }, 1500);
        });
    }

    //Scroll jump links
    $(".scroll-jump").on("click", function(e) {
        e.preventDefault();
        let jumpTarget = $(this).attr('href');
        $(jumpTarget).scrollView();
    });
}

function tabletSubnav() {
    $('.tablet-toggle-topbar.menu-icon').on('click', function() {
        $('.top-bar').toggleClass('expanded');
    });
    $('.dropdown-toggle').on('click', function() {
        $('.has-dropdown').removeClass('open');
        $(this).parent().addClass('open');
    });
}

function educateCallouts() {
    var callout = $('.feature-wrapper');
    if (callout.length) {
        callout.each(function () {
            var bottomMargin = $(this).find('a h3.title').outerHeight(true);
            $(this).find('a').css('margin-bottom', bottomMargin);
        });
    }
}

function init() {
    initSlick();
    tabletSubnav();
    educateCallouts();
    twitterInit();
    eNewsForm();
    labelParents();
    initIsotope();
    equalizeIsotope('#resource-list .item');
    equalheight('.block-grid-news-events > li');
    scrollToContent();
}

$(document).ready(function() {
    init();
});

$('.image').load(function() {
    equalheight('#resource-list .equalize');
    equalheight('.block-grid-news-events > li');
    initIsotope();
});

$(window).resize(function(){
    equalheight('.block-grid-news-events > li');
    equalheight('#resource-list .equalize');
});