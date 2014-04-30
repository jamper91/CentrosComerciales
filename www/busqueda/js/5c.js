/*Esta pagina se encarga de mostrar informacion , dependiendo de los datos recibidos */
var onDeviceReady=function(){
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    var parametros=getUrlVars();
    getBanner("5c",parametros["idCentroComercial"],"null","null","null");
    getInformacion(parametros["idMedioTransporte"],parametros["idCentroComercial"]);
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             
         })();
    }
);
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getInformacion(idMedioTransporte, idCentroComercial)
{
    mostrarDialogo();
    log("5c","getInformacion", "idMedioTransporte: "+idMedioTransporte);
    log("5c","getInformacion", "idCentroComercial: "+idCentroComercial);
    var url=url_base+"centroscomerciales_mediostransportes/getinformacionmediotransporte.xml";
    var datos={
        idMedioTransporte:idMedioTransporte,
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                log("el xml no es nulo");
                $("datos",xml).each(function()
                {
                    if(idMedioTransporte!=1)
                    {
                        console.log("entre en el if");
                        var obj=$(this).find("c_m");
                        var nombre,informacion;
                        
                        informacion=$("descripcion",obj).text();
                        obj=$(this).find("m");
                        nombre=$("nombre",obj).text();
                        $("#nombre").text(nombre);
                        $("#informacion").text(informacion);
                    }else{
                        console.log("entre en el else");
                        var obj=$(this).find("c_m");
                        var nombre,informacion;
                        
                        informacion=$("descripcion",obj).text();
                        obj=$(this).find("m");
                        nombre=$("nombre",obj).text();
                        $("#nombre").text(nombre);
                        $("#informacion").text(informacion);
                        obj=$(this).find("cc");
                        var lat,lon;
                        lat=$("lat",obj).text();
                        lon=$("lon",obj).text();
                        activarMapa(lat,lon);
                    }
                    

                });
            }
             ocultarDialogo();
         });
    
    
}

function activarMapa(lat,lon)
{
    console.log("entre en el mapa");
    console.log("lat: "+lat);
    console.log("lon: "+lon);
    $("#map_canvas").css("display","block");
    var mapCanvas = document.getElementById('map_canvas');
    var mapOptions = {
      center: new google.maps.LatLng(lat,lon),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lon),
      map: map,
      icon: iconBase + 'schools_maps.png'
    });


  

}