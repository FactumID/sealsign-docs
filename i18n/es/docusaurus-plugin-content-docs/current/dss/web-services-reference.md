# Guía de Referencia de Servicios Web SealSign DSS
*Versión 4.6.1 — Noviembre 2022*

## 1. Introducción

SealSign DSS (Digital Signature Services) es un producto desarrollado por Factum Identity., dirigido a facilitar la integración de la firma electrónica en las aplicaciones corporativas. SealSign DSS expone su funcionalidad a través de Servicios Web basados en la tecnología WCF (Windows Comunication Framework). Estos servicios pueden ser invocados por aplicaciones implementadas sobre la mayoría de las tecnologías del mercado.

Este documento no pretende ser un manual sobre los aspectos concretos de la firma electrónica sino un manual de referencia técnica, orientado al desarrollador, que recoge la descripción de dichos servicios para ayudar a la integración de aplicaciones con el servidor de firma de SealSign DSS.

Para ejemplos de integración de los casos de uso más habituales, se pueden consultar las diversas guías de integración de aplicaciones de SealSign DSS, disponibles para cada una de las tecnologías de desarrollo soportadas.

## 2. Interfaces de Servicios Web de SealSign DSS

Dada la heterogeneidad de las tecnologías disponibles en el mercado y con el objetivo de ser accesibles desde la gran mayoría de aplicaciones corporativas, los servicios web de SealSign DSS están accesibles a través de dos interfaces:

- Interfaz basado en la especificación SOAP 1.1 (BasicHttpBinding).
- Interfaz basado en la especificación SOAP 1.2 y WS-Addressing (WsHttpBinding).

Según la tecnología y las capacidades de la aplicación cliente, se podrá invocar a uno u otro interfaz.

El interfaz SOAP 1.1 expone los siguientes Servicios Web:

- Servicio de validación de certificados (CertificateServiceBasic.svc): permite realizar operaciones de consulta de revocación de certificados.
- Servicio de firma (SignatureServiceBasic.svc): proporciona las capacidades de firma y verificación de firma.
- Servicio de sello de tiempo (TimestampServiceBasic.svc): proporciona las capacidades de sellado de tiempo.
- Servicio de firma distribuida (DistributedSignatureServiceBasic.svc): proporciona las capacidades de firma distribuida entre la aplicación cliente y el servidor de SealSign.

El interfaz SOAP 1.2 expone los siguientes Servicios Web:

- Servicio de firma (SignatureService.svc): proporciona las capacidades de firma y verificación de firma.
- Servicio de sello de tiempo (TimestampService.svc): proporciona las capacidades de sellado de tiempo.
- Servicio de firma distribuida (DistributedSignatureService.svc): proporciona las capacidades de firma distribuida entre la aplicación cliente y el servidor de SealSign.

Los servicios estarán accesibles en el directorio virtual SealSignDSSService. Por ejemplo: http://localhost/sealsigndssservice/signatureservice.svc.

#### 2.1. Clases comunes

Las siguientes clases se utilizan como parámetros en los servicios Web independientemente del interfaz que publiquen.

###### 2.1.1. CertificateReference

Cada objeto de esta clase representa la información asociada a un certificado almacenado en el servidor de SealSign.

La clase CertificateReference está definida del siguiente modo:

```csharp
public class CertificateReference
{
public int id;
public string issuer;
public string subject;
public string serial;
public DateTime validFrom;
public DateTime validTo;
public string owner;
public bool passwordRequired;
public bool passwordSealSignRequired;
public string contactInfo;
public byte[] encoded;
}
```

**MIEMBROS**

- id: Identificador del certificado en el servidor de SealSign. Este valor es el que se pasará como parámetro de entrada al método de firma para la selección del certificado.
- issuer: Cadena de caracteres con el nombre común del emisor del certificado.
- subject: Cadena de caracteres con el nombre común del campo asunto del certificado.
- serial: Cadena de caracteres con el número de serie del certificado.
- validFrom: Fecha de inicio de validez del certificado.
- validTo: Fecha de fin de validez del certificado.
- owner: Cadena de caracteres con el propietario del certificado especificado en el servidor de SealSign.
- passwordRequired: Este valor indica se requiere una contraseña para el uso de las claves privadas del certificado.
- passwordSealSignRequired: A la hora de almacenar certificados en el servidor de SealSign, es posible especificar una contraseña que será requerida para poder usarlo. Este valor indica si será necesario suministrar esta contraseña para el certificado referenciado.
- contactInfo: Información de contacto del propietario del certificado.
- encoded: Certificado codificado DER.

###### 2.1.2. SignatureVerification

El método Verify devuelve un objeto de esta clase como retorno tras el proceso de verificación de la firma de un documento.

La clase SignatureVerification está definida del siguiente modo:

```csharp
public class SignatureVerification
{
public VerificationResult result;
public SignatureReference[] signatures;
}
```

**MIEMBROS**

- result: Indica el resultado general del proceso de firma sus posibles valores son:
  - Valid: Todas las firmas encontradas en el documento son válidas.
  - IncompleteValidation: Al menos una firma no se ha podido validar por la falta de algún parámetro o algún certificado. Para obtener más información sobre cuál ha sido el problema se deberá recorrer el array signatures y comprobar el valor del miembro signatureStatus.
  - Invalid: Al menos una firma no es correcta. Para obtener más información sobre cuál ha sido el problema se deberá recorrer el array signatures y comprobar el valor del miembro signatureStatus.
- signatures: Array con la información de validación de cada una de las firmas encontradas en el documento. El array tendrá tantos elementos como co-firmas haya en este nivel y al menos un elemento si hay una única firma.

###### 2.1.3. SignatureParameters

La clase SignatureParameters está definida del siguiente modo:

```csharp
public class SignatureParameters
{
public string reason;
public string city;
public string state;
public string postalCode;
public string country;
public string signerRole;
public string policyIdentifier;
public string policyDigest;
public string policyCMSQualifierURI;
public string reference;
public PDFSignatureParameters pdfParameters;
public int timestampServerId;
public int timestampBackupServerId;
public string header;
public string signerCaption;
public string signerInfo;
public string algorithmCaption;
public string algorithmInfo;
public string documentPassword;
}
```

**MIEMBROS**

- reason: Cadena de texto que permite indicar el motivo por el que se realiza la firma.
- city: Cadena de texto que permite especificar la ciudad donde se realiza la firma.
- state: Cadena de texto que permite especificar el estado donde se realiza la firma.
- postalCode: Cadena de texto que permite especificar el código postal donde se realiza la firma.
- country: Cadena de texto que permite especificar el país donde se realiza la firma.
- signerRole: Cadena de texto que permite especificar el rol del firmante.
- policyIdentifier: Cadena de texto que permite especificar el identificador de la política que se aplica a la firma.
- policyDigest: Cadena de texto que permite especificar el resumen de la política que se aplica a la firma.
- policyCMSQualifierURI: Cadena de texto con la URI de la política aplicada en las firmas CMS.
- reference: Referencia dentro del documento XML sobre la que se quiere aplicar la firma.
- pdfParameters: Objeto de la clase PDFSignatureParameters que permite la personalización de algunos parámetros de firma de documentos PDF. Si se especifica un null en este miembro, se aplicarán las configuraciones realizadas a nivel de servidor. Para más información consultar la documentación de la clase PDFSignatureParameters.
- timestampServerId: Identificador del servidor de timestamp que se usará para las operaciones que requieran sellos de tiempo.
- timestampBackupServerId: Identificador del servidor de backup de timestamp que se usará para las operaciones que requieran sellos de tiempo cuando el servidor principal (identificado por el campo timestampServerId) retorne algún error.
- header: Cadena que permite especificar el texto de la cabecera del visualizador de la firma en documentos PDF.
- signerCaption: Cadena que permite especificar el texto del título del firmante del documento.
- signerInfo: Cadena que permite especificar información del firmante.
- algorithmCaption: Cadena que permite especificar el texto del título del algoritmo usado en la firma.
- algorithmInfo: Cadena que permite especificar información del algoritmo usado en la firma.
- documentPassword: Permite especificar la contraseña de aquellos documentos que hayan sido protegidos con contraseña y que se utilizará para abrir el fichero a firmar.

###### 2.1.4. PDFSignatureParameters

La clase PDFSignatureParameters permite personalizar algunos parámetros tanto de la firma como de la verificación de documentos PDF. Esta clase está definida del siguiente modo:

```csharp
public class PDFSignatureParameters
{
public string PDFPassword;
public string PDFSignatureFieldName;
public bool PDFSignatureVisible;
public byte[] PDFSignatureBackground;
public bool PDFSignatureBackgroundStretch;
public int PDFSignatureBackgroundWidth;
public int PDFSignatureBackgroundHeight;
public bool PDFSignatureWidgetAutoPos;
public int PDFSignatureWidgetOffsetX;
public int PDFSignatureWidgetOffsetY;
public bool PDFSignatureWidgetAutoSize;
public int PDFSignatureWidgetHeight;
public int PDFSignatureWidgetWidth;
public int PDFSignatureWidgetRotate;
public bool PDFSignatureWidgetOnAllPages;
public int PDFSignatureWidgetOnPage;
public bool PDFSignatureFilterOnlyDocSignatures;
public bool PDFSignatureWidgetHideText;
public bool PDFSignatureWidgetOnLastPage;
public int PDFSignatureWidgetPageOffset;
public string PDFSignatureWidgetImageTokenText;
public string PDFSignatureWidgetDateCaptionFormat;
public int PDFSignatureWidgetDateOffsetX;
public int PDFSignatureWidgetDateOffsetY;
}
```

**MIEMBROS**

- PDFPassword Reservado para el futuro.
- PDFSignatureFieldName Permite especificar el nombre de un campo del documento PDF en el que se guardará la firma.
- PDFSignatureVisible Booleano que indica si el widget de la firma será visible en el documento resultante de la operación de firma.
- PDFSignatureBackground Array de bytes de la imagen de fondo que se incluirá en el widget de firma. El formato debe ser JPG. Por defecto se ajustará dentro del tamaño del widget conservando su proporción.
- PDFSignatureBackgroundStretch Booleano que indica si la imagen de fondo se ajustará automáticamente al tamaño del widget.
- PDFSignatureBackgroundWidth Ancho de la imagen original especificada en PDFSignatureBackground o ancho de la imagen original que se quiere recortar.
- PDFSignatureBackgroundHeight Altura de la imagen original especificada en PDFSignatureBackground o altura de la imagen original que se quiere recortar.
- PDFSignatureWidgetAutoPos Booleano que permite indicar si el widget de firma se posicionará de manera automática o si se utilizarán los valores de los parámetros PDFSignatureWidgetOffsetX y PDFSignatureWidgetOffsetY. Si se habilita la posición automática, el widget aparecerá en la esquina superior derecha de la página.
- PDFSignatureWidgetOffsetX Permite indicar en pixels el valor de la coordenada X, tomada desde el ángulo inferior izquierdo de la página, en el que aparecerá el widget de firma.
- PDFSignatureWidgetOffsetY Permite indicar en pixels el valor de la coordenada Y, tomada desde el ángulo inferior izquierdo de la página, en el que aparecerá el widget de firma.
- PDFSignatureWidgetAutoSize Booleano que permite indicar si el widget de firma se redimensionará de manera automática o si se utilizarán los valores de los parámetros PDFSignatureWidgetHeight y PDFSignatureWidgetWidth.
- PDFSignatureWidgetHeight Altura en pixels del widget de firma.
- PDFSignatureWidgetWidth Anchura en pixels del widget de firma.
- PDFSignatureWidgetRotate Permite indicar el ángulo de rotación del widget de firma. Sus posibles valores son 0, 90, 180 o 270.
- PDFSignatureWidgetOnAllPages Indica si el widget de firma se debe incluir en todas las páginas del documento.
- PDFSignatureWidgetOnPage Indica el número de página en el que se incluirá el widget de firma.
- PDFSignatureFilterOnlyDocSignatures En la verificación de la firma indica si solamente se validarán las firmas de tipo documento o cualquier otra firma incluida en el PDF.
- PDFSignatureWidgetHideText Booleano que indica si el widget ocultará el texto automático de descripción del firmante.
- PDFSignatureWidgetOnLastPage Booleano que indica si el widget se mostrará en la última página del documento firmado.
- PDFSignatureWidgetPageOffset Entero que indica el desplazamiento positivo o negativo del widget, en número de páginas, con respecto a la posición actual.
- PDFSignatureWidgetImageTokenText Cadena de caracteres que indica el chunk de texto a buscar dentro del documento con respecto al cual se establecerá la posición del widget de firma.
- PDFSignatureWidgetDateCaptionFormat Cadena de caracteres que indica el formato de fecha que se mostrará en el widget de firma. Se trata de una cadena con formato de fecha/hora estándar, tal y como se describe en el artículo https://msdn.microsoft.com/en-us/library/8kb3ddd4.aspx
- PDFSignatureWidgetDateOffsetX Indica, en pixels, el valor de la coordenada X, tomada desde el ángulo inferior izquierdo del widget, en el que aparecerá la fecha de la firma.
- PDFSignatureWidgetDateOffsetY Indica, en pixels, el valor de la coordenada Y, tomada desde el ángulo inferior izquierdo del widget, en el que aparecerá la fecha de la firma.

###### 2.1.5. VerificationParameters

La clase VerificationParameters representa aquellos parámetros necesarios para realizar la validación de la firma y que no están incluidos dentro de la propia firma.

En la actualidad, la clase VerificationParameters solo contiene el atributo signingCertificate. Este valor solo es necesario en aquellos tipos de firma en las que el certificado con el que se firmó no se encuentre embebido dentro de la firma del documento.

###### 2.1.6. SignatureReference

Cada objeto de esta clase representa la información de verificación correspondiente a una firma encontrada en un documento. La clase SignatureReference está definida del siguiente modo:

```csharp
public class SignatureReference
{
public string signatureID;
public VerificationStatus signatureStatus;
public SignatureProfile signatureProfile;
public SignatureFlags signatureFlags;
public SignatureType signatureType;
public byte[] signatureCertificate;
public DateTime signingTime;
public HashAlgorithm hashAlgorithm;
public SignatureReference[] counterSignatures;
public TimestampReference[] timestamps;
public TimestampReference[] validationTimestamps;
}
```

**MIEMBROS**

- signatureID: Identificador de la firma dentro del documento.
- signatureStatus: Estado de la firma tras el proceso de verificación. Para más información de los posibles valores consultar la descripción del tipo enumerado VerificationStatus.
- signatureProfile: Indica el perfil que cumple la firma actual, incluso si es un perfil de firma avanzado. Para más información de los posibles valores consultar la descripción del tipo enumerado SignatureProfile.
- signatureFlags: Contiene algunos flags con información avanzada de la firma. De los valores posibles, tras la verificación de un documento, este campo puede contener uno o varios de los siguientes valores: CMSAdESExplicitPolicy, CMSAdESXType2, XMLAdESExplicitPolicy, XMLAdESXType2, PDFAdESIncludeRevocationInfo, PDFAdESIncludeTimestamp. Para más información de los posibles valores consultar la descripción del tipo enumerado SignatureFlags.
- signatureType: Indica el formato de almacenamiento de la firma dentro del documento. Su valor puede ser Enveloped, Enveloping o Detached según el documento contenga a la firma, la firma contenga al documento o la firma y el documento se almacenen de manera separada respectivamente.
- signatureCertificate: Contiene el certificado con el que se realizó la firma.
- signingTime: Especifica la fecha y hora en el que se realizó la firma.
- hashAlgorithm: Especifica el algoritmo de hash usado en la firma.
- counterSignatures: Si la firma contiene contrafirmas, contendrá un array de objetos de esta misma clase con la información correspondiente a cada una de las co-firmas existentes en este nivel. En caso de no existir contrafirmas, este miembro valdrá null.
- timestamps: Array de objetos de tipo TimestampReference con la información correspondiente a los sellos de tiempo incluidos en esta firma. Si la firma no contiene sellos de tiempo este miembro valdrá null.
- validationTimestamps: Para los perfiles de firma avanzados CAdES_X, CAdES_XL (tipos 1 y 2), CAdES_A, XAdES_X, XAdES_XL (tipos 1 y 2) y XAdES_A se define un tipo especial de sello de tiempo denominado "Validation Timestamp". Este miembro contendrá un array de objetos de tipo TimestampReference con la información correspondiente a este tipo de sellos de tiempo.

###### 2.1.7. TimestampReference

Cada objeto de esta clase representa la información de verificación correspondiente a cada sello de tiempo encontrado en una firma. La clase TimestampReference está definida del siguiente modo:

```csharp
public class TimestampReference
{
public bool timestampSuitable;
public TimestampType timestampType;
public DateTime timestampTime;
public SignatureReference[] timestampSignatures;
}
```

**MIEMBROS**

- timestampSuitable: Booleano que indica si el sello de tiempo coincide con el objeto sellado.
- timestampType: Indica el tipo de sello de tiempo.
- timestampTime: Indica la fecha y la hora en la que se llevó a cabo el sello de tiempo.
- timestampSignatures: Array de objetos de la clase SignatureReference con la información de las firmas incluidas en el sello de tiempo. Este objeto solo se crea si se especificó el valor IncludeTimestampInfo en el parámetro options del método Verify.

###### 2.1.8. CertificateInfo

Cada objeto de esta clase representa la información contenida dentro de un certificado x509. La clase CertificateInfo está definida del siguiente modo:

```csharp
public class CertificateInfo
{
public string algorithm;
public NameInfo issuer;
public NameInfo subject;
public string serialNumber;
public DateTime validFrom;
public DateTime validTo;
public KeyUsages keyUsage;
public ExtendedKeyUsages extendedKeyUsage;
public AlternativeNameInfo[] subjectAlternativeName;
public FieldInfo[] extensions;
}
```

**MIEMBROS**

- algorithm: Cadena de caracteres que recoge el algoritmo con el que se firmó el certificado.
- issuer: Objeto de la clase NameInfo con la información específica del emisor del certificado.
- subject: Objeto de la clase NameInfo con la información específica del asunto del certificado.
- algorithm: Cadena de caracteres que recoge el número de serie asignado al certificado.
- validFrom: Indica la fecha de inicio de validez del certificado.
- validTo: Indica la fecha de fin de validez del certificado.
- keyUsage: Campo enumerado de tipo KeyUsages. Contendrá uno o varios valores (flags) con los distintos usos asignados al certificado.
- extendedKeyUsage: Campo enumerado de tipo ExtendedKeyUsages. Contendrá uno o varios valores (flags) con los distintos usos extendidos asignados al certificado.
- subjectAlternativeName: Array de objetos de la clase AlternativeNameInfo. Contendrá un elemento por cada uno de los valores incluidos en el campo nombre alternativo del sujeto del certificado.
- extensions: Array de objetos de la clase FieldInfo. Contendrá un elemento por cada una de las extensiones incluidas en el certificado.

###### 2.1.9. NameInfo

Cada objeto de esta clase representa la información contenida dentro de un campo tipo nombre (emisor o asunto) de un certificado x509. La clase NameInfo está definida del siguiente modo:

```csharp
public class NameInfo
{
public string Name;
public string CommonName;
public string Country;
public string EMailAddress;
public string Locality;
public string Organization;
public string OrganizationUnit;
public string StateOrProvince;
public string SerialNumber;
public string DomainComponent;
public string GivenName;
public string Initials;
public string StreetAddress;
public string SurName;
public string Title;
public FieldInfo[] RDN;
}
```

**MIEMBROS**

- Name: Cadena de caracteres con el valor del nombre en cuestión.
- CommonName: Cadena de caracteres con el valor del campo nombre común.
- Country: Cadena de caracteres con el valor del campo país.
- EMailAddress: Cadena de caracteres con el valor del campo dirección de correo.
- Locality: Cadena de caracteres con el valor del campo localidad.
- Organization: Cadena de caracteres con el valor del campo organización.
- OrganizationUnit: Cadena de caracteres con el valor del campo unidad organizativa.
- StateOrProvince: Cadena de caracteres con el valor del campo estado o provincia.
- SerialNumber: Cadena de caracteres con el valor del campo número de serie (del emisor o del asunto).
- DomainComponent: Cadena de caracteres con el valor del campo o campos "DC".
- GivenName: Cadena de caracteres con el valor del campo GivenName.
- Initials: Cadena de caracteres con el valor del campo iniciales.
- StreetAddress: Cadena de caracteres con el valor del campo dirección.
- SurName: Cadena de caracteres con el valor del campo SurName.
- Title: Cadena de caracteres con el valor del campo título.
- RDN: Array de objetos de la clase FieldInfo. Contendrá un elemento por cada uno de los elementos contenidos dentro del campo asunto o emisor del certificado. En este array estarán todos los valores, tanto los correspondientes al resto de campos de la estructura NameInfo como aquellos específicos que no hayan sido incluidos en la estructura.

###### 2.1.10. AlternativeNameInfo

Cada objeto de esta clase representa la información contenida dentro de un campo tipo nombre alternativo de un certificado x509. La clase AlternativeNameInfo está definida del siguiente modo:

```csharp
public class AlternativeNameInfo
{
public FieldInfo[] DirectoryNames;
public string DNSName;
public string IpAddress;
public string RegisteredID;
public string RFC822Name;
public string UniformResourceIdentifier;
public FieldInfo OtherName;
}
```

**MIEMBROS**

- DirectoryNames: Contendrá el valor del nombre alternativo si este es de tipo DirectoryName.
- DNSName: Contendrá el valor del nombre alternativo si este es de tipo DNSName.
- IpAddress: Contendrá el valor del nombre alternativo si este es de tipo IpAddress.
- RegisteredID: Contendrá el valor del nombre alternativo si este es de tipo RegisteredID.
- RFC822Name: Contendrá el valor del nombre alternativo si este es de tipo RFC822Name.
- UniformResourceIdentifier: Contendrá el valor del nombre alternativo si este es de tipo URI.
- OtherName: Contendrá el valor del nombre alternativo si no es de ninguno de los tipos anteriores.

###### 2.1.11. FieldInfo

Cada objeto de esta clase representa la información contenida dentro de un campo o extensión de un certificado x509. La clase FieldInfo está definida del siguiente modo:

```csharp
public class FieldInfo
{
public string OID;
public string FriendlyName;
public string Value;
public byte[] RawData;
}
```

**MIEMBROS**

- OID: Contendrá el OID del campo en cuestión en formato cadena de caracteres.
- FriendlyName: Si el campo es un campo conocido, contendrá el nombre de este en formato cadena de caracteres. El valor de este campo estará localizado según el idioma del sistema. Si el campo no es conocido, contendrá una cadena vacía.
- Value: Si el campo es un campo con un formato conocido por el sistema, contendrá el valor de este formateado a cadena de caracteres. Si el campo no es conocido, contendrá una cadena vacía.
- RawData: Valor del campo en formato array de bytes, tal y como se encuentra en el certificado.

###### 2.1.12. RemoteProviderConfiguration

Cada objeto de esta clase representa la información requerida para la invocación de un proveedor de documentos remoto. La clase RemoteProviderConfiguration está definida del siguiente modo:

```csharp
public class RemoteProviderConfiguration
{
public string providerUrl;
public string providerDomain;
public string providerUser;
public string providerPassword;
}
```

**MIEMBROS**

- providerUrl: Contendrá la URL del proveedor remoto de documentos que se desea invocar.
- providerDomain: Contendrá el dominio correspondiente a la cuenta de usuario para la conexión con el proveedor remoto de documentos.
- providerUser: Contendrá la cuenta de usuario para la conexión con el proveedor remoto de documentos.
- providerPassword: Contendrá la contraseña correspondiente a la cuenta de usuario para la conexión con el proveedor remoto de documentos.

###### 2.1.13. ShadowMarkInfo

Representa la información asociada a las marcas de agua de Shadow incrustadas en un documento. La clase ShadowMarkInfo está definida del siguiente modo:

```csharp
public class ShadowMarkInfo
{
public ShadowMark[] ShadowMarks;
}
```

**MIEMBROS**

- ShadowMarks: array de información asociada a las marcas de agua de Shadow.

###### 2.1.14. ShadowMark

Representa la información asociada a una marca de agua de Shadow incrustada en un documento. La clase ShadowMark está definida del siguiente modo:

```csharp
public class ShadowMark
{
public int ShadowMarkID;
public string UserName;
public string ComputerName;
public DateTime Time;
}
```

**MIEMBROS**

- ShadowMarkID: Identificador de la marca de agua.
- UserName: Cuenta del usuario con la que se insertó la marca de agua.
- ComputerName: Equipo desde el que se realizó la petición para la inserción de la marca de agua.
- Time: Hora de creación de la marca de agua.

#### 2.2. Enumeraciones Comunes

Los siguientes tipos enumerados se utilizan como parámetros en los servicios Web independientemente del interfaz que publiquen.

###### 2.2.1. SignatureProfile

Indica los distintos perfiles de firma que puede manejar SealSign DSS.

```csharp
public enum SignatureProfile
{
Default = 0,
CMS,
CAdESBES,
CAdEST,
CAdESC,
CAdESX,
CAdESXL,
CAdESA,
XMLDigSig,
XAdESBES,
XAdEST,
XAdESC,
XAdESX,
XAdESXL,
XAdESA,
PDF,
PAdESBasic,
PAdESBES,
PAdESLTV,
PAdESXML,
Office
}
```

###### 2.2.2. SignatureType

Indica los distintos formatos de almacenamiento de firma soportados por SealSign DSS.

```csharp
public enum SignatureType
{
Default = 0,
Enveloped,
Enveloping,
Detached,
DetachedInternal
}
```

**VALORES**

- Default: Utiliza el formato de almacenamiento de firma por defecto (Enveloped).
- Enveloped: La firma se almacena contenida dentro del documento.
- Enveloping: La firma se almacena de manera que contiene el documento en su interior.
- Detached: La firma se almacena separada del documento.

###### 2.2.3. HashAlgorithm

Indica los distintos algoritmos de generación de hash soportados por SealSign DSS.

```csharp
public enum HashAlgorithm
{
Default = 0,
RIPEMD160,
MD5,
SHA1,
SHA256,
SHA384,
SHA512,
SSL3
}
```

###### 2.2.4. SignatureFlags

El tipo enumerado SignatureFlags se utiliza tanto en las operaciones de firma de documentos como en la de verificación de estos.

```csharp
public enum SignatureFlags
{
None = 0,
Default = 1,
ValidateChain = 2,
CheckRevocationStatus = 4,
XMLAddXPathRemoveSignatureTransform = 8,
XMLAdESIncludeSignerRole = 16,
XMLAdESExplicitPolicy = 32,
XMLAdESXType2 = 64,
CMSAdESExplicitPolicy = 128,
CMSAdESXType2 = 256,
PDFAdESIncludeTimestamp = 512,
PDFAdESIncludeRevocationInfo = 1024,
PDFAdESExplicitPolicy = 2048,
IncludeLocation = 4096,
XMLAdESVersion122 = 8192,
XMLAdESIncludeKeyValue = 16384,
XMLAdESVersion132 = 32768,
PDFAdESUseParametersInWidget = 65536,
XMLAdESPrettySignature = 131072,
PDFAdESHideTimestampInWidget = 262144,
XMLAdExcludeCertFromSignedProperties = 524288,
PDFAdESIncludeFontInWidget = 1048576,
IncludeShadowMark = 2097152,
CleanMetadata = 4194304
}
```

**VALORES**

- None: No especifica ningún flag de firma.
- Default: Utiliza los valores por defecto para la firma. Los valores por defecto se compondrán a partir de las opciones marcadas en la herramienta de administración.
- ValidateChain: Valida cadena de certificados antes de firmar.
- CheckRevocationStatus: Comprueba el estado de revocación antes de realizar la firma.
- XMLAddXPathRemoveSignatureTransform: Aplica la transformación de eliminación de firma de XPath antes de firmar. Este flag permite firmar únicamente el contenido del documento sin incluir otras firmas realizadas previamente.
- XMLAdESIncludeSignerRole: Incluye el rol del firmador en la firma XAdES.
- XMLAdESExplicitPolicy: Incluye la política de firma de manera explícita en la firma XAdES.
- XMLAdESXType2: Realiza una firma XAdES-X o XAdES-XL de tipo 2.
- CMSAdESExplicitPolicy: Incluye la política de firma de manera explícita en la firma CAdES.
- CMSAdESXType2: Realiza una firma CAdES-X o CAdES-XL de tipo 2.
- PDFAdESIncludeTimestamp: Incluye la información de sello de tiempo en la firma tipo PAdES.
- PDFAdESIncludeRevocationInfo: Incluye la información de revocación en la firma tipo PAdES.
- PDFAdESExplicitPolicy: Incluye la política de firma de manera explícita en la firma tipo PAdES.
- IncludeLocation: Incluye información de la localización de la firma.
- XMLAdESVersion122: Firma en formato XAdES version 1.2.2.
- XMLAdESIncludeKeyValue: Incluye la seccion KeyValue en la firma XAdES.
- XMLAdESVersion132: Firma en formato XAdES version 1.3.2.
- PDFAdESUseParametersInWidget: Incluye los parámetros Header, SignerCaption, SignerInfo, AlgorithmCaption y AlgorithmInfo en el visualizador de la firma.
- XMLAdESPrettySignature: Indenta los nodos xml de firma electrónica dentro del documento xml resultante.
- PDFAdESHideTimestampInWidget: Oculta la fecha y la hora de la firma en el visualizador.
- XMLAdExcludeCertFromSignedProperties: Permite excluir el nodo opcional con la información del certificado de firma contenido dentro del nodo de propiedades firmadas.
- PDFAdESIncludeFontInWidget: Incluye en el widget de firma, la definición del tipo de letra usado.
- IncludeShadowMark: Indica al servicio de firma que debe invocar al servidor de Shadow para la inclusión de una marca de agua.
- CleanMetadata: Indica al servicio de firma que debe invocar al servidor de Metashield para la limpieza de metadados antes de la firma.

###### 2.2.5. BusinessSignatureProfile

Indica los distintos perfiles de firma de negocio soportados por SealSign DSS.

```csharp
public enum SignatureType
{
Default = 0,
FacturaeEPES = 0,
FacturaeXL
}
```

**VALORES**

- Default: Firma siguiendo el formato Facturae EPES definido por la política de firma de Facturae.
- FacturaeEPES: Firma siguiendo el formato Facturae EPES definido por la política de firma de Facturae.
- FacturaeXL: Firma siguiendo el formato Facturae XL definido por la política de firma de Facturae.

###### 2.2.6. VerificationFlags

Permite configurar el tipo de verificación de firma que llevará a cabo SealSign DSS.

```csharp
public enum VerificationFlags
{
None = 0,
Default = 1,
ValidateChain = 2,
CheckRevocationStatus = 8,
ValidateTrusts = 64,
ValidatePolicy = 128,
IncludeTimestampInfo = 256
}
```

**VALORES**

- None: No especifica ningún flag de verificación.
- Default: Utiliza los valores por defecto para la verificación. Los valores por defecto se compondrán a partir de las opciones marcadas en la herramienta de administración.
- ValidateChain: SealSign DSS comprobará la cadena de certificación de cada uno de los certificados involucrados en la firma es puede ser construida correctamente en el servidor.
- CheckRevocationStatus: SealSign DSS comprobará el estado de revocación de cada uno de los certificados involucrados en la firma.
- ValidateTrusts: SealSign DSS comprobará que cada uno de los certificados involucrados es un certificado de confianza en el servidor.
- ValidatePolicy: SealSign DSS realizará una verificación de la política de firma en aquellos perfiles que la incluyan.
- IncludeTimestampInfo: Cuando se realice la validación del documento, además de indicarse si la información de sello de tiempo es correcta, se realizará una validación de cada una de las firmas y certificados incluidos en el sello retornando la información de validación de estas firmas.

###### 2.2.7. VerificationStatus

Especifica el estado de una firma tras su verificación según los siguientes valores:

```csharp
public enum VerificationStatus
{
Valid = 0,
SignatureCorrupted = 1,
SignerNotFound = 2,
IncompleteChain = 3,
BadCountersignature = 4,
BadTimestamp = 5,
CertificateExpired = 6,
CertificateRevoked = 7,
CertificateCorrupted = 8,
UntrustedCA = 9,
RevInfoNotFound = 10,
TimestampInfoNotFound = 11,
Failure = 12,
CertificateMalformed = 13,
Unknown = 14,
InvalidPolicy = 15,
NotValidForUsage = 16
}
```

**VALORES**

- Valid: La firma actual es válida y coincide con el documento firmado.
- SignatureCorrupted: La firma actual no es válida, bien porque se modificó la firma o bien porque se modificó el documento.
- SignerNotFound: No se ha encontrado el certificado con el que se realizó la firma.
- IncompleteChain: No se ha podido construir la cadena de certificación del certificado de firma.
- BadCountersignature: La contrafirma no es correcta.
- BadTimestamp: El sello de tiempo no es válido.
- CertificateExpired: El certificado de la firma está caducado.
- CertificateRevoked: El certificado de la firma está revocado.
- CertificateCorrupted: El certificado de firma está corrupto.
- UntrustedCA: El emisor del certificado no es de confianza.
- RevInfoNotFound: No se ha podido encontrar la información de revocación.
- TimestampInfoNotFound: No se ha podido encontrar la información del sello de tiempo.
- Failure: Se ha producido un error en el proceso de verificación.
- CertificateMalformed: El certificado de firma está mal formado.
- Unknown: Se ha producido un error desconocido en el proceso de verificación.
- InvalidPolicy: La política asociada a la firma no es válida.
- NotValidForUsage: El certificado no es válido para el uso actual.

## 3. Servicio de Verificación de Firma Biométrica SOAP 1.1

El servicio CertificateServiceBasic.svc de SealSign DSS permite realizar la validación del estado de revocación de un certificado centralizadamente siguiendo las configuraciones realizadas en el servidor de SealSign. Para ello, este servicio expone el método Validate, que será accesible a través de SOAP 1.1.

El servicio CertificateServiceBasic.svc dispone además del método Parse que devuelve la información de un certificado x509 dividida en sus distintos campos y extensiones.

#### 3.1. Métodos

###### 3.1.1. Validate

Realiza la verificación de revocación de un certificado y retorna su estado.

**SINTAXIS**

```csharp
public int Validate(
byte[] validatingCertificate,
DateTime timeToUse,
ref int reason);
```

**PARÁMETROS DE ENTRADA**

- validatingCertificate: Array de bytes con la parte pública del certificado que se desea validar.
- timeToUse: Fecha y hora en la que debe producirse la validación.
- reason: Parámetro de salida que indicará, en caso de que el certificado esté revocado el motivo por el que lo está.

**RETORNO**

Retorna un valor entero que corresponderá con uno de los valores del tipo enumerado X509ChainStatusFlags de .NET. Más información en el siguiente enlace http://msdn.microsoft.com/en-us/library/system.security.cryptography.x509certificates.x509chainstatusflags.aspx

**COMENTARIOS**

En el parámetro timeToUse se debe especificar la fecha y hora en la que se quiere realizar la validación o el valor DateTime.MinValue (es decir 01/01/0001 00:00:00.0) para indicar que se debe utilizar la fecha actual del sistema de validación.

El valor del parámetro de salida reason solo tendrá sentido si el retorno de la función es igual a X509ChainStatusFlags.Revoked.

Los posibles valores de este parámetro vienen definidos según las siguientes constantes de CryptoAPI:

| Constante | Valor | Razón |
| --- | --- | --- |
| CRL_REASON_UNSPECIFIED | 0 | Razón no especificada. |
| CRL_REASON_KEY_COMPROMISE | 1 | Clave del certificado comprometida. |
| CRL_REASON_CA_COMPROMISE | 2 | Entidad emisora comprometida. |
| CRL_REASON_AFFILIATION_CHANGED | 3 | Los datos de afiliación se han modificado. |
| CRL_REASON_SUPERSEDED | 4 | El certificado ha sido sustituido. |
| CRL_REASON_CESSATION_OF_OPERATION | 5 | Cese de operación. |
| CRL_REASON_CERTIFICATE_HOLD | 6 | Certificado bloqueado |

###### 3.1.2. Parse

Retorna la información contenida en un certificado X509.

**SINTAXIS**

```csharp
public CertificateInfo Parse(
byte[] certificate);
```

**PARÁMETROS DE ENTRADA**

- certificate: Array de bytes con la parte pública del certificado que se desea analizar.

**RETORNO**

Retorna un objeto de tipo CertificateInfo con la información del certificado.

**COMENTARIOS**

En los campos issuer y subject, cada uno de los miembros de la estructura contendrá el valor correspondiente (en formato cadena de caracteres) al campo equivalente dentro del emisor o del asunto del certificado. Si un campo no está presente en el certificado, el valor del miembro correspondiente será una cadena vacía.

En ambos casos, se incluye el miembro RDN con la información de todos los campos incluidos dentro del emisor o del asunto.

El campo subjectAlternativeName es un array con los distintos nombres contenidos dentro del subjectAlternativeName del certificado. Si esta extensión no estuviera presente en el certificado, el valor de la estructura será null.

En cada uno de los miembros del array de subjectAlternativeName, solo uno de los campos contendrá valor, dependiendo del tipo de valor de cada uno de los nombres alternativos contenidos en el certificado. El resto de los miembros contendrá null o cadena vacía.

En los miembros de tipo FieldInfo, el campo Value contendrá el valor formateado a cadena de caracteres si el campo tiene un formato conocido por el sistema (según el OID del mismo). En caso contrario contendrá una cadena vacía.

Además, el campo FriendlyName estará localizado según el idioma del sistema, por lo que, a la hora de localizar un campo o extensión se deberá utilizar el OID del mismo y no este campo.

## 4. Servicio de Validación y Análisis Sintáctico de Certificados JSON

El servicio CertificateServiceBasic.svc de SealSign DSS permite realizar la validación del estado de revocación de un certificado centralizadamente siguiendo las configuraciones realizadas en el servidor de SealSign. Para ello, este servicio expone el método Validate, que será accesible a través de JSON.

El servicio CertificateServiceBasic.svc dispone además del método Parse que devuelve la información de un certificado x509 dividida en sus distintos campos y extensiones.

#### 4.1. Métodos

###### 4.1.1. Validate

Realiza la verificación de revocación de un certificado y retorna su estado.

**SINTAXIS**

```csharp
public int Validate(
byte[] validatingCertificate,
DateTime timeToUse,
ref int reason);
```

**PARÁMETROS DE ENTRADA**

- validatingCertificate: Array de bytes con la parte pública del certificado que se desea validar.
- timeToUse: Fecha y hora en la que debe producirse la validación.
- reason: Parámetro de salida que indicará, en caso de que el certificado esté revocado el motivo por el que lo está.

**RETORNO**

Retorna un valor entero que corresponderá con uno de los valores del tipo enumerado X509ChainStatusFlags de .NET. Más información en el siguiente enlace http://msdn.microsoft.com/en-us/library/system.security.cryptography.x509certificates.x509chainstatusflags.aspx

**COMENTARIOS**

En el parámetro timeToUse se debe especificar la fecha y hora en la que se quiere realizar la validación o el valor DateTime.MinValue (es decir 01/01/0001 00:00:00.0) para indicar que se debe utilizar la fecha actual del sistema de validación.

El valor del parámetro de salida reason solo tendrá sentido si el retorno de la función es igual a X509ChainStatusFlags.Revoked.

Los posibles valores de este parámetro vienen definidos según las siguientes constantes de CryptoAPI:

| Constante | Valor | Razón |
| --- | --- | --- |
| CRL_REASON_UNSPECIFIED | 0 | Razón no especificada. |
| CRL_REASON_KEY_COMPROMISE | 1 | Clave del certificado comprometida. |
| CRL_REASON_CA_COMPROMISE | 2 | Entidad emisora comprometida. |
| CRL_REASON_AFFILIATION_CHANGED | 3 | Los datos de afiliación se han modificado. |
| CRL_REASON_SUPERSEDED | 4 | El certificado ha sido sustituido. |
| CRL_REASON_CESSATION_OF_OPERATION | 5 | Cese de operación. |
| CRL_REASON_CERTIFICATE_HOLD | 6 | Certificado bloqueado |

###### 4.1.2. Parse

Retorna la información contenida en un certificado X509.

**SINTAXIS**

```csharp
public CertificateInfo Parse(
byte[] certificate);
```

**PARÁMETROS DE ENTRADA**

- certificate: Array de bytes con la parte pública del certificado que se desea analizar.

**RETORNO**

Retorna un objeto de tipo CertificateInfo con la información del certificado.

**COMENTARIOS**

En los campos issuer y subject, cada uno de los miembros de la estructura contendrá el valor correspondiente (en formato cadena de caracteres) al campo equivalente dentro del emisor o del asunto del certificado. Si un campo no está presente en el certificado, el valor del miembro correspondiente será una cadena vacía.

En ambos casos, se incluye el miembro RDN con la información de todos los campos incluidos dentro del emisor o del asunto.

El campo subjectAlternativeName es un array con los distintos nombres contenidos dentro del subjectAlternativeName del certificado. Si esta extensión no estuviera presente en el certificado, el valor de la estructura será null.

En cada uno de los miembros del array de subjectAlternativeName, solo uno de los campos contendrá valor, dependiendo del tipo de valor de cada uno de los nombres alternativos contenidos en el certificado. El resto de los miembros contendrá null o cadena vacía.

En los miembros de tipo FieldInfo, el campo Value contendrá el valor formateado a cadena de caracteres si el campo tiene un formato conocido por el sistema (según el OID del mismo). En caso contrario contendrá una cadena vacía.

Además, el campo FriendlyName estará localizado según el idioma del sistema, por lo que, a la hora de localizar un campo o extensión se deberá utilizar el OID del mismo y no este campo.

## 5. Servicio de Firma y Verificación SOAP 1.1

El servicio SignatureServiceBasic.svc de SealSign DSS expone los métodos necesarios para la generación y validación de firmas electrónicas a través de un servicio web SOAP 1.1 (basicHttpBinding).

Los métodos expuestos son los siguientes:

- GetCertificateReferences: Obtiene información de los certificados almacenados en el servidor de SealSign y que pueden ser utilizados por el usuario que invoca al servicio.
- Sign: Firma un documento de entrada en servidor con las configuraciones recibidas como parámetros.
- SignProvider: Obtiene un documento y los parámetros de configuración de firma mediante un document provider y lo firma con el certificado de servidor recibido.
- BusinessSign: Firma un documento un documento en servidor mediante un perfil de firma de alto nivel.
- Verify: Permite verificar y obtener la información de cada una de las firmas incluidas en un documento.
- HeartBeat: Método que permite comprobar el estado de salud del servicio.
- GetShadowMarkInfo: Permite obtener la información correspondiente a la marca de agua de Shadow incluida en un documento.

En los siguientes apartados, se describen tanto el interfaz de cada uno de estos métodos, así como las clases y tipos relacionados con los mismos.

#### 5.1. Métodos

###### 5.1.1. GetCertificateReferences

Retorna una lista con la información de los certificados almacenados en el servidor a los que un usuario puede tener acceso.

**SINTAXIS**

```csharp
public CertificateReference[] GetCertificateReferences(
string ownerName,
bool includeEncoded);
```

**PARÁMETROS DE ENTRADA**

- ownerName: Filtro opcional que indica el nombre del usuario cuyos certificados deberá retornar la función. Si se especifica un null, la función retornará todos los certificados a los que el usuario actual tiene acceso.
- includeEncoded: Parámetro que indica si en las referencias retornadas debe incluirse el certificado codificado.

**RETORNO**

Devuelve un array de objetos de la clase CertificateReference con toda la información de los certificados a los que el usuario tiene acceso.

**COMENTARIOS**

La lista de referencias de certificados se utilizará posteriormente para indicarle al método de firma qué certificado debe utilizar para su proceso.

El proceso habitual es obtener la lista de certificados y mostrársela al usuario para que seleccione el certificado que va a utilizar en la operación posterior. Además, si el valor del campo passwordRequired es true la aplicación cliente deberá solicitar al usuario la contraseña asociada al certificado. Esta contraseña será necesaria para la posterior llamada al método Sign.

###### 5.1.2. Sign

Este método realiza la firma del documento recibido como parámetro usando los perfiles y configuraciones indicados y retornando un array de bytes con el documento firmado.

**SINTAXIS**

```csharp
public byte[] Sign(
int idCertificate,
SignatureProfile signatureProfile,
SignatureType signatureType,
HashAlgorithm hashAlgorithm,
SignatureFlags options,
SignatureParameters parameters,
string password,
string passwordSealSign,
byte[] detachedSignature,
byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- idCertificate: Identificador del certificado de servidor utilizado para firmar el documento.
- signatureProfile: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma que se desea realizar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- signatureType: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- hashAlgorithm: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar la firma. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- options: Recibe uno o varios valores de tipo SignatureFlags que permiten configurar algunos parámetros de comportamiento en el proceso de firma de documentos. Para más información sobre los valores soportados consultar la descripción del tipo enumerado SignatureFlags.
- parameters: Objeto de tipo SignatureParameters que añade algunos parámetros extra necesarios para la realización de algunos tipos de firmas. Este valor puede ser null en caso de no ser necesario configurar ninguno de los parámetros expuestos. Para más información consultar la descripción de la clase SignatureParameters.
- password: Contraseña de acceso a la clave privada del certificado seleccionado o null en caso de no ser necesaria.
- passwordSealSign: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- detachedSignature: En caso de tratarse de una contrafirma en la que la firma o firmas anteriores fueran desasociadas, este parámetro recibirá el array con la firma o firmas previas.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un array de bytes con el documento firmado según los parámetros de firma especificados en la llamada a la función o una excepción en caso de producirse algún tipo de error. Si la firma es desasociada, retorna el array de bytes correspondiente únicamente a dicha firma.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

A la hora de indicar un perfil de firma en el campo signatureProfile es necesario tener en cuenta que solo algunos tipos de fichero pueden ser firmados siguiendo algunos perfiles. Por ejemplo, los perfiles PDF, PAdESBasic, PAdESBES, PAdESLTV y PAdESXML son perfiles para firma de documentos con formato PDF, de modo que, si el documento a firmar con este perfil no es de este tipo, se producirá una excepción. Así mismo, el perfil de firma Office solo se puede utilizar para documentos de tipo Microsoft Office.

El parámetro signatureType sirve para indicar cómo se almacena la firma, es decir si la firma se incluye dentro del documento o se separa del mismo (Detached), y en el caso de incluirse dentro, cómo se incluirá (Enveloped o Enveloping).

El campo parameters permite añadir información a la firma según necesidad. En concreto permite añadir información de localización de dónde se realiza la firma, así como el rol del firmante y las políticas de firma aplicadas. Así mismo, permite realizar una configuración personalizada del visualizador de firma (Widget) de los documentos PDF, distinta de la configuración general almacenada en el servidor.

###### 5.1.3. SignProvider

Este método obtiene un documento y los parámetros de configuración de firma mediante un document provider y lo firma con el certificado de servidor indicado como parámetro de entrada.

**SINTAXIS**

```csharp
public byte[] SignProvider(
int idCertificate,
string password,
string passwordSealSign,
string uri,
string providerParameter,
byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- idCertificate: Identificador del certificado de servidor utilizado para firmar el documento.
- password: Contraseña de acceso a la clave privada del certificado seleccionado o null en caso de no ser necesaria.
- passwordSealSign: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un array de bytes una vez que se haya firmado el documento obtenido mediante la llamada al document provider asociado a la uri especificada o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

Tanto el documento como los parámetros que se aplicarán en el proceso de firma se obtienen invocando al proveedor de documentos asociado a la uri recibida como parámetro.

El parámetro providerParameter no es utilizado por la plataforma, simplemente su valor llega desde la aplicación llamadora al document provider, sirviendo, por tanto, como paso transparente de valores entre ambos módulos.

Para más información sobre el funcionamiento de document providers se puede consultar el apartado Proveedores de Documentos de este mismo documento.

###### 5.1.4. BusinessSign

Este método permite realizar la firma de un documento recibido como parámetro utilizando perfiles de firma de alto nivel predefinidos en SealSign.

**SINTAXIS**

```csharp
public byte[] BusinessSign(
int idCertificate,
BusinessSignatureProfile businessSignatureProfile,
string password,
string passwordSealSign,
byte[] detachedSignature,
byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- idCertificate: Identificador del certificado de servidor utilizado para firmar el documento.
- businessSignatureProfile: Recibe un valor de tipo BusinessSignatureProfile que especifica el tipo de perfil de firma de alto nivel que se desea utilizar. Para más información consultar la descripción del tipo enumerado BusinessSignatureProfile.
- password: Contraseña de acceso a la clave privada del certificado seleccionado o null en caso de no ser necesaria.
- passwordSealSign: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- detachedSignature: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un array de bytes con el documento firmado según los parámetros de firma especificados o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

###### 5.1.5. Verify

Este método se encarga de recibir tanto el documento a validar como las diversas configuraciones a utilizar en el proceso de validación, retornando toda la información de verificación correspondiente a todos y cada uno de los elementos que constituyen la firma de este.

**SINTAXIS**

```csharp
public SignatureVerification Verify(
SignatureProfile signatureProfile,
VerificationFlags options,
VerificationParameters parameters,
byte[] detachedSignature,
byte[] document);
```

**PARÁMETROS DE ENTRADA**

- signatureProfile: Valor del tipo enumerado SignatureProfile que indica el perfil que tiene la firma que se va a validar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- options: Recibe uno o más valores de tipo VerificationFlags que especifican las diferentes opciones de verificación de la firma. Para más información consultar la descripción del tipo enumerado VerificationFlags.
- parameters: Objeto de tipo VerificationParameters que añade algunos parámetros necesarios para la validación de algunos tipos de firmas.
- detachedSignature: En caso de tratarse de una firma desasociada, se pasará el array de bytes correspondientes a dicha firma desasociada. En caso de firma no desasociada, se pasará un null.
- document: Array de bytes con el contenido del documento que se desea verificar.

**RETORNO**

Devuelve un objeto de la clase SignatureVerification con toda la información de validación obtenida en el proceso de verificación de la firma o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El parámetro signatureProfile se usa para conocer el tipo de validación que se va a realizar en función del tipo de documento. Cuando no se conozca el perfil exacto de la firma, al menos se deberán indicar los perfiles de alto nivel (SignatureProfile.CMS, SignatureProfile.PDF, SignatureProfile.XMLDigSig o SignatureProfile.Office) que le indicarán al validador si el tipo de documento es binario, PDF, XML o un documento de Microsoft Office.

En la actualidad, la clase VerificationParameters solo contiene el atributo signingCertificate cuyo valor solo es necesario en aquellos tipos de firma en las que no se incluya el certificado de firma dentro de la misma. En cualquier otro caso se puede pasar un null.

###### 5.1.6. HeartBeat

Este método permite realizar una verificación del estado del servicio web.

**SINTAXIS**

```csharp
public void HeartBeat();
```

**COMENTARIOS**

Realiza las comprobaciones adecuadas para verificar si el servicio web está funcionando correctamente y retorna una excepción en caso contrario.

###### 5.1.7. GetShadowMarkInfo

Este método se encarga de extraer la marca de agua de Shadow del documento recibido como parámetro de entrada, retornando toda la información asociada a la misma.

**SINTAXIS**

```csharp
public ShadowMarkInfo GetShadowMarkInfo(
byte[] document,
string type);
```

**PARÁMETROS DE ENTRADA**

- document: Array de bytes con el contenido del documento del que se desea extraer la firma.
- type: tipo de marca de agua. Más información en la documentación de Shadow.

**RETORNO**

Devuelve un objeto de la clase ShadowMarksInfo con toda la información asociada a la marca de agua o una excepción en caso de producirse algún tipo de error.

## 6. Servicio de Firma y Verificación SOAP 1.2

El servicio SignatureService.svc de SealSign DSS expone todos los métodos necesarios para la generación y validación de firmas de documentos a través de un servicio SOAP 1.2 (wsHttpBinding).

Los métodos expuestos son los siguientes:

- GetCertificateReferences: Obtiene información de los certificados almacenados en el servidor de SealSign y que pueden ser utilizados por el usuario que invoca al servicio.
- Sign: Firma un documento de entrada con las configuraciones recibidas como parámetros.
- SignProvider: Obtiene un documento y los parámetros de configuración de firma mediante un document provider y lo firma con el certificado de servidor recibido.
- BusinessSign: Realiza la firma de un documento mediante un perfil de firma de alto nivel.
- Verify: Permite verificar y obtener la información de cada una de las firmas incluidas en un documento.
- HeartBeat: Método que permite comprobar el estado de salud del servicio.
- GetShadowMarkInfo: Permite obtener la información correspondiente a la marca de agua de Shadow incluida en un documento.

#### 6.1. Clases

###### 6.1.1. SignatureRequest

Parámetro de entrada del método Sign.

```csharp
public class SignatureRequest
{
public int idCertificate;
public SignatureProfile signatureProfile;
public SignatureType signatureType;
public HashAlgorithm hashAlgorithm;
public SignatureFlags options;
public SignatureParameters parameters;
public string password;
public string passwordSealSign;
public byte[] detachedSignature;
public Stream signingDocument;
}
```

**ATRIBUTOS**

- idCertificate: Identificador del certificado de servidor utilizado para firmar el documento.
- signatureProfile: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma que se desea realizar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- signatureType: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- hashAlgorithm: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar la firma. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- options: Recibe uno o varios valores de tipo SignatureFlags que permiten configurar algunos parámetros de comportamiento en el proceso de firma de documentos. Para más información sobre los valores soportados consultar la descripción del tipo enumerado SignatureFlags.
- parameters: Objeto de tipo SignatureParameters que añade algunos parámetros extra necesarios para la realización de algunos tipos de firmas. Este valor puede ser null en caso de no ser necesario configurar ninguno de los parámetros expuestos. Para más información consultar la descripción de la clase SignatureParameters.
- password: Contraseña asociada al archivo .pfx de almacenamiento del certificado seleccionado o null en caso de no ser necesaria.
- passwordSealSign: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- detachedSignature: En caso de tratarse de una contrafirma en la que la firma o firmas anteriores fueran desasociadas, este parámetro recibirá el array con la firma o firmas previas.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

###### 6.1.2. SignatureResponse

Parámetro de salida del método Sign.

```csharp
public class SignatureResponse
{
public Stream signedDocument;
}
```

**ATRIBUTOS**

- signedDocument: Stream con el documento firmado resultado de la operación, o con la firma desasociada en su caso.

###### 6.1.3. SignatureProviderRequest

Parámetro de entrada del método SignProvider.

```csharp
public class SignatureProviderRequest
{
public int idCertificate;
public string password;
public string passwordSealSign;
public string uri;
public string providerParameter;
public Stream signingDocument;
}
```

**ATRIBUTOS**

- idCertificate: Identificador del certificado de servidor utilizado para firmar el documento.
- password: Contraseña asociada al archivo .pfx de almacenamiento del certificado seleccionado o null en caso de no ser necesaria.
- passwordSealSign: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

###### 6.1.4. SignatureResponse

Parámetro de salida del método Sign.

```csharp
public class SignatureResponse
{
public Stream signedDocument;
}
```

**ATRIBUTOS**

- signedDocument: Stream con el documento firmado resultado de la operación.

###### 6.1.5. BusinessSignatureRequest

Parámetro de entrada del método BusinessSign.

```csharp
public class BusinessSignatureRequest
{
public int idCertificate;
public BusinessSignatureProfile businessSignatureProfile;
public string password;
public string passwordSealSign;
public byte[] detachedSignature;
public Stream signingDocument;
}
```

**ATRIBUTOS**

- idCertificate: Identificador del certificado de servidor utilizado para firmar el documento.
- businessSignatureProfile: Recibe un valor de tipo BusinessSignatureProfile que especifica el tipo de perfil de firma de alto nivel que se desea utilizar. Para más información consultar la descripción del tipo enumerado BusinessSignatureProfile.
- password: Contraseña asociada al archivo .pfx de almacenamiento del certificado seleccionado o null en caso de no ser necesaria.
- passwordSealSign: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- detachedSignature: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

###### 6.1.6. VerificationRequest

Parámetro de entrada del método Verify.

```csharp
public class VerificationRequest
{
public SignatureProfile signatureProfile;
public VerificationFlags options;
public VerificationParameters parameters;
public byte[] detachedSignature;
public Stream document;
}
```

**ATRIBUTOS**

- signatureProfile: Valor del tipo enumerado SignatureProfile que indica el perfil que tiene la firma que se va a validar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- options: Recibe uno o más valores de tipo VerificationFlags que especifican las diferentes opciones de verificación de la firma. Para más información consultar la descripción del tipo enumerado VerificationFlags.
- parameters: Objeto de tipo VerificationParameters que añade algunos parámetros necesarios para la validación de algunos tipos de firmas.
- detachedSignature: En caso de tratarse de una firma desasociada, se pasará el array de bytes correspondientes a dicha firma desasociada. En caso de firma no desasociada, se pasará un null.
- document: Objeto de tipo System.IO.Stream con el contenido del documento que se desea verificar.

###### 6.1.7. VerificationResponse

Parámetro de salida del método Verify.

```csharp
public class VerificationResponse
{
public SignatureVerification signatureVerification;
}
```

**ATRIBUTOS**

- signatureVerification: Objeto de la clase SignatureVerification con toda la información de validación obtenida en el proceso de verificación de la firma.

#### 6.2. Métodos

###### 6.2.1. GetCertificateReferences

Retorna una lista con la información de los certificados almacenados en el servidor a los que un usuario puede tener acceso.

**SINTAXIS**

```csharp
public CertificateReference[] GetCertificateReferences(
string ownerName,
bool includeEncoded);
```

**PARÁMETROS DE ENTRADA**

- ownerName: Cadena de caracteres que indica el nombre del usuario cuyos certificados deberá retornar la función. Si se especifica un null, la función retornará todos los certificados a los que el usuario actual tiene acceso.
- includeEncoded: Parámetro que indica si en las referencias retornadas debe incluirse el certificado codificado.

**RETORNO**

Devuelve un array de objetos de la clase CertificateReference con toda la información de los certificados a los que el usuario tiene acceso.

**COMENTARIOS**

La lista de referencias de certificados se utilizará posteriormente para indicarle al método de firma qué certificado debe utilizar para su proceso.

El proceso habitual es obtener la lista de certificados y mostrársela al usuario para que seleccione el certificado que va a utilizar en la operación posterior. Además, si el valor del campo passwordRequired es true la aplicación cliente deberá solicitar al usuario la contraseña asociada al certificado, puesto que será necesario para la posterior llamada al método Sign.

**EJEMPLO**

Ver ejemplo de código del método Sign.

###### 6.2.2. Sign

Este método realiza la firma del documento recibido como parámetro según los perfiles y configuraciones indicados retornando un array de bytes con el documento firmado.

**SINTAXIS**

```csharp
SignatureResponse Sign(
SignatureRequest request);
```

**PARÁMETROS DE ENTRADA**

- request: Objeto de la clase SignatureRequest.

**RETORNO**

Este método retorna un objeto de la clase SignatureResponse o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

A la hora de indicar un perfil de firma en el campo signatureProfile es necesario tener en cuenta que solo algunos tipos de fichero pueden ser firmados siguiendo algunos perfiles. Por ejemplo, los perfiles PDF, PAdESBasic, PAdESBES, PAdESLTV y PAdESXML son perfiles para firma de documentos con formato PDF, de modo que, si el documento a firmar con este perfil no es de este tipo, se producirá una excepción. Así mismo, el perfil de firma Office solo se puede utilizar para documentos de tipo Microsoft Office.

El parámetro signatureType sirve para indicar cómo se almacena la firma, es decir si la firma se incluye dentro del documento o se separa del mismo (Detached), y en el caso de incluirse dentro, cómo se incluirá (Enveloped o Enveloping).

El campo parameters permite añadir información a la firma según necesidad. En concreto permite añadir información de localización de dónde se realiza la firma, así como el rol del firmante y las políticas de firma aplicadas. Así mismo, permite realizar una configuración personalizada del visualizador de firma (Widget) de los documentos PDF, distinta de la configuración general almacenada en el servidor.

###### 6.2.3. SignProvider

Este método obtiene un documento y los parámetros de configuración de firma mediante un document provider y lo firma con el certificado de servidor indicado como parámetro de entrada.

**SINTAXIS**

```csharp
public SignatureProviderResponse SignProvider(
SignatureProviderRequest request);
```

**PARÁMETROS DE ENTRADA**

- request: Objeto de la clase SignatureProviderRequest.

**RETORNO**

Este método retorna un objeto de la clase SignatureProviderResponse o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

Tanto el documento como los parámetros que se aplicarán en el proceso de firma se obtienen invocando al proveedor de documentos asociado a la uri recibida como parámetro.

El parámetro providerParameter no es utilizado por la plataforma, simplemente su valor llega desde la aplicación llamadora al document provider, sirviendo, por tanto, como paso transparente de valores entre ambos módulos.

Para más información sobre el funcionamiento de document providers se puede consultar el apartado Proveedores de Documentos de este mismo documento.

###### 6.2.4. BusinessSign

Este método permite realizar la firma de un documento recibido como parámetro utilizando perfiles de firma de alto nivel predefinidos en SealSign.

**SINTAXIS**

```csharp
public SignatureResponse BusinessSign(
BusinessSignatureRequest request);
```

**PARÁMETROS DE ENTRADA**

- request: Objeto de la clase BusinessSignatureRequest

**RETORNO**

Este método retorna un objeto de la clase SignatureResponse o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

###### 6.2.5. Verify

Este método se encarga de recibir tanto el documento a validar como las diversas configuraciones a utilizar en el proceso de validación, retornando toda la información de verificación correspondiente a todos y cada uno de los elementos que constituyen la firma de este.

**SINTAXIS**

```csharp
public VerificationResponse Verify(
VerificationRequest request);
```

**PARÁMETROS DE ENTRADA**

- request: Objeto de la clase VerificationResponse.

**RETORNO**

Este método retorna un objeto de la clase VerificationResponse o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El parámetro signatureProfile se usa para conocer el tipo de validación que se va a realizar en función del tipo de documento. Cuando no se conozca el perfil exacto de la firma, al menos se deberán indicar los perfiles de alto nivel (SignatureProfile.CMS, SignatureProfile.PDF, SignatureProfile.XMLDigSig o SignatureProfile.Office) que le indicarán al validador si el tipo de documento es binario, PDF, XML o un documento de Microsoft Office.

En la actualidad, la clase VerificationParameters solo contiene el atributo signingCertificate cuyo valor solo es necesario en aquellos tipos de firma en las que no se incluya el certificado de firma dentro de la misma. En cualquier otro caso se puede pasar un null.

###### 6.2.6. HeartBeat

Este método permite realizar una verificación del estado del servicio web.

**SINTAXIS**

```csharp
public void HeartBeat();
```

**COMENTARIOS**

Realiza las comprobaciones adecuadas para verificar si el servicio web está funcionando correctamente y retorna una excepción en caso contrario.

###### 6.2.7. GetShadowMarkInfo

Este método se encarga de extraer la marca de agua de Shadow del documento recibido como parámetro de entrada, retornando toda la información asociada a la misma.

**SINTAXIS**

```csharp
public ShadowMarkInfo GetShadowMarkInfo(
byte[] document,
string type);
```

**PARÁMETROS DE ENTRADA**

- document: Array de bytes con el contenido del documento del que se desea extraer la firma.
- type: tipo de marca de agua. Más información en la documentación de Shadow.

**RETORNO**

Devuelve un objeto de la clase ShadowMarksInfo con toda la información asociada a la marca de agua o una excepción en caso de producirse algún tipo de error.

## 7. Servicio de Firma y Verificación JSON

El servicio SignatureServiceBasic.svc de SealSign DSS expone todos los métodos necesarios para la generación y validación de firmas de documentos a través de un servicio JSON (WebHttpBinding).

Los métodos expuestos son los siguientes:

- **GetCertificateReferences**: Obtiene información de los certificados almacenados en el servidor de SealSign y que pueden ser utilizados por el usuario que invoca al servicio.
- **Sign**: Firma un documento de entrada con las configuraciones recibidas como parámetros.
- **SignProvider**: Obtiene un documento y los parámetros de configuración de firma mediante un document provider y lo firma con el certificado de servidor recibido.
- **BusinessSign**: Realiza la firma de un documento mediante un perfil de firma de alto nivel.
- **Verify**: Permite verificar y obtener la información de cada una de las firmas incluidas en un documento.
- **HeartBeat**: Método que permite comprobar el estado de salud del servicio.
- **GetShadowMarkInfo**: Permite obtener la información correspondiente a la marca de agua de Shadow incluida en un documento.

#### 7.1. Métodos

###### 7.1.1. GetCertificateReferences

Retorna una lista con la información de los certificados almacenados en el servidor a los que un usuario puede tener acceso.

**SINTAXIS**

```csharp
public CertificateReference[] GetCertificateReferences(
    string ownerName,
    bool includeEncoded);
```

**PARÁMETROS DE ENTRADA**

- **ownerName**: Filtro opcional que indica el nombre del usuario cuyos certificados deberá retornar la función. Si se especifica un null, la función retornará todos los certificados a los que el usuario actual tiene acceso.
- **includeEncoded**: Parámetro que indica si en las referencias retornadas debe incluirse el certificado codificado.

**RETORNO**

Devuelve un array de objetos de la clase CertificateReference con toda la información de los certificados a los que el usuario tiene acceso.

**COMENTARIOS**

La lista de referencias de certificados se utilizará posteriormente para indicarle al método de firma qué certificado debe utilizar para su proceso.

El proceso habitual es obtener la lista de certificados y mostrársela al usuario para que seleccione el certificado que va a utilizar en la operación posterior. Además, si el valor del campo passwordRequired es true la aplicación cliente deberá solicitar al usuario la contraseña asociada al certificado. Esta contraseña será necesaria para la posterior llamada al método Sign.

###### 7.1.2. Sign

Este método realiza la firma del documento recibido como parámetro usando los perfiles y configuraciones indicados y retornando un array de bytes con el documento firmado.

**SINTAXIS**

```csharp
public byte[] Sign(
    int idCertificate,
    SignatureProfile signatureProfile,
    SignatureType signatureType,
    HashAlgorithm hashAlgorithm,
    SignatureFlags options,
    SignatureParameters parameters,
    string password,
    string passwordSealSign,
    byte[] detachedSignature,
    byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- **idCertificate**: Identificador del certificado de servidor utilizado para firmar el documento.
- **signatureProfile**: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma que se desea realizar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- **signatureType**: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- **hashAlgorithm**: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar la firma. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- **options**: Recibe uno o varios valores de tipo SignatureFlags que permiten configurar algunos parámetros de comportamiento en el proceso de firma de documentos. Para más información sobre los valores soportados consultar la descripción del tipo enumerado SignatureFlags.
- **parameters**: Objeto de tipo SignatureParameters que añade algunos parámetros extra necesarios para la realización de algunos tipos de firmas. Este valor puede ser null en caso de no ser necesario configurar ninguno de los parámetros expuestos. Para más información consultar la descripción de la clase SignatureParameters.
- **password**: Contraseña de acceso a la clave privada del certificado seleccionado o null en caso de no ser necesaria.
- **passwordSealSign**: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- **detachedSignature**: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- **signingDocument**: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un array de bytes con el documento firmado según los parámetros de firma especificados en la llamada a la función o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

A la hora de indicar un perfil de firma en el campo signatureProfile es necesario tener en cuenta que solo algunos tipos de fichero pueden ser firmados siguiendo algunos perfiles. Por ejemplo, los perfiles PDF, PAdESBasic, PAdESBES, PAdESLTV y PAdESXML son perfiles para firma de documentos con formato PDF, de modo que, si el documento a firmar con este perfil no es de este tipo, se producirá una excepción. Así mismo, el perfil de firma Office solo se puede utilizar para documentos de tipo Microsoft Office.

El parámetro signatureType sirve para indicar cómo se almacena la firma, es decir si la firma se incluye dentro del documento o se separa del mismo (Detached), y en el caso de incluirse dentro, cómo se incluirá (Enveloped o Enveloping).

El campo parameters permite añadir información a la firma según necesidad. En concreto permite añadir información de localización de dónde se realiza la firma, así como el rol del firmante y las políticas de firma aplicadas. Así mismo, permite realizar una configuración personalizada del visualizador de firma (Widget) de los documentos PDF, distinta de la configuración general almacenada en el servidor.

###### 7.1.3. SignProvider

Este método obtiene un documento y los parámetros de configuración de firma mediante un document provider y lo firma con el certificado de servidor indicado como parámetro de entrada.

**SINTAXIS**

```csharp
public byte[] SignProvider(
    int idCertificate,
    string password,
    string passwordSealSign,
    string uri,
    string providerParameter,
    byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- **idCertificate**: Identificador del certificado de servidor utilizado para firmar el documento.
- **password**: Contraseña de acceso a la clave privada del certificado seleccionado o null en caso de no ser necesaria.
- **passwordSealSign**: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- **uri**: Identificador URI del documento en el repositorio.
- **providerParameter**: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- **signingDocument**: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un array de bytes una vez que se haya firmado el documento obtenido mediante la llamada al document provider asociado a la uri especificada o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

Tanto el documento como los parámetros que se aplicarán en el proceso de firma se obtienen invocando al proveedor de documentos asociado a la uri recibida como parámetro.

El parámetro providerParameter no es utilizado por la plataforma, simplemente su valor llega desde la aplicación llamadora al document provider, sirviendo, por tanto, como paso transparente de valores entre ambos módulos.

Para más información sobre el funcionamiento de document providers se puede consultar el apartado Proveedores de Documentos de este mismo documento.

###### 7.1.4. BusinessSign

Este método permite realizar la firma de un documento recibido como parámetro utilizando perfiles de firma de alto nivel predefinidos en SealSign.

**SINTAXIS**

```csharp
public byte[] BusinessSign(
    int idCertificate,
    BusinessSignatureProfile businessSignatureProfile,
    string password,
    string passwordSealSign,
    byte[] detachedSignature,
    byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- **idCertificate**: Identificador del certificado de servidor utilizado para firmar el documento.
- **businessSignatureProfile**: Recibe un valor de tipo BusinessSignatureProfile que especifica el tipo de perfil de firma de alto nivel que se desea utilizar. Para más información consultar la descripción del tipo enumerado BusinessSignatureProfile.
- **password**: Contraseña de acceso a la clave privada del certificado seleccionado o null en caso de no ser necesaria.
- **passwordSealSign**: Contraseña de SealSign asociada al certificado seleccionado o null en caso de no ser necesaria.
- **detachedSignature**: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- **signingDocument**: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un array de bytes con el documento firmado según los parámetros de firma especificados o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El identificador del certificado, parámetro idCertificate, se obtendrá mediante una llamada previa al método GetCertificateReferences. En dicha llamada, junto con el identificador se obtendrá el valor de los flags de solicitud de contraseña (passwordRequired y passwordSealSignRequired). En caso de que el valor de alguno de estos flags sea true, será necesario proporcionar la correspondiente contraseña en la llamada al método Sign.

###### 7.1.5. Verify

Este método se encarga de recibir tanto el documento a validar como las diversas configuraciones a utilizar en el proceso de validación, retornando toda la información de verificación correspondiente a todos y cada uno de los elementos que constituyen la firma de este.

**SINTAXIS**

```csharp
public SignatureVerification Verify(
    SignatureProfile signatureProfile,
    VerificationFlags options,
    VerificationParameters parameters,
    byte[] detachedSignature,
    byte[] document);
```

**PARÁMETROS DE ENTRADA**

- **signatureProfile**: Valor del tipo enumerado SignatureProfile que indica el perfil que tiene la firma que se va a validar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- **options**: Recibe uno o más valores de tipo VerificationFlags que especifican las diferentes opciones de verificación de la firma. Para más información consultar la descripción del tipo enumerado VerificationFlags.
- **parameters**: Objeto de tipo VerificationParameters que añade algunos parámetros necesarios para la validación de algunos tipos de firmas.
- **detachedSignature**: En caso de tratarse de una firma desasociada, se pasará el array de bytes correspondientes a dicha firma desasociada. En caso de firma no desasociada, se pasará un null.
- **document**: Array de bytes con el contenido del documento que se desea verificar.

**RETORNO**

Devuelve un objeto de la clase SignatureVerification con toda la información de validación obtenida en el proceso de verificación de la firma o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

El parámetro signatureProfile se usa para conocer el tipo de validación que se va a realizar en función del tipo de documento. Cuando no se conozca el perfil exacto de la firma, al menos se deberán indicar los perfiles de alto nivel (SignatureProfile.CMS, SignatureProfile.PDF, SignatureProfile.XMLDigSig o SignatureProfile.Office) que le indicarán al validador si el tipo de documento es binario, PDF, XML o un documento de Microsoft Office.

En la actualidad, la clase VerificationParameters solo contiene el atributo signingCertificate cuyo valor solo es necesario en aquellos tipos de firma en las que no se incluya el certificado de firma dentro de la misma. En cualquier otro caso se puede pasar un null.

###### 7.1.6. HeartBeat

Este método permite realizar una verificación del estado del servicio web.

**SINTAXIS**

```csharp
public void HeartBeat();
```

**COMENTARIOS**

Realiza las comprobaciones adecuadas para verificar si el servicio web está funcionando correctamente y retorna una excepción en caso contrario.

###### 7.1.7. GetShadowMarkInfo

Este método se encarga de extraer la marca de agua de Shadow del documento recibido como parámetro de entrada, retornando toda la información asociada a la misma.

**SINTAXIS**

```csharp
public ShadowMarkInfo GetShadowMarkInfo(
    byte[] document,
    string type);
```

**PARÁMETROS DE ENTRADA**

- **document**: Array de bytes con el contenido del documento del que se desea extraer la firma.
- **type**: tipo de marca de agua. Más información en la documentación de Shadow.

**RETORNO**

Devuelve un objeto de la clase ShadowMarksInfo con toda la información asociada a la marca de agua o una excepción en caso de producirse algún tipo de error.

## 8. Servicio de Timestamp SOAP 1.1

El servicio TimestampServiceBasic.svc de SealSign DSS expone los métodos necesarios para la generación de sellos de tiempo a través de un servicio web SOAP 1.1 (basicHttpBinding). Los métodos expuestos son los siguientes:

- **AddArchiveTimestamp**: Añade un sello de tiempo de archivado a un documento con una firma válida. Este tipo de sello de tiempo se utiliza para asegurar la firma a lo largo del tiempo ya que es posible que los algoritmos utilizados para la firma se vean comprometidos en el futuro.

En los siguientes apartados, se describen tanto el interfaz de cada uno de estos métodos, así como las clases y tipos relacionados con los mismos.

#### 8.1. Métodos

###### 8.1.1. AddArchiveTimestamp

Este método añade el sello de tiempo al documento recibido como parámetro según los perfiles y configuraciones indicados retornando un array de bytes con el documento sellado.

**SINTAXIS**

```csharp
public byte[] AddArchiveTimestamp(SignatureProfile signatureProfile,
    SignatureType signatureType,
    HashAlgorithm hashAlgorithm,
    int signatureIndex,
    byte[] detachedSignature,
    byte[] signedDocument);
```

**PARÁMETROS DE ENTRADA**

- **signatureProfile**: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma con el que se firmó el documento. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- **signatureType**: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- **hashAlgorithm**: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar el sello de tiempo. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- **signatureIndex**: Índice de la firma a sellar.
- **detachedSignature**: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada será null.
- **signedDocument**: Array de bytes con el contenido del documento que se desea sellar.

**RETORNO**

Devuelve un array de bytes con el documento sellado según los parámetros de timestamp especificados en la llamada a la función o una excepción en caso de producirse algún tipo de error.

**COMENTARIOS**

Para obtener las firmas del documento se utiliza el método Verify del servicio de verificación de firma.

## 9. Servicio de Timestamp SOAP 1.2

El servicio TimestampService.svc de SealSign DSS expone todos los métodos necesarios para la generación de sellos de tiempo a través de un servicio SOAP 1.2 (wsHttpBinding). Los métodos expuestos son los siguientes:

- **AddArchiveTimestamp**: Añade un sello de tiempo de archivado a un documento con una firma válida. Este tipo de sello de tiempo se utiliza para asegurar la firma a lo largo del tiempo ya que es posible que los algoritmos utilizados para la firma se vean comprometidos en el futuro.

En los siguientes apartados, se describen tanto el interfaz de cada uno de estos métodos como las clases y tipos relacionados con los mismos.

#### 9.1. Clases

###### 9.1.1. ArchiveTimestampRequest

Parámetro de entrada del método AddArchiveTimestamp.

```csharp
public class ArchiveTimestampRequest
{
    public SignatureProfile signatureProfile;
    public SignatureType signatureType;
    public HashAlgorithm hashAlgorithm;
    public int signatureIndex;
    public byte[] detachedSignature;
    public Stream signedDocument;
}
```

**ATRIBUTOS**

- **signatureProfile**: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma con el que se firmó el documento. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- **signatureType**: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- **hashAlgorithm**: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar el sello de tiempo. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- **signatureIndex**: Índice de la firma a sellar.
- **detachedSignature**: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada será null.
- **signedDocument**: Array de bytes con el contenido del documento que se desea sellar.

###### 9.1.2. TimestampResponse

Parámetro de salida del método AddArchiveTimestamp.

```csharp
public class TimestampResponse
{
    public Stream timestampedDocument;
}
```

**ATRIBUTOS**

- **timestampedDocument**: Stream con el contenido del documento sellado.

#### 9.2. Métodos

###### 9.2.1. AddArchiveTimestamp

Este método añade el sello de tiempo al documento recibido como parámetro según los perfiles y configuraciones indicados retornando un array de bytes con el documento sellado.

**SINTAXIS**

```csharp
public TimestampResponse AddArchiveTimestamp(
    ArchiveTimestampRequest request);
```

**PARÁMETROS DE ENTRADA**

- **request**: Objeto de la clase ArchiveTimestampRequest.

**RETORNO**

Este método retorna un objeto de la clase TimestampResponse o una excepción en caso de producirse algún tipo de error.

## 10. Firma Distribuida en Cliente

Aunque a priori el procedimiento de firma electrónica es sencillo (cálculo y cifrado del hash del documento), hay escenarios en los que puede resultar complejo y costoso en proceso y tiempo dependiendo del perfil requerido, por ejemplo, XAdES-XL, XAdES-A, etc. Estos perfiles requieren obtener elementos externos al sistema, como CRLs o respuestas OCSP de las entidades certificadoras, sellos de tiempo de terceros, etc. Además, cada vez es más habitual que el documento y la clave privada del firmante están separados en sistemas remotos, por ejemplo, un usuario firmando desde un navegador de Internet un documento residente en el servidor.

Una de las ventajas que proporciona SealSign DSS es la firma distribuida, que permite resolver los escenarios planteados de una forma muy flexible y sencilla. La firma distribuida consiste en realizar todo el proceso de firma en el lado del servidor salvo el cifrado del hash que se produce en el lado del cliente, donde reside la clave privada del firmante. De esta forma se unifica y optimiza la obtención de elementos externos y se reduce drásticamente la información intercambiada.

Este proceso se realiza de forma segura en SealSign DSS asegurándose así la integridad de los datos en dos niveles: a nivel de aplicación cifrando la información intercambiada y a nivel de infraestructura, permitiendo utilizar las tecnologías subyacentes de comunicaciones (SSL, autenticación, etc.).

Una ventaja adicional de este modelo es la simplicidad del cliente que permite de forma sencilla integrar multitud de tecnologías heterogéneas, como distintos sistemas operativos (Windows, Linux, etc.) y distintos dispositivos (PCs, móviles, tabletas, etc.).

En este apartado se muestra como integrar esta funcionalidad en aplicaciones y tecnologías de distinta naturaleza.

#### 10.1. Arquitectura de la Firma Distribuida

La funcionalidad de firma distribuida en SealSign DSS es proporcionada principalmente por tres componentes:

![Arquitectura de la Firma Distribuida](./images/distributed-signature-architecture.png)

<center><i>Arquitectura de la firma distribuida en SealSign DSS: Aplicación Cliente, SealSign DSS Server y Servicio Externo de Documentos</i></center>

1. Servicio de backend de SealSign DSS (DistributedSignatureService.svc o DistributedSignatureServiceBasic.svc para entornos SOAP 1.1): Este servicio es el responsable de orquestar la comunicación entre el cliente y el servicio que accede al repositorio donde se encuentra el documento original así como de llevar a cabo el proceso de firma sobre el documento solicitado.
2. Componente cliente de cifrado (AsyncStateManager): Este componente se encarga de componer el hash cifrado asociado al documento que está siendo firmado. En la plataforma SealSign DSS se incluyen versiones del componente para aplicaciones .NET, Java, Blackberry, Android e iOS.

#### 10.2. Componente cliente de cifrado (AsyncStateManager)

En SealSign DSS el tratamiento del hash en cliente se debe realizar a través del componente de cifrado AsyncStateManager, que se encarga de comprobar el hash recibido, cifrarlo y prepararlo de forma segura para su retorno a la capa de servicios de firma distribuida.

## 11. Servicio de Firma Distribuida SOAP 1.1

El servicio DistributedSignatureServiceBasic.svc de SealSign DSS expone los métodos necesarios para implementar firmas de documentos distribuidas a través de un servicio web SOAP 1.1 (basicHttpBinding). Los métodos expuestos son los siguientes:

- BeginSignature: Indica al servicio el comienzo de una firma distribuida. El servidor procesa el documento hasta la generación del resumen que se retorna al cliente dentro del contexto de firma para ser cifrado.
- EndSignature: El cliente actualiza la firma en servidor con el resumen del documento cifrado.
- BeginSignatureProvider: Indica al servicio el comienzo de una firma distribuida con document provider. El servidor obtiene el documento y los parámetros de la firma mediante la llamada a un remote document provider, a partir de ahí, procesa el documento hasta la generación del resumen que se retorna al cliente dentro del contexto de firma para ser cifrado.
- EndSignatureProvider: El cliente actualiza la firma en servidor con el resumen del documento cifrado y el servidor invoca a un remote document provider para que almacene el documento final.
- HeartBeat: Método que permite comprobar el estado de salud del servicio.

En los siguientes apartados, se describen tanto el interfaz de cada uno de estos métodos, así como las clases y tipos relacionados con los mismos.

#### 11.1. Clases

###### 11.1.1. DistributedSignatureBeginResponseBasic

Tipo retornado por los métodos BeginSignature y BeginSignatureProvider.

```csharp
public class DistributedSignatureBeginResponseBasic
{
public Guid instance;
public byte[] asyncState;
}
```

**ATRIBUTOS**

- instance: Identificador de transacción de firma distribuida necesario para completar la operación
- asyncState: Array de bytes que contiene el contexto de firma distribuida. Para procesar el contexto es necesario hacer uso de la clase AsyncStateManager.

#### 11.2. Métodos

###### 11.2.1. BeginSignature

Inicia un proceso de firma distribuida.

**SINTAXIS**

```csharp
public DistributedSignatureBeginResponseBasic BeginSignature(
byte[] certificate,
SignatureProfile signatureProfile,
SignatureType signatureType,
HashAlgorithm hashAlgorithm,
SignatureFlags options,
SignatureParameters parameters,
byte[] detachedSignature,
byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- certificate: Parte pública del certificado con el que se va a realizar la firma en cliente en formato array de bytes.
- signatureProfile: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma que se desea realizar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- signatureType: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- hashAlgorithm: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar la firma. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- options: Recibe uno o varios valores de tipo SignatureFlags que permiten configurar algunos parámetros de comportamiento en el proceso de firma de documentos. Para más información sobre los valores soportados consultar la descripción del tipo enumerado SignatureFlags.
- parameters: Objeto de tipo SignatureParameters que añade algunos parámetros extra necesarios para la realización de algunos tipos de firmas. Este valor puede ser null en caso de no ser necesario configurar ninguno de los parámetros expuestos. Para más información consultar la descripción de la clase SignatureParameters.
- detachedSignature: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un objeto de la clase DistributedSignatureBeginResponseBasic con el identificador de la transacción de firma y un array de bytes con el contexto de firma distribuida para ser tratado en el cliente mediante la clase AsynStateManager.

**COMENTARIOS**

A la hora de indicar un perfil de firma en el campo signatureProfile es necesario tener en cuenta que solo algunos tipos de fichero pueden ser firmados siguiendo algunos perfiles. Por ejemplo, los perfiles PDF, PAdESBasic, PAdESBES, PAdESLTV y PAdESXML son perfiles para firma de documentos con formato PDF, de modo que, si el documento a firmar con este perfil no es de este tipo, se producirá una excepción. Así mismo, el perfil de firma Office solo se puede utilizar para documentos de tipo Microsoft Office.

El parámetro signatureType sirve para indicar cómo se almacena la firma, es decir si la firma se incluye dentro del documento o se separa del mismo (Detached), y en el caso de incluirse dentro, cómo se incluirá (Enveloped o Enveloping).

El campo parameters permite añadir información a la firma según necesidad. En concreto permite añadir información de localización de dónde se realiza la firma, así como el rol del firmante y las políticas de firma aplicadas. Así mismo, permite realizar una configuración personalizada del visualizador de firma (Widget) de los documentos PDF, distinta de la configuración general almacenada en el servidor.

###### 11.2.2. BeginSignatureProvider

Inicia un proceso de firma distribuida con document provider.

**SINTAXIS**

```csharp
public SignatureContext BeginSignatureProvider(
byte[] certificate,
string uri,
string providerParameter,
byte[] document,
RemoteProviderConfiguration remoteProviderConfiguration);
```

**PARAMETROS DE ENTRADA**

- certificate: Parte pública del certificado con el que se va a realizar la firma en cliente en formato array de bytes.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- document: Parámetro opcional con el array de bytes del documento a firmar.
- remoteProviderConfiguration: Parámetro opcional con la información para la conexión al proveedor de documentos remoto.

**RETORNO**

Devuelve un objeto de la clase SignatureContext con el identificador de la transacción de firma y un array de bytes con el contexto de firma distribuida para ser tratado en el cliente mediante la clase AsynStateManager.

**COMENTARIOS**

El array de bytes del documento a firmar es opcional. Si se pasa, este se utiliza junto con las configuraciones de firma retornadas por el remote document provider. En caso contrario, es el propio remote document el que deberá acceder al repositorio documental adecuado para retornar el array de bytes del documento.

###### 11.2.3. EndSignature

Completa un proceso de firma distribuida.

**SINTAXIS**

```csharp
public byte[] EndSignature(Guid instance,
byte[] asyncState)
```

**PARÁMETROS DE ENTRADA**

- instance: Identificador de la transacción de firma retornado por el método BeginSignature.
- asyncState: Array de bytes del estado de firma distribuida después de haber sido procesado por el componente AsyncStateManager.

**RETORNO**

Devuelve un array de bytes con el documento firmado según los parámetros de firma especificados en la llamada a la función o una excepción en caso de producirse algún tipo de error.

###### 11.2.4. EndSignatureProvider

Completa un proceso de firma distribuida con document provider.

**SINTAXIS**

```csharp
public byte[] EndSignatureProvider(Guid instance,
byte[] asyncState,
string uri,
string providerParameter,
bool returnSignedDocument,
RemoteProviderConfiguration remoteProviderConfiguration)
```

**PARÁMETROS DE ENTRADA**

- instance: Identificador de la transacción de firma retornado por los métodos BeginSignature o BeginSignatureProvider.
- asyncState: Array de bytes del estado de firma distribuida después de haber sido procesado por el componente AsyncStateManager.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- returnSignedDocument: Booleano que indica si el método debe retornar el documento firmado.
- remoteProviderConfiguration: Parámetro opcional con la información para la conexión al proveedor de documentos remoto.

**RETORNO**

Si el parámetro returnSignedDocument es true, devuelve un array de bytes con el documento firmado o un null en caso contrario.

**COMENTARIOS**

El método invocará siempre al remote document provider asociado para que realice el almacenado del documento resultante. Si además se requiere que el documento firmado llegue a la aplicación llamadora, se puede poner a true el parámetro returnSignedDocument.

###### 11.2.5. HeartBeat

Este método permite realizar una verificación del estado del servicio web.

**SINTAXIS**

```csharp
public void HeartBeat();
```

**COMENTARIOS**

Realiza las comprobaciones adecuadas para verificar si el servicio web está funcionando correctamente y retorna una excepción en caso contrario.

## 12. Servicio de Firma Distribuida SOAP 1.2

El servicio DistributedSignatureService.svc de SealSign DSS expone los métodos necesarios para la generación de firmas de documentos distribuidas a través de un servicio SOAP 1.2 (wsHttpBinding).

Los métodos expuestos son los siguientes:

- BeginSignature: Indica al servicio el comienzo de una firma distribuida. El servidor procesa el documento hasta la generación del resumen que se retorna al cliente dentro del contexto de firma para ser cifrado.
- EndSignature: El cliente actualiza la firma en servidor con el resumen del documento cifrado.
- BeginSignatureProvider: Indica al servicio el comienzo de una firma distribuida con document provider. El servidor obtiene el documento y los parámetros de la firma mediante la llamada a un remote document provider, a partir de ahí, procesa el documento hasta la generación del resumen que se retorna al cliente dentro del contexto de firma para ser cifrado.
- EndSignatureProvider: El cliente actualiza la firma en servidor con el resumen del documento cifrado y el servidor invoca a un remote document provider para que almacene el documento final.
- HeartBeat: Método que permite comprobar el estado de salud del servicio.

En los siguientes apartados, se describen tanto el interfaz de cada uno de estos métodos como las clases y tipos relacionados con los mismos.

#### 12.1. Clases

###### 12.1.1. DistributedSignatureBeginRequest

Parámetro de entrada del método BeginSignature.

```csharp
public class DistributedSignatureBeginRequest
{
public byte[] certificate;
public SignatureProfile signatureProfile;
public SignatureType signatureType;
public HashAlgorithm hashAlgorithm;
public SignatureFlags options;
public SignatureParameters parameters;
public byte[] detachedSignature;
public Stream signingDocument;
}
```

**ATRIBUTOS**

- certificate: Parte pública del certificado con el que se va a realizar la firma en cliente en formato array de bytes.
- signatureProfile: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma que se desea realizar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- signatureType: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- hashAlgorithm: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar la firma. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- options: Recibe uno o varios valores de tipo SignatureFlags que permiten configurar algunos parámetros de comportamiento en el proceso de firma de documentos. Para más información sobre los valores soportados consultar la descripción del tipo enumerado SignatureFlags.
- parameters: Objeto de tipo SignatureParameters que añade algunos parámetros extra necesarios para la realización de algunos tipos de firmas. Este valor puede ser null en caso de no ser necesario configurar ninguno de los parámetros expuestos. Para más información consultar la descripción de la clase SignatureParameters.
- detachedSignature: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- signingDocument: Stream con el contenido del documento que se desea firmar.

###### 12.1.2. DistributedSignatureBeginProviderRequest

Parámetro de entrada del método BeginSignatureProvider.

```csharp
public class DistributedSignatureBeginProviderRequest
{
public byte[] certificate;
public string uri;
public string providerParameter;
public RemoteProviderConfiguration remoteProviderConfiguration;
public Stream signingDocument;
}
```

**ATRIBUTOS**

- certificate: Parte pública del certificado con el que se va a realizar la firma en cliente en formato array de bytes.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- remoteProviderConfiguration: Parámetro opcional con la información para la conexión al proveedor de documentos remoto.
- signingDocument: Stream con el contenido del documento que se desea firmar.

###### 12.1.3. DistributedSignatureBeginResponse

Parámetro de salida del método BeginSignature.

```csharp
public class DistributedSignatureBeginResponse
{
public Guid instance;
public byte[] asyncState;
}
```

**ATRIBUTOS**

- instance: Identificador de transacción de firma distribuida necesario para completar la operación
- asyncState: Array de bytes que contiene el contexto de firma distribuida. Para procesar el contexto es necesario hacer uso de la clase AsyncStateManager.

###### 12.1.4. DistributedSignatureEndRequest

Parámetro de entrada del método EndSignature.

```csharp
public class DistributedSignatureEndRequest
{
public Guid instance;
public byte[] asyncState;
}
```

**ATRIBUTOS**

- instance: Identificador de transacción de firma distribuida necesario para completar la operación
- asyncState: Array de bytes que contiene el contexto de firma distribuida previamente procesado mediante la clase AsyncStateManager.

###### 12.1.5. DistributedSignatureEndProviderRequest

Parámetro de entrada del método EndSignatureProvider.

```csharp
public class DistributedSignatureEndRequest
{
public Guid instance;
public byte[] asyncState;
public string uri;
public string providerParameter;
public RemoteProviderConfiguration remoteProviderConfiguration;
public bool returnSignedDocument;
}
```

**ATRIBUTOS**

- instance: Identificador de transacción de firma distribuida necesario para completar la operación.
- asyncState: Array de bytes que contiene el contexto de firma distribuida previamente procesado mediante la clase AsyncStateManager.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- remoteProviderConfiguration: Parámetro opcional con la información para la conexión al proveedor de documentos remoto.
- returnSignedDocument: Booleano que indica si el método debe retornar el documento firmado.

#### 12.2. Métodos

###### 12.2.1. BeginSignature

Inicia un proceso de firma distribuida.

**SINTAXIS**

```csharp
public DistributedSignatureBeginResponse BeginSignature(
DistributedSignatureBeginRequest request);
```

**PARÁMETROS DE ENTRADA**

- request: Instancia del tipo DistributedSignatureBeginRequest con los datos de inicio de transacción de firma.

**RETORNO**

Devuelve un objeto de la clase DistributedSignatureBeginResponse con el identificador de la transacción de firma y un array de bytes con el contexto de firma distribuida para ser tratado en el cliente mediante la clase AsynStateManager.

###### 12.2.2. BeginSignatureProvider

Inicia un proceso de firma distribuida con remote document provider.

**SINTAXIS**

```csharp
public DistributedSignatureBeginResponse BeginSignatureProvider(
DistributedSignatureBeginProviderRequest request);
```

**PARÁMETROS DE ENTRADA**

- request: Instancia del tipo DistributedSignatureBeginProviderRequest con los datos de inicio de transacción de firma.

**RETORNO**

Devuelve un objeto de la clase DistributedSignatureBeginResponse con el identificador de la transacción de firma y un array de bytes con el contexto de firma distribuida para ser tratado en el cliente mediante la clase AsynStateManager.

**COMENTARIOS**

El array de bytes del documento a firmar es opcional. Si se pasa, este se utiliza junto con las configuraciones de firma retornadas por el remote document provider. En caso contrario, es el propio remote document provider el que deberá acceder al repositorio documental adecuado para retornar el array de bytes del documento.

###### 12.2.3. EndSignature

Completa un proceso de firma distribuida.

**SINTAXIS**

```csharp
SignatureResponse EndSignature(
DistributedSignatureEndRequest request);
```

**PARAMETROS DE ENTRADA**

- request: Instancia del tipo DistributedSignatureEndRequest con los datos necesarios para completar la transacción de firma.

**RETORNO**

Este método retorna un objeto de la clase SignatureResponse o una excepción en caso de producirse algún tipo de error. La clase SignatureResponse está definida en el apartado de Servicio de Firma y Verificación SOAP 1.2.

###### 12.2.4. EndSignatureProvider

Completa un proceso de firma distribuida con remote document provider.

**SINTAXIS**

```csharp
public SignatureResponse EndSignatureProvider(
DistributedSignatureEndProviderRequest request)
```

**PARAMETROS DE ENTRADA**

- request: Instancia del tipo DistributedSignatureEndRequest con los datos necesarios para completar la transacción de firma.

**RETORNO**

Este método retorna un objeto de la clase SignatureResponse o una excepción en caso de producirse algún tipo de error. La clase SignatureResponse está definida en el apartado de Servicio de Firma y Verificación SOAP 1.2.

###### 12.2.5. HeartBeat

Este método permite realizar una verificación del estado del servicio web.

**SINTAXIS**

```csharp
public void HeartBeat();
```

**COMENTARIOS**

Realiza las comprobaciones adecuadas para verificar si el servicio web está funcionando correctamente y retorna una excepción en caso contrario.

## 13. Servicio de Firma Distribuida JSON

El servicio DistributedSignatureServiceBasic.svc de SealSign DSS expone los métodos necesarios para implementar firmas de documentos distribuidas a través de un servicio web JSON (WebHttpBinding). Los métodos expuestos son los siguientes:

- BeginSignature: Indica al servicio el comienzo de una firma distribuida. El servidor procesa el documento hasta la generación del resumen que se retorna al cliente dentro del contexto de firma para ser cifrado.
- EndSignature: El cliente actualiza la firma en servidor con el resumen del documento cifrado.
- BeginSignatureProvider: Indica al servicio el comienzo de una firma distribuida con document provider. El servidor obtiene el documento y los parámetros de la firma mediante la llamada a un remote document provider, a partir de ahí, procesa el documento hasta la generación del resumen que se retorna al cliente dentro del contexto de firma para ser cifrado.
- EndSignatureProvider: El cliente actualiza la firma en servidor con el resumen del documento cifrado y el servidor invoca a un remote document provider para que almacene el documento final.
- HeartBeat: Método que permite comprobar el estado de salud del servicio.

En los siguientes apartados, se describen tanto el interfaz de cada uno de estos métodos, así como las clases y tipos relacionados con los mismos.

#### 13.1. Clases

###### 13.1.1. DistributedSignatureBeginResponseBasic

Tipo retornado por los métodos BeginSignature y BeginSignatureProvider.

```csharp
public class DistributedSignatureBeginResponseBasic
{
public Guid instance;
public byte[] asyncState;
}
```

**ATRIBUTOS**

- instance: Identificador de transacción de firma distribuida necesario para completar la operación
- asyncState: Array de bytes que contiene el contexto de firma distribuida. Para procesar el contexto es necesario hacer uso de la clase AsyncStateManager.

#### 13.2. Métodos

###### 13.2.1. BeginSignature

Inicia un proceso de firma distribuida.

**SINTAXIS**

```csharp
public DistributedSignatureBeginResponseBasic BeginSignature(
byte[] certificate,
SignatureProfile signatureProfile,
SignatureType signatureType,
HashAlgorithm hashAlgorithm,
SignatureFlags options,
SignatureParameters parameters,
byte[] detachedSignature,
byte[] signingDocument);
```

**PARÁMETROS DE ENTRADA**

- certificate: Parte pública del certificado con el que se va a realizar la firma en cliente en formato array de bytes.
- signatureProfile: Recibe un valor de tipo SignatureProfile que especifica el tipo de perfil de firma que se desea realizar. Para más información consultar la descripción del tipo enumerado SignatureProfile.
- signatureType: Recibe un valor de tipo SignatureType que especifica el tipo de formato de almacenamiento de la firma. Para más información sobre los tipos de almacenamiento consultar la descripción del tipo enumerado SignatureType.
- hashAlgorithm: Recibe un valor de tipo HashAlgorithm que especifica el algoritmo de hash que se utilizará a la hora de realizar la firma. Para más información sobre los algoritmos soportados consultar la descripción del tipo enumerado HashAlgorithm.
- options: Recibe uno o varios valores de tipo SignatureFlags que permiten configurar algunos parámetros de comportamiento en el proceso de firma de documentos. Para más información sobre los valores soportados consultar la descripción del tipo enumerado SignatureFlags.
- parameters: Objeto de tipo SignatureParameters que añade algunos parámetros extra necesarios para la realización de algunos tipos de firmas. Este valor puede ser null en caso de no ser necesario configurar ninguno de los parámetros expuestos. Para más información consultar la descripción de la clase SignatureParameters.
- detachedSignature: En caso de tratarse de una firma desasociada, este parámetro retornará el array de bytes correspondientes a dicha firma. En caso de firma no desasociada retornará null.
- signingDocument: Array de bytes con el contenido del documento que se desea firmar.

**RETORNO**

Devuelve un objeto de la clase DistributedSignatureBeginResponseBasic con el identificador de la transacción de firma y un array de bytes con el contexto de firma distribuida para ser tratado en el cliente mediante la clase AsynStateManager.

**COMENTARIOS**

A la hora de indicar un perfil de firma en el campo signatureProfile es necesario tener en cuenta que solo algunos tipos de fichero pueden ser firmados siguiendo algunos perfiles. Por ejemplo, los perfiles PDF, PAdESBasic, PAdESBES, PAdESLTV y PAdESXML son perfiles para firma de documentos con formato PDF, de modo que, si el documento a firmar con este perfil no es de este tipo, se producirá una excepción. Así mismo, el perfil de firma Office solo se puede utilizar para documentos de tipo Microsoft Office.

El parámetro signatureType sirve para indicar cómo se almacena la firma, es decir si la firma se incluye dentro del documento o se separa del mismo (Detached), y en el caso de incluirse dentro, cómo se incluirá (Enveloped o Enveloping).

El campo parameters permite añadir información a la firma según necesidad. En concreto permite añadir información de localización de dónde se realiza la firma, así como el rol del firmante y las políticas de firma aplicadas. Así mismo, permite realizar una configuración personalizada del visualizador de firma (Widget) de los documentos PDF, distinta de la configuración general almacenada en el servidor.

###### 13.2.2. BeginSignatureProvider

Inicia un proceso de firma distribuida con document provider.

**SINTAXIS**

```csharp
public SignatureContext BeginSignatureProvider(
byte[] certificate,
string uri,
string providerParameter,
byte[] document,
RemoteProviderConfiguration remoteProviderConfiguration);
```

**PARAMETROS DE ENTRADA**

- certificate: Parte pública del certificado con el que se va a realizar la firma en cliente en formato array de bytes.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- document: Parámetro opcional con el array de bytes del documento a firmar.
- remoteProviderConfiguration: Parámetro opcional con la información para la conexión al proveedor de documentos remoto.

**RETORNO**

Devuelve un objeto de la clase SignatureContext con el identificador de la transacción de firma y un array de bytes con el contexto de firma distribuida para ser tratado en el cliente mediante la clase AsynStateManager.

**COMENTARIOS**

El array de bytes del documento a firmar es opcional. Si se pasa, este se utiliza junto con las configuraciones de firma retornadas por el document provider. En caso contrario, es el propio remote document provider el que deberá acceder al repositorio documental adecuado para retornar el array de bytes del documento.

###### 13.2.3. EndSignature

Completa un proceso de firma distribuida.

**SINTAXIS**

```csharp
public byte[] EndSignature(Guid instance,
byte[] asyncState)
```

**PARÁMETROS DE ENTRADA**

- instance: Identificador de la transacción de firma retornado por el método BeginSignature.
- asyncState: Array de bytes del estado de firma distribuida después de haber sido procesado por el componente AsyncStateManager.

**RETORNO**

Devuelve un array de bytes con el documento firmado según los parámetros de firma especificados en la llamada a la función o una excepción en caso de producirse algún tipo de error.

###### 13.2.4. EndSignatureProvider

Completa un proceso de firma distribuida con document provider.

**SINTAXIS**

```csharp
public byte[] EndSignatureProvider(Guid instance,
byte[] asyncState,
string uri,
string providerParameter,
bool returnSignedDocument,
RemoteProviderConfiguration remoteProviderConfiguration)
```

**PARÁMETROS DE ENTRADA**

- instance: Identificador de la transacción de firma retornado por los métodos BeginSignature o BeginSignatureProvider.
- asyncState: Array de bytes del estado de firma distribuida después de haber sido procesado por el componente AsyncStateManager.
- uri: Identificador URI del documento en el repositorio.
- providerParameter: Cadena de texto que permite el paso de información entre el cliente y el proveedor de documentos para personalizar su comportamiento.
- returnSignedDocument: Booleano que indica si el método debe retornar el documento firmado.
- remoteProviderConfiguration: Parámetro opcional con la información para la conexión al proveedor de documentos remoto.

**RETORNO**

Si el parámetro returnSignedDocument es true, devuelve un array de bytes con el documento firmado o un null en caso contrario.

**COMENTARIOS**

El método invocará siempre al remote document provider asociado para que realice el almacenado del documento resultante. Si además se requiere que el documento firmado llegue a la aplicación llamadora, se puede poner a true el parámetro returnSignedDocument.

###### 13.2.5. HeartBeat

Este método permite realizar una verificación del estado del servicio web.

**SINTAXIS**

```csharp
public void HeartBeat();
```

**COMENTARIOS**

Realiza las comprobaciones adecuadas para verificar si el servicio web está funcionando correctamente y retorna una excepción en caso contrario.

## 14. Bindings WCF de SealSign

En este apartado se procederá a explicar la configuración de los bindings WCF (Windows Communication Foundation) que es parte fundamental de la arquitectura Windows sobre la que está construida la plataforma SealSign y que son comunes a todos los módulos de dicha plataforma.

Para ver más información relativa a WCF visite la página `https://msdn.microsoft.com/es-es/library/ms731082(v=vs.90).aspx`.

#### 14.1. Tipos de Bindings WCF en SealSign

Los bindings WCF de los distintos módulos de SealSign pueden ser encontrados en los directorios de las aplicaciones Web de cada uno de los módulos, en un fichero llamado bindings.config.

###### 14.1.1. BasicHttpBinding (Soap 1.1)

- BasicHttpBinding_IServiceSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows y SSL.
- BasicHttpBinding_IServiceNOSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows sin SSL.
- BasicHttpBinding_IServiceSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica y SSL.
- BasicHttpBinding_IServiceNOSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica sin SSL.
- BasicHttpBinding_IServiceSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo).
- BasicHttpBinding_IServiceSSLSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo) y SSL.

###### 14.1.2. WSHttpBinding (Soap 1.2)

- WSHttpBinding_IServiceSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows y SSL.
- WSHttpBinding_IServiceNOSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows sin SSL.
- WSHttpBinding_IServiceSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica y SSL.
- WSHttpBinding_IServiceNOSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica sin SSL.
- WSHttpBinding_IServiceSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo).

###### 14.1.3. WebHttpBinding (JSON)

- WebHttpBinding_IServiceSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows y SSL.
- WebHttpBinding_IServiceNOSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows sin SSL.
- WebHttpBinding_IServiceSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica y SSL.
- WebHttpBinding_IServiceNOSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica sin SSL.
- WebHttpBinding_IServiceSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo).

#### 14.2. Configuración de los Bindings WCF en SealSign sin SSL

Para configurar WCF en cualquiera de los módulos de SealSign para que no usen SSL simplemente hay que realizar el siguiente cambio en el Web.config del módulo en cuestión:

```xml
...
<services configSource="servicesnossl.config"/>
<!--<services configSource="servicesssl.config"/>-->
...
```

#### 14.3. Configuración de los Bindings WCF en SealSign con SSL

Para configurar WCF en cualquiera de los módulos de SealSign para que usen SSL simplemente hay que realizar el siguiente cambio en el Web.config del módulo en cuestión:

```xml
...
<!--<services configSource="servicesnossl.config"/>-->
<services configSource="servicesssl.config"/>
...
```

Para más información de cómo configurar IIS/SSL véase `https://support.microsoft.com/en-us/kb/299875/es-es`.

#### 14.4. Invocación de los Servicios de SealSign y Bindings WCF

En este apartado se van a ver como invocar los servicios de SealSign y como especificar qué tipo de Binding WCF utilizar en las llamadas. Todo lo que se mostrará a continuación es independiente de la plataforma cliente (.NET, Android, IOS, etc.)

Se han visto en los apartados anteriores los distintos tipos de bindings WCF que soporta la plataforma SealSign y como configurar dichos Bindings con y sin SSL. SealSign utiliza bindings WCF basados en HTTP, por lo que los servicios están siempre referenciados mediante una URL de servicio.

Algunos ejemplos de URLs de servicio de SealSign son:

- `http://host/SealSignDSSService/SignatureService.svc`
- `http://host/SealSignBSSService/BiometricSignatureService.svc`

###### 14.4.1. Invocación de los servicios de SealSign con el Binding WCF por defecto

Para invocar a los servicios de SealSign con los Bindings WCF por defecto, no es necesario añadir nada a la URL de servicio, por tanto, un ejemplo de URL de invocación a un servicio de SealSign podría ser:

`http://host/SealSignDSSService/SignatureService.svc`

Para ver los bindings por defecto de los servicios véase el fichero servicesnossl.config (servicios sin SSL) o servicesssl.config (servicios con SSL).

###### 14.4.2. Invocación de los servicios de SealSign con un Binding WCF especifico

Para invocar a los servicios de SealSign con un Binding WCF especifico, es necesario añadir a la URL de servicio el Binding WCF con el que se desea acceder al servicio. A continuación, se muestra un ejemplo para cada uno de los Bindings WCF disponibles:

**BasicHttpBinding (Soap 1.1)**

- BasicHttpBinding_IServiceSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows y SSL. `https://host/SealSignDSSService/SignatureService.svc/BSSLI`
- BasicHttpBinding_IServiceNOSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows sin SSL. `http://host/SealSignDSSService/SignatureService.svc/BI`
- BasicHttpBinding_IServiceSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica y SSL. `https://host/SealSignDSSService/SignatureService.svc/BSSLB`
- BasicHttpBinding_IServiceNOSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica sin SSL. `http://host/SealSignDSSService/SignatureService.svc/BB`
- BasicHttpBinding_IServiceSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo). `http://host/SealSignDSSService/SignatureService.svc/B`
- BasicHttpBinding_IServiceSSLSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo) y SSL. `https://host/SealSignDSSService/SignatureService.svc/BSSL`

**WSHttpBinding (Soap 1.2)**

- WSHttpBinding_IServiceSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows y SSL. `https://host/SealSignDSSService/SignatureService.svc/WSSSLI`
- WSHttpBinding_IServiceNOSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows sin SSL. `http://host/SealSignDSSService/SignatureService.svc/WSI`
- WSHttpBinding_IServiceSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica y SSL. `https://host/SealSignDSSService/SignatureService.svc/WSSSLB`
- WSHttpBinding_IServiceNOSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica sin SSL. `http://host/SealSignDSSService/SignatureService.svc/WSB`
- WSHttpBinding_IServiceSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo). `https://host/SealSignDSSService/SignatureService.svc/WSSSL`

**WebHttpBinding (JSON)**

- WebHttpBinding_IServiceSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows y SSL. `https://host/SealSignDSSService/SignatureService.svc/JSSLI`
- WebHttpBinding_IServiceNOSSLIntegrated: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación integrada Windows sin SSL. `http://host/SealSignDSSService/SignatureService.svc/JI`
- WebHttpBinding_IServiceSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica y SSL. `https://host/SealSignDSSService/SignatureService.svc/JSSLB`
- WebHttpBinding_IServiceNOSSLBasic: Binding WCF cuya comunicación cliente servidor requiere seguridad mediante autenticación básica sin SSL. `http://host/SealSignDSSService/SignatureService.svc/JB`
- WebHttpBinding_IServiceSecNone: Binding WCF cuya comunicación cliente servidor no requiere ningún tipo de seguridad (anónimo). `https://host/SealSignDSSService/SignatureService.svc/JSSL`

###### 14.4.3. Invocación de los servicios de SealSign típica

A continuación, se muestran (dividido por las plataformas cliente más habituales) las invocaciones típicas a los servicios de SealSign.

**.NET**

En .NET, la forma de invocar típica a un servicio de SealSign es mediante BasicHttpBinding o WSHttpBinding y autenticación Windows integrada, por tanto, un ejemplo de URL para la invocación sería:

- `https://host/SealSignDSSService/SignatureService.svc/BSSLI` (BasicHttpBinding Con SSL)
- `http://host/SealSignDSSService/SignatureService.svc/BI` (BasicHttpBinding Sin SSL)
- `https://host/SealSignDSSService/SignatureService.svc/WSSSLI` (WSHttpBinding Con SSL)
- `http://host/SealSignDSSService/SignatureService.svc/WSI` (WSHttpBinding Sin SSL)

**Windows Phone 8.1 (XAML)**

En esta plataforma no está soportada la integración con servicios SOAP, para este entorno se recomienda invocar a los servicios de SealSign mediante WebHttpBinding y autenticación básica, por tanto, un ejemplo de URL para la invocación sería:

- `https://host/SealSignDSSService/SignatureService.svc/JSSLI` (WebHttpBinding Con SSL)
- `http://host/SealSignDSSService/SignatureService.svc/JI` (WebHttpBinding Sin SSL)

**IOS**

En IOS, la forma de invocar típica a un servicio de SealSign es mediante BasicHttpBinding y autenticación básica, por tanto, un ejemplo de URL para la invocación sería:

- `https://host/SealSignDSSService/SignatureServiceBasic.svc/BSSLB` (Con SSL)
- `http://host/SealSignDSSService/SignatureServiceBasic.svc/BB` (Sin SSL)

**Android**

En Android, la forma de invocar típica a un servicio de SealSign es mediante BasicHttpBinding y autenticación básica, por tanto, un ejemplo de URL para la invocación sería:

- `https://host/SealSignDSSService/SignatureServiceBasic.svc/BSSLB` (Con SSL)
- `http://host/SealSignDSSService/SignatureServiceBasic.svc/BB` (Sin SSL)

## 15. Errores

Durante el uso del producto se pueden llegar a lanzar distintas excepciones encapsuladas en la clase SealSignException, los códigos de error indican qué tipo de excepción se ha dado.

En este apartado se detallan los posibles códigos de error ordenados alfabéticamente:

| Código de error | Hexadecimal | Descripción del error |
|---|---|---|
| SEALSIGNDSS_ERROR_ARGUMENT | 0xC0000BC0L | Este código de error indica la carencia de un argumento o de un archivo no encontrado. |
| SEALSIGNDSS_ERROR_BIOMETRIC_FORMAT | 0xC0000BDFL | Este código de error indica que hay un problema con el formato de la firma biométrica. |
| SEALSIGNDSS_ERROR_CERTIFICATE | 0xC0000BBFL | Este código de error indica que hay un problema con el certificado o el formato de este. |
| SEALSIGNDSS_ERROR_CERTIFICATE_PROVIDER | 0xC0000BDDL | Este código de error indica la falta de referencia del certificado en el servidor de certificados. |
| SEALSIGNDSS_ERROR_CKC_PKCERTIFICATELISTEMPTY | 0x00000BDAL | Este código de error indica que la lista de claves privadas de Central Key Control está vacía. |
| SEALSIGNDSS_ERROR_CKC_PKNOTGRANTED | 0x00000BD9L | Este código de error indica que la máquina, el proceso o la URL no tienen permisos para el acceso a las claves privadas de Central Key Control o que la lista de certificados está vacía. |
| SEALSIGNDSS_ERROR_CONFIGURATION | 0xC0000BC1L | Este código de error indica que hay un problema con la configuración de la plataforma. Se recomienda revisar los ficheros de configuración de la plataforma. |
| SEALSIGNDSS_ERROR_CRYPTOGRAPHIC_CONFIGURATION | 0xC0000BCBL | Este código de error indica que hay un problema con la configuración criptográfica de la plataforma. Se recomienda revisar los ficheros configuración de la plataforma. |
| SEALSIGNDSS_ERROR_DB_ACCESS | 0xC0000BB9L | Este código de error se lanza cuando la plataforma no consigue acceder a la base de datos. En este caso se recomienda revisar la cadena de conexión y los permisos del usuario. |
| SEALSIGNDSS_ERROR_DECRYPTING_CREDENTIAL | 0x00000BDBL | Este código de error indica que las credenciales cifradas no pueden ser descifradas con el certificado actual. |
| SEALSIGNDSS_ERROR_DISTRIBUTED_SIGNATURE | 0xC0000BC9L | Este código de error indica que se ha producido un error durante la firma distribuida. |
| SEALSIGNDSS_ERROR_DOCUMENT_FORMAT | 0xC0000BC4L | Este código de error indica que hay un problema con el documento o con el formato de este. |
| SEALSIGNDSS_ERROR_LATCH_LOCKED | 0xC0000BE0 | Este código de error indica que el LATCH asociado se encuentra en estado bloqueado. |
| SEALSIGNDSS_ERROR_LICENSE | 0xC0000BC3L | Este código de error indica que ha habido un problema con la validación de la licencia. |
| SEALSIGNDSS_ERROR_LICENSE_NOT_INITIALIZED | 0xC0000BC6L | Este código de error indica que la inicialización de la licencia no se ha realizado correctamente. |
| SEALSIGNDSS_ERROR_PKCS11 | 0xC0000BBAL | Este código de error indica que ha habido un error con el certificado de clave público. |
| SEALSIGNDSS_ERROR_PKCS11_PASSWORD | 0xC0000BC7L | Este código de error indica que ha habido un error con la contraseña del certificado. |
| SEALSIGNDSS_ERROR_PKCS12 | 0xC0000BBDL | Este código de error indica que ha habido un error con el certificado de clave público. |
| SEALSIGNDSS_ERROR_PKCS12_PASSWORD | 0xC0000BBEL | Este código de error indica que ha habido un error con la contraseña del certificado. |
| SEALSIGNDSS_ERROR_REVOCATION_INFO | 0xC0000BCAL | Este código de error indica que se ha producido un error relacionado con la información de revocación. |
| SEALSIGNDSS_ERROR_SECURITY_DENIED | 0xC0000BCCL | Este código de error indica que se ha intentado acceder a un recurso protegido por un usuario que no tiene los permisos adecuados. |
| SEALSIGNDSS_ERROR_SIGNATURE_NOT_FOUND | 0xC0000BC2L | Este código de error indica que no se ha encontrado la firma. |
| SEALSIGNDSS_ERROR_TIMEOUT | 0xC0000BDEL | Este código de error indica que se ha agotado el tiempo de espera de la petición. |
| SEALSIGNDSS_ERROR_TIMESTAMP | 0xC0000BBBL | Este código de error indica un problema con el sello de tiempo. |
| SEALSIGNDSS_ERROR_TIMESTAMP_CERTIFICATE | 0xC0000BBCL | Este código de error indica un problema con el sello de tiempo del certificado. |
| SEALSIGNDSS_ERROR_TIMESTAMP_TRYING_BACKUP | 0xC0000BDCL | Este código de error indica un problema con el sello de tiempo al intentar realizar un respaldo de seguridad. |
| SEALSIGNDSS_ERROR_UNHANDLED | 0xC0000BB8L | Este código de error indica que es una excepción no manejada por la plataforma. |
| SEALSIGNDSS_ERROR_LATCH_LOCKED | 0xC0000BE0L | Este código de error indica que el uso del certificado está bloqueado mediante una instancia de Latch. |
| SEALSIGNDSS_ERROR_DEFAULT_DOCUMENT_PROVIDER | 0xC0000BC5L | Este código de error indica que se ha producido un error durante la invocación de un remote document provider. |
| SEALSIGNDSS_ERROR_CERTIFICATE_LOCKED | 0xC0000BF4L | Este código de error indica que el uso del certificado está bloqueado en el servidor de SealSign. |
| OTP_INCORRECT_CODE_ERROR | 0xC0000BF5L | Este código indica que el código introducido en la firma OTP es erróneo. |
| SEALSIGNDSS_ERROR_DEFAULT_OTP_PROVIDER | 0xC0000BF6L | Este código indica que hay un error en la configuración del Remote OTP Provider. |
| SEALSIGNDSS_ERROR_DEFAULT_SMS_PROVIDER | 0xC0000BF7L | Este código de error indica que hay un error en la configuración del Remote SMS Provider. |
| SEALSIGNDSS_ERROR_DEFAULT_DOCUMENT_PROVIDER | 0xC0000BF8L | Este código de error indica que hay un error en la configuración de Remote Document Provider. |
| OTP_EXPIRED_CODE_ERROR | 0xC0000BF9L | Este código de error indica que la duración del código OTP con el que se va a realizar una firma ha expirado. |
| OTP_VERIFICATION_ATTEMPT_EXCEEDED | 0xC0000BFAL | Este código de error indica que el número límite de intentos de validación de un código OTP ha sido alcanzado. |
