myApp.onPageInit("avisos", function (page) {

    $("#voltar-avisos").on("click", function (event) {
        history.length = 0;
        mainView.router.loadPage("pages/Dashboard/dashboard.html");
    });

    var motorista_id = localStorage.getItem("motorista.id");
    var parameters = {
        motorista_id: motorista_id
    }
    var successCallback = function (data) {
        
        var avisos = data.result.avisos
        var teste;
        var dataHora;
   
        if (data.result.status == 500){
            myApp.alert('Você não tem nenhuma notificação!', 'Agrega Truck!', function () {
                mainView.router.loadPage("pages/Dashboard/dashboard.html");
            });
        }
        $('#lista-aviso-main').show();
        $.each(avisos, function (index, aviso) {
            console.log(aviso.visto)
            color = (aviso.visto == 0) ? 'nao-lido-color' : 'a';

            if (aviso.created != null) {
                let data_criacao = quebraDatas(aviso.created);
                let hora = data_criacao[3];
                let min = data_criacao[4];
                let ano = data_criacao[2];
                let mes = data_criacao[1];
                let dia = data_criacao[0];
                mes_fim = datas[parseInt(mes)];

                var data_fim = dia + "/" + mes_fim;
                var hora_fim = hora + ":" + min + " h";
                dataHora = data_fim + ' ' + hora_fim;
            }

            var html = '<li id="item-' + index + '"  idAviso=" ' + aviso.id + '" class="item-content ' + color + ' ">' +
                '<div class="item-inner" >' +
                '<span id="list-avisos-' + index + '" style="display: none; position: absolute;width: 10px; height: 10px; padding: 0;" class="badge bg-red"></span>' +
                '<div style="margin-left: 20px;" class="item-title">' + aviso.titulo + '</div>' +
                '<div class="item-after"> <i class="fa fa-angle-right" aria-hidden="true"></i></div>' +
                '</div>' +
                '</li >';

            $('#lista-avisos').append(html);

            if (aviso.visto == 0) {
                $('#list-avisos-' + index).show();
            }

            $("#item-" + index).click(function (e) {
                var idAviso = $(this).attr('idAviso');
                localStorage.setItem('aviso_id', idAviso);
                mainView.router.loadPage("pages/Avisos-Detalhes/avisos-detalhes.html");
            });

        });
    }
    RestService.connect(
        "motoristas/avisos/",
        "GET",
        parameters,
        true,
        successCallback
    );


});
