/**
 * Created by zi_ge on 2017/7/2.
 */
/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
xiuxiu.embedSWF("home",5,"100%","100%");
//修改为您自己的图片上传接口
xiuxiu.setUploadURL("http://web.upload.meitu.com/image_upload.php");
xiuxiu.setUploadType(2);
xiuxiu.setUploadDataFieldName("upload_file");
xiuxiu.onInit = function ()
{
    xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
}
xiuxiu.onUploadResponse = function (data)
{
    //alert("上传响应" + data);  可以开启调试
}