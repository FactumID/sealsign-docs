# Firma Biométrica

## Integración en Android
Para integrar una aplicación Android con SealSign es necesario hacer el uso de la librería `SealSignAndroidClientLibrary.jar` la cual es necesario importar en el proyecto desde gradle, es necesario también importar el paquete de algoritmos criptográficos SpongyCastle:

```groovy
dependencies{

    //Librería SealSign
    implementation files('libs\\sealsignandroidclientlibrary.jar')

    //SpongyCastle
    implementation 'com.madgag.spongycastle:core:1.54.0.0'
    implementation 'com.madgag.spongycastle:prov:1.54.0.0'
    implementation 'com.madgag.spongycastle:pkix:1.54.0.0'
    implementation 'com.madgag.spongycastle:pg:1.54.0.0'
}
```

Antes de hacer alguna invocación a la librería de SealSign hay que instanciar el proveedor criptográfico de SpongyCastle mediante el siguiente código:

```java
try{
    Security.insertProviderAt(new org.spongycastle.jce.provider.BouncyCastleProvider(), 1);
} catch(Exception e){
    Log.e("TAG", e.toString());
}
```


## Firma Biométrica Desconectada

En algunos escenarios es posible que no haya conexión con el servidor de firma biométrica. SealSign permite realizar una firma preliminar para sincronizar con el servicio cuando el cliente vuelva a tener conexión. Es necesario disponer del documento en cliente para poder asociar de manera única la firma capturada con el mismo.

## Captura Desconectada

Mediante la llamada al panel de firma se realiza la obtención de los datos biométricos y la operación criptográfica. En lugar de los datos obtenidos del servicio en una llamada normal, se obtiene el token biométrico pasando el documento a firmar como parámetro. Posteriormente, se obtiene también la instancia temporal generada en cliente

El panel de firma se establece en el layout mediante el siguiente View:

```xml
<es.smartaccess.sealsignbss.SealSignBSSView
    ... />
```

Se debe mostrar el panel de firma `SealSignBSSView` y realizar la firma por parte del usario antes de llamar a `getOfflineSignature()` y `getBiometricInstance()`. En caso de que el panel de firma no tenga firma, es decir, el usuario no haya pintado su firma, la invocación al método devuelve una exception indicándolo.

A continuación mostramos un ejemplo de captura de firma biométrica sobre un documento:

```java
byte[] pdf = readFile("test.pdf");

byte[] finalBiometricState = binding.sealsignBSSView.getOfflineSignature(file);

String instance = binding.sealsignBSSView.getBiometricInstance();
```

## Sincronización de las Firmas con el Servidor
Una vez restablecida la comunicación con el servicio, será necesario sincronizar las firmas generadas
de forma desconectada para obtener el documento final incluyendo todos los elementos necesarios. Esto se hace mediante
la llamada al método `SyncOfflineSignatures`.
El servicio consumido es `/SealSignBSSService/BiometricSignatureServiceBasic.svc`:

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

## Métodos de sincronización

- SyncOfflineSignatures: Permite realizar la sincronización en un documento de una o varias firmas
capturadas de manera desconectada.

- SyncOfflineSignaturesProvider: Permite realizar la sincronización en un documento de una o varias
firmas capturadas de manera desconectada. El documento se obtiene y se almacena usando un
document provider.

- SyncOfflineWithDocumentVerification: El servidor verifica la firma capturada en el cliente contra un
documento previamente firmado y, si la firma capturada coincide con alguna de las firmas existentes
en el documento, se realiza la sincronización en un documento de una o varias firmas capturadas de
manera desconectada.