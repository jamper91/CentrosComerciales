/*Esta pagina se encarga de mostrar los loscales del centro comercial */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getLocales(parametros["idCentroComercial"]);
         })();
    }
);

function getLocales(idCentroComercial)
{
    var url=url_base+"almacenes/getlocalesbycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos,function(xml)
                 {
                    if(xml!=null)
                    {
                        $("datos",xml).each(function()
                        {
                            var obj=$(this).find("a");
                            var nombre,id;
                            nombre=$("nombre",obj).text();
                            id=$("id",obj).text();
                            var html="<li><a href='3.html?idLocal=$2'>$1</a></li>";
                            html=html.replace("$1",nombre);
                            html=html.replace("$2",id);
                            $("#locales").append(html);
                        });
                    }else
                    {

                    }
                 });
    
    
}