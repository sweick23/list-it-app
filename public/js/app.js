
$(function(){

  var state = {
     newList: []
   };

  var $lists = $('#list-items');
  var $addlist = $('#todolist');
  var $addcategory = $('#category');

  function newList(item){
    $lists.append('<div class="todo-list">' +
     '<span class="js-item" id ="strike">' +
     item.item + '</span>' +
     '<span class="category">' +
      item.category  +  '</span>'  + '<br />' + '<br />' +
      '<button  class="del" data-id="'+ item.id +'">' +
       '<i class="fa fa-trash-o">' + '</i>' + '</button>' + '</div>'
  ); }


  $.ajax({
    url: '/lists',
  
    dataType: 'json',
    success: function(data){
      console.log('success', data);
      $.each(data.todolist, function(index, item){
        newList(item);
      });
    },
    error: function(){
      alert('error loading list item');
    }

  });

  $('.add').on('click', function() {
    var lists = {
      item: $addlist.val(),
      category: $addcategory.val()
    };
    $.ajax({
      type: 'POST',
      url: '/lists',
      data: lists,
      dataType: 'json',
      success: function(data){
        console.log('success', data);
        newList(data);

      }



    });
  });

  $('#list-items').on('click', '.del', function(){
$.ajax({
  type: 'DELETE',
  url: '/lists/' + $(this).data('id'),
  success: function(del){
    console.log('success', del);
  }

});
  });



    function getItem(state, itemIndex){
      return state.newList[itemIndex];
    }

    function deleteItem(state, itemIndex, data){
      state.newList.slice(itemIndex, data);
      window.location.reload();
    }






    function initializeList(state, element, data){
      var itemsHTML = state.newList.map(
        function(item, index){
          return setItem(item, index, newList, data);
        });
        element.html(itemsHTML);
    }




    function handleItemDeletes(
      formElement, deleteIdentifier, data, element, state
    ){
      element.on('click', deleteIdentifier, function(event){
        var itemIndex = parseInt($(this).closest('div').attr(data));
        deleteItem(state, itemIndex);
        initializeList(state, element, data);
      });
    }



    var formElement = $('#listIt');

    var element = $('#list-items');



    var deleteIdentifier = '.del';

    var itemData = 'data-id';




    handleItemDeletes(formElement, deleteIdentifier, itemData, element, state);




});
