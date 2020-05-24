var topRange      = 200,  // measure from the top of the viewport to X pixels down
    edgeMargin    = 20,   // margin above the top or margin from the end of the page
    animationTime = 1200, // time in milliseconds
    contentTop    = [];

$(document).ready(function(){
    // Stop animated scroll if the user does something
    /*$('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
        if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel' ){
            $('html,body').stop();
        }
    })

    // Animate menu scroll to content
    $('.da').find('a').click(function(){
        var sel = this,
        newTop = Math.min( contentTop[ $('.da a').index( $(this) ) ], $(document).height() - $(window).height() ); // get content top or top position if at the document bottom
        $('html,body').stop().animate({ 'scrollTop' : newTop }, animationTime, function(){
            window.location.hash = $(sel).attr('href');
        });
        return false;
    })*/

    // Set up content an array of locations
    $('.sidebar-nav').find('a').each(function(){
        contentTop.push( $( $(this).attr('href') ).offset().top );
        $(this).addClass('active')
    })

    // adjust side menu
    $(window).scroll(function(){
        var winTop = $(window).scrollTop(),
        bodyHt = $(document).height(),
        vpHt = $(window).height() + edgeMargin;  // viewport height + margin
        $.each( contentTop, function(i,loc){
            if ( ( loc > winTop - edgeMargin && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) ){
                $('.sidebar-nav a').removeClass('active').eq(i).addClass('active');
            }
        })
    })

    function hasTouch() {
        return 'ontouchstart' in document.documentElement
               || navigator.maxTouchPoints > 0
               || navigator.msMaxTouchPoints > 0;
    }
      
    if (hasTouch()) { // remove all the :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;
    
        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
            if (!styleSheet.rules[ri].selectorText) continue;
    
            if (styleSheet.rules[ri].selectorText.match(':hover')) {
            styleSheet.deleteRule(ri);
            }
        }
        }
    } catch (ex) {}
    }
});