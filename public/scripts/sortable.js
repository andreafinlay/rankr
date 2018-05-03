 $(() => {
var sortTrue = document.getElementById('sortTrue');
// console.log(el);
Sortable.create(sortTrue, {
  group: "sorting",
  sort: true
});
});

// var editableList = Sortable.create(editable, {
//   filter: '.js-remove',
//   onFilter: function (evt) {
//     var el = editableList.closest(evt.item); // get dragged item
//     el && el.parentNode.removeChild(el);
//   }
// });
