var onDeviceReady=function(){
//hide splash screen
    intel.xdk.device.hideSplashScreen();
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

$(document).ready(function()
{
    (function()
     {
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnEnviar").click(
        function(e)
        {
            e.preventDefault();
            $("#mejorar").submit();
        }
    );
});