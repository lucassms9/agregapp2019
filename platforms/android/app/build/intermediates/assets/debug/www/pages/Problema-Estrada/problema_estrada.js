myApp.onPageInit('problema_estrada', function(page){
$('.back').on('click', function(event){

	mainView.router.loadPage('pages/Ocorrencia/ocorrencia.html')
});

    var motorista_id = localStorage.getItem('motorista.id');
    var oferta_id = localStorage.getItem('oferta_id');
    var entrega_id;
    //DADOS DA OFERTA
    var parameters = { oferta_id: oferta_id };
    var successCallback = function (data) {
        myApp.hidePreloader();
        var oferta = data.result.oferta;
        entrega_id = oferta.entrega_id;
        console.log(oferta)

        if (oferta.data_previsao_destino != null) {
            let data_destino = quebraDatas(oferta.data_previsao_destino);
            let hora = data_destino[3];
            let min = data_destino[4];
            let ano = data_destino[2];
            let mes = data_destino[1];
            let dia = data_destino[0];
            mes_fim = datas[parseInt(mes)];

            var data_fim = dia + "/" + mes_fim;
            var hora_fim = hora + " h";
        }

        $('#contrato2').text(oferta.doc_transporte)
        $('#data_descarga2').text(data_fim)

        $('#cliente_origem2').text(oferta.cliente_origem.nome)
        $('#cliente_destino2').text(oferta.cliente_destino.nome)
        $('#endereco_destino2').text(oferta.cliente_destino.endereco_entrega)
        $('#cidade_destino2').text(oferta.cliente_destino.cidade.nome)
        $('#telefone_destino2').text(oferta.telefone_atendimento_destino)
        
       
    };

    RestService.connect(
        "ofertas/ofertasDetalhes",
        "GET",
        parameters,
        true,
        successCallback
    );


    var successCallback = function (data) {
        console.log(data)
        var tipos = data.result.ocorrencia;
        $.each(tipos, function (index, tipo) {
            var select = "<option value=" + tipo.id + "> " + tipo.nome + " </option>";
            $("#tipo_problema_estrada").append(select);
        });

    }
    RestService.getConnect(
        'ocorrenciaTipos',
        successCallback
    );

    $('#problema-estrada').on('click', function (event) {
        myApp.showPreloader();

        var tipo_ocorrencia = $('#tipo_problema_estrada').val();
        var tempo_atraso = $('#previsao_estrada').val();
       

        var onSuccess = function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            var parameters = {
                ocorrencia_tipos_id: tipo_ocorrencia,
                ocorrencia_categorias_id: 1,
                tempo_atraso: tempo_atraso,
                lat_ocorrencia: latitude,
                long_ocorrencia: longitude,
                entrega_id: entrega_id,
            };
            var successCallback = function (data) {
                console.log(data)
                if (data.result.status == 204) {
                    mainView.router.loadPage('pages/Problema-Estrada-Final/problema_estrada_final.html')
                }
            };

            RestService.connect(
                "Ocorrencias/informarOcorrencia",
                "POST",
                parameters,
                true,
                successCallback
            );

        }
        GpsService.getLocation(onSuccess);


    });


});