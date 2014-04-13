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
    var url=url_base+"promociones/getpromocion.xml";
    var datos={
        idPromocion:idPromocion
    };
    var xml=ajax(url,datos,function(xml)
                 {
                     if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Promocione");
                            var src;
                            src=$("banner",obj).text();
                            $("#promocion").attr("src",src);
                        });
                    }else
                    {
                        var src;
                        $("#promocion").attr("src",src);
                    }
                 });
    
    
}