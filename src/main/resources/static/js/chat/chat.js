$(function(){
    //使右上角显示的头像与名字为正在与你聊天的人
    $(".window-r-top").find("p").text($(".active").find(".people-name").text());
    var imgPath=$(".active").find(".people-img").css("backgroundImage");
    $(".window-r-top").find(".people-img-r").css({
        backgroundImage:imgPath
    })

    //使聊天内容的滚动条一直处于最底部
    $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight);
    //执行消息发送的函数
    newsSend();
    //执行搜索功能函数
    search();
})
function newsSend(){
    $(".send-btn").on('click',function () {
    if($(".w-e-text").text()!=""){
            $(".chat-content").append(
                "<div class='my-chat-container clearfix'>"+
                "<div class=my-img></div>"+
                "<p class=my-content>"+$(".w-e-text").text()+"</p>"+
                "</div>"
            )
        $(".w-e-text").text("");
        $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight);
    }
    })
    //使输入框具有按回车发送的功能
    $(".w-e-text").keyup(function(){
        if(event.keyCode==13){
            $(".send-btn").click();
        }
    })
}
function search(){
    var searchTimer;
    $(".search-input").focus(function(){
        searchTimer=window.setInterval(function(){
            var tag=$(".search-input").val();
            $(".people-choice").find("li").each(function(){
                if($(this).children(".people-name").text().indexOf(tag)!=-1){
                    $(this).css({
                        display:"block"
                    })
                }
                else{
                    $(this).css({
                        display:"none"
                    })
                }
            })
            var i=0;
            $(".people-choice").find("li").each(function(){
                if($(this).css("display")=="block"){
                    i++;
                }
            })
            if(i==0){
                $(".no-result").css({
                    display:"block"
                })
            }
            else{
                $(".no-result").css({
                    display:"none"
                })
            }
        },300);
    })
    $(".search-input").blur(function(){
        window.clearInterval(searchTimer);
    })
}
