/*Esta pagina se encarga de mostrar informacion de un local en especifico*/
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
            redirigir("4a.html");
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
            redirigir("5a.html?idCentroComercial="+$(this).attr("idCentro"));
        }
    );
    $("#masInformacion").click(
        function(e)
        {
        }
    );
});

function getInfoLocal(idLocal)
{
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
                    
                    
                    $("#logo").attr("src",logo);
                    $("#local").text(local);
                    $("#piso").text(piso);
                    $("#seccion").text(seccion);
                    $("#horario").text(horario);
                    $("#descripcion").text(descripcion);
                    
                    //Modifico informacion de los botones, pero no sera visible al usuario
                    
                    $("#informacionCentroComercial").attr("idCentro",$("centroscomerciale_id",obj).text());
                });
            }else{
                $("#logo").attr("src",logo);
                $("#local").text("Local: "+idLocal);
                $("#piso").text("Piso: "+idLocal);
                $("#seccion").text("Seccion: "+idLocal);
                $("#horario").text("Horario: "+idLocal);
                $("#descripcion").text("Descripcion: "+idLocal);
            }
         });
    
    
}