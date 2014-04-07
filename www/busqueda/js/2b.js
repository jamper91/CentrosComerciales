//Esta pagina se encarga de recibir el id de un local y se encarga de listar todos aquello centros comerciales en los que se encuentra dicho local
$(document).ready(function()
{
    $(function()
      {
          var parametros=getUrlVars();
          getCentrosComercialesByLocal(parametros["idLocal"]);
      }
     );
});

function getCentrosComercialesByLocal(idLocal)
{
    var url="";
    var datos={
        idLocal:idLocal
    };
    var xml=ajax(url,datos);
    $("",xml).each(function()
    {
        var nombreLocal,idLocal;
        
        var html="<li><a href='3S.html?idLocal=$1'>$2</a></li>";
        html=html.replace("$1",idLocal);
        html=html.replace("$2",nombreLocal)
        $("#locales").append(html);
    });
}