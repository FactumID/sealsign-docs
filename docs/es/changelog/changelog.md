# **Changelog**


# SealSign Engine

### 4.10.4
#### Bugs

- Se arregla problema con propiedades que no existen dentro del subject de un certificado cuando se activa la ofuscación del DNI en el widget .

---

### 4.10.3
#### Funcionalidades
- Se Mejora el algoritmo de búsqueda de usuarios del active directoy en el panel de administración de SealSign para que filtre los usuarios por empresa en caso de la tengan asignada.
- Se añade funcionalidad para ofuscar la información del DNI, NIE y NIF que aparece en el widget de la firma con certificado.

#### Bugs
- Se arregla problema al eliminar certificados desde el panel de usuarios (power user).

---

### 4.10.2
#### Funcionalidades
- Se mejoran las trazas del remote document provider en el BSS y DSS para que cuando se produzca un error muestre el contenido del body del mensaje.

#### Bugs
- Se arregla problema en el resposive de algunas páginas.
- Se corrige error en los desplegables de busqueda de usuarios en el active directory, que mostraba los nombres de usuarios con el carácter %

---

### 4.10.1
#### Bugs

- Se arregla problema en el responsive de los modales de las reglas de uso 
- Se arregla problema al eliminar usuarios de las reglas de uso 
- Se arregla problema de refrescamiento de la hora de creación de la regla de uso
- Se arregla problema en el servicio de notificaciones que no permitía que arrancara
- Se arregla problema que no permitía ver el detalle de un certificado 
- Se añade mensaje de error al visor de eventos al importar un certificado que ya existe en la DB
- Se arregla problema "Thread Abort" que se presentaba al subir un certificado
- Se arregla error que se producía al ejecutar los comandos de monitorización de licencias

---

### 4.10.0
#### Mayor visibilidad y control de los certificados

- Auditoría detallada: Consulta de forma sencilla y rápida el historial de uso de cada certificado directamente desde el listado de Certificados de Servidor.
- Filtro avanzado: Filtra los registros de auditoría por certificado específico para un análisis más preciso.
- Identificación clara: Los certificados utilizados se indican claramente en los registros de auditoría, con un enlace directo al certificado en cuestión.
- Información detallada: En el listado de Certificados de Servidor se muestra información adicional como el nombre descriptivo, el correo electrónico del propietario y se resaltan visualmente los certificados expirados.
- Búsqueda flexible: Filtra los certificados por nombre descriptivo y/o correo electrónico para localizarlos rápidamente.

#### Gestión simplificada de reglas de uso

- Interfaz renovada: La sección de Reglas de Uso presenta un diseño más intuitivo y fácil de usar.
- Búsqueda potente: Localiza rápidamente las reglas de uso gracias al buscador avanzado, que considera múltiples criterios como nombres de usuarios, máquinas, URLs, procesos y certificados.
- Navegación intuitiva: Accede fácilmente a las reglas de uso asociadas a un certificado específico desde el listado de certificados.
- Exportación flexible: Genera informes en formato .csv para un análisis detallado de las reglas de uso.

#### Notificaciones y automatización

- Informes personalizados: Configura el envío automático de informes por correo electrónico sobre el uso de certificados y el número de firmas por usuario, seleccionando la frecuencia que más te convenga (diaria, semanal o mensual).
- Notificaciones de expiración: El servicio de notificación de certificados expirados incluye ahora información adicional como el nombre descriptivo y el correo electrónico del propietario, así como el equipo desde el que se envía la alerta.
- Configuración simplificada: Ahora es posible configurar el servicio SMTP sin necesidad de introducir el correo electrónico y la contraseña de la cuenta.

#### Otras mejoras

- Calendario integrado: Utiliza el calendario para seleccionar fácilmente los rangos de fechas en los filtros.
- Registro de auditoría: Se ha añadido un registro de auditoría para rastrear los cambios en la configuración SMTP.

---

### 4.9.4
#### Bugs

- Se arregla error que se producía al ejecutar los comandos de monitorización de licencias

---


# Clickonce

### 4.10.5
#### Funcionalidades

    - Se añade funcionalidad que permite organizar eliminar automáticamente los logs que tenga mas de 14 días de antigüedad.
    - Se añade funcionalidad para permitir iniciar una nueva firma mientras la ventana de firma con certificado aún está esperando a que el usuario la cierre.

#### Bugs

    - Se corrige ruta del fichero de arranque, que se usa al marcar el check de inicio automático al arrancar Windows.
    - Se arregla problema con las rutas manejadas por el fichero Run-JavaProxyBss.bat
    - Se corrige problema en la actualización automática de las librerías de java y el .bat de lanzamiento.

### 4.10.4
#### Funcionalidades

- Cancelar el proceso de firma actual desde SignalR.

#### Bugs

- Se arregla problema con el posicionamiento de los botones de firma en modelos de tabletas Wacom STU-500.
- Se corrige problema, no llegaba la respuesta al OperationComplete al presionar el botón X de la ventana de firma de las Wacom STU-540.

---

### 4.10
#### Funcionalidades 

- Se añade función para lanzar aplicaciones externas mediante comandos de Windows a través de Clickonce.

---

### 4.9.0
#### Bugs

- Se arregla cierre inesperado en el aplicativo.
- Se arregla problema al cerrar los modales de la firma externa.
- Se arregla problema de rendimiento.

---

### 4.8.1
#### Bugs:
- El error no se muestra cuando el tiempo de firma excede el límite entre la generación del intento y la firma en la tableta.
- El error no se muestra si la solicitud ya ha sido firmada.
- Si la sesión expira tras el inicio de sesión (401), no redirecciona a la página configurada.
- Modificar los textos en la pantalla del botón de firma:
 En el cuerpo de la página, reemplazar "ClickOnce" por “Cliente de firma SealSign”.
 En el botón, cambiar los textos a “Descargar cliente de firma”.
- Asegurar la visualización de los botones en el modelo ePad.

---

### 4.8.0
#### Funcionalidades:
- Se añade la funcionalidad de firma externa desde SaaS.

---

### 4.7.0
#### Funcionalidades:
- Se agregan botones a la ventana que se muestra en el PC de firma biométrica con modelos de tabletas STU.

---

### 4.6.5
#### Funcionalidades:
- Se agregan nueva funcionalidad para verificar si un certificado es valido para firmar.

#### Bugs:
- Se aumenta el timeout de desconexión para que la conexión de SignalR no se cierre inesperadamente.


