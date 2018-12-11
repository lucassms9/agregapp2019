var PushNotificationService = new function() {
  this.pushNotification = function(motorista_id) {
    try {
      var push = PushNotification.init({
        android: { senderID: SENDERID_FIREBASE }
      });

      push.on("registration", function(data) {
        var credencial = data.registrationId;

        var parameters = { motorista_id: motorista_id, uuid: credencial };

        RestService.connect(
          "dispositivos/",
          "POST",
          parameters,
          true,
          null,
          null, null, true
        );
      });

      push.on("notification", function(data) {
        myApp.alert(data.message);
      });

      push.on("error", e => {
        myApp.alert(e.message);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}();
