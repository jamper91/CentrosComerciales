/*Esta pagina se encarga de mostrar informacion de un local en especifico*/
var idCentroComercial;
$(document).ready(function()
{
    $(function()
      {
          getBanner(null,"../");
          var parametros=getUrlVars();
          getInfoLocal(parametros["idLocal"]);
      }
     );
    $("#comoLlegar").click(
        function(e)
        {
            redirigir("4a.html?idCentroComercial="+idCentroComercial);
        }
    );
    $("#promociones").click(
        function(e)
        {
        }
    );
    $("#informacionCentroComercial").click(
        function(e)
        {
            redirigir("5a.html?idCentroComercial="+idCentroComercial);
        }
    );
    $("#masInformacion").click(
        function(e)
        {
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
function getInfoLocal(idLocal)
{
    mostrarDialogo();
    var estaVacion=true;
    var url=url_base+"almacenes/getinformacionlocal.xml";
    var datos={
        idLocal:idLocal
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Almacene");
                    var logo,local,piso,seccion,horario,descripcion;
                    logo=$("logo",obj).text();
                    local=$("nombre",obj).text();
                    seccion=$("seccion",obj).text();
                    horario=$("horario",obj).text();
                    descripcion=$("descripcion",obj).text();
                    
                    if(logo)
                        $("#logo").attr("src",logo);
                    $("#local").text(local);
                    $("#piso").text(piso);
                    $("#seccion").text(seccion);
                    $("#horario").text(horario);
                    $("#descripcion2").text(descripcion);
                    
                    //Modifico informacion de los botones, pero no sera visible al usuario
                    idCentroComercial=$("centroscomerciale_id",obj).text()
                    //$("#informacionCentroComercial").attr("idCentro",$("centroscomerciale_id",obj).text());
                });
            }
                ocultarDialogo();
                if(estaVacio)
                 $("#centroscomerciales").append("Lo sentimos, no encontramos informacion");
            
         });
    
    
}