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
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getCentrosComercialesByLocal(idLocal)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"almacenes/getcentroscomercialesbylocal.xml";
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
                    obj=$(this).find("a");
                    idLocal=$("id",obj).text();
                    if(idLocal)
                    {
                        estaVacio=false;
                        var html="<li class='todos'>"+
                             "<a href='3.html?idLocal=$1' id='lnktodos'>$2</a>"+
                             "<a class='go'></a>"+
                             "</li>";
                        html=html.replace("$1",idLocal);
                        html=html.replace("$2",nombreLocal)
                        $("#locales").append(html);
                    }
                    
                });
            }
             ocultarDialogo();
            if(estaVacio)
                 $("#locales").append("Lo sentimos, no encontramos informacion");
         });
    
    
}