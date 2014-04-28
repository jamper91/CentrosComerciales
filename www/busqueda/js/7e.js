$(document).ready(function()
{
    (function()
     {
         getBanner(null,"../");
         getCiudades();
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnEnviar").click(
        function(e)
        {
            e.preventDefault();
            $("#mejorar").submit();
        }
    );
});