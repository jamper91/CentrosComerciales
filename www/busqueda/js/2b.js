//Esta pagina se encarga de recibir el id de un local y se encarga de listar todos aquello centros comerciales en los que se encuentra dicho local
$(document).ready(function()
{
    $(function()
      {
          getBanner(null,"../");
          var parametros=getUrlVars();
          getCentrosComercialesByLocal(parametros["idLocal"]);
      }
     );
});

function getCentrosComercialesByLocal(idLocal)
{
    var estaVacio=true;
    var url=url_base+"Almacenes/getcentroscomercialesbylocal.xml";
    var datos={
        idLocal:idLocal
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("cc");
                    var nombreLocal,idLocal;
                    nombreLocal=$("nombre",obj).text();
                    idLocal=$("id",obj).text();
                    if(idLocal)
                    {
                        estaVacio=false;
                        var html="<li><a href='3.html?idLocal=$1'>$2</a></li>";
                        html=html.replace("$1",idLocal);
                        html=html.replace("$2",nombreLocal)
                        $("#locales").append(html);
                    }
                    
                });
            }
            if(estaVacio)
                 $("#locales").append("Lo sentimos, no encontramos informacion");
         });
    
    
}