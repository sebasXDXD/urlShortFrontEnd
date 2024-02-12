// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer"; // Ajusta la ruta según tu estructura de carpetas

const store = configureStore({
  reducer: rootReducer,
  // Puedes agregar configuraciones adicionales según tus necesidades
});

export default store;
