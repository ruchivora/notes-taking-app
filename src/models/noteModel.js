export function createNote({
  id = generateRandomId(),
  title = "",
  note = "",
  isPasswordProtected = false,
  password = "",
} = {}) {
  return {
    id,
    title,
    note,
    isPasswordProtected,
    password,
  };
}

function generateRandomId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};
