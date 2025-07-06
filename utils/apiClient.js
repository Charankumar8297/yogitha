// apiClient.js
const API_BASE_URL = 'http://192.168.1.13:5000'; // Update IP and port if needed

export default async function apiClient(path, options = {}) {
  const url = `${API_BASE_URL}/${path.replace(/^\/+|\/+$/g, '')}`;

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error || 'API request failed');

  return data;
}
