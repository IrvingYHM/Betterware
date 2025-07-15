import { createContext, useReducer } from "react";
const initialState = {
  info: {},
  correo: {},
  contrasena: "",
  direccion: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INFO_PERSONAL":
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload,
        },
      };
    case "UPDATE_RCORREO":
      return {
        ...state,
        correo: {
          ...state.correo,
          ...action.payload,
        },
      };
    case "UPDATE_CONTRASEÑA":
      return {
        ...state,
        contrasena: action.payload, // Aquí solo el string
      };
    case "UPDATE_DIRECCION":
      return {
        ...state,
        direccion: {
          ...state.direccion,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const RegistroContext = createContext();

export const RegistroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RegistroContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistroContext.Provider>
  );
};
