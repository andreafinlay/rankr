$(() => {

  var colors = ['#deeaee', ,'#eea29a','#c94c4c','#6b5b95','#feb236','#d64161','#ff7b25'];

  function zeroIndexBorda(votes){
    const options = {};
    const num_of_votes = votes.length;
    const results = {};
    votes.forEach(vote =>{
      options[vote.option_id] = 1;
    })
    const numOfQuestions = Object.keys(options).length;
    votes.forEach(vote => {
      results[vote.option_name] ?
      results[vote.option_name] += Math.abs(Number(numOfQuestions - vote.rank))/num_of_votes
      :results[vote.option_name] = Math.abs(Number(numOfQuestions - vote.rank))/num_of_votes
    });
    return Object.keys(results).map((key) => {
      return [key, Math.floor(results[key]*100)]
    }).sort((a,b)=>{
      return a[1] < b[1] ? 1 : -1
    })
  }


  var id = $('#question').data('id');
  var key = $('#question').data('key')

  function getResults(){
    $.ajax({
      method: "GET",
      url: key +"/data",
      complete: function (data) {
        // Schedule the next
        setTimeout(getResults, 3000);
      }
    }).done((data) => {
      $('#restultsContainer').empty();
      if (data.length > 0) {
        const $resultsTextBox = $("<div>")
        const $resultsText    = $("<h2>").text(data[0].question_string);
        const $fontTag        = $("<font>").attr({
          "face": "Lato",
          "color": "#B26252"
        })
        $resultsTextBox.append($fontTag);
        $fontTag.append($resultsText);
        $('#restultsContainer').append($resultsTextBox);
        var bordaResult = zeroIndexBorda(data);
        bordaResult.forEach((option, i)=>{
          const $resultBarDiv = $("<div>").addClass("resultBar");
          $resultBarDiv.append('<h4>'+option[0]+'</h4>')
          $resultBarDiv.append('<div style="background-color: '+(colors[i] ||'black')+'; width:'+option[1]+'%; height:30px"></div>')
          $('#restultsContainer').append($resultBarDiv);
        })
      } else {
        const $noVotesAlert     = $("<div>").addClass("alert alert-info pollCreated");
        const $noVotesAlertText = $("<p>No votes have been collected on this poll yet! Check back soon.</p>");
        $noVotesAlert.append($noVotesAlertText);
        $('#restultsContainer').append($noVotesAlert);
      }
    }).fail(()=>{
      alert("fail")
    })
  }
  getResults();
});
