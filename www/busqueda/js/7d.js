$(document).ready(function()
{
    (function()
     {
         getBanner(null,"../");
         getCiudades();
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnGuardar").click(
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
