# Biometric Signature

## Android integration
To integrate an Android application with SealSign it is necessary to make use of the `SealSignAndroidClientLibrary.jar` library which must be imported into the project from gradle, it is also necessary to import the SpongyCastle cryptographic algorithms package:

```groovy
dependencies{

    //SealSign library
    implementation files('libs\\sealsignandroidclientlibrary.jar')

    //SpongyCastle
    implementation 'com.madgag.spongycastle:core:1.54.0.0'
    implementation 'com.madgag.spongycastle:prov:1.54.0.0'
    implementation 'com.madgag.spongycastle:pkix:1.54.0.0'
    implementation 'com.madgag.spongycastle:pg:1.54.0.0'
}
```

Before invoking the SealSign library, the SpongyCastle cryptographic provider must be instantiated using the following code:

```java
try{
    Security.insertProviderAt(new org.spongycastle.jce.provider.BouncyCastleProvider(), 1);
} catch(Exception e){
    Log.e("TAG", e.toString());
}
```


## Offlilne Biometric Signature

In some scenarios it is possible that there is no connection to the biometric signature server. SealSign allows you to make a preliminary signature to synchronize with the service when the client reconnects. It is necessary to have the document on the client to be able to uniquely associate the captured signature with it.

## Offline signature capture

The call to the signature panel is used to obtain the biometric data and the cryptographic operation. Instead of the data obtained from the service in a normal call, the biometric token is obtained by passing the document to be signed as a parameter. Subsequently, the temporary instance generated in the client is also obtained.

The signature panel is set in the layout using the following View:

```xml
<es.smartaccess.sealsignbss.SealSignBSSView
    ... />
```

The `SealSignBSSView` signature panel must be displayed and the signature must be made by the user before calling `getOfflineSignature()` and `getBiometricInstance()`. In case the signature panel has no signature, that is, the user has not painted his signature, the invocation of the method returns an exception indicating it.

An example of biometric signature capture on a document is shown below:

```java
byte[] pdf = readFile("test.pdf");

byte[] finalBiometricState = binding.sealsignBSSView.getOfflineSignature(file);

String instance = binding.sealsignBSSView.getBiometricInstance();
```

## Synchronization of Signatures with the Server
Once the communication with the service has been re-established, it will be necessary to synchronize the signatures generated offline to obtain the final document including all the necessary elements. This is done by
calling the `SyncOfflineSignatures` method.
The service consumed is `/SealSignBSSService/BiometricSignatureServiceBasic.svc`:

```csharp
BSBOfflineBiometricSignature offlineSignature = new BSBOfflineBiometricSignature();

offlineSignature.biometricSignatureType = BiometricSignatureType.Default;
offlineSignature.id = "";
offlineSignature.account = "";
offlineSignature.biometricOptions =
es.sealsign.bss.BSBEnums.BiometricSignatureFlags.getStatusFlags("Default");
offlineSignature.biometricParameters = null;
offlineSignature.options =
es.sealsign.bss.BSBEnums.SignatureFlags.getStatusFlags("Default");
offlineSignature.parameters = null;
offlineSignature.instance = UUID.fromString(instance);
offlineSignature.offlineBiometricState = finalBiometricState;

BSBArrayOfOfflineBiometricSignature offlineSignatures = new
BSBArrayOfOfflineBiometricSignature();
offlineSignatures.add(offlineSignature);

byte[] signedDocument = service.SyncOfflineSignatures(SignatureProfile.PDF,
offlineSignatures, null, documentBytes);

saveToFile(signedDocument, "documentoFirmado.pdf");
```

## Synchronization methods

- SyncOfflineSignatures: Allows the synchronization of one or more signatures captured offline in a document.
captured offline.

- SyncOfflineSignaturesProvider: Allows to synchronize one or several captured signatures in a document in a disconnected way.
signatures captured offline. The document is obtained and stored using a
document provider.

- SyncOfflineWithDocumentVerification: The server verifies the signature captured on the client against a previously signed document.
previously signed document and, if the captured signature matches any of the existing signatures in the document, synchronization is performed.
in the document, the synchronization of one or more captured signatures is performed in a document in a disconnected way.
offline.