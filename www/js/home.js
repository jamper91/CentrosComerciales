
/* This code is used to run as soon as Intel activates */
var onDeviceReady=function(){
//hide splash screen
intel.xdk.device.hideSplashScreen();
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);


/*Esta funcion se encarga de obtener las imagenes del banner inferior*/
function banner()
{
    var url="";
    var datos={
        id:2
    }
    var xml=ajax(url,datos);
    $(xml,"item").each(function()
    {
        var urlImagen="";
        var html='<div class="item"><img src="'+urlImagen+'"></div>';
        $("#owl-demo").append(html);
    });
}