var CameraService = new function () {

    function onFail(message) {
        return myApp.alert('Houve algum erro, Tente novamente!');
    }
    this.getFoto = function (onSuccess, onFail) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            // saveToPhotoAlbum: true,
            targetWidth: 300, // cameraOptions: largura
            targetHeight: 250, // cameraOptions: altura
            allowEdit: true, // cameraOptions: permite a edição
            correctOrientation: true //Corrects Android orientation quirks
        });
    }
}