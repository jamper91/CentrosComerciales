/*Esta pagina se encarga de mostrar informacion de un centrocomercial en especifico*/
var idCentroComercial;
$(document).ready(function()
{
    $(function()
      {
          /*getBanner(null,"../");*/
          var parametros=getUrlVars();
          idCentroComercial=parametros["idCentroComercial"]
          getInfoCentroComercial(idCentroComercial);
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
                    $("#logo").attr("src","../images/logos/"+logo);
                    $("#ciudad").text(ciudad);
                    $("#horario").text(horario);
                    $("#descripcion2").text(descripcion);
                });
            }
             ocultarDialogo();
         });
    
    
}