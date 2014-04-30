var onDeviceReady=function(){
//hide splash screen
    intel.xdk.device.hideSplashScreen();
    getCiudades();
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

$(document).ready(function()
{
    (function()
     {
         
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnGuardar").click(
        function(e)
        {
            e.preventDefault();
            var idCiudad=$("#ciudades").val();
            var nombreCiudad=$("#ciudades option:selected").text();
            setIdCiudad(idCiudad);
            setNombreCiudad(nombreCiudad);
            redirigir("../index.html");
        }
    );
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
function getCiudades()
{
    mostrarDialogo();
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
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Ciudade");
                    var valor,texto;
                    valor=$("id",obj).text();
                    texto=$("nombre",obj).text();
                    var html="<option value='"+valor+"'>"+texto+"</option>";
                    $("#ciudades").append(html);
                });
                ocultarDialogo();
                //Ahora determino si ya existe una ciudad en sesion
                var idCiudad=getIdCiudad();
                if(idCiudad)
                {
                    console.log("Existe idCiudad en sesion");
                    $("#ciudades").val(idCiudad);
                }
            }         
         });
    
    
}
