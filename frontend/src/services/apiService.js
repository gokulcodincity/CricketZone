import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";


export const getPlayers = async () => {

  const response = await axios.get(
    `${BASE_URL}/players`
  );

  return response.data;
};


export const getPlayerById = async (id) => {

  const response = await axios.get(
    `${BASE_URL}/players/${id}`
  );

  return response.data;
};


export const getTeams = async () => {

  const response = await axios.get(
    `${BASE_URL}/teams`
  );

  return response.data;
};


export const getPlayersByCountry = async (country) => {

  const response = await axios.get(
    `${BASE_URL}/players/country/${country}`
  );

  return response.data;
};