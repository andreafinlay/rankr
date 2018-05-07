 $(() => {

   function createPollVotedMessage(data) {
     const $pollVotedMessage = $("<div>").addClass("alert alert-info");
     const pollQuestion      = data.pollQuestion;
     const url               = "http://localhost:8080/";
     const $link             = $("<a>").attr("href", url).text("Click here make a new poll!");
     const $text             = $("<div>").text("Success! ✔️ You have just completed the poll: " + pollQuestion)
     const $text2            = $("<div>")

     $text2.append($link);

     $pollVotedMessage.append($text);
     $pollVotedMessage.append($text2);

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
      //SQL INJECTION ISSUE ? FIX  HOW ?
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
