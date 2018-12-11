//FUNCTIONS USADAS NA LISTA DE OFERTAS
var datas = {
  01: "Jan",
  02: "Fev",
  03: "Mar",
  04: "Abr",
  05: "Mai",
  06: "Jun",
  07: "Jul",
  08: "Ago",
  09: "Set",
  10: "Out",
  11: "Nov",
  12: "Dez"
};

var arrayMeses = {
  Janeiro: '01',
  Fevereiro: 02,
  Março: 03,
  Abril: 04,
  Maio: 05,
  Junho: 06,
  Julho: 07,
  Agosto: 08,
  Setembro: 09,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12
}

function readConfig(callBackVersion) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xhr.responseText,"application/xml");
    doc = doc.getElementsByTagName('widget');

    var retornoVersion = '';
    for (i = 0; i < doc.length; i++) {
       retornoVersion = doc[i].getAttribute('version');
      callBackVersion(retornoVersion)
    }
  });
  
  xhr.open("get", "../config.xml", true);
  xhr.send();
}

function quebraDatas(data) {
  var data_final = Array();
  var dataa = data.split("T");

  var data_div = dataa[0].split("-");

  var ano = data_div[0];
  var mes = data_div[1];
  var dia = data_div[2];

  var hora_ante = dataa[1].split(":");

  var hora = hora_ante[0];
  var min = hora_ante[1];

  data_final = [dia, mes, ano, hora, min];

  return data_final;
}

function determinaValorFrete(tipo_lance, valor_lance_inicial, lance) {

  console.log(tipo_lance);
  console.log(valor_lance_inicial);
  console.log(tipo_lance);

  if (tipo_lance == 2) {
    var valor123 = valor_lance_inicial;
  } else if (tipo_lance == 1 || tipo_lance == 4) {

    console.log(lance);

    if (typeof lance == "undefined" || lance == null) {
      valor123 = valor_lance_inicial;
    } else {
      valor123 = lance.valor;
    }

  }

  console.log(lance)
  return valor123;
}

function ConvertDataTime(data) {
  let data_final = Array();
  if (data != null) {

    let dataa = data.split("T");
    let hora_ante = dataa[1].split("-");
    return dataa[0] + " " + hora_ante[1];
  } else {
    return '0000-00-00  00:00'
  }
}

function Moeda(valor) {
  console.log(valor)
  if (valor == 0)
    return 'À Combinar';
  if (valor != null) {

    valor = valor.toString();

    var numero = valor.split(".");
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join(".");
    var numeroF = numero.join(",");

    let tratarNumber1 = numeroF.indexOf(",").toString();
    if (tratarNumber1 == -1)

      return numeroF + ',00';


    let tratarNumber = numeroF.substring(numeroF.indexOf(",") + 1);

    if (tratarNumber.length == 1)
      return numeroF + '0';

    return numeroF
  }

}

function toDecimal(valor) {
  valor = valor.replace(/\./g, "");
  valor = valor.replace(',', '.');
  return valor;
}

function maskPlaca(valor) {

  valor = valor.replace("-", "");
  return valor;

}

function clearStorage() {
  localStorage.removeItem('parameters_ofertas');
  localStorage.removeItem('filtro_ofertas');
  localStorage.removeItem('parametersFilters');
}


// --------------------- FUNÇÕES DE API PARA A CERCA ELETRÔNICA --------------------//
//PEGAR LAT E LONG

function buscaGPS(oferta_id) {
  var dados = Array();

  var options = {
    maximumAge: 0,
    timeout: 10000,
    enableHighAccuracy: true
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    dados = [lat, long, oferta_id];
    console.log(dados);
    // gravarNoBanco( lat, long, oferta_id );
  }

  function onError(error) {
    myApp.alert("Por favor, habilite o GPS do seu dispositivo.");
  }

  // return dados
}

function onlyNumber(context) {
  return context.replace(/[^0-9\.]+/g, "");
}

function pontuacaoCpf(cpf) {
  var doc;
  doc = cpf.replace("-", "");
  doc = doc.replace(".", "");
  doc = doc.replace(".", "");
  return doc;
}

function pontuacaoCnpj(cnpj) {
  var doc;
  doc = cnpj.replace("-", "");
  doc = doc.replace(".", "");
  doc = doc.replace(".", "");
  doc = doc.replace("/", "");
  return doc;
}

function removeCharTel(tel) {
  var doc;
  doc = tel.replace("(", "");
  doc = doc.replace(")", "");
  doc = doc.replace("-", "");
  doc = doc.replace(" ", "");
  doc = doc.trim();
  return doc;
}

function removeCharPlaca(tel) {
  var doc;
  doc = tel.replace("(", "");
  doc = doc.replace(")", "");
  doc = doc.replace("-", "");
  doc = doc.trim();
  return doc;
}

function is_img(file) {
  var img = new Image();
  img.src = file;
  return img;
}

//PEGAR LAT E LONG

function buscaGPSCerca() {
  var lance_id = localStorage.getItem("id_Oferta");
  var dados = Array();

  var options = {
    maximumAge: 0,
    timeout: 10000,
    enableHighAccuracy: true
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    calcularDistancia(lat, long, lance_id);
  }

  function onError(error) {
    myApp.alert("Por favor, habilite o GPS do seu dispositivo.");
  }

  // return dados
}

function calcularDistancia(lat, long, oferta_id) {
  $.ajax({
      url: urlApi +
        "/roboMapa/calcularDistancia?oferta=" +
        oferta_id +
        "&lat=" +
        lat +
        "&long=" +
        long,
      type: "GET",
      dataType: "json"
    })
    .done(function (data) {
      var distanciakm = data.text.split(" ");
      console.log(distanciakm);

      myApp.alert("Faltam apenas " + data.text + " para chegar na origem!");

      if (data.menorQue200 == 1) {
        $("#chegada-show-km").show();
      } else {
        $("#chegada-show-km").hide();
      }
    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
}

// --------------------- FUNÇÕES DE API PARA A CERCA ELETRÔNICA --------------------//

function buscaGPSCercaDestino() {
  var lance_id = localStorage.getItem("id_Oferta");
  var dados = Array();

  var options = {
    maximumAge: 0,
    timeout: 10000,
    enableHighAccuracy: true
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    calcularDistanciaDestino(lat, long, lance_id);
  }

  function onError(error) {
    myApp.alert("Por favor, habilite o GPS do seu dispositivo.");
  }

  // return dados
}

function calcularDistanciaDestino(lat, long, oferta_id) {
  $.ajax({
      url: urlApi +
        "/roboMapa/calcularDistanciaDestino?oferta=" +
        oferta_id +
        "&lat=" +
        lat +
        "&long=" +
        long,
      type: "GET",
      dataType: "json"
    })
    .done(function (data) {
      console.log(data);
      var distanciakm = data.text.split(" ");
      console.log(distanciakm);

      myApp.alert("Faltam apenas " + data.text + " para chegar no Destino!");

      if (data.menorQue200 == 1) {
        $("#descarga-show-km").show();
      } else {
        $("#descarga-show-km").hide();
      }
    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
}

