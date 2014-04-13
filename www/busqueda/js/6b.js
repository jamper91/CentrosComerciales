/*Esta pagina se encarga de mostrar las promociones */
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

function getPromociones(idCentroComercial)
{
    var url=url_base+"promociones/getpromociones.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,function(xml)
                 {
                     if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("Promocione");
                            
                            var src,id;
                            src=$("banner",obj).text();
                            id=$("id",obj).text();
                            var html="<li><a href='$2'><img src='$1' /></a></li>";
                            html=html.replace("$1",src);
                            html=html.replace("$2","6a.html?idPromocion="+id);
                            $("#promociones").append(html);
                        });
                    }else
                    {

                    }
                 });
    
    
}