//Esta pagina se encarga de obtener los ids de los locales para graficarlos en el mapa
$(document).ready(function()
{
    $(function()
      {
          getBanner(null,"../");
          var parametros=getUrlVars();
          obtenerCoordenadas(parametros["idO"],parametros["idF"]);
          /*obtenerCoordenadas(1,12);*/
      }
     );
    $("#continuar").click(
        function(e)
        {
            e.preventDefault();
            obtenerCoordenadas(6,12);
        }
    );

});

/*Esta funcion se encarga de obtener las coordenadas de los locales dados*/
function  obtenerCoordenadas(idO, idF)
{
    /*Posiciones de los locales donde:
        x=      Posicion x
        y=      Posicion y
        idE=    Id de la escalera
        bE=     Variable que representa el bloque al que pertenece la escalera
        ex=     Posicion escalera x
        ey=     Posicion escalera y
        p=      Piso del local
        urlM=   Url de la imagen del mapa
    */
    var x0,y0,idE0,bE0,ex0,ey0,p0,urlM;
    var x1,y1,ex1,ey1,p1;
    
    /*Obtencion de datos*/
    
    var url="";
    var datos={
        idLocal:idO
    }
    /*var xml=ajax(url,datos);*/
    var xml=null;
    if(xml!=null)
    {
        $("",xml).each(
            function()
            {
                $("#mapa").attr("src",urlM);
            }
        );
    }else{
        if(idO==1)
        {
            x0="569px";
            y0="651px";
            idE0=5;
            ex0="159px";
            ey0="570px";
            p0=1;
        }else if(idO==6)
        {
            x0="159px";
            y0="570px";
            idE0=6;
            ex1="159px";
            ey1="570px";
            p0=2;
        }
        
        
        
    }
    var datos={
        idLocal:idF
    }
    /*var xml2=ajax(url,datos);*/
    var xml2=null;
    if(xml2!=null)
    {
        $("",xml2).each(
            function()
            {
                
            }
        );
    }else{
        if(idF==12)
        {
            x1="732px";
            y1="96px";
            p1=2;
        }
    }
    
    /*Fin Obtencion de datos*/
    
    /*Analisis Ruta*/
    
        /*Si se encuentran en el mismo piso*/
        if(p0==p1)
        {
            $("#origen").css("top",y0);
            $("#origen").css("left",x0);
            
            $("#fin").css("top",y1);
            $("#fin").css("left",x1);
            /* Desabilito el boton continuar */
            $("#continuar").css("display","none");
        }else{
            log("4b","obtenerCoordenadas","Entre al else");
            /*Si no se encuentran en el mismo piso, muestro el mapa que va desde el origen hasta las escaleras*/
            $("#origen").css("top",y0);
            $("#origen").css("left",x0);
            
            $("#fin").css("top",ey0);
            $("#fin").css("left",ex0);
            
            log("4b","obtenerCoordenadas","y0: "+y0);
            log("4b","obtenerCoordenadas","x0: "+x0);
            log("4b","obtenerCoordenadas","y1: "+ey0);
            log("4b","obtenerCoordenadas","x1: "+ex0);
            /* Habilito el boton continuar */
            $("#continuar").css("display","block");
            /*Obtengo el id de la escalera del siguiente piso*/
            idE=obtenerEscalera(p0+1,bE0);
            /*$("#continuar").click(obtenerCoordenadas(idE,idF));*/
            
            
        }
    
    /*Fin Analisis Ruta*/
    
}
/*
Se encarga de obtener el id de la escalera de un piso en especifico
piso      ->  Piso de la escalera
bloque    ->  Bloque de la escalera, ya que un piso puede tener multiples escaleras
*/
function obtenerEscalera(piso,bloque)
{
    var id=-1;
    var url="";
    var datos={
        piso:piso,
        bloque:bloque
    }
    /*var xml=ajax(url,datos);*/
    var xml=null;
    if(xml!=null)
    {
        $("",xml).each(
            function()
            {
                
            }
        );
    }else{
        id=6;
    }
    return id;
}