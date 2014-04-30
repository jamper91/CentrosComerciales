/*
Esta pagina permite buscar centros comerciales por ciudad, o nombre
*/
var idCiudad,nombreCiudad;
var onDeviceReady=function()
{
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    autocompletar();
    var parametros=getUrlVars();
    if(parametros["idCiudad"]){
     idCiudad=parametros["idCiudad"];
     nombreCiudad=parametros["nombreCiudad"];
     nombreCiudad=cambiarAcentos(nombreCiudad);
     nombreCiudad=cambiarAcentos2(nombreCiudad);
     $("#lnkCiudad").html(nombreCiudad);
    }else{
     idCiudad=getIdCiudad();
     $("#lnkCiudad").html(getNombreCiudad());
    }
    getBanner("1b","null","null","null","null");
    
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

$(document).ready(function()
{
    (function()
     {
         
         
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnBuscar").click(
        function(e)
        {
            e.preventDefault();
            redirigir("2c.html?idCiudad="+idCiudad);
        }
    );
});


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
                nombreL=cambiarAcentos(nombreL);
                nombreL=cambiarAcentos2(nombreL);
                locales.push({id:idL,value:nombreL});
            });
         });
    $( "#nombreCentroComercial" ).autocomplete({
    source: locales,
    select: function(event,ui)
        {
            //Envio al usuario a la vista 3
            redirigir("5a.html?idCentroComercial="+ui.item.id);
        },
    response: function(event, ui) {
        if (!ui.content.length) {
            var noResult = { value:"",label:"Sin coincidencia" };
            ui.content.push(noResult);
        }
    }
    });
}
