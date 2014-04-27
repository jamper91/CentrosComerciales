/*Esta pagina se encarga de mostrar informacion de un centrocomercial en especifico*/
$(document).ready(function()
{
    $(function()
      {
          /*getBanner(null,"../");*/
          var parametros=getUrlVars();
          getInfoCentroComercial(parametros["idCentroComercial"]);
      }
     );
});

function getInfoCentroComercial(idCentroComercial)
{
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
                    $("#descripcion").text(descripcion);
                });
            }
         });
    
    
}