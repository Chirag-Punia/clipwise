import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export async function generateScript(prompt, language) {
  const response = await axios.post(`${API_URL}/scripts/generate`, {
    prompt,
    language
  });
  return response.data;
}

export async function getScripts() {
  const response = await axios.get(`${API_URL}/scripts`);
  return response.data;
}