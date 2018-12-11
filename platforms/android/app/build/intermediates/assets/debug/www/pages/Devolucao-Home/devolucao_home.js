myApp.onPageInit('devolucao_home', function (page) {


	$('#voltar-dev-home').on('click', function (event) {
		history.length = 0
		mainView.router.loadPage('pages/Agenda-Detalhe/agenda_detalhe.html');
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

		$('#contrato-dev-home').text(oferta.doc_transporte)
		$('#descarga-dev-home').text(data_fim)
		$('#destino-dev-home').text(oferta.cliente_destino.nome)
		$('#endereco-dev-home').text(oferta.cliente_destino.endereco_entrega)
		$('#cidade-dev-home').text(oferta.cliente_destino.cidade.nome)
		$('#fone-dev-home').text(oferta.telefone_atendimento_destino)

	};

	RestService.connect(
		"ofertas/ofertasDetalhes",
		"GET",
		parameters,
		true,
		successCallback
	);

});

