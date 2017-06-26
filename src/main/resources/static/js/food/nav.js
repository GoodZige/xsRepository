function nav(){
    var i=0;
    var j=0;
    $(".user-btn").click(function(){
        if(i%2==0){
        $(".login-register-btns").animate({width:150});
        }
        else{
        $(".login-register-btns").animate({width:0});
        $(".user-operation").find("span").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        $(".user-news").css({display:"none"});
        }
        i++;
    })
    $(".nav-btn").click(function(){
        if(j%2==0){
            $(".nav").animate({height:180});
        }
        else{
            $(".nav").animate({height:0});
        }
        j++
    })
    $(".user-operation").click(function(){
        if($(".user-news").css("display")=="none"){
            $(this).find("span").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
            $(".user-news").css({display:"block"});
        }
        else{
            $(this).find("span").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
            $(".user-news").css({display:"none"});
        }
    })
}