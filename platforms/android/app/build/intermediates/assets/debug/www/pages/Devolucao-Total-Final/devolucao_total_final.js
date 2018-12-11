myApp.onPageInit('devolucao_total_final', function (page) {

    $('#voltar-entrega').on('click', function (event) {
        history.length = 0
        mainView.router.loadPage('pages/Dashboard/dashboard.html');
    });

    var motorista_id = localStorage.getItem('motorista.id');
    var oferta_id = localStorage.getItem('oferta_id');

    var data_atraso;
    var data_descarga;
    var hora_descarga;
    var latitude;
    var longitude;

    var parameters = { oferta_id: oferta_id };
    var successCallback = function (data) {
        myApp.hidePreloader();
        var oferta = data.result.oferta;
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

        $.each(oferta.oferta_statuses_log, function (index, status) {
            if (status.status_para == 6) {

                if (status.data != null) {
                    let data_descargaAnt = quebraDatas(status.data);
                    let hora = data_descargaAnt[3];
                    let min = data_descargaAnt[4];
                    let ano = data_descargaAnt[2];
                    let mes = data_descargaAnt[1];
                    let dia = data_descargaAnt[0];
                    mes_descarga = datas[parseInt(mes)];

                    data_descarga = dia + "/" + mes_descarga;
                    hora_descarga = hora + " h";
                }
                latitude = status.latitude;
                longitude = status.longitude;
            }
        });

        $('#contrato-dev-total-final').append(oferta.doc_transporte)
        $('#descarga-dev-total-final').append(data_fim)
        $('#destino-dev-total-final').append(oferta.cliente_destino.nome)
        $('#endereco-dev-total-final').append(oferta.cliente_destino.endereco_entrega)
        $('#cidade-dev-total-final').append(oferta.cliente_destino.cidade.nome)
        $('#fone-dev-total-final').append(oferta.telefone_atendimento_destino)

        var latlng = latitude + "," + longitude;
        var successCallback = function (data) {
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
            for (var i = 0; i >= endereco.results.length; i++) {
                console.log("end: " + endereco.results[i].formatted_address)
            };
            endereco_components = data.results[0]
            ende = endereco_components.formatted_address.split(',')
            var cidade = administrative_area_level_2
            var estado = administrative_area_level_1
            var endereco = ende[0]
            var cidade_estado = cidade + '-' + estado

            $('#cidade_estado-dev-tol').text(cidade_estado)
            $('#endereco9-dev-tol').text(endereco)
        }
        RestService.getGoogleLocation(
            'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true&key=' + KEYGMAPS,
            successCallback
        );
    };

    RestService.connect(
        "ofertas/ofertasDetalhes",
        "GET",
        parameters,
        true,
        successCallback
    );
});

