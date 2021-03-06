/*Esta pagina se encarga de listar los pisos del centro comercial */
var onDeviceReady=function(){
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    /*Funciones autoejecutables*/
    (function()
     {
         
         var parametros=getUrlVars();
         getBanner("5d",parametros["idCentroComercial"],"null","null","null");
         getPisos(parametros["idCentroComercial"]);
     })();
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);
$(document).ready(
    function()
    {
        
    }
);
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getPisos(idCentroComercial)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"pisos/getpisosbycentrocomercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Piso");
                    var nombre,id;
                    nombre=$("nombre",obj).text();
                    id=$("id",obj).text();
                    if(id)
                    {
                        estaVacio=false;
                        var html="<li class='nivel' id='pisos'>"+
                        "<a href='5e.html?idPiso=$1' id='lnknivel'>$2</a>"+
                        "<a class='go'></a>"+
                        "</li>";
                        html=html.replace("$1",id);
                        html=html.replace("$2",nombre);
                        $("#pisos").append(html);
                    }
                    
                });
            }
             ocultarDialogo();
             if(estaVacio)
             {
                 $("#pisos").append("Lo sentimos, no conseguimos datos");
             }
         });
    
    
}