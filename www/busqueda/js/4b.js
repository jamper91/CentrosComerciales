//Esta pagina se encarga de obtener los ids de los locales para graficarlos en el mapa
var map,markers;
var idO1,idF1;

/*Posiciones de los locales donde:
        x=      Posicion x
        y=      Posicion y
        idE=    Id de la escalera
        bE=     Variable que representa el bloque al que pertenece la escalera
        ex=     Posicion escalera x
        ey=     Posicion escalera y
        p=      Piso del local
        urlM=   Url de la imagen del mapa
    */
    var x0,y0,idE0,bE0,ex0,ey0,p0,urlM;
    var x1,y1,ex1,ey1,p1;

var onDeviceReady=function()
{
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
      var parametros=getUrlVars();
      getBanner("4b","null","null",parametros["idO"],"null");
      mostrarDialogo();
      obtenerCoordenadas(parametros["idO"],parametros["idF"],function()
                         {
                             ini(urlM);
                             obtemerCoordenadas2(parametros["idF"],function()
                                                 {
                                                     analisis();
                                                     ocultarDialogo();
                                                 });
                         });
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);
$(document).ready(function()
{
    (function()
      {
          
      }
     )();
    $("#continuar").click(
        function(e)
        {
            e.preventDefault();
            obtenerCoordenadas(idO1,idF1,function()
                             {
                                 obtemerCoordenadas2(idF1,function()
                                                     {
                                                         analisis();
                                                     });
                             });
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
/*Esta funcion se encarga de obtener las coordenadas de los locales dados*/
function  obtenerCoordenadas(idO, idF, callback)
{
    alert("entre con "+idO+" y "+idF);
    idF1=idF;
    
    /*Obtencion de datos*/
    
    var url=url_base+"almacenes/getinformacionlocal.xml";
    var datos={
        idLocal:idO
    }
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                console.log("Ente al primer ajax");
                $("datos",xml).each(
                    function()
                    {
                        var obj=$(this).find("Piso");
                        urlM=$("mapa",obj).text();
                        p0=$("numero",obj).text();
                        
                        obj=$(this).find("Almacene");
                        x0=$("x",obj).text();
                        y0=$("y",obj).text();
                        idE0=$("escaleracercana",obj).text();
                        bE0=$("bloque",obj).text();
                        
                        //Obtengo las coordenadas de la escalera
                        url=url_base+"almacenes/getcoordenadasescalera.xml";
                        datos={
                            idEscalera: idE0
                        }
                        ajax(url,datos,
                             function(xml2)
                             {
                                 console.log("Ente al segundo ajax");
                                 $("datos",xml2).each(
                                    function()
                                    {
                                        var obj2=$(this).find("Almacene");  
                                        ex0=$("x",obj2).text();
                                        ey0=$("y",obj2).text();
                                        
                                    });
                                 
                             });
                        
                    }
                );
                  callback();
               
                /*Fin Obtencion de datos*/
            }else{
            }
         });
  
   
    
}

function obtemerCoordenadas2(idF,callback)
{
    var url=url_base+"almacenes/getinformacionlocal.xml";
      var datos={
        idLocal:idF
    }
    ajax(url,datos,
         function(xml)
         {
                if(xml!=null)
                {
                    console.log("Ente al tercer ajax");
                     $("datos",xml).each(
                         function()
                         {
                            var obj=$(this).find("Almacene");
                            x1=$("x",obj).text();
                            y1=$("y",obj).text();
                            obj=$(this).find("Piso");
                            p1=$("numero",obj).text();

                            

                       
                         });
                 }
             callback();
         }); 
    
}

function analisis()
{
     /*Analisis Ruta*/
    console.log(p0+"=="+p1);
    /*Si se encuentran en el mismo piso*/
    if(p0==p1)
    {
        agregarMarcador(x0,y0,"10",null,null);
        //$("#origen").css("top",y0);
        //$("#origen").css("left",x0);
        agregarMarcador(x1,y1,"10",null,null);
        //$("#fin").css("top",y1);
        //$("#fin").css("left",x1);
        /* Desabilito el boton continuar */
        $("#continuar").css("display","none");
    }else{
        log("4b","obtenerCoordenadas","Entre al else");
        /*Si no se encuentran en el mismo piso, muestro el mapa que va desde el origen hasta las escaleras*/
        //$("#origen").css("top",y0);
        //$("#origen").css("left",x0);
        agregarMarcador(x0,y0,"10",null,null);
        //$("#fin").css("top",ey0);
        //$("#fin").css("left",ex0);
        agregarMarcador(ex0,ey0,"10",null,null);
        log("4b","obtenerCoordenadas","y0: "+y0);
        log("4b","obtenerCoordenadas","x0: "+x0);
        log("4b","obtenerCoordenadas","y1: "+ey0);
        log("4b","obtenerCoordenadas","x1: "+ex0);
        /* Habilito el boton continuar */
        $("#continuar").css("display","block");
        /*Obtengo el id de la escalera del siguiente piso*/
        obtenerEscalera(parseInt( p0)+1,bE0);
        /*idO1=idE;*/
/*        idF1=idF;*/


    }
     /*Fin Analisis Ruta*/ 
}

/*
Se encarga de obtener el id de la escalera de un piso en especifico
piso      ->  Piso de la escalera
bloque    ->  Bloque de la escalera, ya que un piso puede tener multiples escaleras
*/
function obtenerEscalera(piso,bloque)
{
    var id=-1;
    var url=url_base+"almacenes/getescalerabypisobloque.xml";
    var datos={
        piso:piso,
        bloque:bloque
    }
    ajax(url,datos,
                 function(xml)
                 {
                     console.log("no es nulo el xml");
                     console.log("piso: "+piso);
                     console.log("bloque: "+bloque);
                    if(xml!=null)
                    {
                        $("datos",xml).each(
                            function()
                            {
                                console.log("encontre un datos");
                                var obj=$(this).find("a");
                                idO1=$("id",obj).text();
                                console.log("el id es :"+idO1);
                            }
                        );
                    }else{
                        id01-1;
                    }
                     
                 });
    
    
}

function ini(urlM)
{
    console.log("Urlm: "+urlM);
        map = new OpenLayers.Map('mapa');

        var graphic = new OpenLayers.Layer.Image(
            'Piso',
            urlM,
            new OpenLayers.Bounds(0, 0, 1000, 1000),
            new OpenLayers.Size(300, 300),
            {numZoomLevels: 10}
        );

        map.addLayer(graphic);
        markers= new OpenLayers.Layer.Markers( "Marcadores" );
        map.addLayer(markers);
        var center=new OpenLayers.LonLat(500,500);
        map.setCenter(center, 1);

}


function agregarMarcador(longitud,latitud,mensajeHtml,closeBox,overflow)
{
    //Variable para determinar el tamaño de los popup
    var AutoSizeAnchoredMinSize = OpenLayers.Class(OpenLayers.Popup.Anchored, {
            'autoSize': true, 
            'minSize': new OpenLayers.Size(400,400)
        });
    var ll = new OpenLayers.LonLat(longitud,latitud);
    var popupClass = AutoSizeAnchoredMinSize;
    var popupContentHTML = mensajeHtml;

    var feature = new OpenLayers.Feature(markers, ll);
    feature.closeBox = closeBox;
    feature.popupClass = popupClass;
    feature.data.popupContentHTML = popupContentHTML;

    feature.data.overflow = (overflow) ? "auto" : "hidden";

    var marker = feature.createMarker();

    var markerClick = function (evt) {
    if (this.popup == null)
    {
        this.popup = this.createPopup(this.closeBox);
        mapa.addPopup(this.popup);
        this.popup.show();
    } else {
        this.popup.toggle();
    }
        currentPopup = this.popup;
        OpenLayers.Event.stop(evt);
    };
    marker.events.register("mousedown", feature, markerClick);
    markers.addMarker(marker);
}