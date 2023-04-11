$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //昵称验证规则
        nickname:function(value){
            if(value.length>6){
                return'昵称长度必须大于6'
            }
        }
    })
    initUserInfo();

    //初始化用户信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取用户信息失败!')
                    // console.log('获取信息失败')
                }
                // console.log(res);
                //layui中快速给表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click',function(e){
        //阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })


    //表单提交按钮
    $('.layui-btn').on('click',function(e){
        e.preventDefault();
        //发ajax post 请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:{id:'8214',nickname:$('.layui-form [name=nickname]').val(),email:$('.layui-form [name=email]').val()},
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新用户资料失败！')
                }
                // layer.msg('更新用户信息成功！')
                //调用父页面中的方法，重新渲染用户信息和头像
                // Window.parent.getUserInfo();
                window.parent.getUserInfo();
                // console.log($('.layui-form [name=nickname]').val())
            }
        })
    })
})