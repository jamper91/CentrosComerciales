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
    var url="";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var nombreM,idM;

            var html="<li><a href='5c.html?idMedioTransporte=$1&idCentroComercial=$3'>$2</a></li>";
            html=html.replace("$1",idM);
            html=html.replace("$2",nombreM);
            html=html.replace("$3",idCentroComercial);
            $("#mediostransporte").append(html);
        });
    }else
    {
        var html="<li><a href='5c.html?idMedioTransporte=$1&idCentroComercial=$3'>$2</a></li>";
            html=html.replace("$1","1");
            html=html.replace("$2","Automovil");
            html=html.replace("$3",idCentroComercial);
            $("#mediostransporte").append(html);
        html="<li><a href='5c.html?idMedioTransporte=$1&idCentroComercial=$3'>$2</a></li>";
            html=html.replace("$1","2");
            html=html.replace("$2","Transporte Publico");
            html=html.replace("$3",idCentroComercial);
            $("#mediostransporte").append(html);
    }
    
}