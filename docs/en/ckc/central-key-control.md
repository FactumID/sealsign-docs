# **Central Key Control**

# 1. Introduction

SealSign CKC (Central Key Control) is a software product developed entirely by Factum Identity, aimed at controlling the use of digital certificates in a centralized manner within an organization. CKC is based on the management of various certificate stores supported by the SealSign Digital Signature Services electronic signature platform.

One of the challenges in electronic signature processes is the management of certificates and keys used for signing documents. To address this, SealSign DSS provides a certificate and key store associated with usage rules within its configuration database. Additionally, in both server-side and distributed client-side signing processes, SealSign DSS can use certificates stored in external stores, including Windows certificate stores and those accessible via PKCS#11 modules.

Central Key Control allows the use of certificates stored on the SealSign DSS server from client workstations in a way that is completely transparent to the user. It achieves this through a rule-based engine with filtering capabilities, making it seem as if these certificates were stored locally on each device.

Finally, Central Key Control allows configuring a list of processes, client machines, authorized users, and a list of URLs where the private keys associated with the platform's certificates will be permitted for use.

# 2. Local Certificate Inventory

Central Key Control allows SealSign to report information about certificates installed in the local user store (i.e., non-centralized certificates). To enable this functionality, follow these steps:

## Activate the Policy in Central Key Control

To enable local certificate inventory, activate the following policy:

    Template: KeyControl.adm
    Setting: Configure Central Key Control Parameters
    Registry Key: HKCU\Software\Policies\SmartAccess\KeyControl
    Property Name: EnableCertificateInventory
    Property Type: REG_DWORD
    Default Value: 0 (you must change it to 1 to activate it)

## Configure the SealSign Server

Once the policy is activated in Central Key Control, it's necessary to enable this functionality on the SealSign server as well. To do this, configure the `KeyControlConfiguration` database table and set the `AuditCertificates` value to `1`.

## View Inventoried Certificates

After completing the configuration, certificates installed only locally will be inventoried in the following database table: `KeyControlServerCertificatesInventory`.

## Additional Considetations

General parameters can be configured at both the machine and user levels. If both configurations are present, machine-level parameters will take precedence.

# 3. Troubleshooting

- For correct operation, check that `KeyControlSrv` and `KeyControlReg` are enabled in the Windows Startup Apps section, this configuration can be checked from the Task Manager. If with the current windows user the option to enable is not available, it is necessary to do it with a local administrator user of the machine.