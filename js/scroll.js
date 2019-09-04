; (function ($) {
    var defaults = {
        dir: "left", 
        delay: 30,
    };
    $.fn.gysContentDisplay = function (opt) {
        opt = $.extend({}, defaults, opt);

        var obj = $(this); 
        var dirs={left:"left",right:"right",up:"up",down:"down",none:"none"};
        obj.css({ "overflow": "hidden" });
        if (opt.dir === dirs.none) return;
        var objLis = obj.children(); 
        objLis.css({ "overflow": "hidden" });
        var objSize = 0; 
        var scrollEvent = "scrollLeft"; 
        var liTotalSize = 0, liTotalSizeOther = 0; 
        var scrollSize = 0, 
            scrollSizeMax = 0, 
            scrollSizeMin = 0; 
        var interval = undefined; 


        if (opt.dir ===dirs.up || opt.dir ===dirs.down) {
            objSize = obj.innerHeight();
            scrollEvent = "scrollTop";
            obj.css({ "paddingTop": 0, "paddingBottom": 0 }).height(objSize);
        }
        else if (opt.dir === dirs.left || opt.dir === dirs.right) {
            objSize = obj.innerWidth();
            scrollEvent = "scrollLeft";
            obj.css({ "paddingLeft": 0, "paddingRight": 0 }).width(objSize);
        }
        else {
            alert("浣犵殑dir鍙傛暟鏈夎");
            return;
        }

        var getChildTotalSize = function (dir,dirs,objLis) {
            if (dir === dirs.left || dir ===dirs.right) {
                objLis.css("float", "left");
                return function () {
                    objLis.each(function () {
                        liTotalSize += $(this).outerWidth(true);
                    });
                }
            }
            else if (dir === dirs.up || dir ===dirs.down) {
                objLis.css("float", "none");
                return function () {
                    objLis.each(function () {
                        liTotalSize += $(this).outerHeight(true);
                    });
                }
            }
        } (opt.dir,dirs,objLis);
        getChildTotalSize(); 

        (function (obj) {
            var cloneCount = Math.ceil(objSize * 2 / liTotalSize); 
            var cloneHtmlNow = "", cloneHtmlStart = obj.html(); 

            for (var i = 0; i < cloneCount; i++) {
                cloneHtmlNow += cloneHtmlStart;
            }
            obj.append(cloneHtmlNow);
            liTotalSizeOther = (cloneCount + 1) * liTotalSize;
        })(obj);


        if (opt.dir === dirs.left || opt.dir === dirs.right) {
            obj.css({ "position": "relative", "z-index": 0 });
            obj.children().css({ "position": "absolute", "z-index": 1 });
            var left = 0;
            obj.children().each(function () {
                $(this).css({ "left": left + "px", "top": 0 });
                left += $(this).outerWidth(true);
            });
        }

        function scrollChange(dir) {
            if (dir ===dirs.left || dir === dirs.up) {
                obj[scrollEvent](0);
                scrollChange = function () {
                    scrollSize++;
                    if (scrollSize >= liTotalSize) scrollSize = 0;
                    obj[scrollEvent](scrollSize);
                }
            }
            else if (dir === dirs.right|| dir ===dirs.down) {
                scrollSizeMax = liTotalSizeOther - objSize;
                obj[scrollEvent](scrollSizeMax);
                scrollSize = scrollSizeMax;
                scrollSizeMin = scrollSizeMax - liTotalSize;
                scrollChange = function () {
                    scrollSize--;
                    if (scrollSize <= scrollSizeMin) scrollSize = scrollSizeMax;
                    obj[scrollEvent](scrollSize);
                }
            }
        };
        scrollChange(opt.dir);
        interval = setInterval(scrollChange, opt.delay);
        obj.children().on("mouseover", function () {
            clearInterval(interval);
        }).on("mouseleave", function () {
            interval = setInterval(scrollChange, opt.delay);
        });
    }
})(jQuery);