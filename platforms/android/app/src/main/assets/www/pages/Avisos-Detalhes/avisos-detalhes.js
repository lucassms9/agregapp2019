myApp.onPageInit("avisos-detalhes", function (page) {

    $("#voltar-avisosDetalhes").on("click", function (event) {
        history.length = 0;
        mainView.router.loadPage("pages/Avisos/Avisos.html");
    });

    var aviso_id = localStorage.getItem("aviso_id");

    var parameters = {
        aviso_id: aviso_id
    }
    var successCallback = function (data) {
        var aviso = data.result.aviso;
        console.log(aviso)
        
        $('#titulo-aviso').text(aviso.titulo);
        $('#text-aviso').text(aviso.mensagem);
        
        if (aviso.created != null) {
            let data_criacao = quebraDatas(aviso.created);
            let hora = data_criacao[3];
            let min = data_criacao[4];
            let ano = data_criacao[2];
            let mes = data_criacao[1];
            let dia = data_criacao[0];
            mes_fim = datas[parseInt(mes)];
            
            var data_fim = dia + "/" + mes_fim;
            var hora_fim = hora+":"+min + " h";
            $('#data-aviso').text(data_fim + ' ' + hora_fim);
        }

    }
    RestService.connect(
        "motoristas/avisoDetalhes",
        "GET",
        parameters,
        true,
        successCallback
    );


});
