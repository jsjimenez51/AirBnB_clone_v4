$('document').ready(function() {
  let selectedAmens = [];

  $('.amenities input').change(function() {
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
});
