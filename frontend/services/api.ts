const BASE_URL = "http://localhost:4000/api";

export async function loginUser(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login failed");
  const json = await res.json();
  return json.token as string;
}

export async function uploadMemory(userId: number, content: string) {
  const res = await fetch(`${BASE_URL}/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, content })
  });
  if (!res.ok) throw new Error("Upload failed");
  return await res.json();
}

export async function downloadMemories(userId: number) {
  const res = await fetch(`${BASE_URL}/memories?userId=${userId}`);
  if (!res.ok) throw new Error("Download failed");
  return await res.json();
}

export async function getOracleInsights(prompt: string) {
  const res = await fetch(`${BASE_URL}/oracle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error("Oracle request failed");
  const json = await res.json();
  return json.answer as string;
}

export async function uploadFile(base64: string, key: string) {
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileBase64: base64, key })
  });
  if (!res.ok) throw new Error("File upload failed");
  return await res.json();
}

export async function downloadFile(key: string) {
  const res = await fetch(`${BASE_URL}/download/${key}`);
  if (!res.ok) throw new Error("File download failed");
  return await res.blob();
}

export async function getOracleInsights(prompt: string) {
  const res = await fetch(`http://localhost:4000/api/oracle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Oracle request failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  return json.answer as string;
}
