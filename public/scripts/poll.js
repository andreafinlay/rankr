$(() => {
  function createPollVotedMessage(data) {
   const $pollVotedMessage = $("<div>").addClass("alert alert-info");
   const pollQuestion      = data.pollQuestion;
   const url               = "http://localhost:8080/";
   const $linkDiv          = $("<div>");
   const $link             = $("<a>").attr("href", url).text("Click here make a new poll!");
   const $text             = $("<div>").text("Success! ✔️ You have just completed the poll: " + pollQuestion);

   $linkDiv.append($link);
   $pollVotedMessage.append($text);
   $pollVotedMessage.append($linkDiv);

     return $pollVotedMessage;
   }

  $('#submit-vote').on('click', function() {
    const voteData = {};
    const pollid = $('#question').data('pollid');

    $('.pollOption').each((index, el) => {
      const option = $(el).data('optionid');

      voteData['options'] ?
        voteData['options'].push({option, index})
        :voteData['options'] = [{option, index}];
    });

    $.ajax({
      url: "/polls/" + pollid,
      method: "post",
      datatype: "json",
      data: voteData,
      success: function(data) {
        $('#votePollEverything').empty();
        $('#votePollEverything').append(createPollVotedMessage(data));
      }
    });
  });
});
