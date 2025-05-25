import axios from 'axios';

const API_BASE = 'http://localhost:6432/putovanja';

export const addPutovanje = (putovanje) =>
  axios.post(`${API_BASE}/putovanja`, putovanje);

export const fetchPutovanja = () => axios.get(`${API_BASE}/putovanja`);

export const fetchTroskovi = (putovanjeId) =>
  axios.get(`${API_BASE}/putovanja/${putovanjeId}/troskovi`);

export const addTrosak = (putovanjeId, trosak) =>
  axios.post(`${API_BASE}/putovanja/${putovanjeId}/troskovi`, trosak);

export const updateTrosak = (trosakId, trosak) =>
  axios.put(`${API_BASE}/putovanja/troskovi/${trosakId}`, trosak);

export const deleteTrosak = (trosakId) =>
  axios.delete(`${API_BASE}/putovanja/troskovi/${trosakId}`);

export const fetchSumaTroskova = (putovanjeId) =>
  axios.get(`${API_BASE}/putovanja/${putovanjeId}/suma`);
