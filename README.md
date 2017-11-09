# React CryptoJS : react-crypto-js
=======================

Upload to S3 bucket using cognito service.

##### Refering Funtionality from :
https://github.com/brainfoolong/cryptojs-aes-php

##### Assume my platform are :
* Linux

##### Assume my configurations are :
* NODE 8.1.2
* NPM 5.4.1

##### Crypto Js NPM : https://www.npmjs.com/package/crypto-js

* npm install crypto-js

```````````````````

## Install

###### Steps for Setting up `react-crypto-js` project
Install ``Node`` and  ``NPM``
```
Navigate to Project root folder and install
```
$ npm install
```
Starting development server
```
$ npm start
```
Building the code from development
```
$ npm run build
```
Note: If you dont have permisson running npm commands use sudo user

``````````````````````````
##### Javascript Main code in :

https://github.com/jpaulebenz/react-crypto-js/blob/master/src/App.js

##### Server side code for PHP :

Refer Link : https://github.com/brainfoolong/cryptojs-aes-php/blob/master/cryptojs-aes.php

      /**
      * Decrypt data from a CryptoJS json encoding string
      *
      * @param mixed $passphrase
      * @param mixed $jsonString
      * @return mixed
      */
      function cryptoJsAesDecrypt($passphrase, $jsonString){
          $jsondata = json_decode($jsonString, true);
          try {
              $salt = hex2bin($jsondata["s"]);
              $iv  = hex2bin($jsondata["iv"]);
          } catch(Exception $e) { return null; }
          $ct = base64_decode($jsondata["ct"]);
          $concatedPassphrase = $passphrase.$salt;
          $md5 = array();
          $md5[0] = md5($concatedPassphrase, true);
          $result = $md5[0];
          for ($i = 1; $i < 3; $i++) {
              $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
              $result .= $md5[$i];
          }
          $key = substr($result, 0, 32);
          $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
          return json_decode($data, true);
      }
      /**
      * Encrypt value to a cryptojs compatiable json encoding string
      *
      * @param mixed $passphrase
      * @param mixed $value
      * @return string
      */
      function cryptoJsAesEncrypt($passphrase, $value){
          $salt = openssl_random_pseudo_bytes(8);
          $salted = '';
          $dx = '';
          while (strlen($salted) < 48) {
              $dx = md5($dx.$passphrase.$salt, true);
              $salted .= $dx;
          }
          $key = substr($salted, 0, 32);
          $iv  = substr($salted, 32,16);
          $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
          $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
          return json_encode($data);
      }
