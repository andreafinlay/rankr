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
      console.log(data)
        if(data.length>0){
          //$('body').append(JSON.stringify(data));
          var bordaResult = zeroIndexBorda(data);
          bordaResult.forEach((option, i)=>{
           $('#restultsContainer').append('<p>'+option[0]+'</p>')
           $('#restultsContainer').append('<div style="background-color: '+(colors[i] ||'black')+'; width:'+option[1]+'%; height:30px"></div>')
          })

        }else {
          $('#restultsContainer').append('<p>no votes collected yet</p>');
        }
    }).fail(()=>{
      alert("fail")
    })
}
getResults();
});


  // <body>
  //   <header>
  //     <% include partials/_header %>
  //   </header>


  //   <h1 id='question' data-id=<%=poll_id%> data-key=<%=key%> >Results for <%=quesiton%></h1>
  //   <% Object.keys(results).forEach(option =>{ %>
  //     <p><%=option%></p>
  //     <div style="background-color: black; width:<%=results[option]%>%; height:10px"></div>
  //   <%});%>


  //   <button id='borda'>borda</button>


  // </body>
