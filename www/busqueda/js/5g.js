/*Esta pagina se encarga de mostrar los loscales del centro comercial */
var onDeviceReady=function(){
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    var parametros=getUrlVars();
    getBanner("5g",parametros["idCentroComercial"],"null","null","null");
    getLocales(parametros["idCentroComercial"]);
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
function getLocales(idCentroComercial)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"almacenes/getlocalesbycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos,function(xml)
                 {
                    if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Almacene");
                            var nombre,id;
                            nombre=$("nombre",obj).text();
                            id=$("id",obj).text();
                            if(id)
                            {
                                estaVacio=false;
                                var html="<li class='todos'>"+
                        "<a href='3.html?idLocal=$2' id='lnktodos'>$1</a>"+
                        "<a class='go'></a>"+
                        "</li>";
                                html=html.replace("$1",nombre);
                                html=html.replace("$2",id);
                                $("#locales").append(html);
                            }
                            
                        });
                    }
                     ocultarDialogo();
                     if(estaVacio)
                     {
                         $("#locales").html("Lo sentimos, no conseguimos informacion");
                     }
                 });
    
    
}