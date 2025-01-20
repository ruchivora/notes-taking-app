export async function hashPassword(password, salt = 5) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt); // Combine password with a fixed salt
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(storedPassword, password) {
  const hashedPassword = await hashPassword(password);

  return (hashedPassword === storedPassword);
}

