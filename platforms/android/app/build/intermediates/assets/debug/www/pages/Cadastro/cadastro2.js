myApp.onPageInit("cadastro-2", function (page) {
  // Mascara de CPF e CNPJ
  var CpfCnpjMaskBehavior = function (val) {
    return val.replace(/\D/g, "").length <= 11
      ? "000.000.000-009"
      : "00.000.000/0000-00";
  },
    cpfCnpjpOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(CpfCnpjMaskBehavior.apply({}, arguments), options);
      }
    };

  $(function () {
    $(":input[name=cpfCnpj]").mask(CpfCnpjMaskBehavior, cpfCnpjpOptions);
  });

  $("#tel-proprietario").mask("(00) 0000-0000");
  $("#cel-proprietario").mask("(00) 00000-0000");
  $("#placa-cavalo").mask("AAA-0000");
  $("#placa-reboque").mask("AAA-0000");
  $("#numero_antt").mask("AAA-00000000");
  $("#cep-proprietario").mask("00000-000");
  $("#data_1_cnh").mask("00/00/0000");
  $("#validade_cnh").mask("00/00/0000");

  var caminhao = sessionStorage.getItem("caminhao1");
  var carroceria = sessionStorage.getItem("carroceria1");
  var cnh = sessionStorage.getItem("cnh1");
  var validade = sessionStorage.getItem("validade1");
  var fotoBase64CNH;
  if (caminhao !== null) {
    $("#tipo_caminhao").val(caminhao);
    $("#tipo_carroceria").val(carroceria);
    $("#cnh").val(cnh);
    $("#validade_cnh").val(validade);
  }

  var aceito = sessionStorage.getItem("aceito");

  $("input[type=radio][name=radio-proprietario]").change(function () {
    if (this.value == "sim") {
      $("#dados-proprietario").hide();
    } else if (this.value == "nao") {
      myApp.alert("Insira os dados do proprietário");
      $("#dados-proprietario").show();
    }
  });

  $.getJSON(BASE_URL + "veiculotipos", function (data) {
    console.log(data.result.veiculos);

    $.each(data.result.veiculos, function (index, val) {
      var select = "<option value=" + val.id + "> " + val.nome + " </option>";

      $("#tipo_caminhao").append(select);
    });
  });

  var successCallback = function (data) {
    myApp.hidePreloader();
    console.log(data);
  };

  RestService.connect("carrocerias/", "GET", null, null, successCallback);

  $.getJSON(BASE_URL + "carrocerias", function (data) {
    $.each(data.result.carrocerias, function (index, val) {
      var select = "<option value=" + val.id + "> " + val.nome + " </option>";

      $("#tipo_carroceria").append(select);
    });
  });

  $("#GetFotoCNH").click(function (event) {

    function onSuccess(imageURI) {
      var image = document.getElementById('minhaImagemCNH');
      image.style.display = "block";
      image.src = "data:image/jpeg;base64," + imageURI;
      fotoBase64CNH = imageURI
    }

    CameraService.getFoto(onSuccess);
    event.preventDefault();
  });

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

  $("#buttonSubmit2").on("click", function (event) {

    //DADOS DO MOTORISTA
    var tipo_veiculo = document.getElementById("tipo_caminhao").value;
    var tipo_carroceria = document.getElementById("tipo_carroceria").value;
    var placa_cavalo = maskPlaca(document.getElementById("placa-cavalo").value);
    var placa_semi_reboque = maskPlaca(document.getElementById("placa-reboque").value);
    var renavam = document.getElementById("renavam").value;
    var registro_cnh = document.getElementById("registro_cnh").value;
    var data_primeira_cnh = document.getElementById("data_1_cnh").value;
    var validade_cnh = document.getElementById("validade_cnh").value;
    var codigo_seguranca = document.getElementById("codigo_seguranca_cnh").value;
    var categoria_cnh = document.getElementById("categoria_cnh").value;
    var numero_antt = document.getElementById("numero_antt").value;
    var nome_mae = document.getElementById("nome_mae").value;

    var boxRastreabilidade = $("#rastreabilidade").prop("checked");

    var parametersProp = {
      nome_completoProp: "",
      documentoProp: "",
      tipoDocumentoProp: "",
      celProp: "",
      telPro: "",
      nomeContato: "",
      cep: "",
      bairro: "",
      endereco: "",
      cidade: "",
      uf: "",
      isProprietario: ""
    };

    if ($("#sim").prop("checked")) {
      parametersProp.isProprietario = "sim";
    }

    if ($("#nao").prop("checked")) {
      parametersProp.isProprietario = "nao";

      // DADOS PROPRIETARIO
      var nome_completoProp = document.getElementById("nome-proprietario").value;
      var cpfCnpjProp = document.getElementById("cpfCnpj-proprietario").value;
      var telPro = removeCharTel(document.getElementById("tel-proprietario").value);
      var celProp = removeCharTel(document.getElementById("cel-proprietario").value);
      var nomeContatoProp = document.getElementById("nomeContato-proprietario").value;
      var cepProp = document.getElementById("cep-proprietario").value;
      var bairroProp = document.getElementById("bairro-proprietario").value;
      var enderecoProp = document.getElementById("endereco-proprietario").value;
      var cidadeProp = document.getElementById("cidade-proprietario").value;
      var ufProp = document.getElementById("uf-proprietario").value;
      var documentoProp;
      var tipoDocumentoProp;

      if (nome_completoProp == '') {
        return myApp.alert("Preencher o campo nome do Proprietário");
      }

      if (cpfCnpjProp == "") {
        return myApp.alert("Preencher o campo nome do CPF/CNPJ");
      } else {

        if (cpfCnpjProp.length > 15) {
          var documentoProp = pontuacaoCnpj(cpfCnpjProp);
          tipoDocumentoProp = "CNPJ";

          let valida = MotoristaService.is_cnpj(documentoProp);
          if (valida === false) {
            return myApp.alert("Por favor, informe um CNPJ válido!");
          }
        } else {
          var documentoProp = pontuacaoCpf(cpfCnpjProp);
          tipoDocumentoProp = "CPF";

          let valida = MotoristaService.is_cpf(documentoProp);
          if (valida === false) {
            return myApp.alert("Por favor, informe um CPF válido!");
          }
        }
      }

      if (celProp == '') {
        return myApp.alert("Preencher o campo Celular");
      }
      if (cepProp == '') {
        return myApp.alert("Preencher o campo CEP");
      } else {
        let cepClean = cepProp.replace(/\D/g, "");
        let validacep = /^[0-9]{8}$/;

        if (!validacep.test(cepClean)) {
          return myApp.alert("Formato de CEP inválido.");
        }

        cepProp = cepClean;
      }
      if (bairroProp == "") {
        return myApp.alert("Preencher o campo Bairro");
      }
      if (enderecoProp == "") {
        return myApp.alert("Preencher o campo Endereço");
      }

      parametersProp.nome_completoProp = nome_completoProp;
      parametersProp.documentoProp = documentoProp;
      parametersProp.tipoDocumentoProp = tipoDocumentoProp;
      parametersProp.telPro = telPro;
      parametersProp.celProp = celProp;
      parametersProp.nomeContato = nomeContatoProp;
      parametersProp.cep = cepProp;
      parametersProp.bairro = bairroProp;
      parametersProp.endereco = enderecoProp;
      parametersProp.cidade = cidadeProp;
      parametersProp.uf = ufProp;

    }



    var rastreabilidade;
    (boxRastreabilidade == true) ? rastreabilidade = 1 : rastreabilidade = 0;
    // if (typeof fotoBase64CNH == 'undefined'){
    //   return myApp.alert("Tira uma Foto da Sua CNH");
    // }
    if (tipo_veiculo == "Escolha") {
      return myApp.alert("Escolher Tipo de Caminhão");
    }

    if (tipo_carroceria == "Escolha") {
      return myApp.alert("Escolher Tipo de Carroceria");
    }

    if (placa_cavalo == "") {
      return myApp.alert("Preencher o campo Placa Cavalo");
    }
    if (placa_semi_reboque == "") {
      return myApp.alert("Preencher o campo Placa Semi-Reboque");
    }

    if (renavam == "") {
      return myApp.alert("Preencher o campo Renavam");
    }
    if (registro_cnh == "") {
      return myApp.alert("Preencher o campo Registro CNH");
    }

    if (data_primeira_cnh == "") {
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
        return myApp.alert("Insira uma Data Válida");
      }

      data_primeira_cnh = ano + "-" + mes + "-" + dia;
    }

    if (validade_cnh == "") {
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
        return myApp.alert("Insira uma Data Válida");
      }

      validade_cnh = ano + "-" + mes + "-" + dia;
    }

    if (codigo_seguranca == "") {
      return myApp.alert("Preencher o campo Código de segurança da CNH");
    }
    if (categoria_cnh == "") {
      return myApp.alert("Preencher o campo Categoria da CNH");
    }
    if (nome_mae == "") {
      return myApp.alert("Preencher o campo nome_mae");
    }

    

    var dados_cadastro = JSON.parse(localStorage.getItem("dados_cadastro"));

    var nome_completo = dados_cadastro.nome_completo;
    var cpf = dados_cadastro.cpf;
    var celular = dados_cadastro.celular;
    var email = dados_cadastro.email;
    var senha = dados_cadastro.senha;
    var apelido = dados_cadastro.apelido;
    var cep = dados_cadastro.cep;
    var bairro = dados_cadastro.bairro;
    var endereco = dados_cadastro.endereco;
    var cidade = dados_cadastro.cidade;
    var estado = dados_cadastro.estado;


    var parameters = {
      nome_completo: nome_completo,
      cpf: cpf,
      celular: celular,
      email: email,
      apelido: apelido,
      senha: senha,
      tipo_veiculo: tipo_veiculo,
      carroceria: tipo_carroceria,
      fotoBase64CNH: fotoBase64CNH,
      rastreabilidade: rastreabilidade,
      placa_semi_reboque: placa_semi_reboque,
      placa_cavalo: placa_cavalo,
      nome_mae: nome_mae,
      renavam: renavam,
      cep: cep,
      bairro: bairro,
      endereco: endereco,
      cidade: cidade,
      estado: estado,
      nome_completoProp: parametersProp.nome_completoProp,
      documentoProp: parametersProp.documentoProp,
      tipoDocumentoProp: parametersProp.tipoDocumentoProp,
      telPro: parametersProp.telPro,
      celProp: parametersProp.celProp,
      nomeContatoProp: parametersProp.nomeContato,
      cepProp: parametersProp.cep,
      bairroProp: parametersProp.bairro,
      enderecoProp: parametersProp.endereco,
      cidadeProp: parametersProp.cidade,
      ufProp: parametersProp.uf,
      isProprietario: parametersProp.isProprietario,
      numero_documento: registro_cnh,
      data_primeira_cnh: data_primeira_cnh,
      validade: validade_cnh,
      codigo_seguranca: codigo_seguranca,
      categoria: categoria_cnh.toUpperCase(),
      numero_antt: numero_antt,
      completo: 1
    };

    var errorCallback = function (xhr, textStatus, errorThrown) {
      myApp.alert(
        "Não foi possível realizar seu cadastro, tente novamente mais tarde.",
        "Erro"
      );
    };

    var successCallback = function (data) {
      myApp.hidePreloader();

      if (data.result.status === 500) {
        if (data.result.message != "") {
          myApp.alert(data.result.message);
        }
      }

      if (data.result.status === 201) {
        localStorage.removeItem("dados_cadastro");
        mainView.router.loadPage(
          "pages/Finalizando-Cadastro/finalizando_cadastro.html"
        );
      }
    };

    RestService.connect(
      "motoristas/",
      "POST",
      parameters,
      null,
      successCallback,
      errorCallback
    );
  });
});
