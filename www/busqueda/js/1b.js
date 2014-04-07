$(document).ready(function()
{
    (function()
     {
         getBanner(null,"../");
         getCiudades();
     });
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
    var url="";
    var datos={
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var valor,texto;

            var html="<option value='"+valor+"'>"+texto+"</option>";
            $("#ciudades").append(html);
        });
    }
    
}
/*Esta funcion se encarga de obtener los nombre de los locales para que se pueda ver la funcion de autocompletar*/
function autocompletar()
{
    var locales=new Array();
    locales.push({id:1, value:"MCDonals"});
    locales.push({id:2, value:"El corral"});
    locales.push({id:3, value:"El Exito"});
    var url="";
    var datos={
        
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var idC,nombreC;
            locales.push({id: idC,value:nombreC});
        });
    }

    $( "#nombreCentroComercial" ).autocomplete({
    source: locales,
    select: function(event,ui)
        {
            //Envio al usuario a la vista 3
            redirigir("5a.html?idLocal="+ui.item.id);
        }
    });
}
