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
function ajax(url, datos)
{
    var retornar=null;
    $.ajax({
        url: url,
        type: "POST",
        data: datos,
        success: function(xml)
        {
            retornar=xml;
        }
    }).done(function()
    {
        return retornar;
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