/*Esta pagina se encarga de mostrar los servicios del centro comercial */
var onDeviceReady=function(){
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    var parametros=getUrlVars();
    getBanner("5f",parametros["idCentroComercial"],"null","null","null");
    getServicios(parametros["idCentroComercial"]);
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
function getServicios(idCentroComercial)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"servicios/getserviciosbycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos,function(xml)
                 {
                    if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            
                            var obj=$(this).find("s");
                            var nombre;
                            nombre=$("nombre",obj).text();
                            if(nombre)
                            {
                                estaVacio=false;
                                var html="$1<br>";
                                html=html.replace("$1",nombre);
                                $("#servicios").append(html);
                            }
                            
                        });
                    }
                     ocultarDialogo();
                     if(estaVacio)
                     {
                         $("#servicios").html("Lo sentimos, no conseguimos infformacion");
                     }
                 });
    
    
}