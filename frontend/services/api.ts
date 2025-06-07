const BASE_URL = "http://localhost:4000/api";

export async function loginUser(
  username: string,
  password: string
): Promise<string> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login failed");
  const json = await res.json();
  return json.token as string;
}

export async function uploadMemory(
  userId: number,
  content: string
): Promise<{ id: number; createdAt: string }> {
  const res = await fetch(`${BASE_URL}/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, content })
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function downloadMemories(
  userId: number
): Promise<Array<{ id: number; userId: number; content: string; createdAt: string }>> {
  const res = await fetch(`${BASE_URL}/memories?userId=${userId}`);
  if (!res.ok) throw new Error("Download failed");
  return res.json();
}

export async function getOracleInsights(prompt: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/oracle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error("Oracle request failed");
  const json = await res.json();
  return json.answer as string;
}

export async function uploadFile(
  base64: string,
  key: string
): Promise<{ location: string }> {
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileBase64: base64, key })
  });
  if (!res.ok) throw new Error("File upload failed");
  return res.json();
}

export async function downloadFile(key: string): Promise<Blob> {
  const res = await fetch(`${BASE_URL}/download/${key}`);
  if (!res.ok) throw new Error("File download failed");
  return res.blob();
}
