import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import registroReducer from "./tallerRegistroDucks"

const rootRedeucer = combineReducers({
  registros: registroReducer,
})

export default function generateStore() {
  const store = createStore(
    rootRedeucer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}
