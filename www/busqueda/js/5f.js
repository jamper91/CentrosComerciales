/*Esta pagina se encarga de mostrar los servicios del centro comercial */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getServicios(parametros["idCentroComercial"]);
         })();
    }
);

function getServicios(idCentroComercial)
{
    var url="";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var nombre;
            var html="<li>$1</li>";
            html=html.replace("$1",nombre);
            $("#servicios").append(html);
        });
    }else
    {
        var nombre="Baños";
        var html="<li>$1</li>";
        html=html.replace("$1",nombre);
        $("#servicios").append(html);
    }
    
}