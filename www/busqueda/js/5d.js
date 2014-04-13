/*Esta pagina se encarga de listar los pisos del centro comercial */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getPisos(parametros["idCentroComercial"]);
         })();
    }
);

function getPisos(idCentroComercial)
{
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
                    var html="<li><a href='5e.html?idPiso=$1'>$2</a></li>";
                    html=html.replace("$1",id);
                    html=html.replace("$2",nombre);
                    $("#pisos").append(html);
                });
            }else
            {
                var nombre="Piso 1",id=1;
                var html="<li><a href='5e.html?idPiso=$1'>$2</a></li>";
                html=html.replace("$1",id);
                html=html.replace("$2",nombre);
                $("#pisos").append(html);
                nombre="Piso 2",id=2;
                html="<li><a href='5e.html?idPiso=$1'>$2</a></li>";
                html=html.replace("$1",id);
                html=html.replace("$2",nombre);
                $("#pisos").append(html);
            }
         });
    
    
}