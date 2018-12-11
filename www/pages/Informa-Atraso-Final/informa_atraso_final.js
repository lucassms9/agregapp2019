myApp.onPageInit('informa_atraso_final', function(page){
$('.back').on('click', function(event){

	mainView.router.loadPage('entregas_home.html')

});
      var usuario = localStorage.getItem('id_user2'); 
      var ocorrencia = localStorage.getItem('ocorrencia_id3');

    $.ajax({
        url: urlApi+'/ofertas/contratado?usuario='+usuario+'&ocorrencia='+ocorrencia,
            type: 'get',
            dataType: 'json',
    })
    .done(function(data) {
        console.log(data)
            var criacao =  localStorage.getItem('fim')
            var telefone_destino = data[0].Cliente_destino.telefone;
            var cidade_destino = data[0].Cliente_destino.Municipio.Nome;
            var estado_destino = data[0].Cliente_destino.Estado.UF;

            var data_descarga = data[0].Oferta.data_destino;
            var contrato = data[0].Oferta.cod_contrato;
            
            var Cliente_origem  = data[0].Cliente_origem.nome;
            var Cliente_destino =    data[0].Cliente_destino.nome;

            var endereco_destino = data[0].Cliente_destino.endereco;


            var dataa = data_descarga.split(" ");

                var hora_ante = dataa[1].split(":");


                var hora = hora_ante[0];
                var min = hora_ante[1];

                var data_div = dataa[0].split("-");

                var ano = data_div[0];
                var mes = data_div[1];
                var dia = data_div[2];
      
                if(mes == '01'){mes = 'Jan';}
                    if(mes == '02'){mes = 'Fev';}
                        if(mes == '03'){ mes = 'Mar';}
                            if(mes == '04'){ mes = 'Abr';}
                                if(mes == '05'){ mes = 'Mai';}
                                    if(mes == '06'){ mes = 'Jun';}
                                        if(mes == '07'){ mes = 'Jul';}
                                    if(mes == '08'){ mes = 'Ago';}
                                if(mes == '09'){ mes = 'Set';}
                            if(mes == '10'){ mes = 'Out';}
                        if(mes == '11'){ mes = 'Nov';}
                    if(mes == '12'){ mes = 'Dez';}


                //data de criação


                var dataa1 = criacao.split(" ");

                var hora_ante1 = dataa1[1].split(":");


                var hora1 = hora_ante1[0];
                var min1 = hora_ante1[1];

                var data_div1 = dataa1[0].split("-");

                var ano1 = data_div1[0];
                var mes1 = data_div1[1];
                var dia1 = data_div1[2];
      
                if(mes1 == '01'){mes1 = 'Jan';}
                    if(mes1 == '02'){mes1 = 'Fev';}
                        if(mes1 == '03'){ mes1 = 'Mar';}
                            if(mes1 == '04'){ mes1 = 'Abr';}
                                if(mes1 == '05'){ mes1 = 'Mai';}
                                    if(mes1 == '06'){ mes1 = 'Jun';}
                                        if(mes1 == '07'){ mes1 = 'Jul';}
                                    if(mes1 == '08'){ mes1 = 'Ago';}
                                if(mes1 == '09'){ mes1 = 'Set';}
                            if(mes1 == '10'){ mes1 = 'Out';}
                        if(mes1 == '11'){ mes1 = 'Nov';}
                    if(mes1 == '12'){ mes1 = 'Dez';}


                    var data_carga = dia+'/'+mes+'/'+ano;

                    var data_criacao = dia1+'/'+mes1+'/'+ano1;
                    var hora_criacao = hora1+':'+min1

                    var data_atraso1 = localStorage.getItem('hora_atraso');
                    var data_atraso2 = data_atraso1.split(':');
                    var data_atraso = data_atraso2[0];
                    var data_informa = dia1+'/'+mes1+' às ' +hora1+':'+min1+' h' ;

                    var data_descarga = dia+'/'+mes+'/'+ano+' '+hora+':'+min+' h' ;
                    var cidade_comple = cidade_destino+' - '+estado_destino;
         

       
                $('#endereco_destino7').text(endereco_destino)
                $('#cidade_destino7').text(cidade_comple)
                $('#telefone_destino7').text(telefone_destino)
               



        $('#contrato7').text(contrato)
        $('#data_carga7').text(data_descarga)

        $('#cliente_origem7').text(Cliente_origem)
        $('#cliente_destino7').text(Cliente_destino)

        $('#data-atraso7').text(data_informa)

        // $('#hora-atraso7').text(hora_criacao)

        $('#atraso-atraso7').text(data_atraso)



           



             var lat = data.Ocorrencia[0].Ocorrencia.lat_ocorrencia;
            var lng = data.Ocorrencia[0].Ocorrencia.long_ocorrencia;



            var latlng = lat + "," +lng; 
            // var url = "maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=true"; 
           
           $.ajax({
               url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true&key='+KEYGMAPS,
               type: 'get',
               dataType: 'json',
    
           })
           .done(function(data) {
            console.log(data)
              

             if(data.status == "OVER_QUERY_LIMIT"){

            myApp.alert('OVER_QUERY_LIMIT');
            return false
          }


                // console.log(component)
                  var street_address, postal_code, administrative_area_level_1, administrative_area_level_2;

                for (i = 0; i < data.results[0].address_components.length; ++i) {

                      var component = data.results[0].address_components[i];
                    if (!administrative_area_level_2 && component.types.indexOf("administrative_area_level_2") > -1)
                        administrative_area_level_2 = component.long_name;
                    else if (!administrative_area_level_1 && component.types.indexOf("administrative_area_level_1") > -1)
                        administrative_area_level_1 = component.short_name;
                    else if (!postal_code && component.types.indexOf("postal_code") > -1)
                        postal_code = component.long_name;
                    else if (!street_address && component.types.indexOf("street_address") > -1)
                        street_address = component.long_name;


                }
                endereco = data
                 for (var i =0; i >= endereco.results.length; i++) {

                    console.log("end: "+endereco.results[i].formatted_address)

                  };


                  endereco_components = data.results[0]

                  
                 ende = endereco_components.formatted_address.split(',')
                  console.log(ende[0])


             console.log(administrative_area_level_2)
             console.log(administrative_area_level_1)
             console.log(street_address)

             // console.log(sublocality)
             // console.log(country)
             // return false
            var cidade = administrative_area_level_2
            var estado = administrative_area_level_1
            var endereco = ende[0]
            var cidade_estado = cidade+'-'+estado

            $('#cidade_estado2').text(cidade_estado)
            $('#endereco2').text(endereco)

              
           })
           .fail(function() {
               console.log("error");
           })
           .always(function() {
               console.log("complete");
           });  




      




    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });


   


});