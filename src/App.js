import React, { Component } from 'react';
import './App.css';
import CryptoJS from 'crypto-js';


const CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
        return cipherParams;
    }
}

class App extends Component {
    crypt(){
        let privateKey = '1234';
        let response = '{"ct":"hcTG8t0N9mh3gcDHcFIchd\/WnzA5jBVi6itshlaIx04=","iv":"9592639d7e298d6bc0c2ae4052fb83ea","s":"b2f20a2769250715"}';
        //normal response
        console.log(response);
        //decrpt server response
        console.log(JSON.parse(CryptoJS.AES.decrypt(''+response, privateKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8)));
        //encrypt decrpted server response
        console.log(CryptoJS.AES.encrypt(CryptoJS.AES.decrypt(''+response, privateKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8), privateKey, {format: CryptoJSAesJson}).toString());
        //decrypt encrypted decrpted server response
        console.log(JSON.parse(CryptoJS.AES.decrypt(''+CryptoJS.AES.encrypt(CryptoJS.AES.decrypt(''+response, privateKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8), privateKey, {format: CryptoJSAesJson}).toString(), privateKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8)));
    }
    render() {
        return (<div className="App">
        <header className="App-header">
          <h1 className="App-title">Json decrypt using cryptjs</h1>
          <p>{this.crypt()}</p>
        </header>
      </div>);
    }
}

export default App;