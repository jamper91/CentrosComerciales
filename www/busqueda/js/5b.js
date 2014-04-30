/*Esta pagina se encarga de listar los medios de transporte*/
var idCentroComercial;

var onDeviceReady=function()
{
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    var parametros=getUrlVars();
    idCentroComercial=parametros["idCentroComercial"];
    getBanner("5b",idCentroComercial,"null","null","null");
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             
             //getMediosTransporte(idCentroComercial);
         })();
        $("#lnkauto").click(
            function(e)
            {
                e.preventDefault();
                var url="5c.html?idMedioTransporte=1&idCentroComercial=$1";
                url=url.replace("$1",idCentroComercial);
                redirigir(url);
            }
        );
        $("#lnktp").click(
            function(e)
            {
                e.preventDefault();
                var url="5c.html?idMedioTransporte=2&idCentroComercial=$1";
                url=url.replace("$1",idCentroComercial);
                redirigir(url);
            }
        );
        $("#lnkotros").click(
            function(e)
            {
                e.preventDefault();
                var url="5c.html?idMedioTransporte=3&idCentroComercial=$1";
                url=url.replace("$1",idCentroComercial);
                redirigir(url);
            }
        );
        
    }
);

function getMediosTransporte(idCentroComercial)
{
    log("5b","getMediosTransporte","IdCentroComercial: "+idCentroComercial);
    var url=url_base+"centroscomerciales/getmediostransportebycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,
         function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("m");
                    var nombreM,idM;
                    nombreM=$("nombre",obj).text();
                    idM=$("id",obj).text();
                    var html="<li><a href='5c.html?idMedioTransporte=$1&idCentroComercial=$3'>$2</a></li>";
                    html=html.replace("$1",idM);
                    html=html.replace("$2",nombreM);
                    html=html.replace("$3",idCentroComercial);
                    $("#mediostransporte").append(html);
                });
            }
         });
    
    
}