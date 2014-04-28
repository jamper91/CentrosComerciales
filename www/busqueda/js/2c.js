/*Esta pagina se encarga de listar los centros comerciales de una ciudad dada*/
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             var idCiudad=parametros["idCiudad"];
             getCentrosComerciales(idCiudad);
         })();
    }
);
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getCentrosComerciales(idCiudad)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"centroscomerciales/getcentroscomercialesbyciudad.xml";
    var datos={
        idCiudad:idCiudad
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Centroscomerciale");
                    var nombreC,idC;
                    nombreC=$("nombre",obj).text();
                    idC=$("id",obj).text();
                    if(idC)
                    {
                        estaVacio=false;
                        var html="<li class='todos'>"+
                             "<a href='5a.html?idCentroComercial=$1' id='lnktodos'>$2</a>"+
                             "<a class='go'></a>"+
                             "</li>";
                        html=html.replace("$1",idC);
                        html=html.replace("$2",nombreC)
                        $("#centroscomerciales").append(html);
                    }
                   
                });
            }
             ocultarDialogo();
             if(estaVacio)
                 $("#centroscomerciales").append("Lo sentimos, no encontramos informacion");
         });
    
    
}