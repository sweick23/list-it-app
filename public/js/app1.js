$(function(){

var $username = $('#username');
var $password = $('#password');
var $firstName = $('#firstname');
var $lastName = $('#lastname');
var $loginUser = $('#loginUser');
var $loginPass = $('#loginPass');


$('#login').on('click', function(){
  var fields= {
    username: $loginUser.val(),
    password: $loginPass.val()
};
  $.ajax({
    type: 'GET',
    url: '/users/me',
    data: fields,
    username: $loginUser.val(),
    password: $loginPass.val(),
    success: function(login){
      console.log('success', login);
    }
  });
});



$('.signUp').on('click', function() {
  var fields = {
    username: $username.val(),
    password: $password.val(),
    firstName: $firstName.val(),
    lastName: $lastName.val()
  };
  $.ajax({
    type: 'POST',
    url: '/users',
    data: fields,
    dataType: 'json',
    success: function(data){
      console.log('success', data);


    }

})
});
});
