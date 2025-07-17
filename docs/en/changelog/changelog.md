# **Changelog**


# SealSign Engine

### 4.10.4
#### Bugs

- Fixed issue with properties that do not exist within the subject of a certificate when DNI obfuscation is enabled in the widget.

---

### 4.10.3
#### Features

- Improved the Active Directory user search algorithm in the SealSign administration panel to filter users by company if they have one assigned.
- Added functionality to obfuscate the DNI, NIE, and NIF information displayed in the certificate signature widget.

#### Bugs

- Fixed issue when deleting certificates from the user panel (power user).

---

### 4.10.2
#### Features

- Improved remote document provider traces in BSS and DSS so that when an error occurs, the message body content is displayed.

#### Bugs

- Fixed responsive issue on some pages.
- Corrected error in the Active Directory user search dropdowns, which displayed user names with the '%' character.

---

### 4.10.1
#### Bugs

- Fixed responsive issue in the use case rules modals.
- Fixed issue when deleting users from the use case rules.
- Fixed issue with refreshing the use case rule creation time.
- Fixed issue with the notification service that prevented it from starting.
- Fixed issue that prevented viewing the details of a certificate.
- Added error message to the event viewer when importing a certificate that already exists in the database.
- Fixed "Thread Abort" issue that occurred when uploading a certificate.
- Fixed error that occurred when executing license monitoring commands.

---

### 4.10.0
#### Greater visibility and control of certificates

- Detailed audit: Easily and quickly view the usage history of each certificate directly from the Server Certificates list.
- Advanced filtering: Filter audit logs by specific certificate for more precise analysis.
- Clear identification: Used certificates are clearly indicated in the audit logs, with a direct link to the certificate in question.
- Detailed information: The Server Certificates list displays additional information such as the descriptive name, owner's email address, and visually highlights expired certificates.
- Flexible search: Filter certificates by descriptive name and/or email address to quickly locate them.

#### Simplified management of use case rules

- Redesigned interface: The Use Case Rules section features a more intuitive and easy-to-use design.
- Powerful search: Quickly locate use case rules thanks to the advanced search engine, which considers multiple criteria such as user names, machines, URLs, processes, and certificates.
- Intuitive navigation: Easily access the use case rules associated with a specific certificate from the certificate list.
- Flexible export: Generate reports in .csv format for detailed analysis of use case rules.

#### Notifications and automation

- Custom reports: Configure the automatic sending of reports by email on certificate usage and the number of signatures per user, selecting the frequency that best suits your needs (daily, weekly, or monthly).
- Expiration notifications: The expired certificate notification service now includes additional information such as the descriptive name and owner's email address, as well as the computer from which the alert is sent.
- Simplified configuration: It is now possible to configure the SMTP service without having to enter the email address and password of the account.

#### Other improvements

- Integrated calendar: Use the calendar to easily select date ranges in the filters.
- Audit log: An audit log has been added to track changes in SMTP configuration.

---

### 4.9.4
#### Bugs

- Fixed error that occurred when executing license monitoring commands.

---


# Clickonce

### 4.10.5
#### Features

- Added functionality to automatically delete logs older than 14 days.
- Added functionality to allow a new signing process to start while the certificate signing window is still waiting for the user to close it.

#### Bugs

- Corrected the path for the startup file, which is used when the "automatic start with Windows" checkbox is selected.
- Fixed an issue with paths handled by the Run-JavaProxyBss.bat file.
- Corrected a problem with the automatic update of Java libraries and the launch .bat file.

---

### 4.10.4
#### Features

- Cancel the current signing process from SignalR.

#### Bugs

- Fixed issue with the positioning of the signature buttons on Wacom STU-500 tablet models.
- Corrected issue where the OperationComplete response was not received when pressing the X button on the Wacom STU-540 signature window.

---

### 4.10
#### Features

- Added function to launch external applications using Windows commands through ClickOnce.

---

### 4.9.0
#### Bugs

- Fixed unexpected application closure.
- Fixed issue when closing external signature modals.
- Fixed performance issue.

---

### 4.8.1
#### Bugs:

- The error is not displayed when the signature time exceeds the limit between attempt generation and signing on the tablet.
- The error is not displayed if the request has already been signed.
- If the session expires after login (401), it does not redirect to the configured page.
- Modify the texts on the signature button screen:  In the body of the page, replace "ClickOnce" with "SealSign Signature Client".  On the button, change the texts to "Download Signature Client".
- Ensure the buttons are displayed on the ePad model.

---

### 4.8.0
#### Features:

- Added external signature functionality from SaaS.

---

### 4.7.0
#### Features:

- Added buttons to the window displayed on the biometric signature PC with STU tablet models.

---

### 4.6.5
#### Features:

- Added new functionality to verify if a certificate is valid for signing.

#### Bugs:

- Increased the disconnection timeout so that the SignalR connection does not close unexpectedly.