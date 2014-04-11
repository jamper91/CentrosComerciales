$(document).ready(function()
{
    /*Funciones que se ejecutan inmediatamente despues que la pagina se carga*/
    (function()
     {
         
     })();
    $("#owl-demo").owlCarousel(
    {
        navigation : false, // Show next and prev buttons
        singleItem:true
    });
});
/*Esta funcion se encarga de obtener las imagenes del banner inferior*/
function banner()
{
    var url="";
    var datos={
        id:2
    }
    var xml=ajax(url,datos);
    $(xml,"item").each(function()
    {
        var urlImagen="";
        var html='<div class="item"><img src="'+urlImagen+'"></div>';
        $("#owl-demo").append(html);
    });
}