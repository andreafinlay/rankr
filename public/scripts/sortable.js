 $(() => {
   let pollContainer = document.querySelector('#pollContainer');
   let pollOption = document.querySelector('.pollOption')

   Sortable.create(pollContainer, {
     filter: ".js-remove",
     onFilter: function (evt) {
      var item = evt.item,
 			ctrl = evt.target;
 		   if (Sortable.utils.is(ctrl, ".js-remove")) {
<<<<<<< HEAD
 			item.parentNode.removeChild(listItem);
 		       }
 		    else if (Sortable.utils.is(ctrl, ".js-edit")) {
 		}
  }
})
=======
 			item.parentNode.removeChild(pollOption);
 		       }
         }
       })

     //   function createNewPollOption() {
     //       let $tweet   = $("<div>").addClass("")
     // 
     //       const header = $("<header>")
     //       $("<span>").addClass("handle").text(tweetObject.user.handle).appendTo(header);
     //       $("<img>").attr('src', tweetObject.user.avatars.small).appendTo(header);
     //       $("<h2>").addClass("name").text(tweetObject.user.name).appendTo(header);
     //       $tweet.append(header);
     //
     //       $("<p>").text(tweetObject.content.text).appendTo($tweet);
     //
     //       const footer = $("<footer>")
     //       const icons  = $("<span>").addClass("icons")
     //       $("<i>").addClass("fas fa-heart").appendTo(icons);
     //       $("<i>").addClass("fas fa-retweet").appendTo(icons);
     //       $("<i>").addClass("fas fa-flag").appendTo(icons);
     //       footer.append(icons);
     //       $("<p>").addClass("time-stamp").text(moment.utc(tweetObject.created_at).fromNow()).appendTo(footer);
     //       $tweet.append(footer);
     //
     //       return $tweet;
     //   };
     //
     //   $.ajax({
     //     method: "POST",
     //     url: "/tweets/",
     //     data: data
     //   }).done(function (e) {
     //     $("#tweets").prepend(createTweetElement(e));
     //     $("form")[0].reset();
     //     $(".counter").text(140);
     //   }).fail(function (e) {
     //     $(".new-tweet .error").text($errMsg)})
     // });
>>>>>>> master
});


// Sortable.create(sortTrue, {
//   group: "sorting",
//   sort: true
// });




// });

// var editableList = Sortable.create(editable, {
//   filter: '.js-remove',
//   onFilter: function (evt) {
//     var el = editableList.closest(evt.item); // get dragged item
//     el && el.parentNode.removeChild(el);
//   }
// });
