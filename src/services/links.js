import axios from "axios";

const API_URL = "http://localhost:8000";

// Función para obtener todos los links
const getLinks = async () => {
  try {
    const response = await axios.get(`${API_URL}/links`);
    return response.data;
  } catch (error) {
    console.error("Error en getLinks:", error.message);
    throw error;
  }
};

// Función para obtener un link por su identificador único (shortCode o slug)
const getLink = async (link) => {
  try {
    const response = await axios.get(`${API_URL}/link/${link}`);
    return response.data;
  } catch (error) {
    console.error(`Error en getLink (${link}):`, error.message);
    throw error;
  }
};

// Función para obtener un link por su ID
const getLinkById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/link/id/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error en getLinkById (${id}):`, error.message);
    throw error;
  }
};

// Función para crear un nuevo enlace
const createLink = async (name, redirectTo, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/link`,
      { name, redirect_to: redirectTo },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error en createLink (${name} -> ${redirectTo}):`, error.message);
    throw error;
  }
};

// Función para actualizar un link
const updateLink = async (id, name, redirectTo, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/link/${id}`,
      { name, redirect_to: redirectTo },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error en updateLink (${id}):`, error.message);
    throw error;
  }
};

export { getLinks, getLink, getLinkById, createLink, updateLink };
