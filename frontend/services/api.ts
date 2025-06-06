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
