/*Esta pagina se encarga de mostrar el banner seleccionado */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             var parametros=getUrlVars();
             getPromociones(parametros["idPromocion"]);
         })();
    }
);

function getPromociones(idPromocion)
{
    var url="";
    var datos={
        idPromocion:idPromocion
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var src;
            $("#promocion").attr("src",src);
        });
    }else
    {
        var src;
        $("#promocion").attr("src",src);
    }
    
}