jQuery(function($) {

    function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docViewBottom = docViewTop + windowHeight;
    
        var elemTop = $(elem).offset().top;
        var elemHeight = $(elem).height();
        var elemBottom = elemTop + elemHeight;

        //var ratio = 200 / windowHeight;
        var offset = 200;
        var docViewMiddle = (docViewTop + docViewBottom) / 2 - offset;
        var id = $(elem).attr("id");
        elemBottom += 100;
        if (id == "publications")
            elemBottom -= offset;
        if (id == "service")
            elemTop -= offset;
        //console.log(id+": "+elemTop+"-"+elemBottom+"; "+docViewTop+", "+docViewMiddle+", "+docViewBottom);
        return (elemTop <= docViewMiddle && elemBottom >= docViewMiddle);
    }

    function setElementsSize() {
        var pubFrame = $(".pubFrame").contents().find('.pub');
        if (pubFrame.length > 0) {
            pubFrame.removeClass("wrapper");
            var pubHeight = pubFrame.height();
            var frameHeight = $(".pubFrame").height();
            if (frameHeight != pubHeight) {
                $(".pubFrame").css("height", pubHeight);
            }
        }

        var bgHeight = $(".bgWrapper").height();
        var wrapperHeight = $(".mainWrapper").height();
        if (bgHeight != wrapperHeight) {
            $(".bgWrapper").css("height", wrapperHeight);
        }

        if (pubFrame.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    $(window).scroll(function() {
        $("section").each(function() {
            var id = $(this).attr("id");
            if (isScrolledIntoView(this)) {
                $("#nav-"+id).addClass("current");
            }
            else {
                $("#nav-"+id).removeClass("current");
            }
        });
    });

    $(window).resize(function() {
        setElementsSize();
    });

    $("#pubFrame").ready(function() {
        var inter = window.setInterval(function() {
            if (setElementsSize()) {
                window.clearInterval(inter);
            }
        }, 100);
    });

    $(".burger-container").click(function() {
        $(".navWrapper").toggleClass("menu-opened");
    });

    $(".menu-item").click(function() {
        $(".navWrapper").toggleClass("menu-opened");
    });
});

