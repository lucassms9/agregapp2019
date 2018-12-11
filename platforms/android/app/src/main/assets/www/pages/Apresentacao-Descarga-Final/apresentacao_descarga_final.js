myApp.onPageInit('apresentacao_descarga_final', function(page){


$('.back').on('click', function(event){

  mainView.router.loadPage('entregas_home.html')

});

$('.back-viagens').on('click', function(event){

	mainView.router.loadPage('minha_agenda.html')

});

        var usuario = localStorage.getItem('id_user2');  
        $.ajax({
            url: urlApi+'/ofertas/contratado?usuario='+usuario+'&ocorrencia=',
            type: 'get',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data)
    var telefone_destino4 = data[0].Cliente_destino.telefone;
    var cidade_destino = data[0].Cliente_destino.Municipio.Nome;
    var estado_destino = data[0].Cliente_destino.Estado.UF;

    var data_descarga = data[0].Oferta.data_destino;
    var contrato4 = data[0].Oferta.cod_contrato;
   
    var Cliente_origem4  = data[0].Cliente_origem.nome;
    var Cliente_destino4 =    data[0].Cliente_destino.nome;

    var endereco_destino4 = data[0].Cliente_destino.endereco;

    var data_apresenta_descarga = data[0].Entrega.iniciar_descarga;
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

               //data descarga
               if(data_apresenta_descarga != null){
                
               var dataa1 = data_apresenta_descarga.split(" ");

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
               }
                          var data_descarga4 = dia+'/'+mes+'/'+ano+' '+hora+':'+min+' h' ;
                    var cidade_comple4 = cidade_destino+' - '+estado_destino;
    var body = '<div class="card cardinfo segundoCard">'+
                      '<div class="card-content card-content-padding">'+
                       'Contrato:' +contrato4+'<br>'+
                         'Data de Descarga: '+data_descarga4+'<br>'+
                         'Cliente Destino: '+Cliente_destino4+'<br>'+
                         'Endereço: '+endereco_destino4+'<br>'+
                         'Cidade: '+cidade_comple4+'<br>'+
                         'Telefone: ' +telefone_destino4+' <br>'+
                      '</div>'+
                '</div>'+

              
             '<div class="text-info">'+
                '<p><span><b>Apresentação de Descarga</b> </span><br> Informada em '+dia1+'/'+mes1+'/'+ano1+' às '+hora1+':'+min1+' h</p>'+
                      '<p style="color: red" class="text1">Posicionamento Acionado</p>'+
                    '<img style="" width="70px" src="assets/custom/img/confirma.png">'+
             '</div>'+

              '<div style="margin-left: 18%;" class="">'+
     
                 '<i style="font-size: 40px;position: absolute;margin-top: 11px;" class="fa fa-map-marker"></i>'+

              '<div style="font-size: 16px; font-weight: bold;margin-left: 30px;margin-bottom: 20px;margin-top: 10px;" class="Localidade">'+
               'Localidade: <span id="cidade_estado99"></span><br>'+
               'Endereco:  <span id="endereco99"></span>'+

            '</div>'+

          '</div>';


         $('#body11').append(body)


            var lat = data[0].Entrega.lat_iniciar_descarga;
            var lng = data[0].Entrega.long_iniciar_descarga;


            var latlng = lat + "," +lng; 
            // var url = "maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=true"; 
           
           $.ajax({
               url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true&key='+KEYGMAPS,
               type: 'get',
               dataType: 'json',
    
           })
           .done(function(data) {
             console.log(data)

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

            var cidade = administrative_area_level_2
            var estado = administrative_area_level_1
            var endereco = ende[0]
            var cidade_estado = cidade+'-'+estado

            $('#cidade_estado99').text(cidade_estado)
            $('#endereco99').text(endereco)

              
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
           myApp.hidePreloader();
            console.log("complete");
        });

	

});
