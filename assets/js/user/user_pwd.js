$(function(){
    var form = layui.form

    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        // 新密码不能和原密码一样 校验规则
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能和旧密码一致'
            }
        },
        // 验证新密码和确认密码是否一致
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致,请确认密码'
                
            }
        }
    })
    


    // 提交新密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layui.layer.msg('重置密码失败')
                }
                layui.layer.msg('重置密码成功！')
            }
        })
        // console.log($(this).serialize());
        // console.log($('[name=newPwd]').val())
    // console.log($('[name=rePwd]').val())
    })
})