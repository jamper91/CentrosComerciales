/*Esta pagina se encarga de mostrar el banner seleccionado */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             var parametros=getUrlVars();
             getImagenBanner(parametros["idBanner"]);
         })();
    }
);

function getImagenBanner(idBanner)
{
    var url="";
    var datos={
        idBanner:idBanner
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var src;
            $("#banner").attr("src",src);
        });
    }else
    {
        var src;
        $("#banner").attr("src",src);
    }
    
}