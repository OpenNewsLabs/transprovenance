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
