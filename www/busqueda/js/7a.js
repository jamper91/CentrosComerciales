$(document).ready(
    function ()
    {
        $("#facebook").click(
            function(e)
            {
                e.preventDefault();
                /*var objParameters = { "picture":"http://s2.subirimagenes.com/imagen/previo/thump_8884579logoaiko.png", "name":"Centros Comerciales", "caption":"Centros Comerciales my App", "description":"Hola a todos, acabo de probar la aplicacion de centros comerciales y esta bien padre wey", "link":"http://ww.google.com" } */
                var objParameters = { "picture":"http://www.ejemplosprogramacion.co/wp-content/uploads/2014/02/Buscar-elementos-de-una-matris.png", "name":"Centros Comerciales", "caption":"Centros Comerciales my App", "description":"Hola a todos, acabo de probar la aplicacion de centros comerciales y esta bien padre wey.", "link":"http://www.ejemplosprogramacion.co" } 
intel.xdk.facebook.showNewsFeedDialog(objParameters); 
            }
        );
        $("#facebook").click(
            function(e)
            {
                e.preventDefault();
                var objParameters = { "picture":"http://fbrell.com/f8.jpg", "name":"Facebook Dialog", "caption":"This is my caption", "description":"Using Dialogs to interact with users.", "link":"http://xdk.intel.com" } 
intel.xdk.facebook.showNewsFeedDialog(objParameters); 
            }
        );
        $("#twitter").click(
            function(e)
            {
                e.preventDefault();
                alert("Lo sentimos, esta funcion aun no se ha implementado");
            }
        );
        $("#google").click(
            function(e)
            {
                e.preventDefault();
                alert("Lo sentimos, esta funcion aun no se ha implementado");
            }
        );
    }
);

//This allows you to post to your Facebook Wall
document.addEventListener("intel.xdk.facebook.dialog.complete",function(e) { 
  console.log("News Feed Event Returned"); 
  if (e.success == true) { 
    console.log("News feed updated successfully"); 
  } 
},false); 
