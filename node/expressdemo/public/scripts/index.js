$(function(){
$('#register').click(function (event) {
    event.preventDefault()
    $.ajax({
        url:'/register',
        type:'get',
        dataType:'json',
        data:{
            username:$('#username').val(),password:$('#password').val()
        },
        success:function (res) {
            console.log(res)
        },
        error:function () {
            console.log('error')
        }

    })
})


});