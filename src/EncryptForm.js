var $ = require("jquery");

function EncryptForm(formSelector){
    if(formSelector !== undefined){
        if($(formSelector).length){
            this.xmlParamsDefault = "<RSAKeyValue><Modulus>xlIAW9ORaTQp7kapjSjQ6NyXYo11UdrHP+m2uXJTZotMomf5cpVgXjTuldt5JZGU+uhRkMsxECbdPnAFXikA/sLB66B5GtW2g/FXT4VmcvCAwgQalUOkX/WxPibiSnwzCONMVkd2WFf3HjPIL4dwLB19md4HP8pKqHa6CZjStg0=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
            this.domain = 'https://abbvie44.digitashealth.com/RSAListener?refinfo=';
            this.encriptUrl = '';
            this.formSelector = formSelector;
            this.init();
        }else{
            throw Error('formSelector should be a valid ID selector');
        }
    }else{
        throw Error('formSelector should be defined');
    }
}

EncryptForm.prototype.GetNewRsaProvider = function(dwKeySize) {
    // Create a new instance of RSACryptoServiceProvider.
    if (!dwKeySize) dwKeySize = 1024;
    return new System.Security.Cryptography.RSACryptoServiceProvider(dwKeySize);
}

EncryptForm.prototype.GetRsaKey = function() {
    // ------------------------------------------------
    // RSA Keys
    // ------------------------------------------------
    var rsa = this.GetNewRsaProvider();
    // Import parameters from xml.
    rsa.FromXmlString(this.xmlParamsDefault);
    // Export RSA key to RSAParameters and include:
    //    false - Only public key required for encryption.
    //    true  - Private key required for decryption.
    return rsa.ExportParameters(false);
}

EncryptForm.prototype.Encrypt = function(data) {
    var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(data);
    var doOaepPadding = false;
    // ------------------------------------------------
    // Encrypt
    // ------------------------------------------------
    var rsa = this.GetNewRsaProvider();
    // Import the RSA Key information.
    rsa.ImportParameters(this.GetRsaKey(false));
    // Encrypt the passed byte array and specify OAEP padding.
    var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding);
    var encryptedString = System.Convert.ToBase64String(encryptedBytes)
    // ------------------------------------------------
    // Display the encrypted data.
    return encryptedString;
}

EncryptForm.prototype.init = function(){
    // ------------------------------------------------
    // Bindings
    // ------------------------------------------------
    var formInputs = $(this.formSelector+' input'),
        target = $(this.formSelector+ ' [data-target="true"]');
        self = this;
    formInputs.on('blur, change', function(){
        var formData = [];
        $.each(formInputs.toArray(), function(index, value){
            formData.push($(value).val());
        });
        var encodedURL = encodeURIComponent(self.Encrypt(formData.join('|')));
        target.prop('href',self.domain+encodedURL);
    });
}

exports.EncryptForm = EncryptForm;

