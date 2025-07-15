# **Central Key Control**

# 1. Introducción

SealSign CKC (Central Key Control) es un producto software desarrollado íntegramente por Factum Identity
dirigido al control del uso de los certificados digitales de manera centralizada en una organización.
CKC se basa en la gestión de los distintos almacenes de certificados soportados por la plataforma de firma electrónica SealSign Digital Signature Services.

Una de las problemáticas en los procesos de firma electrónica es la gestión de los certificados y claves usados para la firma de documentos. Para resolver esto, SealSign DSS proporciona un almacén de certificados y claves asociados a unas reglas de uso dentro de su base de datos de configuración. Además, tanto en los procesos de firma en servidor como en los procesos de firma distribuida en cliente, SealSign DSS es capaz de usar certificados guardados en almacenes externos, tanto en los almacenes de certificados de Windows como en almacenes accesibles a través de módulos PKCS#11.

Central Key Control permite el uso de los certificados almacenados en el servidor de SealSign DSS desde los puestos cliente de manera absolutamente transparente al usuario, mediante un motor basado en reglas de uso con posibilidad de filtrado, como si estos certificados estuvieran almacenados localmente en cada equipo. 

Por último, Central Key Control permite configurar tanto una lista de procesos, equipos cliente, usuarios autorizados como una lista de URLs en las que se permitirá el uso de las claves privadas asociadas a los certificados de la plataforma.

# 2. Inventario de certificados local

Central Key Control permite reportar al servidor de SealSign información sobre los certificados instalados en el almacén de usuario local (es decir, certificados no centralizados). Para habilitar esta funcionalidad, sigue estos pasos:

## Activar la Política en Central Key Control

Para habilitar el inventario local de certificados, activa la siguiente política:

    Plantilla: KeyControl.adm
    Configuración: Configure Central Key Control Parameters
    Clave de Registro: HKCU\Software\Policies\SmartAccess\KeyControl
    Nombre de la Propiedad: EnableCertificateInventory
    Tipo de Propiedad: REG_DWORD
    Valor por Defecto: 0 (deberás cambiarlo a 1 para activarlo)

## Configurar el Servidor SealSign

Una vez activada la política en Central Key Control, es necesario habilitar esta funcionalidad también en el servidor de SealSign. Para ello, configura la tabla de base de datos `KeyControlConfiguration` y establece el valor de `AuditCertificates` a `1`.

## Visualizar los Certificados Inventariados

Después de completar la configuración, los certificados instalados únicamente de forma local se inventariarán en la siguiente tabla de base de datos: `KeyControlServerCertificatesInventory`.

## Consideraciones Adicionales

La configuración de los parámetros generales puede establecerse tanto a nivel de máquina como de usuario. Si ambas configuraciones están presentes, los parámetros definidos a nivel de máquina tendrán prioridad.

# 3. Resolución de Problemas

- Para el correcto funcionamiento se debe revisar que en la sección de Startup Apps de Windows aparecen como habilitadas `KeyControlSrv` y `KeyControlReg`, esta configuración se puede revisar desde el Administrador de Tareas. Si con el usuario actual de windows no aparece disponible la opción de habilitar, es necesario hacerlo con un usuario administrador local de la máquina.