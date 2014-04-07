/*Esta pagina se encarga de mostrar informacion de un centrocomercial en especifico*/
$(document).ready(function()
{
    $(function()
      {
          getBanner(null,"../");
          var parametros=getUrlVars();
          getInfoCentroComercial(parametros["idCentroComercial"]);
      }
     );
});

function getInfoCentroComercial(idCentroComercial)
{
    var url="";
    var datos={
        idCentroComercial:idCentroComercial
    };
    var xml=ajax(url,datos);
    if(xml!=null)
    {
        $("",xml).each(function()
        {
            var logo,ciudad,horario,descripcion;

            $("#logo").attr("src",logo);
            $("#ciudad").text(local);
            $("#horario").text(horario);
            $("#descripcion").text(descripcion);
        });
    }
    
}