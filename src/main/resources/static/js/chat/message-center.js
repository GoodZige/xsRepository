$(function(){
    navClick();
    arrowClick();
    reply();
})
function reply(){
    //查看详情窗口弹出与关闭
    $(".reply").click(function(){
        $(".reply-window").css({
            top:5+"%",
            opacity:0,
            display:"block"
        }).animate({
            top:13+"%",
            opacity:1
        },300)
    })
    $(".reply-exit").click(function(){
        $(".reply-window").animate({
            top:5+"%",
            opacity:0
        },300,function(){
            $(this).css({
                display:"none"
            })
        })
    })
    //发送功能
    $(".send-btn").click(function(){
        if($(".w-e-text").text()!=""){
            var replyContent="";
            replyContent+="<li>"
            replyContent+="<div class='head-img'>"
            replyContent+="<a href='#javascript'>"
            replyContent+="</a>"
            replyContent+="</div>"
            replyContent+="<div class='reply-content'>"
            replyContent+="<a class='user-name' href='#javascript'>"
            replyContent+="该用户已成仙"
            replyContent+="</a>"
            replyContent+="<p>"
            replyContent+=$(".w-e-text").text();
            replyContent+="</>"
            replyContent+="</div>"
            replyContent+="</li>"
            $(".reply-details").find("ul").append(replyContent);
            $(".reply-details").scrollTop($(".reply-details")[0].scrollHeight);
            $(".w-e-text").text("");
        }
    })
}
function navClick(){
    $(".nav").find("a").click(function(){
        $(this).addClass("a-address");
        $(".nav").find("a").not(this).removeClass("a-address");
    })
}
function arrowClick(){
    $(".news-btn").click(function(){
        if($(this).parent().next(".news-operation").css("display")=="none"){
            $(this).parent().next(".news-operation").css({
                display:"block"
            })
            $(".news-operation").not( $(this).parent().next(".news-operation")).css({
                display:"none"
            })
        }
        else{

        }
    })
    $(document).click(function(){
        $(".news-operation").css({
            display:"none"
        })
    })
    $(".news-btn").click(function(){
        event.stopPropagation();
    })
}