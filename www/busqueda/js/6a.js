/*Esta pagina se encarga de mostrar el banner seleccionado */
var onDeviceReady=function(){
//hide splash screen
    intel.xdk.device.hideSplashScreen();
    var parametros=getUrlVars();
    getPromociones(parametros["idPromocion"]);
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             
         })();
    }
);
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getPromociones(idPromocion)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"promociones/getpromocion.xml";
    var datos={
        idPromocion:idPromocion
    };
    var xml=ajax(url,datos,function(xml)
                 {
                    if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Promocione");
                            var src;
                            if(src)
                            {
                                estaVacio=false;
                                src=$("banner",obj).text();
                                $("#promocion").attr("src",src);
                            }
                            ocultarDialogo();
                            if(estaVacio)
                            {
                                $("#Imagen").html("Lo sentimos, no conseguimos informacion");
                            }
                            
                        });
                    }
                 });
    
    
}