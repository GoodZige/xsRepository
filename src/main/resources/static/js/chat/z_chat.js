/**
 * Created by zi_ge on 2017/7/6.
 */
var receiver = "该用户已成仙";
var pushChat = [];
var sum=0;
var historyMessages;
$.ajax({
    type: "post",
    url: "historyMessage",
    async : false,
    data: {"receiver": receiver,"writer": receiver}
}).done(function (data) {
    historyMessages = data;
    var name=[];
    var i=0;
    var n=0;
    var temp=[];
    for(var historyMessage in historyMessages){
        if (historyMessages[historyMessage].writer.name!=receiver){
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
    }
    for (var m=0;m<n;m++){
        var times=0;
        for(var t=0;t<historyMessages.length;t++){
            if (historyMessages[t].writer.name==temp[m].writer.name&&historyMessages[t].flag==0){
                times++;
            }
        }
        if (times==0){
            $("#peopleList").append("<li>"+
                "<div class='people-img' style='background-image:url("+temp[m].writer.head+")'></div>"+
                "<p class='people-name'>"+temp[m].writer.name+"</p>"+
                "<p class='chat-preview'>"+temp[m].writer.introduce+"</p>"+
                "</li>");
        }else{
            $("#peopleList").append("<li>"+
                "<div class='people-img' style='background-image:url("+temp[m].writer.head+")'></div>"+
                "<p class='people-name'>"+temp[m].writer.name+"</p>"+
                "<p class='chat-preview'>"+temp[m].writer.introduce+"</p>"+
                "<p class='unread-news'>"+times+"</p>"+
                "</li>");
        }
    }
});
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
    var length = historyMessages.length;
    $.ajax({
        type : "post",
        url : "readMessage",
        data : {"writer": name,"receiver": receiver},
        success : function () {
            $(".active").find(".unread-news").text(0);
            $(".active").find(".unread-news").hide();
        }
    });
    historyMessages.sort(function (a, b) {
        var aDate = new Date(a.date);
        var bDate = new Date(b.date)
        return aDate-bDate;
    });
    for(var m=0;m<length;m++){//显示历史信息
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


var socket = new SockJS('/endpointChat'); //1
stompClient = Stomp.over(socket);//2
stompClient.connect({}, function (frame) {//3
    console.log('开始进行连接Connected: ' + frame);
    stompClient.subscribe('/user/'+"该用户已成仙"+'/message', function(respnose) { //4
        var writer = JSON.parse(respnose.body).writer;
        var content = JSON.parse(respnose.body).content;
        var date = JSON.parse(respnose.body).date;
        var head = JSON.parse(respnose.body).head;
        saveChat(writer,content,date,head,sum);
        showChat(writer,content,date,head);
    })
});
$(".send-btn").on('click',function () {
    var receiver = $(".active").find(".people-name").text();
    var writer = "该用户已成仙";
    var content = $(".w-e-text").text();
    $.ajax({
        type : "post",
        url : "sendMessage",
        data : {"writer":writer,"receiver":receiver,"content":content},
        success : function (data) {
            pushChat[sum] = {"writer":writer,"content":content,"date":data,"head":"http://ompbl6yqp.bkt.clouddn.com/Fo96wCcX8Wg8GCUsLAIwaUWG_zIk","receiver":receiver}
            sum++;
            var length = historyMessages.length;
            historyMessages[length] = {"writer":{"name":writer,"head":"http://ompbl6yqp.bkt.clouddn.com/Fo96wCcX8Wg8GCUsLAIwaUWG_zIk"},
                                        "content":content,
                                        "date":data,
                                        "receiver":{"name":receiver}
            }
        }
    })
});

function saveChat(writer, content, date, head, i) {
    pushChat[i] = {"writer":writer,"content":content,"date":date,"head":head, "receiver":receiver};
    sum++;
    var length = historyMessages.length;
    historyMessages[length] = {"writer":{"name":writer,"head":head},
        "content":content,
        "date":date,
        "receiver":{"name":receiver}
    }
}
function showChat(writer,content,date,head) {
    if (writer==$(".active").find(".people-name").text()){//判断是否在当前联系人
        $(".chat-content").append("<div class='other-chat-container clearfix'>"+
            "<div class='other-img' style='background-image:url("+head+")'></div>"+
            "<p class='other-content'>"+content+"</p>"+
            "</div>");
        $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight);
    }else {
        var flag=0;
        $(".people-name").each(function () {
            if ($(this).text()==writer){
                var nowTimes = $(this).parent().find(".unread-news").text();
                if (!isNaN(nowTimes)&&nowTimes!=""){
                    var num = parseInt(nowTimes)+1;
                    $(this).parent().find(".unread-news").show();
                    $(this).parent().find(".unread-news").text(num);
                }else{
                    $(this).next().append("<p class='unread-news'>"+1+"</p>");
                }
            }else {
                flag++;
            }
        })

        if (flag==$(".people-name").length){
            $("#peopleList").append("<li class='newPeople'>"+
                "<div class='people-img' style='background-image:url("+head+")'></div>"+
                "<p class='people-name'>"+writer+"</p>"+
                "<p class='chat-preview'>"+content+"</p>"+
                "<p class='unread-news'>"+1+"</p>"+
                "</li>");
        }
        $(".newPeople").on('click', function () {
            $(".people-choice").find("li").not(this).removeClass("active");
            $(this).addClass("active");
            $(".window-r-top").find("p").text($(".active").find(".people-name").text());
            var imgPath = $(".active").find(".people-img").css("backgroundImage");
            $(".window-r-top").find(".people-img-r").css({
                backgroundImage: imgPath
            });

            $(".chat-content").html("");
            var writer = $(this).find(".people-name").text();
            pushChat.sort(function (a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                return aDate-bDate;
            });
            for (var i=0;i<pushChat.length;i++){
                if (writer==pushChat[i].writer){
                    $(".chat-content").append("<div class='other-chat-container clearfix'>"+
                        "<div class='other-img' style='background-image:url("+pushChat[i].head+")'></div>"+
                        "<p class='other-content'>"+pushChat[i].content+"</p>"+
                        "</div>")
                }else if (receiver==pushChat[i].writer&&writer==pushChat[i].receiver){
                    $(".chat-content").append("<div class='my-chat-container clearfix'>"+
                        "<div class='my-img'></div>"+
                        "<p class='my-content'>"+pushChat[i].content+"</p>"+
                        "</div>")
                }
            }

            $(".chat-content").scrollTop($(".chat-content")[0].scrollHeight);
        });
    }
}