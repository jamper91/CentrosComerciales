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
    }).DONE(function()
    {
        return xml;
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