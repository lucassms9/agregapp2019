myApp.onPageInit('opcoes', function (page) {

	$('.back').on('click', function (event) {
		history.length = 0
		mainView.router.loadPage("pages/Dashboard/dashboard.html")

	});

	function maskGeral() {
		$("#cep-proprietario").mask("00000-000");
		$('#cel-proprietario').mask('(00) 00000-0000');

		$(function () {
			$(":input[name=cpfCnpj]").mask(CpfCnpjMaskBehavior, cpfCnpjpOptions);
		});

	}

	var CpfCnpjMaskBehavior = function (val) {
			return val.replace(/\D/g, "").length <= 11 ?
				"000.000.000-009" :
				"00.000.000/0000-00";
		},
		cpfCnpjpOptions = {
			onKeyPress: function (val, e, field, options) {
				field.mask(CpfCnpjMaskBehavior.apply({}, arguments), options);
			}
		};

	var motorista_id = localStorage.getItem('motorista.id');
	var navAtiva = localStorage.getItem('navAtiva');
	var fotoBase64 = '';
	var fotoBase64Cnh = '';
	var hasVeiculo = false;

	if (navAtiva == 'perfil') {
		$('#tab1').removeClass('active');
		$('#tab-1').removeClass('active');

		$('#tab2').addClass('active');
		$('#tab-2').addClass('active');
	} else {
		$('#tab2').removeClass('active');
		$('#tab-2').removeClass('active');

		$('#tab1').addClass('active');
		$('#tab-1').addClass('active');
	}

	var successCallback = function (data) {
		myApp.hidePreloader();
		console.log(data)
		var veiculos = data.result.veiculos;
		$.each(veiculos, function (index, veiculo) {
			var select = "<option value=" + veiculo.id + "> " + veiculo.nome + " </option>";
			$("#tipo_caminhao-perfil").append(select);
		});
		var parameters = {
			motorista_id: motorista_id
		};
		var successCallback = function (data) {
			myApp.hidePreloader();
			console.log(data)
			var carrocerias = data.result.carrocerias;
			$.each(carrocerias, function (index, carroceria) {
				var select = "<option value=" + carroceria.id + "> " + carroceria.nome + " </option>";
				$("#tipo_carroceria-perfil").append(select);
			});

			var successCallback = function (data) {
				myApp.hidePreloader();
				var motorista = data.result.motorista[0];
				console.log(motorista)
				if (typeof motorista.img_url != 'undefined'){

					if (motorista.img_url != null && motorista.img_url != '') {
						
						var img = is_img(BASE_URL_IMAGE + '/motoristas/' + motorista.img_url, onload, onerror);
						
						img.onload = function (data) {
							$('#img-perfil').attr('src', BASE_URL_IMAGE + '/motoristas/' + motorista.img_url)
						}
						img.onerror = function (data) {
							$('#img-perfil').attr('src', 'assets/img/user-profile.png');
						}
					} else {
						$('#img-perfil').attr('src', 'assets/img/user-profile.png')
					}
					
				}
				$('#celular-perfil').val(motorista.celular);
				$('#email-perfil').val(motorista.email);
				$('#cpf-perfil').val(motorista.cpf);
				$('#nome-mae-perfil').val(motorista.nome_mae);

				$('#cep-perfil').val(motorista.cep);
				$('#bairro-perfil').val(motorista.bairro);
				$('#endereco-perfil').val(motorista.endereco);
				$('#cidade-perfil').val(motorista.cidade.nome);
				$('#uf-perfil').val(motorista.estado);

				if (typeof motorista.motorista_cnh[0] != 'undefined') {
					$('#registro_cnh-perfil').val(motorista.motorista_cnh[0].codigo_seguranca);
					$('#categoria_cnh-perfil').val(motorista.motorista_cnh[0].categoria);
					$('#codigo_seguranca_cnh-perfil').val(motorista.motorista_cnh[0].codigo_seguranca);
					$('#numero_antt-perfil').val(motorista.motorista_cnh[0].numero_antt);


					if (motorista.motorista_cnh[0].data_primeira_cnh != null) {
						let data_primeira_cnh1 = quebraDatas(motorista.motorista_cnh[0].data_primeira_cnh);
						let hora = data_primeira_cnh1[3];
						let min = data_primeira_cnh1[4];
						let ano = data_primeira_cnh1[2];
						let mes = data_primeira_cnh1[1];
						let dia = data_primeira_cnh1[0];
						mes_fim = datas[parseInt(mes)];

						var data_inicio = dia + "" + mes + "" + ano;
						$('#data_1_cnh-perfil').val(data_inicio);

					}
					if (motorista.motorista_cnh[0].validade != null) {
						let validade1 = quebraDatas(motorista.motorista_cnh[0].validade);
						let hora = validade1[3];
						let min = validade1[4];
						let ano = validade1[2];
						let mes = validade1[1];
						let dia = validade1[0];
						mes_fim = datas[parseInt(mes)];

						var validade = dia + "" + mes + "" + ano;
						$('#validade_cnh-perfil').val(validade);
					}

					if (motorista.motorista_cnh[0].foto_url != null && motorista.motorista_cnh[0].foto_url != '') {

						var img = is_img(BASE_URL_IMAGE + '/cnh/' + motorista.motorista_cnh[0].foto_url, onload, onerror);

						img.onload = function (data) {
							$('#img-Cnh').attr('src', BASE_URL_IMAGE + '/cnh/' + motorista.motorista_cnh[0].foto_url)
						}
						img.onerror = function (data) {
							$('#img-Cnh').attr('src', 'assets/img/icon-pendente-cnh.png');
						}
					} else {
						$('#img-Cnh').attr('src', 'assets/img/icon-pendente-cnh.png');
					}

				} else {
					$('#img-Cnh').attr('src', 'assets/img/icon-pendente-cnh.png');
				}

				if (typeof motorista.motoristas_veiculos[0] != 'undefined') {
					hasVeiculo = true;
					var tipo_veiculo = motorista.motoristas_veiculos[0].veiculo.veiculo_tipo_id;
					$('#tipo_caminhao-perfil option[value="' + tipo_veiculo + '"]').attr({
						selected: "selected"
					});
					var tipo_carroceria = motorista.motoristas_veiculos[0].veiculo.carroceria_id;
					$('#tipo_carroceria-perfil option[value="' + tipo_carroceria + '"]').attr({
						selected: "selected"
					});

					$('#placa-cavalo-perfil').val(motorista.motoristas_veiculos[0].veiculo.veiculo_placas[0].placa)
					$('#placa-reboque-perfil').val(motorista.motoristas_veiculos[0].veiculo.veiculo_placas[1].placa)
					$('#renavam-perfil').val(motorista.motoristas_veiculos[0].veiculo.renavam);

					if (motorista.motoristas_veiculos[0].veiculo.proprietario != null) {
						var proprietario = motorista.motoristas_veiculos[0].veiculo.proprietario;
						if (proprietario.cpf != null) {
							console.log(proprietario.cpf);
							if (motorista.cpf == proprietario.cpf) {
								$("#sim").attr('checked', true);
							} else {
								$("#nao").attr('checked', true);
							}
						} else {
							$("#nao").attr('checked', true);
						}

						$('#nome-proprietario').val(proprietario.nome_completo);
						$('#cpfCnpj-proprietario').val(proprietario.cpf);
						$('#cel-proprietario').val(proprietario.celular);
						$('#bairro-proprietario').val(proprietario.bairro);
						$('#nomeContato-proprietario').val(proprietario.apelido);
						$('#cep-proprietario').val(proprietario.cep);
						$('#bairro-proprietario').val(proprietario.bairro);
						$('#endereco-proprietario').val(proprietario.endereco);
						$('#cidade-proprietario').val(proprietario.cidade.nome);
						$('#uf-proprietario').val(proprietario.estado);
					}
				}
				if (motorista.rastreabilidade == 1) {
					$("#rastreabilidade-perfil").attr('checked', true);
				}

				$("input[type=radio][name=radio-proprietario]").change(function () {
					if (this.value == "sim") {

						$('#nome-proprietario').val(motorista.nome_completo);
						$('#cpfCnpj-proprietario').val($('#cpf-perfil').val());
						$('#cel-proprietario').val($('#celular-perfil').val());
						$('#nomeContato-proprietario').val(motorista.apelido);
						$('#cep-proprietario').val($('#cep-perfil').val());
						$('#bairro-proprietario').val(motorista.bairro);
						$('#endereco-proprietario').val(motorista.endereco);
						$('#cidade-proprietario').val(motorista.cidade.nome);
						$('#uf-proprietario').val(motorista.estado);

					} else if (this.value == "nao") {
						myApp.alert('Preencha os dados do Proprietário');

						$('#nome-proprietario').val('');
						$('#cpfCnpj-proprietario').val('');
						$('#cel-proprietario').val('');
						$('#nomeContato-proprietario').val('');
						$('#cep-proprietario').val('');
						$('#bairro-proprietario').val('');
						$('#endereco-proprietario').val('');
						$('#cidade-proprietario').val('');
						$('#uf-proprietario').val('');
					}
				});

				$('#placa-cavalo-perfil').mask('AAA-0000');
				$('#placa-reboque-perfil').mask('AAA-0000');
				$('#celular-perfil').mask('(00) 00000-0000');
				$("#data_1_cnh-perfil").mask("00/00/0000");
				$("#validade_cnh-perfil").mask("00/00/0000");
				$("#cpf-perfil").mask("000.000.000-00", {
					reverse: true
				});

				$("#cep-perfil").mask("00000-000");
				$("#cep-proprietario").mask("00000-000");
				$('#cel-proprietario').mask('(00) 00000-0000');
				$("#numero_antt-perfil").mask("AAA-00000000");
				$(function () {
					$(":input[name=cpfCnpj]").mask(CpfCnpjMaskBehavior, cpfCnpjpOptions);
				});

				// if ($("#cep-proprietario").val() != '' ||
				// 	$('#cel-proprietario').val() != '' ||
				// 	$('#cpfCnpj-proprietario').val() != ''
				// ){
				// 	maskGeral();
				// }
			}

			RestService.connect(
				'motoristas/view/',
				"GET",
				parameters,
				true,
				successCallback,
			);

		}
		RestService.getConnect(
			'carrocerias',
			successCallback
		);

	}
	RestService.getConnect(
		'veiculotipos',
		successCallback
	);


	$("#cep-proprietario").blur(function () {
		var cep = document.getElementById("cep-proprietario").value;
		var endereco = "endereco-proprietario";
		var bairro = "bairro-proprietario";
		var cidade = "cidade-proprietario";
		var uf = "uf-proprietario";

		var elementsId = {
			endereco: endereco,
			bairro: bairro,
			cidade: cidade,
			uf: uf
		};
		pesquisacep(cep, elementsId);
	});
	$("#cep-perfil").blur(function () {
		var cep = document.getElementById("cep-perfil").value;
		var endereco = "endereco-perfil";
		var bairro = "bairro-perfil";
		var cidade = "cidade-perfil";
		var uf = "uf-perfil";

		var elementsId = {
			endereco: endereco,
			bairro: bairro,
			cidade: cidade,
			uf: uf
		};
		pesquisacep(cep, elementsId);
	});


	$('#editar-dados').on('click', function (event) {
		myApp.showPreloader();

		var celular = onlyNumber($('#celular-perfil').val());
		var email = $('#email-perfil').val();
		var tipo_caminhao = $('#tipo_caminhao-perfil').val();
		var tipo_carroceria = $('#tipo_carroceria-perfil').val();
		var placa_cavalo = maskPlaca($('#placa-cavalo-perfil').val());
		var placa_reboque = maskPlaca($('#placa-reboque-perfil').val());
		var renavam = maskPlaca($('#renavam-perfil').val());
		var rastreabilidade = '';
		var box = $('#rastreabilidade-perfil').prop("checked");
		var senha = $('#senha-perfil').val();
		var nome_mae = $('#nome-mae-perfil').val();

		var cepMoto = $('#cep-perfil').val();
		var bairroMoto = $('#bairro-perfil').val();
		var enderecoMoto = $('#endereco-perfil').val();
		var cidadeMoto = $('#cidade-perfil').val();
		var ufcoMoto = $('#uf-perfil').val();

		//DADOS CNH
		var registro_cnh = onlyNumber($('#registro_cnh-perfil').val());
		var data_primeira_cnh = $('#data_1_cnh-perfil').val();
		var validade_cnh = $('#validade_cnh-perfil').val();
		var codigo_seguranca = $('#codigo_seguranca_cnh-perfil').val();
		var categoria_cnh = $('#categoria_cnh-perfil').val();
		var numero_antt = $('#numero_antt-perfil').val();

		// DADOS DO PROPRIETARIO

		var nome_completoProp = document.getElementById("nome-proprietario").value;
		var cpfCnpjProp = document.getElementById("cpfCnpj-proprietario").value;
		var celPro = removeCharTel(document.getElementById("cel-proprietario").value);
		var nomeContatoProp = document.getElementById("nomeContato-proprietario").value;
		var cepProp = document.getElementById("cep-proprietario").value;
		var bairroProp = document.getElementById("bairro-proprietario").value;
		var enderecoProp = document.getElementById("endereco-proprietario").value;
		var cidadeProp = document.getElementById("cidade-proprietario").value;
		var ufProp = document.getElementById("uf-proprietario").value;
		var documentoProp;
		var tipoDocumentoProp;

		if (tipo_caminhao != '' || tipo_carroceria != '') {

			if (nome_completoProp == '') {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo nome do Proprietário");
			}

			if (cpfCnpjProp == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo nome do CPF/CNPJ");
			} else {

				if (cpfCnpjProp.length > 15) {
					var documentoProp = pontuacaoCnpj(cpfCnpjProp);
					tipoDocumentoProp = "CNPJ";

					let valida = MotoristaService.is_cnpj(documentoProp);
					if (valida === false) {
						myApp.hidePreloader();
						return myApp.alert("Por favor, informe um CNPJ válido!");
					}
				} else {
					var documentoProp = pontuacaoCpf(cpfCnpjProp);
					tipoDocumentoProp = "CPF";

					let valida = MotoristaService.is_cpf(documentoProp);
					if (valida === false) {
						myApp.hidePreloader();
						return myApp.alert("Por favor, informe um CPF válido!");
					}
				}
			}

			if (celPro == '') {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Celular");
			}

			if (cepProp == '') {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo CEP");
			} else {
				let cepClean = cepProp.replace(/\D/g, "");
				let validacep = /^[0-9]{8}$/;

				if (!validacep.test(cepClean)) {
					myApp.hidePreloader();
					return myApp.alert("Formato de CEP inválido.");
				}

				cepProp = cepClean;
			}
			if (bairroProp == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Bairro");
			}
			if (enderecoProp == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Endereço");
			}
			if (registro_cnh == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Registro CNH");
			}

			if (data_primeira_cnh == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Data 1ª CNH");
			} else {
				var dados = data_primeira_cnh.split("/");
				let dia = dados[0];
				let mes = dados[1];
				let ano = dados[2];
				var dataValida = true;

				if (dia < 1 || dia > 31) {
					dataValida = false;
				}
				if (mes < 1 || mes > 12) {
					dataValida = false;
				}
				if (ano < 1900 || ano > 3000) {
					dataValida = false;
				}
				if (dataValida === false) {
					myApp.hidePreloader();
					return myApp.alert("Insira uma Data Válida");
				}

				data_primeira_cnh = ano + "-" + mes + "-" + dia;
			}

			if (validade_cnh == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Validade CNH");
			} else {
				var dados = validade_cnh.split("/");
				let dia = dados[0];
				let mes = dados[1];
				let ano = dados[2];
				var dataValida = true;

				if (dia < 1 || dia > 31) {
					dataValida = false;
				}
				if (mes < 1 || mes > 12) {
					dataValida = false;
				}
				if (ano < 1900 || ano > 3000) {
					dataValida = false;
				}
				if (dataValida === false) {
					myApp.hidePreloader();
					return myApp.alert("Insira uma Data Válida");
				}

				validade_cnh = ano + "-" + mes + "-" + dia;
			}

			if (codigo_seguranca == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Código de segurança da CNH");
			}
			if (categoria_cnh == "") {
				myApp.hidePreloader();
				return myApp.alert("Preencher o campo Categoria da CNH");
			}


		}
		if (box == true) {
			rastreabilidade = 1;
		} else {
			rastreabilidade = 0;
		}



		var parameters = {
			motorista_id: motorista_id,
			fotoBase64: fotoBase64,
			celular: celular,
			email: email,
			nome_mae: nome_mae,
			cep: cepMoto,
			bairro: bairroMoto,
			endereco: enderecoMoto,
			cidade: cidadeMoto,
			estado: ufcoMoto,
			tipo_caminhao: tipo_caminhao,
			tipo_carroceria: tipo_carroceria,
			placa_cavalo: placa_cavalo,
			placa_reboque: placa_reboque,
			rastreabilidade: rastreabilidade,
			senha: senha,
			fotoBase64Cnh: fotoBase64Cnh,
			numero_documento: registro_cnh,
			data_primeira_cnh: data_primeira_cnh,
			validade: validade_cnh,
			codigo_seguranca: codigo_seguranca,
			renavam: renavam,
			categoria: categoria_cnh.toUpperCase(),
			numero_antt: numero_antt,
			nome_completoProp: nome_completoProp,
			documentoProp: documentoProp,
			tipoDocumentoProp: tipoDocumentoProp,
			celPro: celPro,
			nomeContatoProp: nomeContatoProp,
			cepProp: cepProp,
			bairroProp: bairroProp,
			enderecoProp: enderecoProp,
			cidadeProp: cidadeProp,
			ufProp: ufProp,
		};

		var successCallback = function (data) {
			myApp.hidePreloader();
			console.log(data);
			if (data.result.status == 204) {
				console.log(data.result.img)
				if (typeof data.result.img != 'undefined') {
					localStorage.setItem('motorista.img_url', data.result.img);
					$('#minhafoto1').attr('src', BASE_URL_IMAGE + '/motoristas/' + data.result.img)
				}

				return myApp.alert(data.result.message);
			}
		}
		RestService.connect(
			"motoristas/edit",
			"POST",
			parameters,
			true,
			successCallback
		);

	});



	$('#ButtonLogout').on('click', function (event) {

		myApp.modal({
			title: 'AGREGA TRUCK',
			text: 'Deseja realmente sair?',
			buttons: [{
					text: 'NÃO',
					onClick: function () {

					}
				},
				{
					text: 'SIM',
					onClick: function () {
						var parameters = {
							motorista_id: motorista_id,
						};

						RestService.connect(
							"dispositivos/delete/",
							"POST",
							parameters,
							true,
							false,
							false,
							false,
							true
						);
						localStorage.clear();
						mainView.router.loadPage('pages/Login/login.html');
					}
				},
			]
		});

	});

	$('#alterarfoto').on('click', function (event) {
		function onSuccess(imageURI) {
			var image = document.getElementById('img-perfil');
			image.style.display = "block";
			image.src = "data:image/jpeg;base64," + imageURI;
			fotoBase64 = imageURI
		}
		CameraService.getFoto(onSuccess);
	});

	$('#alterarfotoCnh').on('click', function (event) {
		function onSuccess(imageURI) {
			var image = document.getElementById('img-Cnh');
			image.style.display = "block";
			image.src = "data:image/jpeg;base64," + imageURI;
			fotoBase64Cnh = imageURI
		}
		CameraService.getFoto(onSuccess);
	});

});