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
    log("5c","getInformacion", "idMedioTransporte: "+idMedioTransporte);
    log("5c","getInformacion", "idCentroComercial: "+idCentroComercial);
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
            activarMapa();
         
    }
    
}

function activarMapa()
{
    /*$("#map_canvas").attr("display","block");*/
    var mapCanvas = document.getElementById('map_canvas');
    var mapOptions = {
      center: new google.maps.LatLng(4.6753515,-74.0479714),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(4.6753515,-74.0479714),
      map: map,
      icon: iconBase + 'schools_maps.png'
    });


  

}