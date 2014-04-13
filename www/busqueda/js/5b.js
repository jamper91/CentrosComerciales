/*Esta pagina se encarga de listar los medios de transporte*/
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getMediosTransporte(parametros["idCentroComercial"]);
         })();
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