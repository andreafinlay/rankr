 $(() => {
   let pollContainer = document.querySelector('.tableBody');
   let pollOption = document.querySelector('.pollOption')

   let pollOptionList = Sortable.create(pollContainer, {
     filter: ".js-remove",
     onFilter: function (evt) {
      let el = pollOptionList.closest(evt.item);
      el && el.remove(pollOption);
           }
         })

       function createNewPollOption() {
           let $newOption   = $("<div>").addClass("pollOption");
           let $newOptionRow = $("<tr>").addClass("optionRow");

           let $optionColumn = $("<td>").addClass("optionColumn");
           let $deleteColumn = $("<td>").addClass("deleteColumn");

           let $newOptionContent = $("#addNewText").val();
           let $deleteButton = $("<button>").text("Delete").addClass("btn btn-primary js-remove");

           $optionColumn.append($newOptionContent);
           $deleteColumn.append($deleteButton);

           $newOptionRow.append($optionColumn);
           $newOptionRow.append($deleteColumn);

           $newOptionRow.append($newOption);

           return $newOptionRow;
       }

       $(".add").on("click", function(e) {
         $(".tableBody").append(createNewPollOption());
         $("#addNewText").val("");
  })

$('#createNewPoll').on('click', function() {

    var pollPost = {};

    $('.optionColumn').each((index, el) => {
      var question = $(el).text();
      console.log('question;?', question);

      pollPost['options'] ?
        pollPost['options'].push({[index]: question})
        :pollPost['options'] = [{[index]: question}];

      //SQL INJECTION ISSUE ? FIX  HOW ?
      pollPost['email'] = $('#email').val();
      pollPost['question_string'] = $('#inputDefault').val();
  });


    console.log(pollPost)

    $.ajax({
      url: "/polls",
      method: "post",
      data: pollPost,
      success: function(hell) {
        console.log('success')
      }
    });
});

});

//  id | creator_id | open | question_string |      key
// ----+------------+------+-----------------+---------------
//   1 |          1 | t    | what on food??  | secretkey1234

//{email: '', question_string: '???', options: ['asdf','asdf']
