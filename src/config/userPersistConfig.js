import storage from "redux-persist/lib/storage" // defaults to localStorage
import { createStore, applyMiddleware } from "redux"
import rootReducer from "../store/reducers/rootReducer"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
  key: "user",
  storage,
  blacklist: [],
}

const middleware = [thunk]
const enhancers = [applyMiddleware(...middleware)]
const composedEnhancers = composeWithDevTools(...enhancers)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composedEnhancers)
const persistor = persistStore(store)

export { store, persistor }