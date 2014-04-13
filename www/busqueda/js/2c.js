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

function getCentrosComerciales(idCiudad)
{
    var url=url_base+"centroscomerciales/getcentroscomercialescyciudad.xml";
    var datos={
        idCiudad:idCiudad
    };
    ajax(url,datos,function()
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Centroscomerciale");
                    var nombreC,idC;
                    nombreC=$("nombre",obj).text();
                    idC=$("id",obj).text();
                    var html="<li><a href='5a.html?idCentroComercial=$1'>$2</a></li>";
                    html=html.replace("$1",idC);
                    html=html.replace("$2",nombreC)
                    $("#centroscomerciales").append(html);
                });
            }         
         });
    
    
}