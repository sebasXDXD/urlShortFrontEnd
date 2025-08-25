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

// Obtener link por ID (token ya se envía por interceptor)
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

export { getLinks, getLink, getLinkById, createLink, updateLink };
