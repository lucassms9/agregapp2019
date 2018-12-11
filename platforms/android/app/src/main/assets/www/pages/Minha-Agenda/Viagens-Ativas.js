myApp.onPageInit("minha_agenda", function (page) {
    myApp.hidePreloader();
    var motorista_id = localStorage.getItem("motorista.id");

    var ptrContent = $$(".pull-to-refresh-content");
    ptrContent.on("ptr:refresh", function (e) {
        setTimeout(function () {
            myApp.pullToRefreshDone();
        }, 300);
        mainView.router.refreshPage();
    });

    $(".voltar-agenda").on("click", function (event) {
        history.length = 0;
        mainView.router.loadPage("pages/Dashboard/dashboard.html");
    });

    function getOfertas(ativas, finalizadas) {
        $("#listagem").html("");

        var filtro = ativas == 1 ? [2, 3, 4, 5, 6] : [7, 8, 9];

        var parameters = {
            motorista_id: motorista_id,
            status_oferta: filtro
        };

        var successCallback = function (data) {
            myApp.hidePreloader();
            if (data.result.status == 404) {
                $("#sem-ofertas").show();
                let statusView = filtro[0] == 7 ? "Finalizados" : "Ativos";
                $("#msg_ofertas").text(
                    "Sem Contratos " + statusView + " Até o Momento!"
                );

                $("#lista-img3").show();
                $("#lista-img3").css({
                    display: "block",
                    "margin-left": "auto",
                    "margin-right": "auto",
                    "margin-top": "20px",
                    "padding-bottom": "10px"
                });

                return false;
            } else {
                $("#sem-ofertas").hide();
            }

            var ofertas = data.result.ofertas;
            console.log(ofertas);
            $.each(ofertas, function (index, oferta) {
                if (oferta.data_previsao_origem != null) {
                    let data_origem = quebraDatas(oferta.data_previsao_origem);
                    let hora = data_origem[3];
                    let min = data_origem[4];
                    let ano = data_origem[2];
                    let mes = data_origem[1];
                    let dia = data_origem[0];
                    mes_inicio = datas[parseInt(mes)];

                    console.log(mes_inicio);
                    var data_inicio = dia + "/" + mes_inicio;
                    var hora_inicio = hora + ":" + min + " h";
                }

                if (oferta.data_previsao_destino != null) {
                    let data_origem = quebraDatas(oferta.data_previsao_destino);
                    let hora = data_origem[3];
                    let min = data_origem[4];
                    let ano = data_origem[2];
                    let mes = data_origem[1];
                    let dia = data_origem[0];
                    mes_fim = datas[parseInt(mes)];

                    var data_fim = dia + "/" + mes_fim;
                    var hora_fim = hora + " h";
                }

                imediato = oferta.imediato;

                if (imediato == 1) imediato = "IMEDIATO";
                else imediato = data_inicio + " - " + hora_fim;

                if (oferta.unidade_medida.id == 1) ton = "Ton";
                else ton = "Kg";

                oferta_tipo = oferta.oferta_tipo_id;
                valor_inicial_oferta = oferta.valor_lance_inicial;
                lance = oferta.lances[0];

                var valor = valor_inicial_oferta;
                if (valor != null) var numeroF = Moeda(valor);
                var status = oferta.oferta_status.nome;
                var cliente_destinoM = oferta.entrega.cidade.nome.substring(
                    0,
                    15
                );

                var card =
                    '<div style="padding-top: 5px;" id="card-' + index + '" class="card">' +
                    '<div style="    background: #F3F3F3;font-weight: bold;font-size: 17px;" class="row">' +
                    '<div class="col-20"></div>' +
                    '<div style="text-align:center;background: #F3F3F3;padding-top: 1.5px;" class="col-60">' +
                    "<span>CT: " +
                    oferta.doc_transporte +
                    "</span></div>" +
                    '<div class="col-20"></div></div>' +
                    '<div class="card-content">' +
                    '<div class="card-content-inner">' +
                    '<div class="row linha-inicial">' +
                    '<div class="col-30">' +
                    '<div id="caminhao-' +
                    index +
                    '" class="caminhao-inicial">' +
                    '<div class="ponto-inicial">' +
                    '<img id="carreta-bombril-' +
                    index +
                    '" class="caminhao-bombril" src="assets/img/carreta_bombril.png" width="140%">' +
                    '<img id="carreta-tigre-' +
                    index +
                    '" class="caminhao-tigre" src="assets/img/ic-carreta_tigre.png" width="140%">' +
                    '<div class="text-uf-inicial">' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    '<div id="truck-' +
                    index +
                    '" class="truck-inicial">' +
                    '<div class="ponto-inicial">' +
                    '<img id="truck-bombril-' +
                    index +
                    '" class="truck-bombril" src="assets/img/truck-bombril.png">' +
                    '<img id="truck-trigre-' +
                    index +
                    '" class="truck-trigre" src="assets/img/ic-truck-tigre.png">' +
                    '<div class="text-uf-inicial-truck">' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    '<div class="col-30 center1"><div class="fluxo">' +
                    '<div id="sateliteimg-' +
                    index +
                    '" class="sateliteimg">' +
                    '<img class="ic-satelite" src="assets/img/ic-satelite1.png">' +
                    '</div><img style="width:60%" src="assets/img/ic-seta1.png">' +
                    '<div class="peso-info" style="font-size: 11px">' +
                    oferta.peso_carga +
                    " " +
                    ton +
                    "/vol " +
                    oferta.volume_carga +
                    " m³</div></div></div>" +
                    '<div class="col-30">' +
                    '<div class="ponto-final">' +
                    '<img id="horas-' +
                    index +
                    '" class="horas" src="assets/img/ico-horas.png">' +
                    '<div class="text-uf-final">' +
                    oferta.entrega.estado +
                    "</div>" +
                    '<img style="width: 100%;" src="assets/img/ic-casa1.png">' +
                    "</div></div></div>" +
                    '<div class="row linha2-inicial"><div style="width:52%" class="col-50"><b>' +
                    oferta.cliente_origem.cidade.nome +
                    "/" +
                    oferta.cliente_origem.estado +
                    "</b><br>" +
                    "<b>" +
                    imediato +
                    "</b>" +
                    "<br>R$ " +
                    numeroF +
                    '<img id="dollar1-' +
                    index +
                    '" class="dollar" src="assets/img/dollar.png"><img id="cifra1-' +
                    index +
                    '" class="cifra" src="assets/img/cifra.png">' +
                    '<span style="position: relative;left: 8px; top: 0.4px;" id="tipo_oferta1-' +
                    index +
                    '"></span>' +
                    '<img id="status-posi1-' +
                    index +
                    '"  class="status" style="display:none;" src="assets/img/ic-status-posi.png" >' +
                    '<img id="status-nega1-' +
                    index +
                    '" class="status" style="display:none;" src="assets/img/ic-status-nega.png"></div>' +
                    '<div class="col-50 text-destino"><b>' +
                    oferta.entrega.cidade.nome +
                    " - " +
                    oferta.entrega.estado +
                    '</b><br><span class="agendado-123" id="agendado-true123-' +
                    index +
                    '">Até </span>' +
                    data_fim +
                    " - " +
                    hora_fim +
                    "<br>" +
                    status +
                    "</b></div></div>" +
                    "</div>" +
                    "</div><div>";

                    $("#lista-cards-ativas").append(card);
               
                if (
                    oferta.veiculo_tipo.nome == "BITRUCK" ||
                    oferta.veiculo_tipo.nome == "TRUCK" ||
                    oferta.veiculo_tipo.nome == "TOCO" ||
                    oferta.veiculo_tipo.nome == "3/4" ||
                    oferta.veiculo_tipo.nome == "VLC"
                ) {
                    if (oferta.cliente_origem.operacao.nome == "BBLOG") {
                        $("#truck-bombril-" + index).show();
                    }

                    if (oferta.cliente_origem.operacao.nome == "TLOG") {
                        $("#truck-trigre-" + index).show();
                    }
                } else {
                    if (oferta.cliente_origem.operacao.nome == "BBLOG") {
                        $("#carreta-bombril-" + index).show();
                    }

                    if (oferta.cliente_origem.operacao.nome == "TLOG") {
                        $("#carreta-tigre-" + index).show();
                    }
                }

                if (oferta.caminhao_rastreado == 1) $("#sateliteimg-" + index).show();
                if (oferta.agendado == 1) {
                    $("#horas-" + index).show();
                    $("#agendado-true123-" + index).hide();
                }
                if (oferta.oferta_tipo_id == 2) {
                    $("#dollar1-" + index).show();
                    var card123 = "Direta";
                    $("#tipo_oferta1-" + index).append(card123);
                    $("#tipo_oferta1-" + index).css("color", "#70A83B");
                }
                if (oferta.oferta_tipo_id == 1) {
                    $("#cifra1-" + index).show();
                    var card123 = "Leilão";
                    $("#tipo_oferta1-" + index).append(card123);
                    $("#tipo_oferta1-" + index).css("color", "#6CA5D8");
                }

                $("#card-" + index).on("click", function (event) {
                    myApp.showPreloader("Carregando...");
                    localStorage.setItem("oferta_id", oferta.id);
                    mainView.router.loadPage("pages/Agenda-Detalhe/agenda_detalhe.html");
                });
            });
        };

        RestService.connect(
            "ofertas/ofertasList",
            "GET",
            parameters,
            true,
            successCallback
        );
    }

    $("#btn-ativas").on("click", function (event) {
        getOfertas(1, 0);
    });

    $("#btn-finalizadas").on("click", function (event) {
        getOfertas(0, 1);
    });

    // ao abrir a listagem
    getOfertas(1, 0);
    // getOfertas(0, 1);
});
