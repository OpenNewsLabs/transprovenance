var annotations = [
  {
    "source": "media/demo-recap.mp4",
    "start": 0,
    "end": 35
  },
  {
    "source": "media/demo-full.mp4",
    "start": 35,
    "end": 62
  },
  {
    "source": "media/demo-recap.mp4",
    "start": 62,
    "end": 77
  },
  {
    "source": "media/demo-full.mp4",
    "start": 77,
    "end": 122
  },
  {
    "source": "media/demo-recap.mp4",
    "start": 122,
    "end": 132
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

    var timelineItem = $('<div class="timelineItem" data-source="'+ thisItem.source +'" data-start="'+ thisItem.start +'" data-end="'+ thisItem.end +'" ></div>');

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
      alert( $(this).attr('data-source') );
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });

    $('.timelineContainer').append(timelineItem);
  }
}
