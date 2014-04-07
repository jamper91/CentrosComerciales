/*Esta pagina se encarga de listar los centros comerciales de una ciudad dada*/
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             var idCiudad=parametros["idCiudad"];
             getCentrosComerciales(idCiudad);
         })();
    }
);

function getCentrosComerciales(idCiudad)
{
    var url="";
    var datos={
        idCiudad:idCiudad
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var nombreC,idC;

            var html="<li><a href='5a.html?idCentroComercial=$1'>$2</a></li>";
            html=html.replace("$1",idC);
            html=html.replace("$2",nombreC)
            $("#centroscomerciales").append(html);
        });
    }
    
}