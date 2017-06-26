/**
 * Created by zi_ge on 2017/6/25.
 */
$(document).ready(function () {
    var pages;
    var pageData;
    var $container = $("#masonry");
    $.ajax({
        type : "post",
        url : "/getItems",
        async : "false",
        data : {'nowPage':1,'type':'food','sort':'date'},
        success : function (data) {
            pageData=data;
            pages=data["pages"];
            $.jqPaginator('#pagination1', {
                totalPages: pages,
                visiblePages: 10,
                currentPage: 1,
                onPageChange: function (num, type) {//分页按钮事件
                    $('#p1').text(type + '：' + num);

                    $.ajax({
                        type : "post",
                        url : "/getItems",
                        async : "false",
                        data : {'nowPage':num,'type':'food','sort':'date'},
                        success : function (data) {
                            pageData=data;
                            //瀑布流
                            //$container.masonry('appended',$container,true);
                            $container.masonry('reload');

                            $('#masonry').masonry('destroy').empty();
                            for(var i=0;i<pageData["itemList"].length;i++){
                                $(".container-fluid").append("<div class='box'>" +
                                    "<a href='#javascript'>" +
                                    "<img src="+"'"+pageData["itemList"][i].src+"'"+"/>" +
                                    "</a>" +
                                    "<div class='food-news clearfix'>" +
                                    "<p class='food-name'>" +pageData["itemList"][i].title +
                                    "</p>" +
                                    "<p class='food-views'>" +
                                    "<font>"+pageData["itemList"][i].looked+"</font>浏览" +
                                    "</p>" +
                                    "<p class='time-author'>" + pageData["itemList"][i].date + " by " + pageData["itemList"][i].writer +
                                    "</p>" +
                                    "</div>"+"</div>"
                                )
                            }
                            $container.imagesLoaded(function() {
                                $container.masonry({
                                    itemSelector: '.box',
                                    gutter: 20,
                                    isAnimated: true,
                                });
                            });
                            masonryWidth();
                        }
                    });
                }
            });
        }
    });
})