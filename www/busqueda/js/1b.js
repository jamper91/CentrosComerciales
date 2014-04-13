$(document).ready(function()
{
    (function()
     {
         getBanner(null,"../");
         getCiudades();
         autocompletar();
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnBuscar").click(
        function(e)
        {
            e.preventDefault();
            var idCiudad=$("#ciudades").val();
            redirigir("2c.html?idCiudad="+idCiudad);
        }
    );
});

/*Se encarga de obtener las ciudades de la base de datos y mostrarlas en un select*/
function getCiudades()
{
    console.log("Entre getCiudades");
    $("#ciudades").html("");
    var url=url_base+"ciudades/index.xml";
    var datos={
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("#ciudades").append("<option value='0'>Selecciones ..</option>");
                $("ciudades",xml).each(function()
                {
                    var obj=$(this).find("Ciudade");
                    var valor,texto;
                    valor=$("id",obj).text();
                    texto=$("nombre",obj).text();
                    var html="<option value='"+valor+"'>"+texto+"</option>";
                    $("#ciudades").append(html);
                });
            }         
         });
    
    
}
/*Esta funcion se encarga de obtener los nombre de los centros comerciales para que se pueda ver la funcion de autocompletar*/
function autocompletar()
{
    var locales=new Array();
    var url=url_base+"centroscomerciales/index.xml";
    var datos={
        
    };
    ajax(url,datos,function(xml)
         {
            $("datos",xml).each(function()
            {
                var obj=$(this).find("Centroscomerciale");
                
                var idL,nombreL;
                idL=$("id",obj).text();
                nombreL=$("nombre",obj).text();
                locales.push({id:idL,value:nombreL});
            });
         });
    $( "#nombreCentroComercial" ).autocomplete({
    source: locales,
    select: function(event,ui)
        {
            //Envio al usuario a la vista 3
            redirigir("5a.html?idCentroComercial="+ui.item.id);
        }
    });
}
