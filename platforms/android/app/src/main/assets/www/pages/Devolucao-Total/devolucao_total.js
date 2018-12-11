myApp.onPageInit('devolucao_total', function (page) {


    $('#voltar-dev-total').on('click', function (event) {
        history.length = 0
        mainView.router.loadPage('pages/Devolucao-Home/devolucao_home.html');
    });

    var motorista_id = localStorage.getItem('motorista.id');
    var oferta_id = localStorage.getItem('oferta_id');

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

        $('#contrato-dev-total').text(oferta.doc_transporte)
        $('#descarga-dev-total').text(data_fim)
        $('#destino-dev-total').text(oferta.cliente_destino.nome)
        $('#endereco-dev-total').text(oferta.cliente_destino.endereco_entrega)
        $('#cidade-dev-total').text(oferta.cliente_destino.cidade.nome)
        $('#fone-dev-total').text(oferta.telefone_atendimento_destino)

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
            $("#devolucao_motivo").append(select);
        });

    }
    RestService.getConnect(
        'DevolucaoMotivos',
        successCallback
    );


    $('#minhacamera-dev-total').on('click', function (even) {

        var tipo_documento = $("#tipo_documento option:selected").val();
        if (tipo_documento == 'Escolha') {
            myApp.alert('Escolha um tipo de documento');
            return false
        }

        var capturedPhoto = 1
        function onSuccess(imageURI) {
            var capturedPhoto1 = sessionStorage.getItem('number2')
            var capturedPhoto2 = parseInt(capturedPhoto1)
            if (Number.isNaN(capturedPhoto2)) {
                capturedPhoto2 = 0;
            }

            capturedPhoto = capturedPhoto2 + 1
            if (capturedPhoto == 1) {
                var part1 = document.getElementById('minhaImagem1');
                part1.style.display = "block";
                part1.src = "data:image/jpeg;base64," + imageURI;
                var tipo_documento = $("#tipo_documento option:selected").val();
                var titulo1 = document.getElementById('titulo1');
                url_img1 = imageURI;
                sessionStorage.setItem("url_img1", url_img1);
            }

            if (capturedPhoto == 2) {
                var part2 = document.getElementById('minhaImagem2');
                part2.style.display = "block";
                part2.src = "data:image/jpeg;base64," + imageURI;
                var tipo_documento = $("#tipo_documento option:selected").val();
                var titulo2 = document.getElementById('titulo2');
                url_img2 = imageURI;
                sessionStorage.setItem("url_img2", url_img2);
            }

            if (capturedPhoto == 3) {
                var part3 = document.getElementById('minhaImagem3');
                part3.style.display = "block";
                part3.src = "data:image/jpeg;base64," + imageURI;
                var tipo_documento = $("#tipo_documento option:selected").val();
                var titulo3 = document.getElementById('titulo3');
                url_img3 = imageURI;
                sessionStorage.setItem("url_img3", url_img3);
            }
            if (capturedPhoto == 4) {
                var part4 = document.getElementById('minhaImagem4');
                part4.style.display = "block";
                part4.src = "data:image/jpeg;base64," + imageURI;
                var tipo_documento = $("#tipo_documento option:selected").val();
                var titulo4 = document.getElementById('titulo4');
                url_img4 = imageURI;
                sessionStorage.setItem("url_img4", url_img4);
            }
            if (capturedPhoto > 4) {
                capturedPhoto = 0
            }
            sessionStorage.setItem('number2', capturedPhoto)
        }

        CameraService.getFoto(onSuccess);
        event.preventDefault();

    });


    $('#fim-dev-total').on('click', function (event) {
        myApp.showPreloader();
        var motivo = $("#devolucao_motivo option:selected").val();   

        var onSuccess = function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            var parameters = {
                entrega_id: entrega_id,
                devolucao_tipos_id: 1,
                devolucao_motivos_id: motivo,
                latitude: latitude,
                longitude: longitude,
            };

            var successCallback = function (data) {
                console.log(data)
                if (data.result.status == 204) {
                    mainView.router.loadPage('pages/Devolucao-Total-Final/devolucao_total_final.html')
                }
            };

            RestService.connect(
                "devolucoes/informarDevolucao",
                "POST",
                parameters,
                true,
                successCallback
            );
        }
        GpsService.getLocation(onSuccess);
    });
});

