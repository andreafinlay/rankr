$(() => {

var colors = ['#deeaee','#b1cbbb','#eea29a','#c94c4c'];

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
  return Object.keys(results).reduce((prev, cur) => {
   prev[cur] = ((results[cur]))*100;
   return prev;
 }, {});
}


    var id = $('#question').data('id');
    var key = $('#question').data('key')

    $.ajax({
    method: "GET",
    url: key +"/data"
  }).done((data) => {
    console.log(data)
      if(data.length>0){
        //$('body').append(JSON.stringify(data));
        var bordaResult = zeroIndexBorda(data);
        Object.keys(bordaResult).forEach((option, i)=>{
         $('body').append('<p>'+option+'</p>')
         $('body').append('<div style="background-color: '+(colors[i] ||'black')+'; width:'+bordaResult[option]+'%; height:30px"></div>')
        })

      }else {
        $('body').append('<p>no votes collected yet</p>');
      }
  }).fail(()=>{
    alert("fail")
  })


  $('#borda').on('click', e =>{


  })
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
