import axios from "axios"

// constantes
const dataStart = {
  data: [],
  success: null,
  message: null,
}

// Types
const GET_DNI_OK = "GET_DNI_OK"

// reducer
export default function registroReducer(state = dataStart, action) {
  switch (action.type) {
    case GET_DNI_OK:
      return {
        ...state,
        data: action.payload.data,
        success: action.payload.success,
        message: action.payload.message,
      }
    default:
      return state
  }
}

// acciones
export const getDniAction = (numDNI) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${process.env.API_DNI_ULR}${numDNI}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    if (res.data.nombres === "" || res.data.nombres === null) {
      dispatch({
        type: GET_DNI_OK,
        payload: {
          data: res.data,
          success: false,
          message: "No se encontro datos",
        },
      })
    } else {
      dispatch({
        type: GET_DNI_OK,
        payload: {
          data: res.data,
          success: true,
          message: "Datos Encontrados",
        },
      })
    }
  } catch (error) {
    console.log(error)
  }
}
