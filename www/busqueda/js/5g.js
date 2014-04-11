/*Esta pagina se encarga de mostrar los servicios del centro comercial */
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
    var url="";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var nombre,id;
            var html="<li><a href='3.html?idLocal=$2'>$1</a></li>";
            html=html.replace("$1",nombre);
            html=html.replace("$2",id);
            $("#locales").append(html);
        });
    }else
    {
        var nombre="Armi",id="1";
        var html="<li><a href='3.html?idLocal=$2'>$1</a></li>";
        html=html.replace("$1",nombre);
        html=html.replace("$2",id);
        $("#locales").append(html);
        
        nombre="Pronto",id="2";
        html="<li><a href='3.html?idLocal=$2'>$1</a></li>";
        html=html.replace("$1",nombre);
        html=html.replace("$2",id);
        $("#locales").append(html);
    }
    
}