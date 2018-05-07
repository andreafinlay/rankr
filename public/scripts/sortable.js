$(() => {
  const pollContainer  = document.querySelector('.tableBody');
  const pollOption     = document.querySelector('.pollOption')

  const pollOptionList = Sortable.create(pollContainer, {
    filter: ".js-remove",
    animation: 150,
    onFilter: function (evt) {
      const el = pollOptionList.closest(evt.item);
      el && el.remove(pollOption);
    }
  })

  function createNewPollOption() {
    const $newOption        = $("<div>").addClass("pollOption");
    const $newOptionRow     = $("<tr>").addClass("optionRow");
    const $optionColumn     = $("<td>").addClass("optionColumn");
    const $deleteColumn     = $("<td>").addClass("deleteColumn");
    const $handle           = $("<i>").addClass("handle fas fa-bars");
    const $newOptionContent = " " + $("#addNewText").val();
    const $newOptionSpan    = $("<span>").addClass("newOption");
    const $deleteButton     = $("<button>").text("Delete").addClass("btn btn-danger js-remove");

    $optionColumn.append($handle);
    $newOptionSpan.append($newOptionContent);
    $optionColumn.append($newOptionSpan);
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
    const pollLink            = "http://localhost:8080/polls/" + pollID;
    const pollLinkText        = "Visit or share this link to vote in your poll: ";
    const pollLinkURL         = $("<a>").attr("href", pollLink).text(pollLink);
    const adminLink           = "http://localhost:8080/polls/" + pollID + "/" + secretKey;
    const adminText           = "Add your secret key your new poll's URL to see the results of your poll: ";
    const adminURL            = $("<a>").attr("href", adminLink).text(adminLink);
    const $successMessage     = $("<strong>").text("Success! 📊 Thanks for creating your poll: " + questionString);
    const $secretKeyMessage   = $("<div>").addClass("secretKey").text("Your secret key: " + secretKey);
    const $pollLinkMessage    = $("<div>").addClass("pollLink").text(pollLinkText);
    const $adminLinkMessage   = $("<div>").addClass("adminLink").text(adminText);

    $pollLinkMessage.append(pollLinkURL);
    $adminLinkMessage.append(adminURL);

    $pollCreatedMessage.append($successMessage);
    $pollCreatedMessage.append($pollLinkMessage);
    $pollCreatedMessage.append($secretKeyMessage);
    $pollCreatedMessage.append($adminLinkMessage);

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
        $('#createPollEverything').empty();
        $('#createPollEverything').append(createPollCreatedMessage(templateVars));
      }
    });
  });
});
