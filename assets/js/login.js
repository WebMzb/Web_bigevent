$(function(){
    // 登录的切换
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 注册的切换
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })


    /* layui js操作 */
/* 从layui中获取form 对象 */
var form = layui.form
// layui中的弹框
var layer = layui.layer
// 通过 form.verify()函数自定义校验规则
form.verify({
    //自定义一个wpd校验规则
    pwd:[
        /^[\S]{6,12}$/,'密码必须6到12位,不能出现空格'
    ],

    repwd:function(value){
    var pwd =   $('.reg-box [name=password]').val()
    if(pwd !== value){
        return'两次密码不一致！'
    }    

}
})


// 注册事件 发起post请求
$('#form_reg').on('submit',function(e){
    e.preventDefault()
    //发起post请求
    var data = {username:$('#form_reg [name=username]').val(),
    password:$('#form_reg [name=password]').val()};
    $.post('/api/reguser',
    data,function(res){
        if(res.status !==0){
            return layer.msg(res.message,{icon:5})
        }
        layer.msg('注册成功,请登录',{icon:6})
        //注册成功后自动返回 登录页面
        $('#link_login').click();
    })
    
})

//登录事件
$('#form_login').submit(function(e){
    //阻止默认跳转
    e.preventDefault();
    $.ajax({
        url:'/api/login',
        method:'POST',
        //快速获取表单内容
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layer.msg('登录失败'+res.message,{icon:5})
            }
            layer.msg('登录成功,请登录',{icon:6})
            // console.log(res.token)
            //将res.token 访问权限的这个值存到localStorage中
            localStorage.setItem('token',res.token)
            //跳转到后台主页
            location.href = '/index.html';
        }
    })
})


})