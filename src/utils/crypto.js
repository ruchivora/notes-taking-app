const iv = new Uint8Array(12);  
iv.set([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]); 


function hexStringToArrayBuffer(hexString) {
  const length = hexString.length / 2;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < length; i++) {
    view[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }

  return arrayBuffer;
}

function uint8ArrayToBase64(uint8Array) {
  let binary = '';
  const bytes = new Uint8Array(uint8Array);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);  // Convert to base64
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}


export async function encryptNoteContent(noteContent, hashedPassword) {
  // Step 1: Hash the password
  const passwordBuffer = hexStringToArrayBuffer(hashedPassword);

  // Step 2: Import the password hash to create an encryption key
  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );


  // Step 4: Encrypt the note content using the password key and fixed IV
  const encryptedContent = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(noteContent)  // Convert note content to bytes
  );

  // Step 5: Return the encrypted content (no need to store IV since it's fixed)
  return uint8ArrayToBase64(new Uint8Array(encryptedContent));
}


export async function decryptNoteContent(encryptedContent, hashedPassword) {
  // Step 1: Hash the password (same as during encryption)

  const passwordBuffer = hexStringToArrayBuffer(hashedPassword);
  // Step 2: Import the password hash to create a decryption key
  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const encryptedContentBuffer = base64ToArrayBuffer(encryptedContent);
  // Step 4: Decrypt the content using the same fixed IV
  const decryptedContent = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedContentBuffer
  );

  // Step 5: Return the decrypted content (converted back to a string)
  return new TextDecoder().decode(decryptedContent);
}
