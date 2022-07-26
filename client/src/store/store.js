import { applyMiddleware, createStore } from "redux"; // redux
import { composeWithDevTools } from "redux-devtools-extension"; // redux-devtools-extension
import thunk from "redux-thunk"; // redux-thunk
import rootReducer from "../reducers/rootReducer";  // rootReducer 


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // applyMiddleware(thunk) para que se puedan usar los thunks


export default store;