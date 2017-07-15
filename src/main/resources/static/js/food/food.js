$(function(){
    nav();
    $(".screen").find("a").click(function(){
         $(".screen").find("a").not(this).removeClass("screen-selected");
         $(this).addClass("screen-selected");
    })
    var hW=$("#all").offset().top;
    $(".more").click(function(){
        $("body").animate({scrollTop:hW},1500);
        $(document.documentElement).animate({scrollTop:hW},1500);
    })
    $(window).resize(function(){
        var hW=$("#all").offset().top;
    })
    //登录注册
    $(".login-btn").click(function(){
        $("#login").css({display:"block"}).animate({opacity:1,top:140},300);
        $("#register").css({display:"none",opacity:0,top:80});
    })
    $(".exit-login").click(function(){
        $("#login").animate({opacity:0,top:100},300,function(){
            $(this).css({display:"none"});
        });
        $(".find-password").css({display:"none"});
    })
    $(".register-btn").click(function(){
        $("#register").css({display:"block"}).animate({opacity:1,top:120},300);
        $("#login").css({display:"none",opacity:0,top:100});
        $(".find-password").css({display:"none"});
    })
    $(".exit-register").click(function(){
        $("#register").animate({opacity:0,top:80},300,function(){
            $(this).css({display:"none"});
        });
    })
    $(".forget").click(function(){
        if($(".find-password").css("display")=="none"){
            $(".find-password").css({display:"block"});
        }
        else{
            $(".find-password").css({display:"none"});
        }
    })
    //点击登陆按钮
    $(".loginB").click(function(){
        //判断格式
        var isUserEmpty = false;
        var isPasswordEmpty = false;
        var username = $("#username_l").val();//账号
        var password = $("#password_l").val();//密码

        if($(".password-login").find("input").val()==""){
            $(".prompt-login").css({bottom:53,display:"block"}).animate({right:79,opacity:1});
            $(".password-login").find("input").focus(function(){
                if($(".prompt-login").css("bottom")==53+"px"){
                   $(".prompt-login").animate({right:65,opacity:0},function(){
                       $(".prompt-login").css({display:"block"});
                   })
                }
            })
            isPasswordEmpty = false;
        }else {
            isPasswordEmpty = true;
        }
        if($(".username-login").find("input").val()==""){
            $(".prompt-login").css({bottom:104,display:"block"}).animate({right:79,opacity:1});
             $(".username-login").find("input").focus(function(){
                if($(".prompt-login").css("bottom")==104+"px"){
                   $(".prompt-login").animate({right:65,opacity:0},function(){
                       $(".prompt-login").css({display:"block"});
                   })
                }
            })
            isUserEmpty = false;
        }else {
            isUserEmpty = true;
        }

        //登陆验证
        if (isUserEmpty&&isPasswordEmpty){
            $.ajax({
                type:"get",
                scriptCharset:"utf-8",
                url:"/login",
                data:{"username":username,"password":password},
                success:function(data){
                        if(data == "0"){
                            $(".prompt-login").text("账号不存在").css({bottom:104,display:"block"}).animate({right:79,opacity:1});
                            $(".username-login").find("input").focus(function(){
                                if($(".prompt-login").css("bottom")==104+"px"){
                                    $(".prompt-login").animate({right:65,opacity:0},function(){
                                        $(".prompt-login").css({display:"block"});
                                    })
                                }
                            })
                        }else if (data == "1"){
                            //登陆成功
                            $('.glyphicon-remove').click();//关闭登录窗口
                            $(".login-btn,.register-btn").css({display:"none"});
                            $(".user-operation").css({display:"block"});



                            //显示昵称
                            $.ajax({
                                type:"get",
                                scriptCharset:"utf-8",
                                url:"/showUserInfo",
                                success:function(data){
                                    var head = data[1];
                                    if (data!=""){
                                        $('#showUsername').text(data[0]);
                                        $(".login-btn,.register-btn").css({display:"none"});
                                        $(".user-operation").css({display:"block"});

                                        if (data[1]!==null){
                                            $(".user-btn").css({backgroundImage:"url("+head+")"}).find("span").removeClass("glyphicon glyphicon-user");
                                        }else {
                                            //加载默认图片
                                            $(".user-btn").css({backgroundImage:"url(imgs/head-img.jpg)"}).find("span").removeClass("glyphicon glyphicon-user");
                                        }
                                    }
                                }
                            });

                        }else if (data == "2"){
                            $(".prompt-login").text("密码错误").css({bottom:53,display:"block"}).animate({right:79,opacity:1});
                            $(".password-login").find("input").focus(function(){
                                if($(".prompt-login").css("bottom")==53+"px"){
                                    $(".prompt-login").animate({right:65,opacity:0},function(){
                                        $(".prompt-login").css({display:"block"});
                                    })
                                }
                            })
                        }
                }
            });
        }
        //用户信息显示
        // $(".login-btn,.register-btn").css({display:"none"});
        //$(".user-operation").css({display:"block"});
        //头像
        //$(".user-btn").css({backgroundImage:"url(imgs/head-img.jpg)"}).find("span").removeClass("glyphicon glyphicon-user");

    })

    $(".layout").click(function(){
        $(".login-btn,.register-btn").css({display:"block"});
        $(".user-operation").css({display:"none"});
        $(".user-btn").css({backgroundImage:"none"}).find("span").addClass("glyphicon glyphicon-user");
        $(".user-news").css({display:"none"});
    })

    $(".registerB").click(function(){


        //判断是否能注册
        var register = true;
        var isCorrect = false;//验证码判断
        var length = false;//账号密码长度判断

        //获取账号,密码
        var username = $("#username").val();
        var pwd = $("#password").val();
        var email = $("#email").val();
        var code = $('#verification').val();

        if($(".verification").find("input").val()==""){
            $(".prompt-register").text("*验证码不得为空").css({bottom:0,display:"block"}).animate({right:79,opacity:1});
            $(".verification").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==0+"px"){
                   $(".prompt-register").css({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"none"});
                })
                }
            })
            register = false;
        }
        if($(".email").find("input").val()==""){
            $(".prompt-register").text("*该字段不能为空").css({bottom:78,display:"block"}).animate({right:79,opacity:1});
            $(".email").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==78+"px"){
                   $(".prompt-register").css({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"none"});
                   })
                }
            })
            register = false;
        }
        if($(".password-again").find("input").val()==""){
            $(".prompt-register").text("*该字段不能为空").css({bottom:128,display:"block"}).animate({right:79,opacity:1});
            $(".password-again").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==128+"px"){
                   $(".prompt-register").css({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"none"});
                   })
                }
            })
            register = false;
        }
        if($(".password-register").find("input").val()==""){
            $(".prompt-register").text("*该字段不能为空").css({bottom:178,display:"block"}).animate({right:79,opacity:1});
            $(".password-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==178+"px"){
                   $(".prompt-register").css({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"none"});
                   })
                }
            })
            register = false;
        }
        if($(".password-register").find("input").val()!=""&&$(".password-again").find("input").val()!=""&&$(".password-register").find("input").val()!=$(".password-again").find("input").val()){
            $(".prompt-register").text("*两次密码不相同").css({bottom:128,display:"block"}).animate({right:79,opacity:1});
            register = false;
        }
        if($(".username-register").find("input").val()==""){
            $(".prompt-register").text("*该字段不能为空").css({bottom:229,display:"block"}).animate({right:79,opacity:1});
            $(".username-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==229+"px"){
                   $(".prompt-register").css({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"none"});
                   })
                }
            })
            register = false;
        }
        if($(".verification").find("input").val()!=""&&$(".email").find("input").val()!=""&&$(".username-register").find("input").val()!=""&&$(".password-register").find("input").val()!=""&&$(".password-again").find("input").val()!=""&&$(".password-register").find("input").val()==$(".password-again").find("input").val()){
            $(".prompt-register").css({right:65,opacity:0},function(){
                        $(".prompt-register").css({display:"none"});
            })
            register = true;
        }

        //验证邮箱格式
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!myreg.test($(".email").find("input").val())){
            $(".prompt-register").text("*邮箱格式错误").css({bottom:78,display:"block"}).animate({right:79,opacity:1});
            $(".email").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==78+"px"){
                    $(".prompt-register").css({right:65,opacity:0},function(){
                        $(".prompt-register").css({display:"none"});
                    })
                }
            })
            register = false;
        }

        //不能含有汉字
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(reg.test(username)){
            $(".prompt-register").text("*用户名不能含有汉字").css({bottom:229,display:"block"}).animate({right:79,opacity:1});
            $(".username-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==229+"px"){
                    $(".prompt-register").css({right:65,opacity:0},function(){
                        $(".prompt-register").css({display:"none"});
                    })
                }
            })
            register = false;
        }


        //密码长度6-12位
        if(pwd.length>=6&&pwd.length<=12){
            length = true;
        }else {
            length = false;
            $(".prompt-register").text("*密码长度为6-12位").css({bottom:178,display:"block"}).animate({right:79,opacity:1});
            $(".password-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==178+"px"){
                    $(".prompt-register").css({right:65,opacity:0},function(){
                        $(".prompt-register").css({display:"none"});
                    })
                }
            })
        }

        //账号的长度
        if(username.length>=6&&username.length<=8){
            length = true;
        }else {
            length = false;
            $(".prompt-register").text("*用户名长度为6-8位").css({bottom:229,display:"block"}).animate({right:79,opacity:1});
            $(".username-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==229+"px"){
                    $(".prompt-register").css({right:65,opacity:0},function(){
                        $(".prompt-register").css({display:"none"});
                    })
                }
            })
        }

        //发送验证码以及长度
        if(register&&length){
            $.ajax({
                type:"get",
                scriptCharset:"utf-8",
                async :false,
                url:"/getCode",
                success:function(data){
                    if(code===data.toString()){
                        isCorrect = true
                    }else {
                        isCorrect = false
                        $(".prompt-register").text("*验证码错误").css({bottom:0,display:"block"}).animate({right:79,opacity:1});
                        $(".verification").find("input").focus(function(){
                            if($(".prompt-register").css("bottom")==0+"px"){
                                $(".prompt-register").css({right:65,opacity:0},function(){
                                    $(".prompt-register").css({display:"none"});
                                })
                            }
                        })

                    }
                }
            });
        }

        //验证邮箱是否在发送验证码后被修改,以及长度
        if(register&&length){
        $.ajax({
            type:"get",
            scriptCharset:"utf-8",
            url:"/getEmail",
            async:false,
            success:function(data){
                if (data === email){
                    $.ajax({
                        type:"get",
                        scriptCharset:"utf-8",
                        async :false,
                        url:"/getCode",
                        success:function(data){
                            if(code===data.toString()){
                                isCorrect = true
                            }else {
                                isCorrect = false
                                $(".prompt-register").text("*验证码错误").css({bottom:0,display:"block"}).animate({right:79,opacity:1});
                                $(".verification").find("input").focus(function(){
                                    if($(".prompt-register").css("bottom")==0+"px"){
                                        $(".prompt-register").css({right:65,opacity:0},function(){
                                            $(".prompt-register").css({display:"none"});
                                        })
                                    }
                                })
                            }
                        }
                    });
                }else {
                    isCorrect = false;
                    $(".prompt-register").text("*该邮箱无验证码").css({bottom:78,display:"block"}).animate({right:79,opacity:1});
                    $(".email").find("input").focus(function(){
                        if($(".prompt-register").css("bottom")==78+"px"){
                            $(".prompt-register").css({right:65,opacity:0},function(){
                                $(".prompt-register").css({display:"none"});
                            })
                        }
                    })
                }
            }
        });
        }


        //如果验证码正确+注册的文本格式正确 进入注册程序。检查用户名和邮箱是否被注册
        if (register&&isCorrect){
            $.ajax({
                type:"get",
                scriptCharset:"utf-8",
                url:"/register",
                async :false,
                data:{"username":username,"password":pwd,"email":email},
                success:function(data){
                    if (data=="0"){
                        $(".prompt-register").text("*该用户名已经存在").css({bottom:229,display:"block"}).animate({right:79,opacity:1});
                        $(".username-register").find("input").focus(function() {
                            if ($(".prompt-register").css("bottom") == 229 + "px") {
                                $(".prompt-register").css({right: 65, opacity: 0}, function () {
                                    $(".prompt-register").css({display: "none"});
                                })
                            }
                        })
                    }else if (data == "1"){
                        $(".prompt-register").text("*邮箱已被注册").css({bottom:78,display:"block"}).animate({right:79,opacity:1});
                        $(".email").find("input").focus(function(){
                            if($(".prompt-register").css("bottom")==78+"px"){
                                $(".prompt-register").css({right:65,opacity:0},function(){
                                    $(".prompt-register").css({display:"none"});
                                })
                            }
                        })
                    }else if (data == "2"){
                        window.location.reload();
                        alert("注册成功")
                    }
                }
            });
        }



    })
    //验证码倒计时
    $(".verification-btn").click(function(){
        var email = $("#email").val();
        if($(".verification-btn").text()=="发送"){
            var i=60;
            $(".verification-btn").text(i+"s");
            var verificationTimer=window.setInterval(function(){
                $(".verification-btn").text(--i+"s");
                if(i==0){
                    $(".verification-btn").text("发送");
                    window.clearInterval(verificationTimer);
                }
            },1000)

            //接受验证码
            $.ajax({
                type:"POST",
                scriptCharset:"utf-8",
                url:"/send",
                data:{"email":email},
                success:function(data){

                }
            });

        }


    })
    //瀑布流
    var $container = $('#masonry');
    $container.imagesLoaded(function() {
        $container.masonry({
                itemSelector: '.box',
                gutter: 20,
                isAnimated: true,
            });
    });
    masonryWidth();

})

function masonryWidth(){
    $browser = $(".screen").width();

    $boxWidth = 250;         // 盒子宽度
    $boxSpacing = 20;        //盒子与盒子之间的间距

    if($browser <=500 ){
        $("#masonry").css('width',250);
    }else{
        $num = ($browser-$boxWidth) / ($boxWidth + $boxSpacing );
        $n = parseInt($num);
        $masonryWidth = $n * ($boxWidth + $boxSpacing) + $boxWidth;

        $("#masonry").css('width',$masonryWidth);
    }

    // 浏览器窗口变动
    window.onresize = masonryWidth;
}
