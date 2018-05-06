 $(() => {

   function createPollVotedMessage(data) {
     const pollQuestion = data.pollQuestion;
     const test = $("<div>").text(pollQuestion);
     return test;
     // const $pollCreatedMessage = $("<div>").addClass("alert alert-info pollCreated");
     // const questionString      = data.question_string;
     // const secretKey           = data.secretkey;
     // const pollID              = data.poll_id;
     // const pollLink            = "http://localhost:8080/polls/" + pollID;
     // const pollLinkText        = "Visit or share this link to vote in your poll: ";
     // const pollLinkURL         = $("<a>").attr("href", pollLink).text(pollLink);
     // const adminLink           = "http://localhost:8080/polls/" + pollID + "/" + secretKey;
     // const adminText           = "Add the secret key to the poll url to see the results of your poll: ";
     // const adminURL            = $("<a>").attr("href", adminLink).text(adminLink);
     // const $successMessage     = $("<strong>").text("Thanks for creating your poll: " + questionString + "!");
     // const $secretKeyMessage   = $("<div>").addClass("secretKey").text("Your secret key: " + secretKey);
     // const $pollLinkMessage    = $("<div>").addClass("pollLink").text(pollLinkText);
     // const $adminLinkMessage   = $("<div>").addClass("adminLink").text(adminText);
     //
     // $pollLinkMessage.append(pollLinkURL);
     // $adminLinkMessage.append(adminURL);
     //
     // $pollCreatedMessage.append($successMessage);
     // $pollCreatedMessage.append($pollLinkMessage);
     // $pollCreatedMessage.append($secretKeyMessage);
     // $pollCreatedMessage.append($adminLinkMessage);
     //
     // return $pollCreatedMessage;
   }

  $('#submit-vote').on('click', function() {




    const voteData = {};

    const pollid = $('#question').data('pollid');

    console.log(pollid);



    $('.pollOption').each((index, el) => {

      const option = $(el).data('optionid');

      voteData['options'] ?
        voteData['options'].push({option, index})
        :voteData['options'] = [{option, index}];
      //SQL INJECTION ISSUE ? FIX  HOW ?
    });

    //not geting right suff !!
    $.ajax({
      url: "/polls/" + pollid,
      method: "post",
      datatype: "json",
      data: voteData,
      success: function(data) {
        console.log("success");
        $('#votePollEverything').empty();
        $('#votePollEverything').append(createPollVotedMessage(data));
      }
    });

  });
});
