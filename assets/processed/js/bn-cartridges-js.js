(function () {


    // Utilities...
    if (window.location.hostname === "m.barnesandnoble.com" || window.location.hostname === "mbarnesandnoble.skavaone.com" || window.location.hostname === "mpreprod.barnesandnoble.com" || window.location.hostname === "mpreview.barnesandnoble.com") {
        $('head').append('<link rel="stylesheet" type="text/css" href="https://qa-adobe-dispatch.bn-web.com/etc/designs/ccr/static/html/css/bn-cartridges-mobile.min.css">');
    }


    // retrieve querystring params
    var BNgetQSParams = function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');

        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }
    }; //console.log(BNgetQSParams('date'));

    var BNcookieGet, BNcookieSet, BNcookieSetExpire, BNcookieDelete;
    BNcookieGet = function (cookieName) {
        var re = new RegExp('[; ]' + cookieName + '=([^\\s;]*)');
        //http://www.javascripter.net/faq/regularexpressionsyntax.htm
        var sMatch = (' ' + document.cookie).match(re);
        if (cookieName && sMatch) {
            return unescape(sMatch[1]);
        }
        return ''; //NcookieGet('cookieName2');
    };
    BNcookieSet = function (name, value, expires, path, domain, secure) {
        var buildCookie;
        buildCookie = name + "=" + escape(value) + "; ";
        if (expires) {
            expires = BNcookieSetExpire(expires);
            buildCookie += "expires=" + expires + "; ";
        }
        if (path) {
            buildCookie += "path=" + path + "; ";
        }
        if (domain) {
            buildCookie += "domain=" + domain + "; ";
        }
        if (secure) {
            buildCookie += "secure; ";
        }
        document.cookie = buildCookie;
    };
    BNcookieSetExpire = function (cookieLife) {
        var today = new Date();
        //var expr = new Date(today.getTime() + cookieLife * 60 * 60 * 1000);//hours
        var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000); //days
        return expr.toUTCString();
    };
    BNcookieDelete = function (name) {
        BNcookieSet(name, '', -1);
    };

    var isPreviewEnv = false;
    if (window.location.hostname === 'prodny-endeca.bn-web.com' || window.location.hostname === 'prodny-preview.bn-web.com' || window.location.hostname === 'localhost') {
        isPreviewEnv = true;
    }


    // can we re-use Endeca's date format? // &Endeca_date=2016-01-04T23%3A30
    var todaysDate;
    if (BNgetQSParams('date') && isPreviewEnv) {
        todaysDate = new Date(BNgetQSParams('date'));
    } else {
        todaysDate = new Date();
    }
    todaysDate.setHours(0, 0, 0);
    var oToday = Date.parse(todaysDate);

    //var tomorrowsDate = new Date();
    //   add a day to the date
    //tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);

    // format the date to display
    var twoDigitMonth = todaysDate.getMonth() + 1;
    if (twoDigitMonth.length === 1) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    var twoDigitDay = todaysDate.getDate() + "";
    if (twoDigitDay.length === 1) {
        twoDigitDay = "0" + twoDigitDay;
    }
    var todaysDisplayDate = twoDigitMonth + "/" + twoDigitDay + "/" + todaysDate.getFullYear();

    var dayOfWeek = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    // console.log("Today is " + dayOfWeek[todaysDate.getDay()]);  // console.log( todaysDate.getDay());


    loadRWDimg = function (dataAttr) {
        $("[" + dataAttr + "]").each(function (index, value) {
            var isrc = $(this).attr(dataAttr);
            $(this).attr({
                src: isrc,
                alt: '',
                border: 0
            });
        });
    };


    $(function () { //document.ready
        // Call function slick
        slickCafe();

        // load adaptive images
        var winWidth = $(window).width();
        if (winWidth > 1279) {
            loadRWDimg('data-img-src-desktop');
        } else if (winWidth < 600) {
            loadRWDimg('data-img-src-mobile');
        } else {
            loadRWDimg('data-img-src-tablet');
        }

        var isMobile = false;
        var URLpathArray = window.location.pathname.split('/');
        if (URLpathArray[1].toLowerCase() === "mobile" || window.location.hostname === "m.barnesandnoble.com" || window.location.hostname === "mbarnesandnoble.skavaone.com" || window.location.hostname === "mpreprod.barnesandnoble.com" || window.location.hostname === "mpreview.barnesandnoble.com") {
            isMobile = true;
        }
        if (isMobile) { // ***  Applies to Mobile Only  ***
            $('body').addClass('isMobile');

            // identify Series pages:
            if (URLpathArray[2].toLowerCase() === "series") {
                $('body').addClass('mobileSeries');
                $('h2.index-heading').addClass('rule');
                // identify Series Sub pages:
                if($('#view-more-discover').length){ // series sub pages...
                  $('div.bg-whole-site-color > div.container > section.mb-xs:eq(2)').hide();  //hide the featured titles
                    $(window).on('load', function () {
                      if(!$('#view-more-discover').is(':visible')){
                        $('#view-more-discover').show();    // show the results
                      }
                    });
                }
            }
            // identify Contributor Sub pages:
            if (URLpathArray[2].toLowerCase() === "contributor"){
                $('body').addClass('mobileContributor');
                if (URLpathArray[3] === null || URLpathArray[3].toLowerCase() !== "contributor" ) {
                    if($('#view-more-discover').length){ // series sub pages...
                      $('div.bg-whole-site-color > div.container > section.mb-xs:eq(2)').hide();  //hide the featured titles
                        $(window).on('load', function () {
                          if(!$('#view-more-discover').is(':visible')){
                            $('#view-more-discover').show();    // show the results
                          }
                        });
                    }
                }
            }
            // identify Discover Categories:
            if (URLpathArray[2].toLowerCase() === "discover-categories") {
                $('body').addClass('mobileDiscoverCat');

                if($('#view-more-discover').length){ // series sub pages...
                  $('div.bg-whole-site-color > .series-detail > div.container > section:eq(1)').hide();  //hide the featured titles
                    $(window).on('load', function () {
                      if(!$('#view-more-discover').is(':visible')){
                        $('#view-more-discover').show();    // show the results
                      }
                    });
                }
            }

            // Author Page break Skava cache for Grid / List view results
            $(document).on('click', '#grid-view,#list-view', function(e) {
                e.preventDefault();
                var newUrl;
                var thisId = $(this).attr('id');
                var qs = window.location.search.substring(1);
                if(qs.indexOf("list-view") > -1){
                   var listview = qs.indexOf("list-view");
                   qs = qs.substring(0, listview-1);
                }
                if(qs.indexOf("grid-view") > -1){
                   var gridview = qs.indexOf("grid-view");
                   qs = qs.substring(0, gridview-1);
                }
                if(qs.length > 1){
                    newUrl = location.pathname +'?'+ qs+'&'+thisId;
                }else{
                    newUrl = location.pathname +'?'+thisId;
                }
                window.location.href = newUrl;
                return false;
            });






            // event carousel for mobile
            var initCarouFredSelect = function (cfg) {
                // check for carousels
                var carousels = $(cfg.selector),
                    countCarousels = $(carousels).length,
                    hasAlreadyBeenProcessed = countCarousels > 0 ? $(carousels).first().attr('data-widget-type') === 'carousel' : false,
                    idSet = 1; /* append unique ID to each carousel if required */

                if (!hasAlreadyBeenProcessed && countCarousels > 0) {

                    $(carousels).each(function () {
                        var self = this,
                            getID = $(this).attr('id'),
                            countChildren = $(this).children('li:not(.add-plus-product)').length,
                            /* making the number of visible items configurable */
                            numVisibleItems = 1.3, //$(this).attr('data-visible-items') || cfg.numDisplay,
                            width = getCarouselWidth(this, cfg);

                        $(this).attr('data-widget-type', 'carousel');

                        if (cfg.incrementIds) {
                            $(this).attr('id', (getID + '-' + idSet));
                            idSet++;
                        }

                        // Match to num of display
                        if (countChildren > cfg.numDisplay) {
                            // generate next/prev buttons
                            $(this).after(cfg.paginationButtons);
                            if (cfg.breadcrumbContainer && cfg.pagination) {
                                // generate breadcrumb dots at the bottom of the carousel
                                $(this).after(cfg.breadcrumbContainer);
                            }
                        }

                        $(this).parent().off('click').on('click', '.prev-item, .featured-prev-item', function () {
                            $(self).trigger('prev');
                        });

                        $(this).parent().on('click', '.next-item, .featured-next-item', function () {
                            $(self).trigger('next');
                        });

                        $(this).carouFredSel({
                            align: cfg.alignItems,
                            responsive: cfg.responsive,
                            circular: cfg.circular,
                            //width: cfg.carouselWidth,
                            height: cfg.carouselHeight,
                            items: {
                                visible: cfg.items.visible,
                                width: cfg.itemWidth,
                                height: cfg.itemHeight
                            },
                            prev: cfg.prev,
                            next: cfg.next,
                            pagination: cfg.pagination,
                            auto: cfg.auto,
                            scroll: cfg.scroll,
                            direction: cfg.direction
                        });

                        $(this).swiperight(function () {
                            $(this).trigger('prev');
                        });

                        $(this).swipeleft(function () {
                            $(this).trigger('next');
                        });

                    });
                }
            };

            var cfg = $.extend({}, this.carouFredSelect_cfg_base, {
                selector: '.event-info',
                alignItems: "left",
                carouselWidth: '100%',
                carouselHeight: 'variable',
                items: {
                    height: 'auto',
                    width: 'auto',
                    visible: {
                        min: 1.12
                    }
                },
                prevButtonID: 'carousel-prev',
                nextButtonID: 'carousel-next',
                prev: '.featured-prev-item',
                next: '.featured-next-item',
                paginationButtons: '<div id="carousel-pagination" class="featured-item-pagination"></div>' +
                    '<div class="featured-prev-item" style="display:block;" id="carousel-prev"><span style="display:none;">Prev</span></div>' +
                    '<div class="featured-next-item" id="carousel-next"><span style="display:none;">Next</span></div>',
                breadcrumbContainer: '<div id="carousel-pagination" class="featured-item-pagination"></div>',
                pagination: {
                    container: '#carousel-pagination',
                    anchorBuilder: function (nr) {
                        return ' <span data-icon="carousel-pager-off">' + nr + '</span>';
                    }
                },
                responsive: true,
                auto: {
                    play: false
                },
                circular: true,
                redrawOnResize: false
            });

            initCarouFredSelect(cfg);


            // initialization of the MakerFaire eventCarousel / mobile
            $('#ec-carouselEventsVideo').carouFredSel({
                auto: {
                    play: true,
                    timeoutDuration: 3000
                },
                scroll: {
                    items: 1
                }
            });
            $('a.mf-cta').off(); // unbind cta links just in case

            // BEGIN slick function in FEATURED CATEGORIES - Pages: Dicover Categories / Series / Author
            $('.row.featured-link-container .clearfix').remove();
            $('.row.featured-link-container').addClass('slick-feat-cat');
            $('.slick-feat-cat .genre-tile-footer p').removeClass('genre-tile-caption');
            $('.slick-feat-cat').slick({
                dots: true,
                arrows: false,
                speed: 500,
                cssEase: 'linear',
                adaptiveHeight: true,
                respondTo: 'window',
                infinite: false
            });
            // END Slick for FEATURED CATEGORIES

            // BEGIN Detail Pages
            $('.discoverFeaturedBook').slick('unslick');
            // END Detail Pages

            // ***  End Mobile Only  ***
        } else {
            // ***  start desktop Only  ***

            // Event Info pods AND Event Carousel
            var startAt = null;
            var infoCard = null;
            //	var infoCard = '#info-spot1';
            // handling expired events
            $('.card a, .event-info-pod').each(function (i) {
                // date checking
                eventExpiration = $(this).data('expiration');
                eventEnd = new Date(eventExpiration);
                eventEnd.setDate(eventEnd.getDate() + 1);
                today = new Date();

                if (today > eventEnd) {

                    $(this).addClass('ended');
                    $('.ended .card-date, .ended .event-info-pod-date').text('This Event Has Passed');
                    $('.ended .card-title').remove();
                }

            });
            // add current state to event after expired one
            $('.card a').each(function () {
                if (!$(this).hasClass('ended')) {
                    $(this).addClass('current');
                    withMe = this.id;
                    infoCard = '#info-' + withMe;
                    //console.log(withMe);
                    startSplit = withMe.split('t');
                    startAt = startSplit[1] - 1;
                    return false;
                } else {
                    infoCard = '#info-spot1';
                    $('.card #info-spot1').addClass('current');
                }
            });

            // Remove arrows for less that 4 events
            var amountOfEvents = $('.calendar-bottom-content').length;
            if (amountOfEvents < 4) {
                $('.ec-backward, .ec-forward').remove();
            }

            if ($('#ec-carouselEvents').length) {
                // initialization of the eventCarousel
                $('#ec-carouselEvents').carouFredSel({
                    circular: false,
                    infinite: false,
                    direction: "left",
                    items: {
                        visible: 3,
                        start: startAt,
                    },
                    auto: false,
                    next: {
                        button: ".ec-forward"
                    },
                    prev: {
                        button: ".ec-backward"
                    }
                });
            }

            // shows only one event info
            if ($('div[id^=info-spot]').length) {}
            $('div[id^=info-spot]').hide();
            $(infoCard).show();


            // show the event info based on the item in the eventCarousel
            $('.card a').click(function () {
                var tab_id = "#info-" + $(this).attr('id');
                $('div[id^=info-spot]').hide();
                $(tab_id).show();
                $('.card a').removeClass('current');
                $(this).addClass('current');
                return false;
            });

            // adjust Event Info pod height to match tallest
            if ($('.event-info-pod').length) {
                var maxHeight = -1;
                $('.event-info-pod').each(function () {
                    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
                });
                $('.event-info-pod').each(function () {
                    $(this).height(maxHeight);
                });
            }

            if ($('.lt-ie9').length) {
                // Alt Image load for IE8 that doesn't support document.getElementsByClassName();
                loadRWDimg('data-img-src-lt-ie9');
            }




        } // ***  End desktop Only  ***






        // r17 Textbooks Desktop Search funtionality
        if ($('form#r17TextBookSearch.DT').length) {
            $("#r17TextBookSearch.DT #siteSearch").keypress(function (event) {
                if (event.which === 13) {
                    var r17_txtSearchDT = $('form#r17TextBookSearch.DT');
                    r17_txtSearchDT.submit(function () {
                        txtBookQuickSearch();
                    });
                    txtBookQuickSearch = function () {
                        var submitval = ($.trim($('#r17TextBookSearch.DT #siteSearch').val()).replace(/[\W]/g, "+")); //encodeURIComponent
                        var actionval = location.protocol + "//" + location.hostname + "/s/" + submitval + "/_/N-8q9";
                        r17_txtSearchDT.attr('action', actionval);
                        r17_txtSearchDT.attr('method', 'get');
                    };
                }
            });
        }

        // r17 Textbooks Mobile Search funtionality
        if ($('form#r17TextBookSearch.MP').length) {
            var r17_txtSearchMP = $('form#r17TextBookSearch.MP');
            r17_txtSearchMP.submit(function () {
                txtBookQuickSearch();
            });
            txtBookQuickSearch = function () {
                var submitval = ($.trim($('#r17TextBookSearch.MP #siteSearch').val()).replace(/[\W]/g, "+")); //encodeURIComponent
                var actionval = location.protocol + "//" + location.hostname + "/s/" + submitval + "/_/N-8q9";
                r17_txtSearchMP.attr('action', actionval);
                r17_txtSearchMP.attr('method', 'get');
            };
            $(".cqTextBookSearch-isbn-link").on("click", function (e) {
                e.preventDefault();
                var isbnLink = $(".cqTextBookSearch-isbn-link");
                var isVisible = $(".cqTextBookSearch-isbn-sample").is(":visible");

                var el = $(this);
                if (el.hasClass('active')) {
                    el.removeClass('active');
                    $("#r17TextBookSearch.MP #siteSearch").focus();
                } else {
                    el.addClass('active');
                }
                return false;
            });
        }


        // Textbooks Search funtionality  *** PRE r17 Search ***
        if ($('form#cqTextBookSearch').length) {
            var txtSearch = $('form#cqTextBookSearch');
            txtSearch.submit(function () {
                txtBookQuickSearch();
            });
            txtBookQuickSearch = function () {
                var submitval = ($.trim($('#searchTextBookBar').val()).replace(/[\W]/g, "+")); //encodeURIComponent
                var actionval = location.protocol + "//" + location.hostname + "/s/" + submitval + "/_/N-8q9";
                txtSearch.attr('action', actionval);
                txtSearch.attr('method', 'get');
            };

            $(".cqTextBookSearch-isbn-sample");
            $(".cqTextBookSearch-isbn-link").on("click", function (e) {
                // if($(this+":focus")){alert('"focus');}
                e.preventDefault();
                //$(".cqTextBookSearch-isbn-sample").toggle();
                var isbnLink = $(".cqTextBookSearch-isbn-link");
                var isVisible = $(".cqTextBookSearch-isbn-sample").is(":visible");
                // var isVisible = $(".cqTextBookSearch-isbn-sample").is(":visible");
                // if (!isVisible) {
                //     $(".cqTextBookSearch-isbn-link").addClass('active');
                // } else {
                // 	$(".cqTextBookSearch-isbn-link").removeClass('active');
                // 	//$("#searchTextBookBar").focus();
                // }

                var el = $(this);
                if (el.hasClass('active')) {
                    el.removeClass('active');
                    $("#searchTextBookBar").focus();
                } else {
                    el.addClass('active');
                }
                return false;

                //return false;
                // if($(".cqTextBookSearch-isbn-sample")){
                // 	$("#searchTextBookBar").focus();
                // }
            });
            //    	return false;
            //         if($(this+":focus")){alert('"focus');}
            //         	//$(this).fadeOut();
            //         // $("#searchTextBookBar").focus();}
            // });

        }



        // Confirm dom wrapper to write to AND array are available! then...
        if ($('#jsonGridItems').length && (typeof jsonGridItems !== "undefined")) {

            $.each(jsonGridItems, function (i) { // console.log(i); loop through each array line
                var count = i + 1;
                var promoIsCurrent = true;
                if (count > 0) { // isolate this array line's items
                    var ean = this.ean; // regular edition
                    var title = this.title.trim();
                    var contributor = this.contributor.trim();
                    //console.log(seTitle.length)
                    var characterMaxLength = 50; // maximum number of characters to extract
                    var titleDisplayed = title;
                    if (title.length > characterMaxLength) {
                        var extHellip = '&hellip;';
                        //trim the string to the maximum length
                        var trimmedString = title.substr(0, characterMaxLength);
                        //re-trim if we are in the middle of a word
                        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                        titleDisplayed = trimmedString + extHellip;
                        // $(this).text(trimmedString);
                        // $(this).append(extHellip);
                    }

                    var icItem = "event_result-grid_" + ean + "_image";
                    var imgPath = "//prodimage.images-bn.com/pimages/" + ean + "_p0_v3_s118x184.jpg";
                    var jsonItem = $('<div class="jsonGridItem"><a href="http://stores.barnesandnoble.com/" onclick="set_cookie(' + icItem + ');"><div class="jsonGridImage"><img src="' + imgPath + '" border="0" alt="" /></div><div class="jsonGridDetails"><p class="jsonGridTitle">' + titleDisplayed + '</p><p class="jsonGridContributor">by ' + contributor + '</p></div></a></div>');
                    $('#jsonGridItems').append(jsonItem);

                }
            });
        }


        // BlackFriday Signed Editions 2017
        // Confirm dom wrapper to write to AND array are available! then...
        if ($('#jsonBFSignedEditions').length && (typeof jsonSignedEditions !== "undefined")) {

            var insertAlphaNav = ($('#bfAuthorNavPrimary').length > 0);
            var alphaPosition = 1;


            var signedEd = jsonSignedEditions.map(function (i, count) {
                // });
                // $.each(jsonGridItems, function(i) { // console.log(i); loop through each array line

                if (count >= 0) { // isolate this array line's items
                    var ean = i.ean; // regular edition
                    var title = i.title.trim();
                    var contributor = i.contributor.trim();

                    var sectionName = i.section;
                    var sectionTarget = "";

                    if (insertAlphaNav) {
                        if (count === 0 || (count > 1 && (sectionName !== jsonSignedEditions[count - 1].section))) {
                            alphaPosition = alphaPosition + 1;
                            var sectionLink = '<a role="menuitem" aria-setsize="" aria-posinset="' + alphaPosition + '" href="#' + sectionName + '" class="authorSectionLink" tabindex="0">' + sectionName + '</a>';
                            sectionTarget = 'id="' + sectionName + '"';
                            $('#bfAuthorNavPrimary li[data-section=' + sectionName + ']').html(sectionLink);
                            $('#bfAuthorNavSecondary li[data-section=' + sectionName + ']').html(sectionLink);
                            //$('#jsonGridItemsNavList').append(sectionLink);
                        }
                    }
                    //console.log(seTitle.length)
                    var characterMaxLength = 50; // maximum number of characters to extract
                    var titleDisplayed = title;
                    if (title.length > characterMaxLength) {
                        var extHellip = '&hellip;';
                        //trim the string to the maximum length
                        var trimmedString = title.substr(0, characterMaxLength);
                        //re-trim if we are in the middle of a word
                        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                        titleDisplayed = trimmedString + extHellip;
                        // $(this).text(trimmedString);
                        // $(this).append(extHellip);
                    }

                    var icItem = "event_result-grid_" + ean + "_image";
                    var imgPath = "//prodimage.images-bn.com/pimages/" + ean + "_p0_v3_s118x184.jpg";
                    var jsonItem = $('<div ' + sectionTarget + ' class="jsonGridItem active sect_' + sectionName + '"><a aria-label="' + title + ' - Signed Edition" href="http://stores.barnesandnoble.com/" onclick="set_cookie(' + icItem + ');"><div class="jsonGridImage"><img src="' + imgPath + '" border="0" alt="" /></div><div class="jsonGridDetails"><p class="jsonGridContributor">' + contributor + '</p><p class="jsonGridTitle">' + titleDisplayed + '</p></div></a></div>');
                    $('#jsonBFSignedEditions').append(jsonItem);
                }

            });


            var signedEditionsRenderer = function (section) {
                var tgtSection = "sect_" + section;
                var theSpeed = 1000;
                if (section === "all") {
                    $('.jsonGridItem').addClass('active').css('z-index', 1).animate({
                        opacity: 1
                    }, {
                        duration: theSpeed,
                        easing: "swing",
                        complete: function () { /*  $(this).after("<p>hidden</p>"); */ }
                    });
                    $('#bfAuthorNavSecondary').fadeIn();
                } else {
                    $('.jsonGridItem').each(function (index) {
                        $(this).removeClass('active').css('z-index', -1).animate({
                            opacity: 0
                        }, {
                            duration: 0,
                            easing: "swing",
                            complete: function () { /*  $(this).after("<p>hidden</p>"); */ }
                        });
                        if ($(this).hasClass(tgtSection)) {
                            $(this).delay(index).addClass('active').css('z-index', 1).animate({
                                opacity: 1
                            }, {
                                duration: theSpeed,
                                easing: "swing",
                                complete: function () { /*  $(this).after("<p>hidden</p>"); */ }
                            });
                        }
                    });
                    $('#bfAuthorNavSecondary').fadeOut();
                }
            };

            if (insertAlphaNav) {
                $('.authorSectionLink').attr("aria-setsize", $('.authorSectionLink').length);
                $('#bfAuthorNavSecondary .authorSectionLink').click(function (e) {
                    e.preventDefault();
                    var section = $(this).parent().attr('data-section');
                    $('#bfAuthorNavPrimary .authorSectionLink').removeClass('active');
                    $('#bfAuthorNavPrimary [data-section=' + section + '] .authorSectionLink').addClass('active');
                    signedEditionsRenderer(section);
                    $('html, body').animate({
                        scrollTop: ($('#bfAuthorNavPrimary').offset().top)
                    }, 500);
                });

                $('#bfAuthorNavPrimary .authorSectionLink').click(function (e) {
                    e.preventDefault();
                    var section = $(this).parent().attr('data-section');
                    if ($('.authorSectionLink.active').parent().attr('data-section') !== section) {
                        $('#bfAuthorNavPrimary .authorSectionLink').removeClass('active');
                        $(this).addClass('active');
                        signedEditionsRenderer(section);
                    }
                });
            }

        }




        // NOOK Device pricing
        if ($('#compare').length || $('.comp-price').length || $('#nook-device-price').length) {
            $.ajax({
                //   url: "http://localhost:3000/HTML/gs/nook/web-services/nook-device.json?format=json",
                url: "//" + window.location.host + "/web-services/nook-devices?format=json",
                type: "GET",
                dataType: "text",
                success: function (xjson) {
                    //data downloaded so we call parseJSON function
                    var json = $.parseJSON(xjson); //now json variable contains data in json format
                    /* possible future data points */
                    // var collectionTitle = json.mainContent[0].title;
                    // var seeAllLink = json.mainContent[0].seeAllLinkUrl;
                    // var seeAllLinkText = json.mainContent[0].seeAllLinkText;
                    $.each(json.mainContent[0].records, function (i) {
                        //console.log(i);
                        if (i < 20) {
                            var ean = this.attributes["common.id"];
                            var pdpListPrice = this.attributes.P_List_Price;
                            pdpListPrice = Math.round(pdpListPrice * 100) / 100;
                            var pdpSalePrice = this.attributes.P_Sale_Price;
                            pdpSalePrice = Math.round(pdpSalePrice * 100) / 100;
                            var pdpPctSave = this.attributes.P_Percentage_Save;
                            /* possible future data points */
                            // var pdpTitle = this.attributes.P_Display_Name;
                            // var imageURL = "http://prodimage.images-bn.com/pimages/"+this.attributes.P_Image_Url;
                            // var pdpURL = "/w/"+this.attributes.P_SEO_Keywords+"/"+this.attributes["sku.workId"]+"?ean="+this.attributes["common.id"];
                            // var imageURL = "http://prodimage.images-bn.com/pimages/"+this.attributes.P_Image_Url;
                            $("[data-bnprice='" + ean + "']").each(function () {
                                if ($(this).parent().hasClass("comp-price")) {
                                    // if comparison page  or show list & bnprice
                                    if (pdpSalePrice < pdpListPrice) {
                                        $(this).html('<s>$' + pdpListPrice + '</s>');
                                        $(this).next().html('$' + pdpSalePrice);
                                    } else {
                                        $(this).html('$' + pdpSalePrice);
                                    }
                                    $(this).attr("data-endeca-price", "true");
                                } else {
                                    $(this).html('$' + pdpSalePrice);
                                }
                            });
                        }
                    });
                }
            });


        } // end NOOK pricing








        // r17 Coupon & Deals page - Render Promo Items fron CQ array on page
        // http://www.barnesandnoble.com/h/coupons-deals
        // Confirm dom wrapper to write to AND array are available! then...
        if ($('#coupn-promo-container').length && (typeof cp_promo_items !== "undefined")) {
            $.each(cp_promo_items, function (i) { // console.log(i); loop through each array line
                //console.log(i);
                var count = i + 1;
                var promoIsCurrent = true;
                if (count < 30) { // isolate this array line's items
                    var promoType = this.promoType.trim();
                    var promoStore = this.promoStore.trim();
                    var promoTitle = this.promoTitle.trim();
                    var promoCopy = this.promoCopy.trim();
                    var promoHref = this.promoURL.trim();
                    var promoExpSrc = this.promoExp.trim();
                    var promoExp = "";
                    if (promoExpSrc.length > 1) {
                        promoExp = "Expires&nbsp;" + promoExpSrc;
                        // lets compare Expiration date with today's date
                        var splitDate = promoExpSrc.split("/");
                        if (splitDate[2].length === 2) {
                            splitDate[2] = 20 + splitDate[2];
                        }
                        var promoExpDate = splitDate[0] + '/' + splitDate[1] + '/' + splitDate[2];
                        var oExpDate = Date.parse(promoExpDate);
                        if (oToday > oExpDate) {
                            promoIsCurrent = false;
                        }
                    }
                    if (promoIsCurrent) { // build internal campaign, check URL formating, and write promo item
                        var ic_title = promoTitle.replace(/ /gi, '-').replace(/([^a-z0-9-]+)/gi, '').toLowerCase();
                        var ic_param = "'couponsdeals_promotion_" + ic_title + "-shop-now_button'";
                        if (promoHref.indexOf('www.') === 0) {
                            promoHref = 'https://' + promoHref;
                        }
                        // var promoLine = $('<div class="coupn-promo clearer">
                        // 	<a href="'+promoHref+'" title="'+promoTitle+'" onclick="set_cookie('+ic_param+');">
                        // 	<div class="coupn-promo-avatar">
                        // 	<span class="table-cell">'+promoType+'</span></div>
                        // 	<div class="coupn-promo-item">
                        // 	<p class="coupn-promo-hdr">'+promoStore+'</p>
                        // 	<p class="coupn-promo-title">'+promoTitle+'</p>
                        // 	<p class="coupn-promo-copy">'+promoCopy+'</p>.
                        // 	<p class="coupn-promo-legalize">'+promoExp+'</p>
                        // 	</div>
                        // 	<div class="coupn-promo-cta"><span class="cq-bttn">Shop Now</span></div></a></div>');
                        var promoLine = $('<div class="coupon col-lg-6"><div class=" pl-s pt-xs pb-m bd-b-geyser coupon-promo"><a href="' + promoHref + '" onclick="set_cookie(' + ic_param + ');"><div class="brow text--uppercase color-coal">' + promoType + ' | ' + promoStore + '</div><div class="promo-item-name"><div class="header3 color-coal">' + promoTitle + '</div><div class="arrow"></div></div><div class="coupon-promo-copy-height text--medium color-coal mt-xxs">' + promoCopy + ' ' + promoExp + '</div><button class="btn btn--medium">Shop Now</button></a></div></div>');
                        $('#coupn-promo-container').append(promoLine);
                    }
                }

            });
        }


        // Coupon & Deals page - control display of Featured Deal of the Day
        // if ($('.coupn-featured-content[data-dotd]')) {
        // 	if ( todaysDate.getDay() === 3 ) { // 3 is Wed
        // 		$('.coupn-featured-content[data-dotd]').each(function(index, element) {
        // 			$(this).removeClass('hideIt');
        // 			$(this).attr('data-dotd', $(this).attr('data-dotd') === 'isVisible' ? 'isHidden' : 'isVisible');
        // 			$('#dodd-expDate').text(todaysDisplayDate);
        // 		});

        // 	}
        // }





        // $(window).scroll(function()
        // {
        //     var s = $('html').scrollTop() || $('body').scrollTop();
        //     console.log(s);
        // });

        // var sn = $(".sticky-nav");
        // if(sn && isMobile === false){
        // 	$("body").addClass('sticky-nav-true');
        //   var snscrolled = "sticky-nav-scrolled";
        //   var snheight = 370; //$('header').height();
        // 	$(window).scroll(function() {
        // 		console.log($(this).scrollTop());
        // 	  if( $(this).scrollTop() > snheight ) {
        // 	    sn.addClass(snscrolled).fadeIn();
        // 	  } else {
        // 	    sn.fadeOut().removeClass(snscrolled);
        // 	  }
        // 	});
        // }



        // Contributor functionality
        // Contributor Landing Page "Alpha" Navigation
        var sectionLinkContainer = $('<div id="sectionLinkContainer"></div>');
        $('.isMobile .author-series-indexes--contributor h2.index-heading, .isMobile .author-series-indexes--contributor .index-grid').hide();
        $('.isMobile .author-series-indexes--contributor h2.index-heading').each(function (i, val) {
            var sectionName = $(this).text();
            //$(this).attr("id", 'header'+sectionName);
            $(this.nextElementSibling).attr("id", 'header' + sectionName);
            //console.log(sectionName);
            var aPos = i + 1;
            var sectionLink = '<a role="menuitem" aria-setsize="" aria-posinset="' + aPos + '" href="#header' + sectionName + '" onClick="contribGridContents(header' + sectionName + ', false)" class="authorSectionLink" tabindex="0">' + sectionName + '</a>';
            sectionLinkContainer.append(sectionLink);
        });

        $('.isMobile section.container.mb-xxxl').prepend(sectionLinkContainer);
        $('.isMobile #headerA').toggle();
        $('.isMobile .authorSectionLink:first-child').toggleClass("active");

        $(".authorSectionLink").click(function () {
            $(".authorSectionLink").removeClass("active");
            $(this).toggleClass("active");
        });




        /* Popular Authors carousel */
        $('.isMobile .author-image-carousel .carousel').slick('unslick');


        //Discover Categories functionality
        /*
        $(".isMobile .genre-index-refinements--discover-categories div.index-grid").hide();
        $(".isMobile .genre-index-refinements--discover-categories h2.index-heading").show();

        $(".isMobile .genre-index-refinements--discover-categories h2.index-heading").click(function () {
            $(this).next(".isMobile .genre-index-refinements--discover-categories div.index-grid").slideToggle();
            $(this).toggleClass("active");
        });
        */

        $(".isMobile .genre-index-refinements--discover-categories h2.index-heading").click(function () {
          var exist = $(this).hasClass("active");
          if (exist) {
            $(this).removeClass("active");
            this.nextElementSibling.style.display = "none";
          } else {
            $(".isMobile .genre-index-refinements--discover-categories div.index-grid").hide();
            $(".isMobile .genre-index-refinements--discover-categories h2.index-heading").removeClass("active");
            $(this).addClass("active");
            this.nextElementSibling.style.display = "block";
          }
            /*$(".isMobile .genre-index-refinements--discover-categories div.index-grid").hide();
            $(".isMobile .genre-index-refinements--discover-categories h2.index-heading").removeClass("active");
            $(this).addClass("active");
            this.nextElementSibling.style.display = "block";*/
        });

        $(".isMobile .genre-index-refinements--discover-categories h2.index-heading").text(function () {
            return $(this).text().replace(/\bDiscover \b/, "");
        });






// id="view-more-discover




    }); // END Document ready

    // $(window).load(function(){

    // });


})();

//Contributor onClick

function contribGridContents(x) {
    event.preventDefault();
    $(".index-grid").hide();
    x.style.display = "block";
}
function discoverContentGrid() {
    $(".index-grid").hide();
    $("h2.index-heading").removeClass("active");
    var exist = $(this).hasClass("active");
    if (exist) {
      $(this).removeClass("active");
      this.nextElementSibling.style.display = "none";
    } else {
      $(this).addClass("active");
      this.nextElementSibling.style.display = "block";
    }
}

/*function discoverContentGrid() {
    $(".index-grid").hide();
    $("h2.index-heading").removeClass("active");
    $(this).addClass("active");
    this.nextElementSibling.style.display = "block";
}
*/
var slickCafe = function () {
    $('.cafe-slick').slick({
        dots: true,
        arrows: false,
        speed: 500,
        cssEase: 'linear',
        adaptiveHeight: true,
        respondTo: 'window',
        infinite: false
    });
};
