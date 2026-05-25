import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";


// GET ALL PLAYERS
export const getPlayers = async () => {

  const response = await axios.get(`${BASE_URL}/players`);

  return response.data;
};


// GET ONE PLAYER BY ID
export const getPlayerById = async (id) => {

  const response = await axios.get(`${BASE_URL}/players/${id}`);

  return response.data;
};


// GET ALL TEAMS
export const getTeams = async () => {

  const response = await axios.get(`${BASE_URL}/teams`);

  return response.data;
};


// GET PLAYERS FROM A SPECIFIC COUNTRY
export const getPlayersByCountry = async (country) => {

  const response = await axios.get(`${BASE_URL}/players/country/${country}`);

  return response.data;
};


// CREATE A NEW PLAYER
export const createPlayer = async (playerData) => {

  const response = await axios.post(`${BASE_URL}/players`, playerData);

  return response.data;
};


// UPDATE AN EXISTING PLAYER BY ID
export const updatePlayer = async (id, playerData) => {

  const response = await axios.put(`${BASE_URL}/players/${id}`, playerData);

  return response.data;
};


// DELETE A PLAYER BY ID
export const deletePlayer = async (id) => {

  const response = await axios.delete(`${BASE_URL}/players/${id}`);

  return response.data;
};
