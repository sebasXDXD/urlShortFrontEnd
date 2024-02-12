import { login, logout } from './authReducer'; // Ajusta según tu implementación
import { api } from '../services/login'; // Ajusta según tu implementación

// Acción para iniciar sesión
export const iniciarSesion = (credenciales) => async (dispatch) => {
  try {
    // Lógica para enviar las credenciales al servidor y obtener el token
    const response = await api.post('/login', credenciales);

    // Obtener el token de la respuesta
    const { token } = response.data;

    // Guardar el token en el estado de Redux
    dispatch(login(token));

    // Devolver el token por si es necesario en otros lugares del código
    return token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error; // Puedes manejar el error según tu necesidad
  }
};

// Acción para verificar el token
export const verificarToken = () => async (dispatch, getState) => {
  try {
    // Obtener el token del estado de Redux
    const token = getState().auth.token;

    // Lógica para verificar si el token es válido en el servidor
    // ...

    // Devolver true si el token es válido y false si no lo es
    const tokenValido = true; // Reemplaza con tu lógica de verificación

    if (!tokenValido) {
      // Si el token no es válido, cerrar sesión
      dispatch(logout());
    }

    return tokenValido;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    throw error; // Puedes manejar el error según tu necesidad
  }
};