# SealSignWatcher
## 1. Introduction

**SealSignWatcher** is a batch signing solution associated with the SealSign platform. SealSignWatcher mainly consists of two fundamental parts: an agent and a configuration administration tool.

The agent is responsible for monitoring the selected folders, which triggers the batch signing process. On the other hand, the administration tool is used to manage the various application configurations, such as the SealSign connection parameters, the folders to be monitored, and the signing profiles associated with each folder.

Summary of SealSignWatcher components:

• The Agent:
1. SealSignWatcherAgent.
2. SealSignWatcherService.

• Configuration Tool:
1. SealSignWatcher.


## 2. Installation Requirements

The following elements are required for the installation:

- Windows XP SP3 Operating System or higher.
- Compatibility with virtualized environments (VMWare, VirtualBox, HyperV).
- .NET Framework 4.0 Client Profile.
- At least 1GB of free disk space.

## 3. Installation

To perform the installation, the user account running the installer must have administrative privileges. The installation does not require a system restart to complete.
The installation is carried out by running the file:
**SealSignWatcherSetup.msi**

To verify or check if the software is installed on the computer, open the *Control Panel* and go to the *Programs and Features* section. The system will build the list of installed software. One of the items in the list should refer to **SealSignWatcher**, as can be seen in the following image.

![sealsign](./images/uninstall.png)

<center><i>*Image 01: SealSignWatcher*</i></center>
</br>

Uninstallation is done from the *Programs and Features* option in the *Control Panel*, just like any other Microsoft Windows program. In the list displayed, look for the **SealSignWatcher** entry and uninstall it.
Please note that only a user with administrative permissions can uninstall the application.