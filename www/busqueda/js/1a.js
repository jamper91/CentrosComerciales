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
         autocompletar();
         //Determino si llego el id de la ciudad
         if(parametros["idCiudad"])
         {
            
             idCiudad=parametros["idCiudad"];
             nombreCiudad=parametros["nombreCiudad"];
             nombreCiudad=cambiarAcentos(nombreCiudad);
             nombreCiudad=cambiarAcentos2(nombreCiudad);
             //Modifico el texto que dice le nombre de la ciudad
             $("#lnkCiudad").text(nombreCiudad);
             //Modifico y habilito el link para buscar centros comerciales
             $("#lnkCentroComercial").attr("href","centroscomerciales.html?url=1a.html&idCiudad="+idCiudad+"&nombreCiudad="+nombreCiudad);
         }else if(getIdCiudad())
         {
             idCiudad=getIdCiudad();
             nombreCiudad=getNombreCiudad();
             nombreCiudad=cambiarAcentos(nombreCiudad);
             nombreCiudad=cambiarAcentos2(nombreCiudad);
             //Modifico el texto que dice le nombre de la ciudad
             $("#lnkCiudad").text(nombreCiudad);
             //Modifico y habilito el link para buscar centros comerciales
             $("#lnkCentroComercial").attr("href","centroscomerciales.html?url=1a.html&idCiudad="+idCiudad+"&nombreCiudad="+nombreCiudad);
         }
         if(parametros["idCentroComercial"])
         {
             console.log("Llego un id de cc");
             idCentro=parametros["idCentroComercial"];
             nombreCentro=parametros["nombreCentroComercial"];
             nombreCentro=cambiarAcentos(nombreCentro);
             nombreCentro=cambiarAcentos2(nombreCentro);
             //Modifico el texto que dice le nombre del centro comercial
             $("#lnkCentroComercial").text(nombreCentro);
             //Modifico y habilito el link para buscar categorias
             $("#lnkCategorias").attr("href","categorias.html?url=1a.html&idCiudad="+idCiudad+"&nombreCiudad="+nombreCiudad+"&idCentroComercial="+idCentro+"&nombreCentroComercial="+nombreCentro);
         }
         if(parametros["idCategoria"])
         {
             
             idCategoria=parametros["idCategoria"];
             nombreCategoria=parametros["nombreCategoria"];
             nombreCategoria=cambiarAcentos(nombreCategoria);
             nombreCategoria=cambiarAcentos2(nombreCategoria);
             
             //Modifico el texto que dice le nombre del centro comercial
             $("#lnkCategorias").text(nombreCategoria);
              
             
         }
         getBanner("1a",null,null,null,"../");
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
    $("#btnBuscar").click(
        function(e)
        {
            e.preventDefault();
            var url="2a.html?idCiudad=$1&idCentroComercial=$2&idCategoria=$3";
            url=url.replace("$1",idCiudad);
            url=url.replace("$2",idCentro);
            url=url.replace("$3",idCategoria);
            redirigir(url);
        }
    );
});

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
                nombreL=cambiarAcentos(nombreL);
                nombreL=cambiarAcentos2(nombreL);
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
            redirigir(url);
        },
        response: function(event, ui) {
            if (!ui.content.length) {
                var noResult = { value:"",label:"Sin coincidencia" };
                ui.content.push(noResult);
            }
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
            