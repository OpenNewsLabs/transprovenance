var annotations = [
  {
    "source": "1.mp4",
    "start": 0,
    "end": 4
  },
  {
    "source": "2.mp4",
    "start": 12.0,
    "end": 16
  },
  {
    "source": "3.mp4",
    "start": 20.0,
    "end": 30
  }
];


$(document).ready( function() {
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
});


function renderAnnotations(annotationItems) {
  
  for (var i=0; i<annotationItems.length; i++) {

    var thisItem = annotationItems[i];
    
    var leftPercent = convertToPercentage(thisItem.start, $('#video')[0].duration),
        widthPercent = convertToPercentage(thisItem.end - thisItem.start, $('#video')[0].duration);

    var timelineItem = $('<div class="timelineItem" data-source="'+ thisItem.source +'"></div>');

    timelineItem.css({
      left: leftPercent + '%',
      width: widthPercent + '%'
    });

    timelineItem.click(function(evt) {
      alert( $(this).attr('data-source') );
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });

    $('.timelineContainer').append(timelineItem);
  }
}