var GpsService = new function () {
    this.getLocation = function (onSuccess, onFail) {
        if (!onFail || onFail == null) {
            var onFail = function (error) {
                return myApp.alert('Habilite Seu GPG !');
            }
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onFail);
    }
}