//Esta pagina permite buscar almacenes dentro  de un centro comercial, tanto por el nombre, o por la categoria
var parametros=getUrlVars();
var idCiudad,nombreCiudad;
var idCentro,nombreCentro;
var idCategoria,nombreCategoria;
$(document).ready(function()
{
    /*Funciones autoejecutables*/
    (function()
     {
         //getBanner(null,"../");
         
         //Determino si llego el id de la ciudad
         if(parametros["idCiudad"])
         {
            
             idCiudad=parametros["idCiudad"];
             nombreCiudad=parametros["nombreCiudad"];
             var regex = new RegExp('%20', 'g');
             nombreCiudad = nombreCiudad.replace(regex, ' ');
             //Modifico el texto que dice le nombre de la ciudad
             $("#lnkCiudad").text(nombreCiudad);
             //Modifico y habilito el link para buscar centros comerciales
             $("#lnkCentroComercial").attr("href","centroscomerciales.html?url=1a.html&idCiudad="+idCiudad+"&nombreCiudad="+nombreCiudad);
         }
         if(parametros["idCentroComercial"])
         {
             
             idCentro=parametros["idCentroComercial"];
             nombreCentro=parametros["nombreCentroComercial"];
             var regex = new RegExp('%20', 'g');
             nombreCentro = nombreCentro.replace(regex, ' ');
             //Modifico el texto que dice le nombre del centro comercial
             $("#lnkCentroComercial").text(nombreCentro);
             //Modifico y habilito el link para buscar categorias
             $("#lnkCategorias").attr("href","categorias.html?url=1a.html&idCiudad="+idCiudad+"&nombreCiudad="+nombreCiudad+"&idCentroComercial="+idCentro+"&nombreCentroComercial="+nombreCentro);
         }
         if(parametros["idCategoria"])
         {
             
             idCategoria=parametros["idCategoria"];
             nombreCategoria=parametros["nombreCategoria"];
             var regex = new RegExp('%20', 'g');
             nombreCategoria = nombreCategoria.replace(regex, ' ');
             //Modifico el texto que dice le nombre del centro comercial
             $("#lnkCategoria").text(nombreCategoria);
             
         }
     })();
    
    /*Function que se activa al cambiar un elemento del select ciudades*/
    $("#ciudades").change(function()
    {
        /*Obtengo el elemento seleccionado*/
        var idCiudad=$("#ciudades").val();
        if(idCiudad!=0)
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
    

    var url=url_base+"Ciudades/index.xml";
    var datos={
    };

    
    ajax(url,datos,
     function(xml)
     {
        if(xml!=null)
        {
            $("#ciudades").append("<option value='0'>Seleccione...</option>");
            $("ciudades",xml).each(function()
            {
                
                var obj=$(this).find("Ciudade");
                var valor,texto;
                valor=$("id",obj).text();
                texto=$("nombre",obj).text();
                if(valor)
                {
                    var html="<option value='"+valor+"'>"+texto+"</option>";
                    $("#ciudades").append(html);
                }
            });
        }else{
            log("1a","getCiudades","el xml es nulo");
        }
         //Determino si llego alguna ciudad por la 
     });
    
    
}

function getCentrosComercialesByCiudad(idCiudad)
{
    //Eliminos las opciones anteriores
    $("#centroscomerciales").html("");
    var url=url_base+"centroscomerciales/getCentrosComercialesByCiudad/$1.xml";
    url=url.replace("$1",idCiudad)
    var datos={
    };
    var xml=ajax(url,datos,
                 function(xml)
                 {
                    $("#centroscomerciales").append("<option value='0'>Todos</option>");
                    $("datos",xml).each(function()
                    {
                        var obj=$(this).find("Centroscomerciale");
                        var valor,texto;
                        
                        valor=$("id",obj).text();
                        texto=$("nombre",obj).text();
                        console.log("valor: "+valor);
                        if(valor)
                        {
                            var html="<option value='"+valor+"'>"+texto+"</option>";
                            $("#centroscomerciales").append(html);    
                        }
                        
                    });
                 });
    
}
function getCategoriasByCentroComercial(idCentroComercial)
{
    log("busquedaTienda","getCategoriasByCentroComercial","idCentroComercial: "+idCentroComercial);
    var url=url_base+"centroscomerciales/getcetegoriasbycentrocomercial/$1.xml";
    url=url.replace("$1",idCentroComercial);
    var datos={
    };
    $("#categorias").html("");
    ajax(url,datos,
        function(xml)
         {
            if(xml!=null)
            {
                $("#categorias").append("<option value='0'>Todos</option>");
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("c");
                    var valor,texto;
                    valor=$("id",obj).text();
                    texto=$("nombre",obj).text();
                    var html="<option value='"+valor+"'>"+texto+"</option>";
                    $("#categorias").append(html);
                });
            }
         });
    
    
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
    var url= url_base+"almacenes/getlocales.xml";
    var datos={
        
    };

    ajax(url,datos,function(xml)
         {
            $("datos",xml).each(function()
            {
                var obj=$(this).find("Almacene");
                
                var idL,nombreL;
                idL=$("id",obj).text();
                nombreL=$("nombre",obj).text();
                locales.push({id:idL,value:nombreL});
            });
         });
    
    
    
    
    
    $( "#nombreLocal" ).autocomplete({
        source: locales,
        select: function(event,ui)
        {
            //Envio al usuario a la vista 3
            var url="2b.html?idLocal=$1";
            url=url.replace("$1",ui.item.id);
            log("1a","autocompletar","url: "+url);
            redirigir("2b.html?idLocal="+ui.item.id);
        }
    });
}
/*Esta funcion va  a la vista 2b y le envia los parametros necesarios*/
function goTo2b()
{
    //Obtengo las variables a enviar
    var nombreLocal;
    nombreLocal=$("#nombreLocal").val();
    
    //Redirijo
    $(location).attr("href","2b.html?nombreLocal="+nombreLocal);
}
            