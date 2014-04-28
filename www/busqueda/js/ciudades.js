//Se encarga de listar las ciudades y mostrarlas en una lista

$(document).ready(function()
{
    /*Funciones autoejecutables*/
    (function()
     {
         var parametros=getUrlVars();
         getCiudades(parametros["url"]);
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

/*Se encarga de obtener las ciudades de la base de datos y mostrarlas en un select*/
function getCiudades(urlD)
{
    mostrarDialogo();
    estaVacio=true;
    console.log("urlD: "+urlD);
    var url=url_base+"ciudades/index.xml";
    var datos={
    };

    console.log("url: "+url);
    ajax(url,datos,
     function(xml)
     {
        if(xml!=null)
        {
//            $("#ciudades").append("<option value='0'>Seleccione...</option>");
            $("datos",xml).each(function()
            {
                
                var obj=$(this).find("Ciudade");
                var valor,texto;
                valor=$("id",obj).text();
                texto=$("nombre",obj).text();
                if(valor)
                {
                    console.log("Valor: "+valor);
                    estaVacio=false;
                    var html="<li class='todos'>"+
                             "<a href='$1?idCiudad=$2&nombreCiudad=$3' id='lnktodos'>$4</a>"+
                             "<a class='go'></a>"+
                             "</li>";
                    html=html.replace("$1",urlD);
                    html=html.replace("$2",valor);
                    html=html.replace("$3",texto);
                    html=html.replace("$4",texto);
                    $("#ciudades").append(html);
                }
            });
            
        }
        ocultarDialogo();
        if(estaVacio)
            $("#ciudades").html("Lo sentimos, no encontramos informacion");
         
     });
    
    
}