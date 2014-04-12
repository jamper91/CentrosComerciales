

$(document).ready(function()
{
    /*Funciones autoejecutables*/
    (function()
     {
         //getBanner(null,"../");
         getCiudades();
         autocompletar();
     })();
    
    /*Function que se activa al cambiar un elemento del select ciudades*/
    $("#ciudades").change(function()
    {
        /*Obtengo el elemento seleccionado*/
        var idCiudad=$("#ciudades").val();
        getCentrosComercialesByCiudad(idCiudad);
    });
    /*Funcion que se activa al cambiar un elemento del select centros comerciales*/
    $("#centroscomerciales").change(function()
    {
        /*Obtengo el elemento seleccionado*/
        var idCentroComercial=$("#centroscomerciales").val();
        getCategoriasByCentroComercial(idCentroComercial);
    });
});


/*Se encarga de obtener las ciudades de la base de datos y mostrarlas en un select*/
function getCiudades()
{
    

    var url="http://192.168.0.13/CentrosComercialesWeb/Ciudades/index.xml";
   /* url="http://hoyenlahistoria.ejemplosprogramacion.co/Historias/today.xml?day=9&month=4";
    
    url="http://time.jsontest.com/";*/
    var datos={
    };
    
    /*$.ajax({
        url: url,
        type: "GET",
        data: datos,
        headers: { 'Access-Control-Allow-Origin': '*' },
        crossDomain: true,
        error: function( jqXHR, textStatus, errorThrown )
        {
            log("base","ajax","jqXHR: "+imprimirObjeto(jqXHR));
            log("base","ajax","textStatus: "+textStatus);
            log("base","ajax","errorThrown: "+imprimirObjeto(errorThrown));
        },
        success: function(data)
        {
            log("1a","getCiudades","el xml no es nulo")
            $("ciudades",data).each(function()
            {
                var obj=$(this).find("Ciudade");
                var valor,texto;
                valor=$("id",obj).text();
                texto=$("nombre",obj).text();
                var html="<option value='"+valor+"'>"+texto+"</option>";
                $("#ciudades").append(html);
            });
        }
    });*/
    
    ajax(url,datos,
                 function(xml)
                 {
                     if(xml!=null)
                    {
                        log("1a","getCiudades","el xml no es nulo:"+ xmlToString(xml));
                        $("ciudades",xml).each(function()
                        {
                            var obj=$(this).find("Ciudade");
                            var valor,texto;
                            valor=$("id",obj).text();
                            texto=$("nombre",obj).text();
                            var html="<option value='"+valor+"'>"+texto+"</option>";
                            $("#ciudades").append(html);
                        });
                    }else{
                        log("1a","getCiudades","el xml es nulo")
                    }
                 });
    
    
}

function getCentrosComercialesByCiudad(idCiudad)
{
    log("busquedaTienda","getCentrosComercialesByCiudad","idCiudad: "+idCiudad);
    var url="";
    var datos={
        idCiudad:idCiudad
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var valor,texto;

            var html="<option value='"+valor+"'>"+texto+"</option>";
            $("#centroscomerciales").append(html);
        });
    }
    
}
function getCategoriasByCentroComercial(idCentroComercial)
{
    log("busquedaTienda","getCategoriasByCentroComercial","idCentroComercial: "+idCentroComercial);
    var url="";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var valor,texto;

            var html="<option value='"+valor+"'>"+texto+"</option>";
            $("#categorias").append(html);
        });
    }
    
}
/*Esta funcion va  a la vista 2a y le envia los parametros necesarios*/
function goTo2a()
{
    //Obtengo las variables a enviar
    var idCiudad,idCentroComercial,idCategoria;
    idCiudad=$("#ciudades").val();
    idCentroComercial=$("#centroscomerciales").val();
    idCategoria= $("#categorias").val();
    
    //Redirijo
    $(location).attr("href","2a.html?idCiudad="+idCiudad+"&idCentroComercial="+idCentroComercial+"&idCategoria="+idCategoria);
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
    if(xml!=null)
    {
        var xml=ajax(url,datos);
        $("",xml).each(function()
        {
            var idL,nombreL;
            locales.push({id:idL,value:nombreL});
        });
    }
    
    
    
    $( "#nombreLocal" ).autocomplete({
        source: locales,
        select: function(event,ui)
        {
            //Envio al usuario a la vista 3
            var url="2b.html?idLocal=$1";
            url=url.replace("$1",ui.item.id);
            log("1a","autocompletar","url: "+url);
            //redirigir("2b.html?idLocal="+ui.item.id);
        }
    });
}
/*Esta funcion va  a la vista 2b y le envia los parametros necesarios*/
function goTo2a()
{
    //Obtengo las variables a enviar
    var nombreLocal;
    nombreLocal=$("#nombreLocal").val();
    
    //Redirijo
    $(location).attr("href","2b.html?nombreLocal="+nombreLocal);
}
            