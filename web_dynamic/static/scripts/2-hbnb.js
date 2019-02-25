$('document').ready(function () {
  // functionality for Amenity Selection Popover
  let selectedAmens = [];
  $('.amenities input').change(function () {
    if ($(this).is(':checked')) {
      selectedAmens.push($(this).attr('data-name'));
    } else {
      let rmAmen = $(this).attr('data-name');
      let amenIdx = selectedAmens.indexOf(rmAmen);
      if (amenIdx > -1) {
        selectedAmens.splice(amenIdx, 1);
      }
    }
    selectedAmens.sort();
    $('.amenities h4').text(selectedAmens.join(', '));
  });

  // funtionality for API Status Indicator
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
