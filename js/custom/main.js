var videoDuration = 60,
	updaterInterval,
	isPlaying;

$(document).ready( function() {

	$('.timelineContainer').slider({
		value: 0,
		step: 0.01,
		orientation: "horizontal",
		range: "min",
		max: videoDuration,
		animate: false,
		create: function(evt, ui) {
			// on create
		},
		slide: function(evt, ui) {
			setCurrentTime(ui.value);
		},
		stop: function(evt, ui) {
			//setCurrentTime(ui.value);
		}
	});

	$('#video').on('loadedmetadata', function() {
		initVideo();
		$('.videoDuration').text( formatTime($('#video')[0].duration) );
	});

	$('.playButton').click(playVideo);
	$('.pauseButton').click(pauseVideo);

	$('.globalControl#videoControl').click(function() {
		$('.globalControl').removeClass('active');
		$(this).addClass('active');
		$('body').attr('data-view', 'video');
	});

	$('.globalControl#transcriptControl').click(function() {
		$('.globalControl').removeClass('active');
		$(this).addClass('active');
		$('body').attr('data-view', 'transcript');
	});

	hyperaudiolite.init('transcript', 'video');
});


function initVideo() {
	$('#video').on('timeupdate', function() {
		updater();
	});
}

function setCurrentTime(seconds) {
	var secondsAsFloat = parseFloat(seconds);

	if ( isNaN(secondsAsFloat) ) {
		return;
	}

	$('#video')[0].currentTime = seconds;

	updater();

}

function playVideo() {
	if (isPlaying) { return; }
	isPlaying = true;
	$('#video')[0].play();
}

function pauseVideo() {
	isPlaying = false;
	$('#video')[0].pause();
	updater();
}

function updater() {
	var currentTime = $('#video')[0].currentTime;
	$('.timelineContainer').slider('value', currentTime);
	$('.currentTime').text( formatTime(currentTime) );
	updateMediaActiveStates(currentTime);
}

function updateMediaActiveStates(time) {

	console.log("update active states");
	updateScrolling();

	/*
	var mediaElement;

	for (var i=0; i<mediaElements.length; i++) {

		mediaElement = mediaElements[i];

		if ( mediaElement.start <= time && mediaElement.end >= time ) {

			if (!mediaElement.active) {
				mediaElement.active = true;
				mediaElement.element.show();
			}

			if (mediaElement.type == 'Video' || mediaElement.type == 'Audio') {

				if (mediaElement.element[0].currentTime > mediaElement.element[0].duration - mediaElement.endOffset) {
					mediaElement.element[0].pause();
				}

			}

		} else {

			if (mediaElement.active) {
				mediaElement.active = false;
				mediaElement.element.hide();
			}

		}

	}
	*/

}

function formatTime(aNumber) {

	var hours, minutes, seconds, hourValue;

	seconds 	= Math.ceil(aNumber);
	hours 		= Math.floor(seconds / (60 * 60));
	hours 		= (hours >= 10) ? hours : '0' + hours;
	minutes 	= Math.floor(seconds % (60*60) / 60);
	minutes 	= (minutes >= 10) ? minutes : '0' + minutes;
	seconds 	= Math.floor(seconds % (60*60) % 60);
	seconds 	= (seconds >= 10) ? seconds : '0' + seconds;

	if (hours >= 1) {
		hourValue = hours + ':';
	} else {
		hourValue = '';
	}

	return hourValue + minutes + ':' + seconds;

}

function convertToPercentage(pixelValue, maxValue) {
	var percentage = (pixelValue / maxValue) * 100;
	return percentage;
}

function updateScrolling() {
    var percentPlayed = $('#video')[0].currentTime / $('#video')[0].duration * 100;

    var containerHeight = $('.transcriptContainer').height();
    var containerScrollHeight = $('.transcriptContainer')[0].scrollHeight;
    var percentScrolled = (containerScrollHeight-containerHeight) / 100 * percentPlayed;
    var currentScrollTop = $('.transcriptContainer').scrollTop();
    $('.transcriptContainer').stop().animate({scrollTop:percentScrolled}, 500);
}
