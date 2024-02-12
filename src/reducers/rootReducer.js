// src/reducers/rootReducer.js

import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // Agrega otros reductores según sea necesario
});

export default rootReducer;
