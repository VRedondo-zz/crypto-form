var $ = require("jquery");

var xmlParamsDefault = "<RSAKeyValue><Modulus>xlIAW9ORaTQp7kapjSjQ6NyXYo11UdrHP+m2uXJTZotMomf5cpVgXjTuldt5JZGU+uhRkMsxECbdPnAFXikA/sLB66B5GtW2g/FXT4VmcvCAwgQalUOkX/WxPibiSnwzCONMVkd2WFf3HjPIL4dwLB19md4HP8pKqHa6CZjStg0=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";

function GetNewRsaProvider(dwKeySize) {
    // Create a new instance of RSACryptoServiceProvider.
    if (!dwKeySize) dwKeySize = 1024;
    return new System.Security.Cryptography.RSACryptoServiceProvider(dwKeySize);
}

function GetRsaKey() {
    // ------------------------------------------------
    // RSA Keys
    // ------------------------------------------------
    var rsa = GetNewRsaProvider();
    // Import parameters from xml.
    rsa.FromXmlString(xmlParamsDefault);
    // Export RSA key to RSAParameters and include:
    //    false - Only public key required for encryption.
    //    true  - Private key required for decryption.
    return rsa.ExportParameters(false);
}

function Encrypt(data) {
    console.log('About to crypt '+data);
    var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(data);
    var doOaepPadding = false;
    // ------------------------------------------------
    // Encrypt
    // ------------------------------------------------
    var rsa = GetNewRsaProvider();
    // Import the RSA Key information.
    rsa.ImportParameters(GetRsaKey(false));
    // Encrypt the passed byte array and specify OAEP padding.
    var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding);
    var encryptedString = System.Convert.ToBase64String(encryptedBytes)
    // ------------------------------------------------
    // Display the encrypted data.
    return encryptedString;
}

$(function(){
    var formData = '',
        encriptUrl = '',
        domain = 'https://abbvie44.digitashealth.com/RSAListener?refinfo=';

    $('input').on('blur, change', function(){
        formData = $('#userName').val() + '|' + $('#userLastName').val() + '|' + $('#userEmail').val();
        encriptUrl = encodeURIComponent(Encrypt(formData));
        $('#submitBtn').prop('href',domain+encriptUrl);
        $('#resultUrl').val(domain+encriptUrl);
    });
});