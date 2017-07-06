/**
 * Created by zi_ge on 2017/7/6.
 */
var writer = "该用户已成仙";
var receiver = "丁欢喜";
$.ajax({
    type: "post",
    url: "historyMessage",
    data: {"receiver": receiver,"writer": writer}
}).done(function (historyMessages) {
    var length = historyMessages.length;
    var name=[];
    var i=0;
    var n=0;
    var temp=[];
    for(var historyMessage in historyMessages){
        name[i]=historyMessages[historyMessage].writer.name;
        var flag=0;
        for(var j=0;j<name.length;j++){
            if (historyMessages[historyMessage].writer.name==name[j]){
                flag++;
            }
        }
        i++;
        if (flag==1){
            temp[n]=historyMessages[historyMessage];
            n++;
        }
    }
    for (var m=0;m<n;m++){
        var times=0;
        for(var t=0;t<name.length;t++){
            if (name[t]==temp[m].writer.name){
                times++;
            }
        }
        $("#peopleList").append("<li>"+
            "<div class='people-img' style='background-image:url("+temp[m].writer.head+")'></div>"+
            "<p class='people-name'>"+temp[m].writer.name+"</p>"+
            "<p class='chat-preview'>"+temp[m].writer.introduce+"</p>"+
            "<p class='unread-news'>"+times+"</p>"+
            "</li>");
    }
    //左侧好友预览点击效果
    $(".people-choice").find("li").on('click',function () {
        $(".people-choice").find("li").not(this).removeClass("active");
        $(this).addClass("active");
        $(".window-r-top").find("p").text($(".active").find(".people-name").text());
        var imgPath=$(".active").find(".people-img").css("backgroundImage");
        $(".window-r-top").find(".people-img-r").css({
            backgroundImage:imgPath
        });
        //以上是李二狗的代码
        /**
         * 接下来是郑滋觉的代码
         * 用于点击头像后显示聊天信息
         * */
        $(".chat-content").html("");
        var name = $(".active").find(".people-name").text();
        for(var m=0;m<length;m++){
            if (name==historyMessages[m].writer.name||(receiver==historyMessages[m].writer.name&&name==historyMessages[m].receiver.name)){
                if (historyMessages[m].writer.name==name){
                    $(".chat-content").append("<div class='other-chat-container clearfix'>"+
                    "<div class='other-img' style='background-image:url("+historyMessages[m].writer.head+")'></div>"+
                        "<p class='other-content'>"+historyMessages[m].content+"</p>"+
                    "</div>")
                }else{
                    $(".chat-content").append("<div class='my-chat-container clearfix'>"+
                        "<div class='my-img'></div>"+
                        "<p class='my-content'>"+historyMessages[m].content+"</p>"+
                        "</div>")
                }
            }
        }
        $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight);
    })
})


var socket = new SockJS('/endpointChat'); //1
stompClient = Stomp.over(socket);//2
stompClient.connect({}, function (frame) {//3
    console.log('开始进行连接Connected: ' + frame);
    stompClient.subscribe('/user/'+"该用户已成仙"+'/message', function(respnose){ //4
        showChat(JSON.parse(respnose.body).fromWhere+"："+JSON.parse(respnose.body).content,JSON.parse(respnose.body).time);
    });

});
$(".send-btn").on('click',function () {
    var receiver = "丁欢喜";
    var content = $(".w-e-text").text();
    $.ajax({
        type : "post",
        url : "sendMessage",
        data : {"writer":writer,"receiver":receiver,"content":content},
    })
})
function showChat(chat) {
    $(".chat-content").append();
}