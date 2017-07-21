var updaterInterval,
	isPlaying;

// I know this is terrible, but need the var here as well... TODO: abstract it
var annotations = [
  {
    "source": "media/demo-full.mp4",
    "start": 35,
    "end": 62,
    "originalStart": 883
  },
  {
    "source": "media/demo-full.mp4",
    "start": 77,
    "end": 122
  }
];

$(document).ready( function() {

	$('#video').on('loadedmetadata', function() {
		$('.timelineContainer').slider({
			value: 0,
			step: 0.01,
			orientation: "horizontal",
			range: "min",
			max: $('#video')[0].duration,
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
		initVideo();
		$('.videoDuration').text( formatTime($('#video')[0].duration) );
	});

	$('.playButton').click(function() {
		if (isPlaying) {
			pauseVideo();
		} else {
			playVideo();
		}
	});

	$('.globalControl#videoControl').click(function() {
		$('.globalControl').removeClass('active');
		$(this).addClass('active');
		$('body').attr('data-view', 'video');
		$('.timelineContainer').slider('option', 'orientation', 'horizontal');
		renderAnnotations(annotations, 'x');
		updater();
	});

	$('.globalControl#transcriptControl').click(function() {
		$('.globalControl').removeClass('active');
		$(this).addClass('active');
		$('body').attr('data-view', 'transcript');
		$('.timelineContainer').slider('option', 'orientation', 'vertical');
		renderAnnotations(annotations, 'y');
		updater();
	});

	$('.fullContainer').click(hideOriginalSource);

	loadTranscriptText("./data/recap-transcript.json", 'transcript', 'video');
	loadTranscriptText('./data/full-transcript.json', 'transcript__original', 'original1')

	//hyperaudiolite.init('transcript', 'video');

});


function initVideo() {
	$('#video').on('timeupdate', function() {
		updater();
	});

	renderAnnotations(annotations, 'x');
}

function setCurrentTime(seconds) {
	var secondsAsFloat = parseFloat(seconds);

	if ( isNaN(secondsAsFloat) ) {
		return;
	}

	$('#video')[0].currentTime = seconds;

	//updater();

}

function playVideo() {
	if (isPlaying) { return; }
	isPlaying = true;
	$('#video')[0].play();
	$('.playButton').removeClass('playing');
}

function pauseVideo() {
	isPlaying = false;
	$('#video')[0].pause();
	$('.playButton').addClass('playing');
	updater();
}

function updater() {
	var currentTime = $('#video')[0].currentTime;
	$('.timelineContainer').slider('value', currentTime);
	$('.currentTime').text( formatTime(currentTime) );
	updateMediaActiveStates(currentTime);
}

function updateMediaActiveStates(time) {

	//console.log("update active states");
	
	updateScrolling();


	var timelineItems = $('.timelineItem');

	timelineItems.each(function() {
		var currentItem = $(this),
			startTime = parseInt( currentItem.attr('data-start') ),
			endTime = parseInt( currentItem.attr('data-end') );

		if ( startTime <= time && endTime >= time ) {
			
			if (!currentItem.hasClass('active')) {
				currentItem.addClass('active');
				//loadTranscriptText(currentItem.attr('data-transcript-source'), 'transcript__original', 'original1')
			}

		} else {

			if (currentItem.hasClass('active')) {
				currentItem.removeClass('active');
			}

		}
	});

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

function loadTranscriptText(source, target, video) {
	$.getJSON( source, function( data ) {
		var items = [];
		$.each( data.words, function( key, val ) {
			if (val.word) {
				$('#'+target+' p').append('<span data-m="' + (val.start * 1000) + '">' + val.word + ' </span>');
			}
		});

		hyperaudiolite.init(target, video);
	});
}

function updateScrolling() {
    var percentPlayed = $('#video')[0].currentTime / $('#video')[0].duration * 100;

    var containerHeight = $('.transcriptContainer').height();
    var containerScrollHeight = $('.transcriptContainer')[0].scrollHeight;
    var percentScrolled = (containerScrollHeight-containerHeight) / 100 * percentPlayed;
    var currentScrollTop = $('.transcriptContainer').scrollTop();
    $('.transcriptContainer').stop().animate({scrollTop:percentScrolled}, 500);
}

function showOriginalSource(source) {
	var recapVideoEl = document.getElementById('video'),
		sourceVideoEl = document.getElementById('original1'),
		currentTime = $('#video')[0].currentTime;

	$('body').attr('data-original', 'yes');
	recapVideoEl.pause();
	sourceVideoEl.play();
	sourceVideoEl.currentTime = annotations[0].originalStart + (currentTime - annotations[0].start);
	console.log(source);
}

function hideOriginalSource() {
	console.log('hide');

	$('body').attr('data-original', 'no');
}
