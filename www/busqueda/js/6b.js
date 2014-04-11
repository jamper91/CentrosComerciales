/*Esta pagina se encarga de mostrar el banner seleccionado */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             var parametros=getUrlVars();
             getPromociones(parametros["idCentroComercial"]);
         })();
    }
);

function getImagenBanner(idCentroComercial)
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
            var src,id;
            var html="<li><a href='$2'><img src='$1' /></a></li>";
            html=html.replace("$1",src);
            html=html.replace("$2","6a.html?idPromocion="+id);
            $("#promociones").append(html);
        });
    }else
    {
        
    }
    
}