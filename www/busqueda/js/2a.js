/*Esta pagina se encarga de recibir los parametros de Ciudad, Centro Comercial y categoria y listara todos los locales que cumplan dichos parametros*/
$(document).ready(function(e)
{
    (function()
     {
         getBanner(null,"../");
         var parametros=getUrlVars();
         getLocales(parametros["idCiudad"],parametros["idCentroComercial"],parametros["idCategoria"]);
     })();
    
});

function getLocales(idCiudad,idCentroComercial,idCategoria)
{

    var url=url_base+"almacenes/getlocalesbybusqueda.xml";
    var datos={
        idCiudad:idCiudad,
        idCentroComercial:idCentroComercial,
        idCategoria:idCategoria
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("l");
                    var nombreLocal,idLocal;
                    nombreLocal=$("nombre",obj).text();
                    idLocal=$("id",obj).text();
                    var html="<li><a href='3.html?idLocal=$1'>$2</a></li>";
                    html=html.replace("$1",idLocal);
                    html=html.replace("$2",nombreLocal)
                    $("#locales").append(html);
                });
            }
         });
    
    
}