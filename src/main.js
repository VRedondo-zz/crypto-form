// var CryptoJS = require("crypto-js");
// var jsencrypt = require('jsencrypt'),
var cryptico = require('cryptico-js'),
    $ = require("jquery");

$(function(){
    var formData = '',
        domain = 'http://www.google.com?data=',
        publicKey = '03Ex5xFSxWhVmWozRB7OiFm2AwiO4oly1wuUkaB5n8cWiY/GD8W4r24m2sM0TEsfqo8y0QSS0uFz5zOCx3EpLjqVmkrcux5R8UtTzhfaP9QsQBtlP+6V79W40HHzy/QnYps5oNK6lfVxAmq5Vraztl5XzBPjpeinDOyU7dJGRhc=';
    $('input').on('blur, change', function(){
        formData = $('#userName').val() + '/' + $('#userLastName').val() + '/' + $('#userEmail').val();
        // CriptoJS
        // var encriptUrl = domain+CryptoJS.AES.encrypt(formData, publicKey);

        // JSEncrypt
        // var encrypt = new jsencrypt.JSEncrypt();
        // encrypt.setPublicKey(publicKey);
        // var encriptUrl = domain+encrypt.encrypt(formData);

        // Cryptico
        var encriptUrl = domain + cryptico.encrypt(formData, publicKey).cipher;
        $('#submitBtn').prop('href',encriptUrl);
        $('#resultUrl').val(encriptUrl);
    });
});