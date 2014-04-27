/*
Esta pagina permite buscar centros comerciales por ciudad, o nombre
*/
var idCiudad,nombreCiudad;
$(document).ready(function()
{
    (function()
     {
         getBanner(null,"../");
         //getCiudades();
         autocompletar();
         var parametros=getUrlVars();
         if(parametros["idCiudad"]){
             idCiudad=parametros["idCiudad"];
             nombreCiudad=parametros["nombreCiudad"];
             nombreCiudad=cambiarAcentos(nombreCiudad);
             nombreCiudad=cambiarAcentos2(nombreCiudad);
             $("#lnkCiudad").html(nombreCiudad);
         }else{
             idCiudad=getIdCiudad();
             $("#lnkCiudad").html(getNombreCiudad());
         }
         
     })();
    /*Esta funcion se encarga de caputara cuando el usario le da clic al boton buscar*/
    $("#btnBuscar").click(
        function(e)
        {
            e.preventDefault();
            redirigir("2c.html?idCiudad="+idCiudad);
        }
    );
});

/*Se encarga de obtener las ciudades de la base de datos y mostrarlas en un select*/
function getCiudades()
{
    var estaVacio=true;
    console.log("Entre getCiudades");
    $("#ciudades").html("");
    var url=url_base+"ciudades/index.xml";
    var datos={
    };
    ajax(url,datos,function(xml)
         {
            if(xml!=null)
            {
                $("#ciudades").append("<option value='0'>Selecciones ..</option>");
                $("datos",xml).each(function()
                {
                    var obj=$(this).find("Ciudade");
                    var valor,texto;
                    valor=$("id",obj).text();
                    texto=$("nombre",obj).text();
                    if(valor)
                    {
                        estaVacio=false;
                        var html="<option value='"+valor+"'>"+texto+"</option>";
                        $("#ciudades").append(html);
                    }
                    
                });
            }
             if(estaVacio)
                 $("#ciudades").append("Lo sentimos, no encontramos informacion");
         });
    
    
}
/*Esta funcion se encarga de obtener los nombre de los centros comerciales para que se pueda ver la funcion de autocompletar*/
function autocompletar()
{
    var locales=new Array();
    var url=url_base+"centroscomerciales/index.xml";
    var datos={
        
    };
    ajax(url,datos,function(xml)
         {
            $("datos",xml).each(function()
            {
                var obj=$(this).find("Centroscomerciale");
                
                var idL,nombreL;
                idL=$("id",obj).text();
                nombreL=$("nombre",obj).text();
                nombreL=cambiarAcentos(nombreL);
                nombreL=cambiarAcentos2(nombreL);
                locales.push({id:idL,value:nombreL});
            });
         });
    $( "#nombreCentroComercial" ).autocomplete({
    source: locales,
    select: function(event,ui)
        {
            //Envio al usuario a la vista 3
            redirigir("5a.html?idCentroComercial="+ui.item.id);
        },
    response: function(event, ui) {
        if (!ui.content.length) {
            var noResult = { value:"",label:"Sin coincidencia" };
            ui.content.push(noResult);
        }
    }
    });
}
