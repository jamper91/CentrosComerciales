/*Esta pagina se de mostrar una mapa de un piso en especifico */
$(document).ready(
    function()
    {
        /*Funciones autoejecutables*/
        (function()
         {
             getBanner(null,"../");
             var parametros=getUrlVars();
             getMapa(parametros["idPiso"]);
         })();
    }
);
function mostrarDialogo()
{
    $('#element_to_pop_up').bPopup();
}
function ocultarDialogo()
{
    $('#element_to_pop_up').bPopup().close();
}
function getMapa(idPiso)
{
    mostrarDialogo();
    var estaVacio=true;
    var url=url_base+"pisos/getMapaByPiso.xml";
    var datos={
        idPiso:idPiso
    };
    ajax(url,datos,function(xml)
                 {
                    if(xml!=null)
                    {
                        
                        log("5e","getMapa","Entre al if");
                        $("datos",xml).each(function()
                        {
                            
                            var obj=$(this).find("Piso");
                            var img;
                            img=$("mapa",obj).text();
                            if(img)
                            {
                                estaVacio=false;
                                $("#mapa2").attr("src",img);
                            }
                            
                        });
                    }
                     ocultarDialogo();
                     if(estaVacio)
                     {
                         $("#mapa").html("Lo sentimos, no conseguimos informacion");
                     }
                 });
    
    
}