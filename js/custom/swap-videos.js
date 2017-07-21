var annotations = [
  {
    "source": "media/demo-full.mp4",
    "transcriptSource": "data/full-transcript.json",
    "start": 35,
    "end": 62,
    "originalStart": 883
  },
  {
    "source": "media/demo-full.mp4",
    "transcriptSource": "data/full-transcript.json",
    "start": 77,
    "end": 122,
    "originalStart": 1234
  }
];


$(document).ready( function() {
  /*
  $('.timelineContainer').click(function() {
    var currentTime = $('#video')[0].currentTime,
      displayVid1 = (currentTime < 35) || (currentTime > 62 && currentTime < 77) || (currentTime > 122),
      displayVid2 = (currentTime > 35 && currentTime < 62) || (currentTime > 77 && currentTime < 122);

    if (displayVid1) {
      alert('Video #1');
    } else if (displayVid2) {
      alert('Video #2');
    }
  });
  */
});


function renderAnnotations(annotationItems, axis) {

  $('.timelineContainer .timelineItem').remove();

  for (var i=0; i<annotationItems.length; i++) {

    var thisItem = annotationItems[i];

    var leftPercent = convertToPercentage(thisItem.start, $('#video')[0].duration),
        widthPercent = convertToPercentage(thisItem.end - thisItem.start, $('#video')[0].duration);

    var timelineItem = $('<div class="timelineItem" data-source="'+ thisItem.source +'" data-transcript-source="'+ thisItem.transcriptSource +'" data-start="'+ thisItem.start +'" data-end="'+ thisItem.end +'" data-original-start="'+ thisItem.originalStart +'" ></div>');

    if (axis == 'x') {
      timelineItem.css({
        left: leftPercent + '%',
        width: widthPercent + '%'
      });
    } else {
      timelineItem.css({
        bottom: leftPercent + '%',
        height: widthPercent + '%'
      });
    }


    timelineItem.click(function(evt) {
      showOriginalSource( $(this).attr('data-source') );
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });

    $('.timelineContainer').append(timelineItem);
  }
}
