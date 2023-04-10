$(function(){

    //调用 getUserInfo 获取用户的基本信息
    getUserInfo();
    //给退出按钮绑定单击事件
    var layer = layui.layer

    $('#btnLogout').on('click',function(){
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
    //清空浏览器中的token
    localStorage.removeItem('token')
    //重新跳转回登录页面
    location.href = '/lgoin.html'
    //关闭confirm        
    layer.close(index);
    });
    })
})

//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //headers 就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') ||''
        // },
        success:function(res){
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data);
            // console.log(res.data)
        }
        //在jquery中发起aja有这样一个属性complete
        //无论成功失败都会被调用
        // complete:function(res){
        //     console.log('complete 被执行了')
        //     console.log(res);
        //     if(res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！'){
        //         //强制清空 token
        //         //返回登录页面
        //         localStorage.removeItem('token')
        //         location.href = '/lgoin.html'
        //     }
        // }

    })
}

//渲染用户头像
function renderAvatar(user){
    //1.获取用户名称
    var name = user.nickname ||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //3.按需渲染头像
    if(user.user_pic !== null){
        //渲染用户的头像
        $('.layui-nav-img')
        .attr('src',user.user_pic)
        .show();
        $('.text-avatar').hide();
    }else{
        //3.3如果没有图片就渲染用户名字第一位数
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }
    
}