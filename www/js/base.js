/*var url_base="http://192.168.0.13/CentrosComercialesWeb/";*/
var url_base="http://majoris.apliko.co/";

var onDeviceReady=function()
{
    checkInternet()
    
    
};

$(document).ready(
    function()
    {
        $(".atras").click(
            function(e)   
            {
                e.preventDefault();
                anterior();
            }
        );
        $(".btconfig").click(
            function(e)   
            {
                e.preventDefault();
                redirigir("busqueda/7.html");
            }
        );
        $(".btrefresh").click(
            function(e)   
            {
                e.preventDefault();
                //location.reload();
                
            }
        );
        $(".logo").click(
            function(e)   
            {
                e.preventDefault();
                redirigir("../home.html");
            }
        );
        
        
        
    }
);

function checkInternet()
{
    console.log("intel.xdk.device.connection: "+intel.xdk.device.connection);
    if(intel.xdk.device.connection=="none")
    {
        alert("Lo sentimos, no hay conexion a internet");
        redirigir("home.html");
    }
    return true;
}
function salir()
{
    navigator.app.exitApp();
}
function anterior()
{
    window.history.back();
}
function mostrardialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultardialogo()
{
    $('#element_to_pop_up').bPopup().close();
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
    checkInternet();
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
/*
Esta funcion se encarga de obtener el banner correspondiente a la vista
Parametros:
Vista: Lugar desde donde se llama a la funcion
cc: Id del centro comercial
categoria: Categoria donde se encuentra
tienda: Id de la tienda
*/

function getBanner(vista,idCentroComercial,idCategoria,idAlmacen,ruta)
{
    var url=url_base+"banners/getbanners.xml";
    var datos={
        vista:vista,
        idCentroComercial:idCentroComercial,
        idCategoria:idCategoria,
        idAlmacen:idAlmacen
    };
    ajax(url,datos,
                 function(xml)
                 {
                    if(xml!=null)
                    {
                        $("#slider").html("");
                        $("datos",xml).each(
                            function()
                            {
                                var obj=$(this).find("Banner");
                                var imagen=$("imagen",obj).text();
                                var html='<img src="$1" />';
                                html=html.replace("$1",url_base+imagen);
                                $("#slider").append(html);
                            }
                        );
                        $('#slider').nivoSlider();
                    }
                 });
    
        
    
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
function cambiarAcentos(texto)
{
    var regex = new RegExp('%20', 'g');
    texto = texto.replace(regex, ' ');
    //Url acentos minuscula
    regex = new RegExp('%C3%A1', 'g');
    texto = texto.replace(regex, '&aacute;');
    regex = new RegExp('%C3%A9', 'g');
    texto = texto.replace(regex, '&eacute;');
    regex = new RegExp('%C3%AD', 'g');
    texto = texto.replace(regex, '&iacute;');
    regex = new RegExp('%C3%B3', 'g');
    texto = texto.replace(regex, '&oacute;');
    regex = new RegExp('%C3%BA', 'g');
    texto = texto.replace(regex, '&uacute;');
    regex = new RegExp('%C3%B1', 'g');
    texto = texto.replace(regex, '&ntilde;');
    regex = new RegExp('%C3%BC', 'g');
    texto = texto.replace(regex, '&uuml;');
    
    //Url acentos mayuscula
    regex = new RegExp('%C3%81', 'g');
    texto = texto.replace(regex, '&Aacute;');
    regex = new RegExp('%C3%89', 'g');
    texto = texto.replace(regex, '&Eacute;');
    regex = new RegExp('%C3%8D', 'g');
    texto = texto.replace(regex, '&Iacute;');
    regex = new RegExp('%C3%93', 'g');
    texto = texto.replace(regex, '&Oacute;');
    regex = new RegExp('%C3%9A', 'g');
    texto = texto.replace(regex, '&Uacute;');
    regex = new RegExp('%C3%91', 'g');
    texto = texto.replace(regex, '&Ntilde;');
    regex = new RegExp('%C3%9C', 'g');
    texto = texto.replace(regex, '&Uuml;');
    
    //Acentos en minuscula
    regex = new RegExp('á', 'g');
    texto = texto.replace(regex, '&aacute;');
    regex = new RegExp('é', 'g');
    texto = texto.replace(regex, '&eacute;');
    regex = new RegExp('í', 'g');
    texto = texto.replace(regex, '&iacute;');
    regex = new RegExp('ó', 'g');
    texto = texto.replace(regex, '&oacute;');
    regex = new RegExp('ú', 'g');
    texto = texto.replace(regex, '&uacute;');
    regex = new RegExp('ñ', 'g');
    texto = texto.replace(regex, '&ntilde;');
    regex = new RegExp('ü', 'g');
    texto = texto.replace(regex, '&Uuml;');
    //Acentos en mayuscula
    regex = new RegExp('Á', 'g');
    texto = texto.replace(regex, '&Aacute;');
    regex = new RegExp('É', 'g');
    texto = texto.replace(regex, '&Eacute;');
    regex = new RegExp('Í', 'g');
    texto = texto.replace(regex, '&Iacute;');
    regex = new RegExp('Ó', 'g');
    texto = texto.replace(regex, '&Oacute;');
    regex = new RegExp('Ú', 'g');
    texto = texto.replace(regex, '&Uacute;');
    regex = new RegExp('Ñ', 'g');
    texto = texto.replace(regex, '&Ntilde;');
    regex = new RegExp('Ü', 'g');
    texto = texto.replace(regex, '&Uuml;');
    
    return texto;
    
}
function cambiarAcentos2(texto)
{
    //Acentos en minuscula
    regex = new RegExp('&aacute;', 'g');
    texto = texto.replace(regex, 'á');
    regex = new RegExp('&eacute;', 'g');
    texto = texto.replace(regex, 'é');
    regex = new RegExp('&iacute;', 'g');
    texto = texto.replace(regex, 'í');
    regex = new RegExp('&oacute;', 'g');
    texto = texto.replace(regex, 'ó');
    regex = new RegExp('&uacute;', 'g');
    texto = texto.replace(regex, 'ú');
    regex = new RegExp('&ntilde;', 'g');
    texto = texto.replace(regex, 'ñ');
    regex = new RegExp('&uuml;', 'g');
    texto = texto.replace(regex, 'ü');
    //Acentos en mayuscula
    regex = new RegExp('&Aacute;', 'g');
    texto = texto.replace(regex, 'Á');
    regex = new RegExp('&Eacute;', 'g');
    texto = texto.replace(regex, 'É');
    regex = new RegExp('&Iacute;', 'g');
    texto = texto.replace(regex, 'Í');
    regex = new RegExp('&Oacute;', 'g');
    texto = texto.replace(regex, 'Ó');
    regex = new RegExp('&Uacute;', 'g');
    texto = texto.replace(regex, 'Ú');
    regex = new RegExp('&Ntilde;', 'g');
    texto = texto.replace(regex, 'Ñ');
    regex = new RegExp('&Uuml;', 'g');
    texto = texto.replace(regex, 'Ü');
    return texto;
    
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