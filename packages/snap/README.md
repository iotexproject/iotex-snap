# iotex-snap

## Table of Contents

- [IoTeX Snap](#iotex-snap)
  - [IoTeX MetaMask Snap – Knowledge Base](#iotex-metamask-snap--knowledge-base)
    - [Introduction to the IoTeX Snap](#introduction-to-the-iotex-snap)
    - [Installation Guide](#installation-guide)
      - [How to Install the IoTeX Snap in MetaMask](#how-to-install-the-iotex-snap-in-metamask)
    - [Detailed Feature Explanations](#detailed-feature-explanations)
      - [Sending Tokens Using `io` Addresses or INS Domains](#sending-tokens-using-io-addresses-or-ins-domains)
      - [Converting Addresses Between `io` and `0x` Formats](#converting-addresses-between-io-and-0x-formats)
      - [Showing Connected Addresses](#showing-connected-addresses)
      - [Accessing DePIN Project Information](#accessing-depin-project-information)
    - [Important Note: MetaMask Flask Requirement](#important-note-metamask-flask-requirement)
    - [Troubleshooting](#troubleshooting)
      - [Issue: INS Domain Not Resolving](#issue-ins-domain-not-resolving)
      - [Issue: DePIN Project Information Not Loading](#issue-depin-project-information-not-loading)
      - [Issue: Address Conversion Fails](#issue-address-conversion-fails)
    - [Contact & Support](#contact--support)
  - [IoTeX MetaMask Snap – FAQ](#iotex-metamask-snap--faq)
    - [1. What is the IoTeX Snap, and what does it do?](#1-what-is-the-iotex-snap-and-what-does-it-do)
    - [2. Can the Snap automatically convert addresses when sending tokens?](#2-can-the-snap-automatically-convert-addresses-when-sending-tokens)
    - [3. How does sending tokens to an INS domain work?](#3-how-does-sending-tokens-to-an-ins-domain-work)
    - [4. What types of tokens can I send using the IoTeX Snap?](#4-what-types-of-tokens-can-i-send-using-the-iotex-snap)
    - [5. How do I access DePIN project information using the Snap?](#5-how-do-i-access-depin-project-information-using-the-snap)
    - [6. Are there plans to expand DePIN project interaction in the future?](#6-are-there-plans-to-expand-depin-project-interaction-in-the-future)
    - [7. What permissions does the IoTeX Snap request?](#7-what-permissions-does-the-iotex-snap-request)
    - [8. Will the Snap access my private keys or perform actions without my permission?](#8-will-the-snap-access-my-private-keys-or-perform-actions-without-my-permission)
    - [9. How do I get started with the IoTeX Snap?](#9-how-do-i-get-started-with-the-iotex-snap)
    - [10. Can I refresh DePIN project data?](#10-can-i-refresh-depin-project-data)

## IoTeX MetaMask Snap – Knowledge Base

---

### Introduction to the IoTeX Snap

The IoTeX Snap integrates seamlessly into MetaMask, allowing users to send tokens to both `io` addresses and INS domains, convert addresses between `io` and `0x` formats, and fetch detailed DePIN project information. It’s designed to make interacting with the IoTeX blockchain smoother and more efficient, all from within MetaMask.

---

### Installation Guide

#### How to Install the IoTeX Snap in MetaMask

1. **Install MetaMask**  
   Ensure you have the MetaMask browser extension installed and set up. You can download it from the official [MetaMask website](https://metamask.io/).

2. **Install MetaMask Flask (Experimental)**  
   To fully experience the features of the IoTeX Snap, you will need to install **MetaMask Flask**, which is a developer-focused version of MetaMask. You can download Flask from the [MetaMask Flask page](https://docs.metamask.io/snaps/get-started/install-flask/). This version allows for experimental features, including Custom name resolution.

3. **Locate the IoTeX Snap**  
   The IoTeX Snap will be available in the MetaMask Snap list or directly from supported websites.

4. **Install via Connect Snap Button**  
   You can also install the IoTeX Snap via the "Connect Snap" button on supported websites such as the [IoPay Wallet](https://wallet.iotex.io/). Simply click the Connect button, follow the instructions, and grant the necessary permissions.

5. **Grant Permissions**  
   During installation, MetaMask Flask will ask for specific permissions. Approve these to allow the Snap to function properly.

6. **Start Using the Snap**  
   Once installed, the IoTeX Snap will be available directly in your MetaMask (MetaMask Flask) interface, ready for use, just go to the **Menu** -> **Snaps** -> **IoTeX**.

---

### Detailed Feature Explanations

#### Sending Tokens Using `io` Addresses or INS Domains

- When sending tokens, you can input either an `io` address or an INS domain.
- For `io` addresses, the Snap will automatically convert them to `0x` format during the transaction.
- INS domains will be resolved directly, allowing you to send tokens without needing to know the actual address behind the domain.

<p align="center">
  <img width="411" alt="Screenshot 2024-09-05 at 12 56 25 AM" src="https://github.com/user-attachments/assets/0e2438aa-79ae-40ab-b59e-02f30142c0f0">
  <img width="411" alt="Screenshot 2024-09-05 at 12 56 41 AM" src="https://github.com/user-attachments/assets/e525f43f-1415-4bb1-b9fc-a7df52f3c75d">
</p>

#### Converting Addresses Between `io` and `0x` Formats

- The Snap provides a feature for converting addresses back and forth between the `io` format and the `0x` format.
- To convert an address:
  - Navigate to the address conversion section.
  - Input the address you want to convert.
  - The Snap will display the converted address, allowing you to copy it for future transactions.

<img width="934" alt="Screenshot 2024-09-05 at 12 59 03 AM" src="https://github.com/user-attachments/assets/82cb75e9-a4dd-4396-8a7a-87503b450a4c">

#### Showing Connected Addresses

1. **Choose Addresses to Connect**:  
   After clicking "Show Connected Addresses," a pop-up window will appear asking you to choose the addresses you want to connect. Select the addresses and click **Connect** in the pop-up window.

2. **Return to MetaMask**:  
   Once you’ve clicked **Connect**, you will be redirected back to the MetaMask main page.

3. **Access the Connected Addresses**:  
   After returning to MetaMask, go to the **Menu** -> **Snaps** -> **IoTeX** again.

4. **Show Connected Addresses Again**:  
   Once you’re back in the IoTeX Snap, click **Show Connected Addresses** again. This time, the list of your connected addresses will be displayed in both `0x` and `io` formats.

**Note**: The connection of addresses will only happen the first time you click on the button. On subsequent clicks, the Snap will simply show you the list of connected addresses without asking for any further connections.

<img width="934" alt="Screenshot 2024-09-05 at 12 58 09 AM" src="https://github.com/user-attachments/assets/adc73cd1-0ddf-4634-a2ec-f6b35fbd89a0">

#### Accessing DePIN Project Information

- The IoTeX Snap allows you to view detailed information about DePIN projects right inside MetaMask Flask.
- To view project info:
  - Click on the "Show DePIN Scan Projects" button.
  - After a few seconds of loading the data, a dropdown with projects will appear.
  - The Snap will fetch data from DePINScan, showing information such as:
    - Project description
    - Token information
    - Total devices
    - Days to break even
    - Market cap
    - Token price
    - Average device cost
    - Estimated daily earnings
  - You will also get a link to the project’s full page on DePINScan for more details.

<img width="960" alt="IoTeX_2024-09-04_2" src="https://github.com/user-attachments/assets/e893fbf4-9d3b-4a1e-af70-b7fbaff13e64">

---

### Important Note: MetaMask Flask Requirement

Most of the IoTeX Snap's features are currently only supported in the experimental **MetaMask Flask** extension, not the regular MetaMask version. To use the full functionality of the IoTeX Snap, you'll need to install [MetaMask Flask](https://docs.metamask.io/snaps/get-started/install-flask/).

---

### Troubleshooting

#### Issue: INS Domain Not Resolving

- **Solution**: Ensure you are on the IoTeX mainnet. INS domain resolution currently only works on the mainnet, not testnet or other networks.

#### Issue: DePIN Project Information Not Loading

- **Solution**: Make sure your internet connection is stable and that you’ve granted the necessary permissions for the Snap to access the network and DePINScan API. If the issue persists, try refreshing the cached data by resetting the Snap’s state.

#### Issue: Address Conversion Fails

- **Solution**: Double-check that the address you’re inputting is a valid `io` or `0x` address. Invalid addresses will result in an error. If the problem persists, try restarting MetaMask Flask and checking if the Snap has the necessary permissions enabled.

---

### Contact & Support

If you encounter any issues or have further questions, you can reach out to our support team through the following channels:

- **Discord**: [IoTeX Discord](https://discord.com/invite/q5eYde2CU7)
- **Email**: <developers@iotex.io>

## IoTeX MetaMask Snap – FAQ

---

### 1. What is the IoTeX Snap, and what does it do?

The IoTeX Snap allows users to send tokens to both `io` addresses and INS domains, convert addresses between `io` and `0x` formats, and fetch information about DePIN projects—all directly within MetaMask.

---

### 2. Can the Snap automatically convert addresses when sending tokens?

Yes, the Snap will automatically convert an `io` address to a `0x` format during a transaction. This makes it seamless to send tokens without needing to manually convert the address beforehand.

---

### 3. How does sending tokens to an INS domain work?

You can enter an INS domain instead of an `io` address when sending tokens. The Snap will resolve the domain and handle the transaction. **Note:** INS domain resolution only works on the IoTeX mainnet.

---

### 4. What types of tokens can I send using the IoTeX Snap?

You can send any tokens that are on the IoTeX blockchain, including both native tokens like IOTX and any other IoTeX-based assets such as XRC20 tokens. As long as the token exists on the IoTeX network, the Snap will support it for transactions.

---

### 5. How do I access DePIN project information using the Snap?

You can list and view DePIN projects directly in MetaMask. The Snap fetches detailed project information from DePINScan, including the project description, token, total devices, days to break even, market cap, token price, average device cost, and estimated daily earnings. You'll also get a link to the full project page on DePINScan. However, this feature is currently informational only, with no direct interaction supported yet.

---

### 6. Are there plans to expand DePIN project interaction in the future?

Yes, future plans may include the ability to interact with DePIN projects directly through the Snap, such as adding DePIN tokens for easier swaps. For now, the feature remains informational.

---

### 7. What permissions does the IoTeX Snap request?

The IoTeX Snap requires the following permissions to function properly:

- **Allow websites to communicate directly with IoTeX:** This is necessary to connect to the IoTeX network, perform address conversions, send tokens, and fetch project information.
- **Access the Internet:** Needed to fetch information about INS domains and DePIN projects from external APIs like DePINScan.
- **Display dialog windows in MetaMask:** Used to show you converted addresses, which you can copy and convert back and forth between `io` and `0x` formats.
- **Display a custom screen:** This permission enables the Snap to present a home page with links to IoTeX-related projects and action buttons for listing DePIN projects or converting addresses.
- **Store and manage data on your device:** This is for caching DePIN project data, so you don’t need to fetch it each time you open the Snap.
- **Provide domain and address lookups:** Required for resolving INS domains and converting `io` addresses to `0x` format.

---

### 8. Will the Snap access my private keys or perform actions without my permission?

No, the Snap won’t access your private keys or take any actions without your explicit approval. You will have control over every action the Snap performs.

---

### 9. How do I get started with the IoTeX Snap?

You can install the IoTeX Snap through MetaMask’s Snap list, or use the **Connect Snap** button on supported websites like IoPay Wallet. From there, you can grant permissions and start using the Snap.

---

### 10. Can I refresh DePIN project data?

Yes, you can refresh the cached DePIN project data by removing the current Snap state and fetching the latest information again. "Clear DePIN Scan data" button is accessible in the snap menu.
