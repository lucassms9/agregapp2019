myApp.onPageInit('informa_atraso', function(page){
$('.back').on('click', function(event){

	mainView.router.loadPage('ocorrencia.html')
});

         var usuario = localStorage.getItem('id_user2');  
        $.ajax({
             url: urlApi+'/ofertas/contratado?usuario='+usuario+'&ocorrencia=',
            type: 'get',
            dataType: 'json',
        })
        .done(function(data) {

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

                    var data_descarga = dia+'/'+mes+'/'+ano+' '+hora+':'+min+' h' ;
                    var cidade_comple = cidade_destino+' - '+estado_destino;

                $('#contrato3').text(contrato)
                $('#data_descarga3').text(data_descarga)

                $('#cliente_origem3').text(Cliente_origem)
                $('#cliente_destino3').text(Cliente_destino)
                $('#endereco_destino3').text(endereco_destino)
                $('#cidade_destino3').text(cidade_comple)
                $('#telefone_destino3').text(telefone_destino)
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

	
	

  $('#BTNprevisao-atraso').on('click',function(event) {
    
    // var onSuccess = function(position) {


    //                 var Latitude2 = position.coords.latitude;    
    //                 var Longitude2 = position.coords.longitude;   
                   
    //                localStorage.setItem("Latitude2",Latitude2);
    //                localStorage.setItem("Longitude2",Longitude2);

                  
    //             }

    //             function onError(error) {
    //     alert('code: '    + error.code    + '\n' +
    //           'message: ' + error.message + '\n');
    // }

    // navigator.geolocation.getCurrentPosition(onSuccess, onError);


    
    var tipo_ocorrencia =''
    var tempo_atraso = $('#previsao-atraso').val();
    var categoria_ocorrencia ='' 
    var entrega_id = localStorage.getItem("entrega_id");

    var lat_ocorrencia = sessionStorage.getItem('Latitude');
    var long_ocorrencia = sessionStorage.getItem('Longitude');


    $.ajax({
        url: urlApi+'/entregas/OcorrenciaAdd?tipo_ocorrencia='+tipo_ocorrencia+'&categoria_ocorrencia='+categoria_ocorrencia+'&entrega_id='+entrega_id+'&tempo_atraso='+tempo_atraso+'&lat_ocorrencia='+lat_ocorrencia+'&long_ocorrencia='+long_ocorrencia,
        type: 'GET',
        dataType: 'JSON',
 
    })
    .done(function(data) {
        console.log(data);

        if(data.msg == 'Salvo'){

            var ocorrencia_id3 = data.ocorrencia[0].Ocorrencia.id;
            var fim = data.ocorrencia[0].Ocorrencia.created;
            var hora_atraso = data.ocorrencia[0].Ocorrencia.tempo_atraso;
            var lat2 = data.ocorrencia[0].Ocorrencia.lat_ocorrencia;
            var long2 = data.ocorrencia[0].Ocorrencia.long_ocorrencia;

              localStorage.setItem('ocorrencia_id3',ocorrencia_id3)
            // localStorage.setItem('lat2',lat2)
            // localStorage.setItem('long2',long2)

            localStorage.setItem('fim',fim)
            localStorage.setItem('hora_atraso',hora_atraso)
            mainView.router.loadPage('informa_atraso_final.html')

        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
   
   });




   


});