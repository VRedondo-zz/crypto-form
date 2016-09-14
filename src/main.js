var CryptoJS = require("crypto-js");
var $ = require("jquery");

$(function(){
    var formData = '',
        domain = 'http://www.google.com?data=';
    $('input').on('blur, change', function(){
        formData = $('#userName').val() + '/' + $('#userLastName').val() + '/' + $('#userEmail').val();
        var encriptUrl = domain+CryptoJS.AES.encrypt(formData, "public key");
        $('#submitBtn').prop('href',encriptUrl);
        $('#resultUrl').val(encriptUrl);
    });
});