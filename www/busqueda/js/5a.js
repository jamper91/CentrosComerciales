/*Esta pagina se encarga de mostrar informacion de un centrocomercial en especifico*/
var idCentroComercial;
var onDeviceReady=function()
{
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    
    var parametros=getUrlVars();
    idCentroComercial=parametros["idCentroComercial"];
    getBanner("5a",idCentroComercial,"null","null","null");
    getInfoCentroComercial(idCentroComercial);
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);
$(document).ready(function()
{
    $(function()
      {
          
      }
     );
    $("#tiendas").click(
        function(e)
        {
            e.preventDefault();
            var url="5g.html?idCentroComercial=$1";
            url=url.replace("$1",idCentroComercial);
            redirigir(url);
        }
    );
    $("#comoLlegar").click(
        function(e)
        {
            e.preventDefault();
            var url="5b.html?idCentroComercial=$1";
            url=url.replace("$1",idCentroComercial);
            redirigir(url);
        }
    );
    $("#mapas").click(
        function(e)
        {
            e.preventDefault();
            var url="5d.html?idCentroComercial=$1";
            url=url.replace("$1",idCentroComercial);
            redirigir(url);
        }
    );
    $("#servicios").click(
        function(e)
        {
            e.preventDefault();
            var url="5f.html?idCentroComercial=$1";
            url=url.replace("$1",idCentroComercial);
            redirigir(url);
        }
    );
    $("#masInformacion").click(
        function(e)
        {
            /*e.preventDefault();
            var url="5d.html?idCentroComercial=$1";
            url=url.replace("$1",idCentroComercial);
            redirigir(url);*/
        }
    );
    
});
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getInfoCentroComercial(idCentroComercial)
{
    mostrarDialogo();
    var url=url_base+"centroscomerciales/getInformacionCentroComercial.xml";
    var datos={
        idCentroComercial:idCentroComercial
    };
    ajax(url,datos,
         function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Centroscomerciale");
                    var logo,ciudad,horario,descripcion;
                    logo=$("logo",obj).text();
                    descripcion=$("descripcion",obj).text();
                    horario=$("horario",obj).text();
                    obj=$(this).find("Ciudade");
                    ciudad=$("nombre",obj).text();
                    ciudad=cambiarAcentos2(ciudad);
                    console.log("logo: "+logo);
                    $("#logo").attr("src","../images/logos/"+logo);
                    $("#ciudad").text(ciudad);
                    $("#horario").text(horario);
                    $("#descripcion2").text(descripcion);
                });
            }
             ocultarDialogo();
         });
    
    
}