var RestService = new function () {
  this.connect = function (
    url,
    type,
    parameters,
    token,
    successCallback,
    errorCallback,
    completeCallback,
    silencioso
  ) {
    if (typeof silencioso == "undefined") {
      silencioso = false;
    }

    if (typeof token == "undefined" || !token) {
      token = false;
    }

    url = BASE_URL + url;

    type = type.toUpperCase(type);

    if (!errorCallback || typeof errorCallback !== "function") {
      var errorCallback = function (xhr, textStatus, errorThrown) {
        if (silencioso != true) {
          myApp.hidePreloader();
          myApp.alert(
            "Não foi possível abrir esta página, tente novamente mais tarde.",
            "Erro"
          );
        }
      };
    }
    if (!completeCallback || typeof completeCallback !== "function") {
      myApp.hidePreloader();
      var completeCallback = function (jqXHR) {
        if (typeof myApp !== "undefined" && silencioso != true) {
          myApp.hidePreloader();
        }
      };
    }
    if (!successCallback || typeof successCallback !== "function") {
      var successCallback = function (data) {
         myApp.hidePreloader();
       };
    }

    function beforeSend(xhr) {
      if (typeof myApp !== "undefined" && silencioso != true) {
        myApp.showPreloader("Carregando...");
      }

      if (token === true) {
        const token = localStorage.getItem("motorista.token");
        xhr.setRequestHeader("Authorization", "Bearer "+token);
      }
    }

    $.ajax({
      type: type,
      url: url,
      data: parameters,
      dataType: "json",
      beforeSend: beforeSend,
      success: successCallback,
      error: errorCallback,
      complete: completeCallback
    });
  },
  
  this.getConnect = function (url, successCallback) {
      url = BASE_URL + url;
      $.getJSON(url, successCallback);
  },
  
  this.getGoogleLocation = function (url, successCallback) {
      $.getJSON(url, successCallback);
  }

};
