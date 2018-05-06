 $(() => {

console.log("hello")


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
console.log('asdfadsfasdf',voteData);
//not geting right suff !!
    $.ajax({
      url: "/polls/" + pollid,
      method: "post",
      datatype: 'json',
      data: voteData,
      success: function(templateVars) {
        $('#pollEverything ').empty();
        $('#pollEverything').append(createPollCreatedMessage(templateVars));
      }
    });
  });


});
