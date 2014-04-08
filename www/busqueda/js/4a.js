/*Esta pagina se encarga de obtener el nombre del local donde se encuentra y el nombre del
local al cual quiere ir*/

/*Estas variables almacena los ids del local de origen y del local de destino*/
var  origen=null,fin=null;

$(document).ready(function()
{
    $(function()
      {
          getBanner(null,"../");
          autocompletar();
      }
     );
    $("#verMapa").click(
        function(e)
        {
            
        }
    );
});

function autocompletar()
{
    var locales=new Array();
    locales.push({id:1, value:"MCDonals"});
    locales.push({id:2, value:"El corral"});
    locales.push({id:3, value:"El Exito"});
    var url="";
    var datos={
        
    };
    if(xml!==null)
    {
        var xml=ajax(url,datos);
        $("",xml).each(function()
        {
            var idL,nombreL;
            locales.push({id:idL,value:nombreL});
        });
    }
    
    
    
    $( "#origen" ).autocomplete({
        source: locales,
        select: function(event,ui)
        {
            origen=ui.item.id;
            $("#contenedor1").css("display","none");
            $("#contenedor2").css("display","block");
        }
    });
    $( "#fin" ).autocomplete({
        source: locales,
        select: function(event,ui)
        {
            fin=ui.item.id;
            if(origen!==null && fin!==null)
            {
                var url="4b.html?idO=$1&idF=$2";
                url=url.replace("$1",origen);
                url=url.replace("$2",fin);
                log("4a","autocompletar","Url:"+url);
                //redirigir(url);
            }
        }
    });

}