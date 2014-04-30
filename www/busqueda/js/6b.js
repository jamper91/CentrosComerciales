/*Esta pagina se encarga de mostrar las promociones */
var onDeviceReady=function(){
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    var parametros=getUrlVars();
    getPromociones(parametros["idCentroComercial"]);
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
function getPromociones(idCentroComercial)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"promociones/getpromociones.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,function(xml)
                 {
                     if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Promocione");
                            
                            var src,id;
                            src=$("banner",obj).text();
                            id=$("id",obj).text();
                            if(id)
                            {
                                estaVacio=false;
                                var html="<a href='$2'><img src='$1' /></a>";
                                html=html.replace("$1",src);
                                html=html.replace("$2","6a.html?idPromocion="+id);
                            $("#promociones").append(html);
                            }
                            
                        });
                    }
                     ocultarDialogo();
                     if(estaVacio)
                     {
                         $("#promociones").html("Lo sentimos, no conseguimos informacion");
                     }
                 });
    
    
}