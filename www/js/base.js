/*var url_base="http://192.168.0.13/CentrosComercialesWeb/";*/
var url_base="http://192.168.0.11/CentrosComercialesWeb/";

function salir()
{
    navigator.app.exitApp();
}
function anterior()
{
    window.history.back();
}
/*Esta funcion se encarga de realizar una llamada ajax y retornar el resultado, retorna null en caso de algun error
var datos = {
  "id"     : blog.id,
  "name"   : blog.name,
  "url"    : blog.url,
  "author" : blog.author
};

*/
function ajax(url2, datos, callback)
{
    var retornar=null;
    $.ajax({
        url: url2,
        type: "POST",
        data: datos,
        headers: { 'Access-Control-Allow-Origin': '*' },
        crossDomain: true,
        error: function( jqXHR, textStatus, errorThrown )
        {
            log("base","ajax","textStatus: "+textStatus);
            log("base","ajax","errorThrown: "+imprimirObjeto(errorThrown));
        },
        success: function(data)
        {
            retornar=data
        }
    }).done(function()
    {
        callback(retornar);
    });
}

function log(pagina, funcion, mensaje)
{
    console.log(pagina+"-"+funcion+"-"+mensaje);
}
/*Funcion que se encarga de obtener las variables que se envian por la url*/
function getUrlVars() 
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
/*Redirije la aplicacion a la url indicada*/
function redirigir(url)
{
    $(location).attr("href",url);
}
/*Esta funcion se encarga de obtener el banner correspondiente a la vista*/
function getBanner(vista,ruta)
{
    if(vista!=null)
    {
        log("base","getBanner","la vista no es nula");
    }else{
        log("base","getBanner","la vista es nula");
        var url="";
        var datos={
        };
        var xml=ajax(url,datos);
        if(xml!=null)
        {
            log("base","getBanner","el xml no es nulo");
            $("",xml).each(
                function()
                {
                    var urlImagen;
                    $("#banner").attr("src",urlImagen);
                }
            );
        }else{
            log("base","getBanner","el xml es nulo");
            $("#banner").attr("src",ruta+"js/owl-carousel/img/responsive.png");
        }
        
    }
}
function imprimirObjeto(object)
{
var output = '';
for (var property in object) {
  output += property + ': ' + object[property]+'; ';
}
return output;


}
function xmlToString(xmlData) { 

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}  

/* ##################################### VARIABLES DE SESION ##################################### */
function crearVariableSesion(nombre, valor)
{
    localStorage.setItem(nombre, valor);
}
function obtenerVariable(nombre)
{
    var valor = localStorage.getItem(nombre);
    if(valor)
        return valor;
    else
        return null;
}
function getIdCiudad()
{
    return obtenerVariable("idCiudad");
}
function setIdCiudad(idCiudad)
{
    crearVariableSesion("idCiudad",idCiudad);
}
function getNombreCiudad()
{
    return obtenerVariable("nombreCiudad");
}
function setNombreCiudad(nombreCiudad)
{
    crearVariableSesion("nombreCiudad",nombreCiudad);
}
/* ##################################### FIN VARIABLES DE SESION ##################################### */