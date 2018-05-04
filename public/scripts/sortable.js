 $(() => {
   let pollContainer = document.querySelector('#pollContainer');
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
           let newOptionContent = $("#addNewText").val();
           let deleteButton = $("<button>").text("Delete").addClass("btn btn-primary js-remove");
           $newOption.append(deleteButton);
           $newOption.append(newOptionContent);
           return $newOption;
       }

       $(".add").on("click", function(e){
         $("#pollContainer").append(createNewPollOption());
         $("#addNewText").val("");
  })

$('createNewPollOption').on('click', function() {

    let pollPost = {};

    $.each('pollOption', (el, i) => {
      pollPost[options] ? post[options].push({i: el}) : post[options] = [{i: el}];
      pollPost[email] = $('#email_input').val();
      pollPost[question_string] = $('#question_string');
  });



});

//  id | creator_id | open | question_string |      key
// ----+------------+------+-----------------+---------------
//   1 |          1 | t    | what on food??  | secretkey1234

//{email: '', question_string: '???', options: ['asdf','asdf']
