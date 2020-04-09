(function ($) {
    "use strict";
    /* ---------------------------------------------
    Navigation menu
    --------------------------------------------- */
    // dropdown for mobile
    $(document).ready(function () {
        checkWidth(true);
        $(window).resize(function () {
            checkWidth(false);
        });
    });

    function checkWidth(init) {
        // If browser resized, check width again 
        if ($(window).width() <= 991) {
            $('.dropdown-submenu a').on("click", function (e) {
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });
        }
    }

    function navMenu() {

        // main menu toggleer icon (Mobile site only)
        $('[data-toggle="navbarToggler"]').click(function () {
            $('.navbar').toggleClass('active');
            $('body').toggleClass('offcanvas--open');
        });
        // main menu toggleer icon 
        $('.navbar-toggler').click(function () {
            $('.navbar-toggler-icon').toggleClass('active');
        });

        // Navbar moved up
        var $stickyNav = $(".navbar-sticky");

        $(window).on("scroll load", function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 120) {
                $stickyNav.addClass("navbar-sticky--moved-up");
            } else {
                $stickyNav.removeClass("navbar-sticky--moved-up");
            }
            // apply transition
            if (scroll >= 250) {
                $stickyNav.addClass("navbar-sticky--transitioned");
            } else {
                $stickyNav.removeClass("navbar-sticky--transitioned");
            }
            // sticky on
            if (scroll >= 500) {
                $stickyNav.addClass("navbar-sticky--on");
            } else {
                $stickyNav.removeClass("navbar-sticky--on");
            }

        });
    }
    navMenu();
    /* ---------------------------------------------
        Sticky Sidebar
        --------------------------------------------- */
    function stickyBlockArea() {

        var stickyBlock = $(".sticky-block");
        if (stickyBlock.length > 0) {
            var position = stickyBlock.position();
            var stickyElements = $(".sticky-elements");
            var objectlast = $(".stickyBlockEndPoint");
            $(window).on('scroll load', function () {
                var lHeight = objectlast.offset();

                var windowposition = $(window).scrollTop();

                var objHeight = (lHeight.top - parseInt(objectlast.height(), 10));

                if (windowposition >= position.top && objHeight >= windowposition) {
                    stickyElements.addClass("sticky-elements--on");
                } else {
                    stickyElements.removeClass("sticky-elements--on");
                }
            });
        }
    }
    stickyBlockArea();

    /* ---------------------------------------------
    smooth Scroll
    --------------------------------------------- */
    function smoothScroll() {

        // 循环获取当前的DOM offsetTop
        function getOffsetTop(dom) {
            var parent = dom.offsetParent;
            var offsetTop = dom.offsetTop;

            while(parent.tagName !== 'BODY') {
                offsetTop = offsetTop + parent.offsetTop;
                parent = parent.offsetParent;
            }

            return offsetTop;
        }

        $('.navbar .nav-item .nav-link, .smooth-scroll  a').on('click', function (event) {
            var $anchor = $(this);
            var headerH = '5';
            // 适用于Cocos Creator和Cocos2d-x这两个页面
            if($(this).parent().hasClass('product-nav-item')) {
                var target = document.getElementById($anchor.attr('href').slice(1));
                var targetOffsetTop = getOffsetTop(target);
                $('.header').outerHeight();
                $('html, body').stop().animate({
                    scrollTop: targetOffsetTop - headerH + "px"
                }, 1200, 'easeInOutExpo');
    
                // 左侧菜单栏由于是后期渲染出来的，因此没有绑定上添加active的事件，为了不冲突，加上nav-link-active类
                (function () {
                    if($anchor.hasClass('nav-link-active')) return;
                    $anchor.addClass('nav-link-active');
                    $anchor.parent().siblings().find('.nav-link').removeClass('nav-link-active');
                })()
            } else {
                $('.header').outerHeight();
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
                }, 1200, 'easeInOutExpo');
            }
            
            event.preventDefault();
        });
        $.extend($.easing, {
            easeInOutExpo: function (t, e, i, n, s) {
                return 0 == e ? i : e == s ? i + n : (e /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (-Math.pow(2, -10 * --e) + 2) + i
            },
        });
    }
    smoothScroll();

    /* ---------------------------------------------
    reveal
    --------------------------------------------- */
    function reveal() {

        window.sr = ScrollReveal();
        sr.reveal('.reveal', {
            duration: 1000,
            delay: 0,
            scale: 1,
            opacity: .2,
            easing: 'ease-in-out',
        });
    }

    reveal();

    /* ---------------------------------------------
    Language dropbown
    --------------------------------------------- */
    function languagedropbown() {
        var $landDropdown = $('.lang-dropdown');

        $(".lang-selector__button").on('click', function (e) {
            $landDropdown.slideToggle("fast");
            e.stopPropagation();
        });
        $(".lang-dropdown__item").on('click', function (e) {
            $landDropdown.hide();
            e.stopPropagation();
        });
        $("body").on('click', function () {
            $landDropdown.hide();
        });
    }
    languagedropbown();

    /*----------------------------------
        background image holder
    -----------------------------------*/
    function backgroundHolder() {
        $(".background-image-holder").each(function () {
            var thesrc = $(this).attr('src');
            $(this).parent().css("background-image", "url(" + thesrc + ")");
            $(this).parent().css("background-repeat", "no-repeat");
            $(this).hide();
        });

    }
    backgroundHolder();

    /* ---------------------------------------------
    Lightobx
    --------------------------------------------- */
    function lightBox() {
        $('.lightbox').venobox();
    }
    lightBox();

    /* ---------------------------------------------
    homepage-1 Features slider
    --------------------------------------------- */
    function featuresSlider1() {
        var $swipeTabsContainer = $('.swipe-tabs'),
            $swipeTabs = $('.swipe-tab'),
            $swipeTabsContentContainer = $('.swipe-tabs-container'),
            currentIndex = 0,
            activeTabClassName = 'active-tab';

        $swipeTabsContainer.on('init', function (event, slick) {
            $swipeTabsContentContainer.removeClass('invisible');
            $swipeTabsContainer.removeClass('invisible');

            currentIndex = slick.getCurrent();
            $swipeTabs.removeClass(activeTabClassName);
            $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
        });

        $swipeTabsContainer.slick({
            //slidesToShow: 3.25,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            swipeToSlide: true,
            touchThreshold: 10
        });

        $swipeTabsContentContainer.slick({
            asNavFor: $swipeTabsContainer,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            swipeToSlide: true,
            draggable: false,
            touchThreshold: 10
        });


        $swipeTabs.on('click', function (event) {
            // gets index of clicked tab
            currentIndex = $(this).data('slick-index');
            $swipeTabs.removeClass(activeTabClassName);
            $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
            $swipeTabsContainer.slick('slickGoTo', currentIndex);
            $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
        });

        //initializes slick navigation tabs swipe handler
        $swipeTabsContentContainer.on('swipe', function (event, slick, direction) {
            currentIndex = $(this).slick('slickCurrentSlide');
            $swipeTabs.removeClass(activeTabClassName);
            $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
        });
    }
    featuresSlider1();

    /* ---------------------------------------------
    Features homepage-2 slider
    --------------------------------------------- */
    function featuresSlider2() {
        $(".features--slider-2 .slider-tabs").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.features--slider-2 .slider-contents',
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]

        });
        $(".features--slider-2 .slider-contents").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            asNavFor: '.features--slider-2 .slider-tabs',
            prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-triangle-left-18 icon-color-white"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon icon-triangle-right-17 icon-color-white"></i></button>',
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(e.target).find('.slider').each(function () {
                $(this).slick('setPosition');
            })
        })
    }
    featuresSlider2();

    /* ---------------------------------------------
    Pricing data update
    --------------------------------------------- */
    function pricingData() {
        var cardValue = $('.card__value');
        var cardValueFocused = $('.card__value--focused');

        $(".pricing-tab .btn").on('click', function () {
            $('.pricing-tab .btn').removeClass('btn--bg-primary');
            $(this).addClass("btn--bg-primary");
        });
        $(".data-type-monthly").on('click', function () {
            cardValue.fadeIn("fast");
            cardValueFocused.css('display', 'none');
        });
        $(".data-type-yearly").on('click', function () {
            cardValue.css('display', 'none');
            cardValueFocused.fadeIn("fast");
        });
    }
    pricingData();

    /* ---------------------------------------------
    testimonial carousel
    --------------------------------------------- */
    function testimonialCarousel1() {

        $(".testimonial-carousel .testimonial-content").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.testimonial-carousel .testimonial-image',
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,

        });
        $(".testimonial-carousel .testimonial-image").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            asNavFor: '.testimonial-carousel .testimonial-content',
            dots: true,
            customPaging: function (slider, i) {
                return '<button class="slick-dots--long" id=' + i + "></button>";
            },

            arrows: false,
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(e.target).find('.slider').each(function () {
                $(this).slick('setPosition');
            })
        });
    }
    testimonialCarousel1();

    /* ---------------------------------------------
    Fixed Footer
    --------------------------------------------- */
    function csselem() {
        jQuery(".height-emulator").css({
            height: jQuery(".footer--fixed").outerHeight(true)
        });
    }
    csselem();
    var jQuerywindow = jQuery(window);
    jQuerywindow.resize(function () {
        csselem();
    });
    /* ---------------------------------------------
    CountDown
    --------------------------------------------- */
    function countDown() {
        var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        var xPdate = $("#date").data("date");
        var countDown = new Date(xPdate).getTime(),
            x = setInterval(function () {
                var now = new Date().getTime(),
                    distance = countDown - now;
                var cDays = document.getElementById("days");
                if (cDays) {
                    (document.getElementById("days").innerText = addZero(Math.floor(distance / day)),
                        (document.getElementById("hours").innerText = addZero(Math.floor(
                            (distance % day) / hour
                        ), 2))),
                    (document.getElementById("minutes").innerText = addZero(Math.floor(
                        (distance % hour) / minute
                    ), 2)),
                    (document.getElementById("seconds").innerText = addZero(Math.floor(
                        (distance % minute) / second
                    ), 2));
                }
            }, second);
    }

    function addZero(your_number, length) {
        var num = '' + your_number;
        while (num.length < length) {
            num = '0' + num;
        }
        return num;
    }
    countDown();
    /* ---------------------------------------------
    Preloaded
    --------------------------------------------- */
    $(window).on("load", function () {
        $('.preloader-wapper').addClass('loaded');
        if ($('.preloader-wapper').hasClass('loaded')) {
            $('.preloader-main').delay(1200).queue(function () {
                $(this).remove();
            });
        }
    });
    
    /**
     * 职位详情
     */
    function expandJobDetail() {
        $('.toggleDetail').on('click', function() {
            var parent = $(this).parent();
            parent.hasClass('is-active') ? $(this).text('+') : $(this).text('-');
            parent.find('.jobs-table-detail').slideToggle();
            parent.toggleClass('is-active');
        })
    }

    expandJobDetail();
    

    /**
     * 博客搜索
     */
    function blogSearch() {
        var form = document.getElementById('blog-search');

        $('.search-btn').on('click', function() {
            form.submit();
        })

        $('#form .form-control').on('click', function() {
            form.submit();
        })
    }

    blogSearch();

    /**
     * popover
     */

    function initPopover() {
        var wechat = document.getElementById('wechat-pop');
        $('#icon-weixin').popover({
            content: function() {
                wechat.style.display = 'block';
                return wechat;
            },
            trigger: 'hover',
            html: true,
            placement: 'top'
        });
    }

     initPopover();

     /**
      * 滚动条nicescroll
      */

    function initScrollbar() {
        $('.scrollbar-inner').scrollbar();
    }

    initScrollbar();

    /**
     * 产品左侧菜单栏，当滚动到底部时，固定在底部
     */

    function fixedMenuWhenScrollToBottom() {
        var footer = $('#cocos-footer');
        var footerHeight = footer.height();
        $(window).scroll(function() {
            var clientHeight = $(window).height();
            var scrollHeight = $(document).height() - clientHeight;
            var scrollTop = $(document).scrollTop();
            var $productNav = $('.product-nav');

            if(scrollTop + footerHeight > scrollHeight) {
                $productNav.addClass('fixed-nav')
            } else {
                $productNav.removeClass('fixed-nav')
            }
        })
    }

    fixedMenuWhenScrollToBottom();

    /**
     * 图片懒加载
     */
    // function lazyLoadImg() {
    //     var $imgList = $('.lazyLoadImg').find('img');
    //     var len = $imgList.length;
    //     var n = 0;

    //     return function() {
    //         var clientHeight = document.documentElement.clientHeight;
    //         var scrollTop = document.documentElement.scrollTop;
    //         var $elOffsetTop;
    //         var $img;

    //         for(var i = n; n < len - 1; i++) {
    //             $img = $($imgList[i]);

    //             if(!$img.attr('data-src')) return;

    //             $elOffsetTop = $img.offset().top;
                
    //             if(scrollTop + clientHeight - 200 > $elOffsetTop) {
    //                 $img.attr('src', $img.attr('data-src'))
    //                 $img.removeAttr('data-src');
    //                 n = n + 1;
    //             }
    //         }


    //     }
    // }

    // function bindImgLazyLoad() {
    //     var imgLoad = lazyLoadImg();

    //     imgLoad();

    //     window.addEventListener('scroll', function() {
    //         imgLoad();
    //     })
    // }

    // bindImgLazyLoad();

    /**
     * 版本下载中查看详情
     */

    ;(function() {
        var $updateRecord = $('.update-record');
        var $btnShowAll = $updateRecord.find('.btn-show-all')

        $btnShowAll.on('click', function () {
            $(this).toggleClass('expand');

            var $updateRecordItem = $(this).parents('.update-record-item');
            $updateRecordItem.toggleClass('expand');

            $(this).find('.expand-text').toggleClass('d-none');
            $(this).find('.close-text').toggleClass('d-none');
        })
     })();
})(jQuery);