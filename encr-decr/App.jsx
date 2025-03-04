import { useState } from "react";
import CryptoJS from "crypto-js";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

export default function EncryptorApp() {
  const [encryptText, setEncryptText] = useState("");
  const [encryptedResult, setEncryptedResult] = useState("");
  const [decryptText, setDecryptText] = useState("");
  const [decryptedResult, setDecryptedResult] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [encryptPublicKey, setEncryptPublicKey] = useState("");
  const [decryptPublicKey, setDecryptPublicKey] = useState("");
  const [encryptAlgorithm, setEncryptAlgorithm] = useState("AES");
  const [decryptAlgorithm, setDecryptAlgorithm] = useState("AES");

  const encryptData = () => {
    if (!encryptText || !encryptKey || !encryptPublicKey) {
      return alert("Please enter text, key, and public key");
    }
    let key = encryptKey + encryptPublicKey;
    let encrypted;
    if (encryptAlgorithm === "AES") {
      encrypted = CryptoJS.AES.encrypt(encryptText, key).toString();
    } else if (encryptAlgorithm === "3DES") {
      encrypted = CryptoJS.TripleDES.encrypt(encryptText, key).toString();
    }
    setEncryptedResult(encrypted);
  };

  const decryptData = () => {
    if (!decryptText || !decryptKey || !decryptPublicKey) {
      return alert("Please enter encrypted text, key, and public key");
    }
    let key = decryptKey + decryptPublicKey;
    let decrypted;
    if (decryptAlgorithm === "AES") {
      try {
        const bytes = CryptoJS.AES.decrypt(decryptText, key);
        decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error();
      } catch {
        decrypted = "Invalid Key, Public Key, or Encrypted Text";
      }
    } else if (decryptAlgorithm === "3DES") {
      try {
        const bytes = CryptoJS.TripleDES.decrypt(decryptText, key);
        decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error();
      } catch {
        decrypted = "Invalid Key, Public Key, or Encrypted Text";
      }
    }
    setDecryptedResult(decrypted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedResult);
    alert("Encrypted text copied to clipboard!");
  };

  const downloadEncryptedData = () => {
    if (!encryptedResult || !encryptKey || !encryptPublicKey) {
      alert("Please encrypt some text first before downloading.");
      return;
    }

    const fileContent = `⚠️ Keep this file safe! If you lose your keys, you cannot decrypt your message.\n\n` +
                        `🔐 Encrypted Text:\n${encryptedResult}\n\n` +
                        `🔑 Encryption Key:\n${encryptKey}\n\n` +
                        `🌍 Public Key:\n${encryptPublicKey}`;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "encrypted_data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Text Encryption & Decryption</h1>
      <p className="instructions">
        Enter your message and encryption details, then click Encrypt. Copy the encrypted text and share it safely. Use the correct keys to decrypt.
      </p>
      <div className="content">
        <div className="section encrypt-section">
          <h2>Encrypt</h2>
          <div className="form-group">
            <label>Encryption Algorithm</label>
            <select value={encryptAlgorithm} onChange={(e) => setEncryptAlgorithm(e.target.value)}>
              <option value="AES">AES</option>
              <option value="3DES">Triple DES</option>
            </select>
          </div>
          <input type="text" placeholder="Enter Encryption Key" value={encryptKey} onChange={(e) => setEncryptKey(e.target.value)} />
          <input type="text" placeholder="Enter Public Key" value={encryptPublicKey} onChange={(e) => setEncryptPublicKey(e.target.value)} />
          <textarea placeholder="Enter text to encrypt" value={encryptText} onChange={(e) => setEncryptText(e.target.value)} />
          <button onClick={encryptData}>Encrypt Text</button>
          <textarea placeholder="Encrypted result" value={encryptedResult} readOnly />

          <div className="button-group">
            <button className="copy-button" onClick={copyToClipboard}>Copy Encrypted Text</button>
            <button className="download-button" onClick={downloadEncryptedData}>Download Encrypted Data</button>
          </div>

          {encryptedResult && (
            <div className="qr-section">
              <p>Scan QR Code to get Encrypted Text:</p>
              <QRCodeCanvas value={encryptedResult} size={150} />
            </div>
          )}
        </div>

        <div className="section decrypt-section">
          <h2>Decrypt</h2>
          <div className="form-group">
            <label>Decryption Algorithm</label>
            <select value={decryptAlgorithm} onChange={(e) => setDecryptAlgorithm(e.target.value)}>
              <option value="AES">AES</option>
              <option value="3DES">Triple DES</option>
            </select>
          </div>
          <input type="text" placeholder="Enter Decryption Key" value={decryptKey} onChange={(e) => setDecryptKey(e.target.value)} />
          <input type="text" placeholder="Enter Public Key" value={decryptPublicKey} onChange={(e) => setDecryptPublicKey(e.target.value)} />
          <textarea placeholder="Enter encrypted text" value={decryptText} onChange={(e) => setDecryptText(e.target.value)} />
          <button onClick={decryptData}>Decrypt Text</button>
          <textarea placeholder="Decrypted result" value={decryptedResult} readOnly />
        </div>
      </div>
    </div>
  );
}
