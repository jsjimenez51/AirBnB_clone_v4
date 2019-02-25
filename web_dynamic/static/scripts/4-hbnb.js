let selectedAmens = [];
let selectedAmensId = [];

$('document').ready(function () {
  // functionality for Amenity Selection Popover
  $('.amenities input').change(function () {
    if ($(this).is(':checked')) {
      selectedAmens.push($(this).attr('data-name'));
      selectedAmensId.push($(this).attr('data-id'));
    } else {
      let rmAmen = $(this).attr('data-name');
      let amenIdx = selectedAmens.indexOf(rmAmen);
      if (amenIdx > -1) {
        selectedAmens.splice(amenIdx, 1);
        selectedAmensId.splice(amenIdx, 1);
      }
    }
    console.log(selectedAmens);
    console.log(selectedAmensId);
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

  // functionality to load places from the front-end
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: apiData
  });

  // funtionality for the Search Button
  $('button').click(function () {
    $('article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: selectedAmensId }),
      success: (data) => {
        console.log(`Searching for: { "amenities": [${selectedAmensId}] }`);
        apiData(data);
        console.log("Data", data.length);
      }
    });
  });

  // format for appended Place data
  function apiData (response) {
    for (let place of response) {
      $('.places').append(
        `<article>
          <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">
              ${place.price_by_night}
            </div>
          </div>
          <div class="information">
            <div class="max_guest">
              <i class="fa fa-users fa-3x" aria-hidden="true"></i>
              <br />
              ${place.number_rooms} Bedrooms
            </div>
            <div class="number_rooms">
              <i class="fa fa-users fa-3x" aria-hidden="true"></i>
              <br />
              ${place.number_bathrooms} Bathroom
            </div>
          </div>
          </div class="user">
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`);
    }
  }
});
