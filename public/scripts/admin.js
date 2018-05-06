$(() => {
  $('#borda').on('click', e =>{

    var id = $('#question').data('id');
    console.log(id)

  $.ajax({
    method: "GET",
    url: ""+"/"+id
  }).done((users) => {

      $("<div>").text("hi").appendTo($("body"));

  });

  })
});
