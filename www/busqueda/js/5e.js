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
    var url=url_base+"pisos/getMapaByPiso.xml";
    var datos={
        idPiso:idPiso
    };
    ajax(url,datos,function(xml)
                 {
                     if(xml!=null)
                    {
                        log("5e","getMapa","Entre al if");
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Piso");
                            var img;
                            img=$("mapa",obj).text();
                            $("#mapa").attr("src",img);
                        });
                    }else
                    {
                        log("5e","getMapa","Entre al else");
                        var img="../../images/centro.jpg";
                        $("#mapa").attr("src",img);
                    }
                 });
    
    
}