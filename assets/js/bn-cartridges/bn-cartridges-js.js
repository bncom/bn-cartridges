(function() {
 
// Utilities...
 
	loadRWDimg = function(dataAttr) {
		$("["+dataAttr+"]").each(function(index, value){
          var isrc = $(this).attr(dataAttr);
	 	  $(this).attr({src:isrc,alt:'',border:0}); 
	 	});
	};
	 

 
 
    $(function() { //document.ready  



/*
		// $(window).resize(function(){

		// });

		// $(window).resize(); 
*/

		// load adaptive images 
		var winWidth = $(window).width();
		if(winWidth > 1279) {
		    loadRWDimg('data-img-src-desktop');
		}else if (winWidth < 600) {
		    loadRWDimg('data-img-src-mobile');
		}else{
		    loadRWDimg('data-img-src-tablet');
		}


	  if ($('.main-body').length) { // ***  Applies to Mobile Only  *** 
	  	// event carousel for mobile 
		var initCarouFredSelect = function (cfg) {
		    // check for carousels
		    var carousels = $(cfg.selector),
		        countCarousels = $(carousels).length,
		        hasAlreadyBeenProcessed = countCarousels > 0 ? $(carousels).first().attr('data-widget-type') === 'carousel' : false,
		        idSet = 1; /* append unique ID to each carousel if required */

		    if (!hasAlreadyBeenProcessed && countCarousels > 0) {

		        $(carousels).each(function() {
		            var self = this,
		                getID = $(this).attr('id'),
		                countChildren = $(this).children('li:not(.add-plus-product)').length,
		                /* making the number of visible items configurable */
		                numVisibleItems = 1.3,//$(this).attr('data-visible-items') || cfg.numDisplay,
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

		            $(this).parent().off('click').on('click', '.prev-item, .featured-prev-item', function() {
		                $(self).trigger('prev');
		            }); 

		            $(this).parent().on('click', '.next-item, .featured-next-item', function() {
		                $(self).trigger('next');
		            });

		            $(this).carouFredSel({
		                align: cfg.alignItems,
		                responsive: cfg.responsive,
		                circular: cfg.circular,
		                //width: cfg.carouselWidth,
		                height: cfg.carouselHeight,
		                items: {visible: cfg.items.visible, width: cfg.itemWidth, height: cfg.itemHeight},
		                prev: cfg.prev,
		                next: cfg.next,
		                pagination: cfg.pagination,
		                auto: cfg.auto,
		                scroll: cfg.scroll,
		                direction: cfg.direction
		            });

		            $(this).swiperight(function() {
		                $(this).trigger('prev');
		            });

		            $(this).swipeleft(function() {
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
	        items: { height: 'auto',
	        width: 'auto',
	          visible: { min: 1.12}
	        },
			prevButtonID : 'carousel-prev',
			nextButtonID : 'carousel-next',
			prev: '.featured-prev-item',
			next: '.featured-next-item',
			paginationButtons : '<div id="carousel-pagination" class="featured-item-pagination"></div>'+
													'<div class="featured-prev-item" style="display:block;" id="carousel-prev"><span style="display:none;">Prev</span></div>'+
													'<div class="featured-next-item" id="carousel-next"><span style="display:none;">Next</span></div>',
			breadcrumbContainer : '<div id="carousel-pagination" class="featured-item-pagination"></div>',
			pagination : {
					container : '#carousel-pagination',
					anchorBuilder : function(nr) {
							return ' <span data-icon="carousel-pager-off">'+nr+'</span>';
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


 		// ***  End Mobile Only  ***
	  } else { 
	  	// ***  desktop Only  *** 

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
			if(amountOfEvents < 4) {
			   $('.ec-backward, .ec-forward').remove();
			}
 
			if($('#ec-carouselEvents').length){ 		
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
			if($('div[id^=info-spot]').length){ 	}
				$('div[id^=info-spot]').hide();
				$(infoCard).show();
		

			// show the event info based on the item in the eventCarousel
			$('.card a').click(function () {
			  var tab_id = "#info-"+$(this).attr('id'); 
			  $('div[id^=info-spot]').hide();
			  $(tab_id).show();
			  $('.card a').removeClass('current');
			  $(this).addClass('current');
			  return false;
			});

          // adjust Event Info pod height to match tallest
			if($('.event-info-pod').length){ 		 
			   var maxHeight = -1;
			   $('.event-info-pod').each(function() {
			      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();  
			   });
			   $('.event-info-pod').each(function() {
			     $(this).height(maxHeight);
			   }); 
			}

			if($('.lt-ie9').length){
			// Alt Image load for IE8 that doesn't support document.getElementsByClassName();  
				loadRWDimg('data-img-src-lt-ie9');
			} 	


 

	  } // ***  End desktop Only  ***













		// Textbooks Search funtionality  
		if ($('form#cqTextBookSearch').length) {
			var txtSearch = $('form#cqTextBookSearch');	
				txtSearch.submit(function(){txtBookQuickSearch();});		
				txtBookQuickSearch = function () {		 
					var submitval = ($.trim($('#searchTextBookBar').val()).replace(/[\W]/g,"+"));	//encodeURIComponent	
					var actionval = location.protocol + "//www.barnesandnoble.com/s/"+submitval+"/_/N-8q9";		 	
				 	txtSearch.attr('action', actionval);		
				 	txtSearch.attr('method', 'get');				 
		        };	 

		    $(".cqTextBookSearch-isbn-sample"); 
		    $(".cqTextBookSearch-isbn-link").on( "click", function(e) { 
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
				if( el.hasClass('active') )
				{
					el.removeClass('active');
					$("#searchTextBookBar").focus();
				}
				else
				{ 
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



 



 
    });// END Document ready  




    
	// $(window).load(function(){  




	// }); 




})();