

$(document).ready(function()
{
    /*Funciones autoejecutables*/
    (function()
     {
         //getBanner(null,"../");
         var parametros=getUrlVars();
         //Determino si llego el id de la ciudad
         if(parametros["idCiudad"])
         {
             var idCiudad,nombreCiudad,urlD;
             idCiudad=parametros["idCiudad"];
             nombreCiudad=parametros["nombreCiudad"];
             urlD=parametros["url"];
             getCentrosComercialesByCiudad(urlD,idCiudad,nombreCiudad);
         }
     })();
});



function getCentrosComercialesByCiudad(urlD,idCiudad,nombreCiudad)
{
    var url=url_base+"centroscomerciales/getCentrosComercialesByCiudad.xml";
    var datos={
        idCiudad:idCiudad
    };
    var xml=ajax(url,datos,
                 function(xml)
                 {
                    $("datos",xml).each(function()
                    {
                        var obj=$(this).find("Centroscomerciale");
                        var valor,texto;
                        
                        valor=$("id",obj).text();
                        texto=$("nombre",obj).text();
                        console.log("valor: "+valor);
                        if(valor)
                        {
                            var html="<li><a href='$1?idCiudad=$2&nombreCiudad=$3&idCentroComercial=$4&nombreCentroComercial=$5'>$5</a></li>";
                            html=html.replace("$1",urlD);
                            html=html.replace("$2",idCiudad);
                            html=html.replace("$3",nombreCiudad);
                            html=html.replace("$4",valor);
                            html=html.replace("$5",texto);
                            html=html.replace("$5",texto);
                            $("#centroscomerciales").append(html);    
                        }
                        
                    });
                 });
    
}