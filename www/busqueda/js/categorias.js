

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
             var idCiudad,nombreCiudad,urlD,idCentroComercial,nombreCentroComercial;
             idCiudad=parametros["idCiudad"];
             nombreCiudad=parametros["nombreCiudad"];
             urlD=parametros["url"];
             idCentroComercial=parametros["idCentroComercial"];
             nombreCentroComercial=parametros["nombreCentroComercial"];
             urlD=urlD+"?idCiudad="+idCiudad+"&nombreCiudad="+nombreCiudad+"&idCentroComercial="+idCentroComercial+"&nombreCentroComercial="+nombreCentroComercial;
             getCategoriasByCentroComercial(urlD,idCentroComercial);
         }
     })();
});



function getCategoriasByCentroComercial(urlD,idCentroComercial)
{
    var url=url_base+"centroscomerciales/getcetegoriasbycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,
        function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("c");
                    var valor,texto;
                    valor=$("id",obj).text();
                    texto=$("nombre",obj).text();
                    var html="<li><a href='$1&idCategoria=$2&nombreCategoria=$3'>$3</a><li>";
                    html=html.replace("$1",urlD);
                    html=html.replace("$2",valor);
                    html=html.replace("$3",texto);
                    html=html.replace("$3",texto);
                    $("#categorias").append(html);
                });
            }
         });
    
    
}