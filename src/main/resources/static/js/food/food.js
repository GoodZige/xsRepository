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
        $("#login").css({display:"block"}).animate({opacity:1,top:220},300);
        $("#register").css({display:"none"}).animate({opacity:0,top:160},300)
    })
    $(".exit-login").click(function(){
        $("#login").animate({opacity:0,top:160},300,function(){
            $(this).css({display:"none"});
        });
    })
    $(".register-btn").click(function(){
        $("#register").css({display:"block"}).animate({opacity:1,top:220},300);
        $("#login").css({display:"none"}).animate({opacity:0,top:160},300);
    })
    $(".exit-register").click(function(){
        $("#register").animate({opacity:0,top:160},300,function(){
            $(this).css({display:"none"});
        });
    })

    $(".loginB").click(function(){
        if($(".password-login").find("input").val()==""){
            $(".prompt-login").css({bottom:53,display:"block"}).animate({right:79,opacity:1});
            $(".password-login").find("input").focus(function(){
                if($(".prompt-login").css("bottom")==53+"px"){
                   $(".prompt-login").animate({right:65,opacity:0},function(){
                       $(".prompt-login").css({display:"block"});
                   })
                }
            })
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
        }
        //用户信息显示
        $(".login-btn,.register-btn").css({display:"none"});
        $(".user-operation").css({display:"block"});
        $(".user-btn").css({backgroundImage:"url(imgs/head-img.jpg)"}).find("span").remove();

    })
    $(".registerB").click(function(){
        if($(".password-again").find("input").val()==""){
            $(".prompt-register").text("*请输入该字段哦").css({bottom:38,display:"block"}).animate({right:79,opacity:1});
            $(".password-again").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==38+"px"){
                   $(".prompt-register").animate({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"block"});
                   })
                }
            })
        }
        if($(".password-register").find("input").val()==""){
            $(".prompt-register").text("*请输入该字段哦").css({bottom:90,display:"block"}).animate({right:79,opacity:1});
            $(".password-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==90+"px"){
                   $(".prompt-register").animate({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"block"});
                   })
                }
            })
        }
        if($(".password-register").find("input").val()!=""&&$(".password-again").find("input").val()!=""&&$(".password-register").find("input").val()!=$(".password-again").find("input").val()){
            $(".prompt-register").text("*两次密码不相同").css({bottom:38,display:"block"}).animate({right:79,opacity:1});
        }
        if($(".username-register").find("input").val()==""){
            $(".prompt-register").text("*请输入该字段哦").css({bottom:139,display:"block"}).animate({right:79,opacity:1});
            $(".username-register").find("input").focus(function(){
                if($(".prompt-register").css("bottom")==139+"px"){
                   $(".prompt-register").animate({right:65,opacity:0},function(){
                       $(".prompt-register").css({display:"block"});
                   })
                }
            })
        }
        if($(".username-register").find("input").val()!=""&&$(".password-register").find("input").val()!=""&&$(".password-again").find("input").val()!=""&&$(".password-register").find("input").val()==$(".password-again").find("input").val()){
            $(".prompt-register").animate({right:65,opacity:0},function(){
                        $(".prompt-register").css({display:"block"});
            })
        }
    })


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
