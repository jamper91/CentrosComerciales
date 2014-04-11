/*Esta pagina se encarga de mostrar informacion , dependiendo de los datos recibidos */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getInformacion(parametros["idMedioTransporte"],parametros["idCentroComercial"]);
         })();
    }
);

function getInformacion(idMedioTransporte, idCentroComercial)
{
    var url="";
    var datos={
        idMedioTransporte:idMedioTransporte,
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var nombre,informacion;
            $("#nombre").text(nombre);
            $("#informacion").val(informacion);
        });
    }else
    {
         var nombre="Transporte Publico",informacion="Cojase un transmilleno y se baja donde vea que esta perdido";
            $("#nombre").text(nombre);
            $("#informacion").val(informacion);
    }
    
}