import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { createStore, applyMiddleware } from "redux"
import rootReducer from "../store/reducers/rootReducer"
import thunk from "redux-thunk"
import { getFirebase } from "react-redux-firebase"
import { getFirestore } from "firebase/firestore"
import { composeWithDevTools } from "@redux-devtools/extension"
import { persistReducer, persistStore } from "redux-persist"
import { encryptTransform } from "redux-persist-transform-encrypt"
import * as CryptoJS from 'crypto-js';

const persistConfig = {
  key: 'user',
  storage,
  blacklist: ['firebase', 'firestore', 'utils', 'athlete', 'post'],
}

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })]
const enhancers = [applyMiddleware(...middleware)]
const composedEnhancers = composeWithDevTools(...enhancers)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composedEnhancers)
const persistor = persistStore(store)

export { store, persistor };