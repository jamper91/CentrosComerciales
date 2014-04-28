

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
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}


function getCategoriasByCentroComercial(urlD,idCentroComercial)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"centroscomerciales/getcetegoriasbycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,
        function(xml)
         {
            if(xml!=null)
            {
                var html="<li class='todos'>"+
                         "<a href='$1&idCategoria=$2&nombreCategoria=$3' id='lnktodos'>$3</a>"+
                         "<a class='go'></a>"+
                         "</li>";
                    html=html.replace("$1",urlD);
                    html=html.replace("$2",0);
                    html=html.replace("$3","Todas");
                    html=html.replace("$3","Todas");
                    $("#categorias").append(html);
                $("datos",xml).each(function()
                {
                    
                    var obj=$(this).find("c");
                    var valor,texto;
                    valor=$("id",obj).text();
                    texto=$("nombre",obj).text();
                    if(valor)
                    {
                        estaVacio=false;
                        html="<li class='todos'>"+
                             "<a href='$1&idCategoria=$2&nombreCategoria=$3' id='lnktodos'>$3</a>"+
                             "<a class='go'></a>"+
                             "</li>";
                        html=html.replace("$1",urlD);
                        html=html.replace("$2",valor);
                        html=html.replace("$3",texto);
                        html=html.replace("$3",texto);
                        $("#categorias").append(html);
                    }
                    
                });
            }
             ocultarDialogo();
             if(estaVacio)
                 $("#categorias").html("Lo sentimos, no encontramos informacion");
         });
    
    
}