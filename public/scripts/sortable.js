$(() => {
  const pollContainer = document.querySelector('.tableBody');
  const pollOption = document.querySelector('.pollOption')

  const pollOptionList = Sortable.create(pollContainer, {
    filter: ".js-remove",
    onFilter: function (evt) {
      let el = pollOptionList.closest(evt.item);
      el && el.remove(pollOption);
    }
  })

  function createNewPollOption() {
    const $newOption        = $("<div>").addClass("pollOption");
    const $newOptionRow     = $("<tr>").addClass("optionRow");
    const $optionColumn     = $("<td>").addClass("optionColumn");
    const $deleteColumn     = $("<td>").addClass("deleteColumn");
    const $newOptionContent = $("#addNewText").val();
    const $deleteButton     = $("<button>").text("Delete").addClass("btn btn-primary js-remove");

    $optionColumn.append($newOptionContent);
    $deleteColumn.append($deleteButton);
    $newOptionRow.append($optionColumn);
    $newOptionRow.append($deleteColumn);
    $newOptionRow.append($newOption);

    return $newOptionRow;
  }

  function createPollCreatedMessage(data) {
    const $pollCreatedMessage = $("<div>").addClass("alert alert-info pollCreated");
    const questionString      = data.question_string;
    const secretKey           = data.secretkey;
    const pollID              = data.poll_id;
    const $successMessage     = $("<strong>").text("Thanks for creating your poll: " + questionString + "!");
    const $secretKeyMessage   = $("<div>").addClass("secretKey").text("Your secret key: " + secretKey);
    const $adminLink          = $("<p>").addClass("adminLink").text("Add the secret key to the poll url to see the results of your poll: http://localhost:8080/polls/" + pollID + "/" + secretKey);

    $pollCreatedMessage.append($successMessage);
    $pollCreatedMessage.append($secretKeyMessage);
    $pollCreatedMessage.append($adminLink);

    return $pollCreatedMessage;
  }

  $(".add").on("click", function(e) {
    $(".tableBody").append(createNewPollOption());
    $("#addNewText").val("");
  })

  $('#createNewPoll').on('click', function() {
    const pollData = {};

    $('.optionColumn').each((index, el) => {
      const option = $(el).text();

      pollData['options'] ?
        pollData['options'].push({[index]: option})
        :pollData['options'] = [{[index]: option}];

      //SQL INJECTION ISSUE ? FIX  HOW ?
      pollData['email'] = $('#email').val();
      pollData['question_string'] = $('#pollQuestion').val();
    });

    $.ajax({
      url: "/polls",
      method: "post",
      data: pollData,
      success: function(templateVars) {
        $('#pollEverything ').empty();
        $('#pollEverything').append(createPollCreatedMessage(templateVars));
      }
    });
  });
});
