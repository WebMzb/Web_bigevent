//注意每次调用$.get()或者$.post()或者$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(potions){
    // console.log(potions.url)
    potions.url = 'http://www.liulongbin.top:3007'+potions.url

    //给所有需要权限的地址设置请求头
    if(potions.url.indexOf('/my/') !== -1){
        potions.headers ={
            Authorization:localStorage.getItem('token') ||''
        }
    }

    //给访问权限统一挂在complete 回调函数
    potions.complete= function(res){
        console.log('complete 被执行了')
            console.log(res);
            if(res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！'){
                //强制清空 token
                //返回登录页面
                localStorage.removeItem('token')
                location.href = '/lgoin.html'
            }
    }

})