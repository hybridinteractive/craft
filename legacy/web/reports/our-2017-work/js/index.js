// Foundation Reflow
$(document).foundation();
$(document).foundation('tab', 'equalizer', 'reflow');
$(document).foundation({equalizer: {equalize_on_stack: true}});
$(document).foundation({tab: {callback : function (tab) {console.log(tab);}}});

// Smooth scroll
smoothScroll.init({
  speed: 1000, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutQuart', // Easing pattern to use
  updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
  offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
  callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
  callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
});

// Select2
$('select').select2();
// Image fill on bg slides
$('.imagefill').imagefill();
// ScrollTo
//$('#network').ScrollTo();

// Fancybox
$(document).ready(function() {
    $(".fancybox").fancybox({
        helpers : {
            media: true,
            overlay: {
                locked: false
            }
        },
        width       : 800,
        height      : 450,
        aspectRatio : true,
        scrolling   : 'no'
    });

    $(".fancypdf").click(function(){
        $.fancybox({
            helpers : {
                overlay: {
                    locked: false
                }
            },
            type: 'html',
            autoSize: false,
            content: '<embed src="'+this.href+'#nameddest=self&page=1&view=FitH,0&zoom=80,0,0" type="application/pdf" height="98%" width="100%" />',
            beforeClose: function() {
                $(".fancybox-inner").unwrap();
            }
        }); //fancybox
        return false;
    }); //click
});
