$(document).ready(function() {
  $('form').on('submit', function() {
    var item = $('form input');
    var todo = { item: item.val().trim() };
    $('ul').LoadingOverlay('show');

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data) {
        console.log('sucess');
        $('ul').LoadingOverlay('hide');
        location.reload();
      },
    });
  });

  $('li').on('click', function() {
    $('ul').LoadingOverlay('show');

    var item = $(this)
      .text()
      .trim()
      .replace(/ /g, '-');
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function(data) {
        console.log('item', item);
        $('ul').LoadingOverlay('hide');

        location.reload();
      },
    });
  });
});
