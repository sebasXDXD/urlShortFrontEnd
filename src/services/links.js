// src/services/links.js
import axiosInstance from "./axiosInstance";

// Obtener todos los links
const getLinks = async () => {
  const response = await axiosInstance.get("/links");
  return response.data;
};

// Obtener un link por shortcode o slug
const getLink = async (link) => {
  const response = await axiosInstance.get(`/link/${link}`);
  return response.data;
};

// Obtener link por ID (requiere auth, token ya va por interceptor)
const getLinkById = async (id) => {
  const response = await axiosInstance.get(`/link/id/${id}`);
  return response.data;
};

// Crear un nuevo link
const createLink = async (name, redirectTo) => {
  const response = await axiosInstance.post("/link", {
    name,
    redirect_to: redirectTo,
  });
  return response.data;
};

// Actualizar un link
const updateLink = async (id, name, redirectTo) => {
  const response = await axiosInstance.put(`/link/${id}`, {
    name,
    redirect_to: redirectTo,
  });
  return response.data;
};

// 📊 Obtener estadísticas generales del usuario
const getLinksStats = async () => {
  const response = await axiosInstance.get("/links/stats");
  return response.data;
};

// 📊 Obtener clicks agrupados por mes (últimos N meses)
const getClicksByMonth = async (months = 9) => {
  const response = await axiosInstance.get("/links/clicks", {
    params: { months },
  });
  return response.data;
};

// 📊 Obtener los top N links por clicks
const getTopLinks = async (limit = 5) => {
  const response = await axiosInstance.get("/links/top", {
    params: { limit },
  });
  return response.data;
};

// 📊 Obtener links creados agrupados por mes (últimos N meses)
const getLinksCreatedByMonth = async (months = 9) => {
  const response = await axiosInstance.get("/links/created", {
    params: { months },
  });
  return response.data;
};

// 📊 Obtener los links más recientes (últimos N)
const getRecentLinks = async (limit = 5) => {
  const response = await axiosInstance.get("/links/recent", {
    params: { limit },
  });
  return response.data;
};

export {
  getLinks,
  getLink,
  getLinkById,
  createLink,
  updateLink,
  getLinksStats,
  getClicksByMonth,
  getTopLinks,
  getLinksCreatedByMonth,
  getRecentLinks,
};
