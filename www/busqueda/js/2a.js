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
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getLocales(idCiudad,idCentroComercial,idCategoria)
{
    mostrarDialogo();
    var estaVacio=true;
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
                    nombreLocal=cambiarAcentos2(nombreLocal);
                    idLocal=$("id",obj).text();
                    if(idLocal)
                    {
                        estaVacio=false;
                        
                        var html="<li class='todos'>"+
                             "<a href='3.html?idLocal=$1' id='lnktodos'>$2</a>"+
                             "<a class='go'></a>"+
                             "</li>";
                        html=html.replace("$1",idLocal);
                        html=html.replace("$2",nombreLocal)
                        $("#locales").append(html);
                    }
                    
                });
            }
             ocultarDialogo();
             if(estaVacio)
                 $("#locales").append("Lo sentimos, no encontramos informacion");
         });
}