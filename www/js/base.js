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
    console.log(pagina+"-"+funcion": "+mensaje);
}