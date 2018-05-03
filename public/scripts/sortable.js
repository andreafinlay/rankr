 $(() => {
   let pollContainer = document.querySelector('#pollContainer');
   let pollOption = document.querySelector('.pollOption')

   let pollOptionList = Sortable.create(pollContainer, {
     filter: ".js-remove",
     onFilter: function (evt) {
      let el = pollOptionList.closest(evt.item);
 			el && el.remove(pollOption);
 		       }
         })

       function createNewPollOption() {
           let $newOption   = $("<div>").addClass("pollOption");
           let newOptionContent = $("#addNewText").val();
           let deleteButton = $("<button>").text("Delete").addClass("btn btn-primary js-remove");
           $newOption.append(deleteButton);
           $newOption.append(newOptionContent);
           return $newOption;
       }

       $(".add").on("click", function(e){
         $("#pollContainer").append(createNewPollOption());
         $("#addNewText").val("");
  })
});
