/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */

Site.on_load = function() {
	testimonial = new PageControl('div.testimonial_group', 'article')
	testimonial.attachControls($('div.testimonial_group div.controls a'))
	.setInterval(5000)
	.setWrapAround(true)
	.setPauseOnHover(true);

	if(!Site.is_mobile()){
	$('div.video a.youtube').click(function(event) {
	        event.preventDefault();
	        var link = $(this);
	        var base = $('base').attr('href');
	        var data = {
	                        'section': 'video',
	                        'id': link.data('id')
	                };

	        $.ajax({
	                url: base,
	                data: data,
	                dataType: 'html',
	                headers: {
	                        'X-Requested-With': 'Script'
	                },
	                success: function(data) {
	                        link.parent().html(data);
	                }
	        });
		});
	}
	
	// handle analytics event
	$('form').on('analytics-event', function(event, data) {
		if (!data.error)
			dataLayer.push({
            	'event':'leadSent'
            });
	});

}

// connect document `load` event with handler function
$(Site.on_load);
