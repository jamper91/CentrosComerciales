/* This code is used to run as soon as Intel activates */
var onDeviceReady=function()
{
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
     var parametros=getUrlVars();
     //Determino si llego el id de la ciudad
     if(parametros["idCiudad"])
     {
         var idCiudad,nombreCiudad,urlD;
         idCiudad=parametros["idCiudad"];
         nombreCiudad=parametros["nombreCiudad"];
         nombreCiudad=cambiarAcentos(nombreCiudad);
         urlD=parametros["url"];
         getCentrosComercialesByCiudad(urlD,idCiudad,nombreCiudad);
     }
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

$(document).ready(function()
{
    /*Funciones autoejecutables*/
    (function()
     {
         
     })();
});

function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}

function getCentrosComercialesByCiudad(urlD,idCiudad,nombreCiudad)
{
    mostrarDialogo();
    estaVacio=true;
    console.log("Entre con nombreCiudad: "+nombreCiudad);
    var url=url_base+"centroscomerciales/getcentroscomercialesbyciudad.xml";
    var datos={
        idCiudad:idCiudad
    };
    var xml=ajax(url,datos,
                 function(xml)
                 {
                     if(xml!=null)
                     {
                         var html="<li class='todos'>"+
                                 "<a href='$1?idCiudad=$2&nombreCiudad=$3&idCentroComercial=$4&nombreCentroComercial=$5' id='lnktodos'>$5</a>"+
                                 "<a class='go'></a>"+
                                 "</li>";
                        html=html.replace("$1",urlD);
                        html=html.replace("$2",idCiudad);
                        html=html.replace("$3",nombreCiudad);
                        html=html.replace("$4",0);
                        html=html.replace("$5","Todos");
                        html=html.replace("$5","Todos");
                        $("#centroscomerciales").append(html);
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Centroscomerciale");
                            var valor,texto;

                            valor=$("id",obj).text();
                            texto=$("nombre",obj).text();
                            console.log("valor: "+valor);
                            if(valor)
                            {
                                estaVacio=false;
                                var html="<li class='todos'>"+
                                         "<a href='$1?idCiudad=$2&nombreCiudad=$3&idCentroComercial=$4&nombreCentroComercial=$5' id='lnktodos'>$5</a>"+
                                         "<a class='go'></a>"+
                                         "</li>";
                                html=html.replace("$1",urlD);
                                html=html.replace("$2",idCiudad);
                                html=html.replace("$3",nombreCiudad);
                                html=html.replace("$4",valor);
                                html=html.replace("$5",texto);
                                html=html.replace("$5",texto);
                                $("#centroscomerciales").append(html);    
                            }

                        });
                     }
                     ocultarDialogo();
                     if(estaVacio)
                        $("#centroscomerciales").html("Lo sentimos, no encontramos informacion");
                     
                 });
    
}