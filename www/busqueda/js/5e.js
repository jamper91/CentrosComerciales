/*Esta pagina se de mostrar una mapa de un piso en especifico */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getMapa(parametros["idPiso"]);
         })();
    }
);

function getMapa(idPiso)
{
    var url="";
    var datos={
        idPiso:idPiso
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        log("5e","getMapa","Entre al if");
        $("",xml).each(function()
        {
            var img;
            $("#mapa").attr("src",img);
        });
    }else
    {
        log("5e","getMapa","Entre al else");
        var img="../../images/centro.jpg";
        $("#mapa").attr("src",img);
    }
    
}