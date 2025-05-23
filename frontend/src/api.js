import axios from 'axios';

const API_BASE = 'http://localhost:6432/setp/putovanja';

export const addPutovanje = (putovanje) =>
  axios.post(`${API_BASE}/putovanja`, putovanje);

export const fetchPutovanja = () => axios.get(`${API_BASE}/putovanja`);

export const fetchTroskovi = (putovanjeId) =>
  axios.get(`${API_BASE}/${putovanjeId}/troskovi`);

export const addTrosak = (putovanjeId, trosak) =>
  axios.post(`${API_BASE}/${putovanjeId}/troskovi`, trosak);

export const updateTrosak = (trosakId, trosak) =>
  axios.put(`${API_BASE}/troskovi/${trosakId}`, trosak);

export const deleteTrosak = (trosakId) =>
  axios.delete(`${API_BASE}/troskovi/${trosakId}`);

export const fetchSumaTroskova = (putovanjeId) =>
  axios.get(`${API_BASE}/${putovanjeId}/suma`);
