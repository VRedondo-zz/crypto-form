var $ = require("jquery");

exports.getUrl = (function(){
    function EncryptJS(){
        this.RSAKey = "<RSAKeyValue><Modulus>xlIAW9ORaTQp7kapjSjQ6NyXYo11UdrHP+m2uXJTZotMomf5cpVgXjTuldt5JZGU+uhRkMsxECbdPnAFXikA/sLB66B5GtW2g/FXT4VmcvCAwgQalUOkX/WxPibiSnwzCONMVkd2WFf3HjPIL4dwLB19md4HP8pKqHa6CZjStg0=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
        this.endpoint = 'https://abbvie44.digitashealth.com/RSAListener?refinfo=';
    }

    EncryptJS.prototype.GetNewRsaProvider = function(dwKeySize) {
        // Create a new instance of RSACryptoServiceProvider.
        if (!dwKeySize) dwKeySize = 1024;
        return new System.Security.Cryptography.RSACryptoServiceProvider(dwKeySize);
    }

    EncryptJS.prototype.GetRsaKey = function() {
        // ------------------------------------------------
        // RSA Keys
        // ------------------------------------------------
        var rsa = this.GetNewRsaProvider();
        // Import parameters from xml.
        rsa.FromXmlString(this.RSAKey);
        // Export RSA key to RSAParameters and include:
        //    false - Only public key required for encryption.
        //    true  - Private key required for decryption.
        return rsa.ExportParameters(false);
    }

    EncryptJS.prototype.Encrypt = function(data) {
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

    EncryptJS.prototype.getUrl = function(dataToEncrypt){
        if(dataToEncrypt === undefined || dataToEncrypt.trim().length === 0){
            // Assigns default empty format
            dataToEncrypt = ' ';
        }
        // return encoded URL
        return self.endpoint+encodeURIComponent(self.Encrypt(dataToEncrypt));
    }

    var self = new EncryptJS();
    return self.getUrl;
})();
