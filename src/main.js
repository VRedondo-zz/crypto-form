var $ = require("jquery");
var encrypt = require("./EncryptJS");

$(function(){
    var encriptUrl = encrypt.getUrl();
    $('#submitBtn').prop('href',encriptUrl);
    $('input').on('blur, change', function(){
        formData = $('#userName').val() + '|' + $('#userLastName').val() + '|' + $('#userEmail').val();
        encriptUrl = encrypt.getUrl(formData);
        $('#submitBtn').prop('href',encriptUrl);
        $('#resultUrl').val(encriptUrl);
    });
});