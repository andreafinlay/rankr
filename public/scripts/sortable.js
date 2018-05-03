 $(() => {
   let sortTrue = document.getElementById('sortTrue');
   let listItem = document.getElementById('item1')
   Sortable.create(sortTrue, {
     filter: ".js-remove",
     onFilter: function (evt) {
      var item = evt.item,
 			ctrl = evt.target;
 		   if (Sortable.utils.is(ctrl, ".js-remove")) {
 			item.parentNode.removeChild(listItem);
 		       }
 		    else if (Sortable.utils.is(ctrl, ".js-edit")) {
 		}
  }
})
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
