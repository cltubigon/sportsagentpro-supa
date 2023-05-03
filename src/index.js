import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./store/reducers/rootReducer"
import { Provider, useDispatch, useSelector } from "react-redux"
import thunk from "redux-thunk"
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase"
import { getFirestore } from "firebase/firestore"
import { createFirestoreInstance } from "redux-firestore"
import firebase from "firebase/compat/app"
import { auth, rrfConfig } from "./config/fbConfig"
import { composeWithDevTools } from "@redux-devtools/extension"
import { persistReducer, persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import storage from "redux-persist/lib/storage"
import { encryptTransform } from "redux-persist-transform-encrypt"
import * as CryptoJS from 'crypto-js';
import { fetchCurrentUser } from "./store/actions/authActions"

let isUser = false

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isUser = true
    console.log('isUser: ', isUser)
  } else {
    isUser = false
    console.log('isUser: ', isUser)
  }
})

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ["auth", "team", "deal"],
}
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth", "team", "deal"],
}

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })]
const enhancers = [applyMiddleware(...middleware)]
const composedEnhancers = composeWithDevTools(...enhancers)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const userPersistedReducer = persistReducer(userPersistConfig, rootReducer)
const store = createStore(persistedReducer, composedEnhancers)
const persistedStore = persistStore(store)
const userPersistedStore = persistStore(store)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  persistStore: isUser ? persistedStore : userPersistedStore,
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <PersistGate
              loading={<div>Loading...</div>}
              persistor={isUser ? userPersistedStore : persistedStore}
              >
              <App />
            </PersistGate>
          </ReactReduxFirebaseProvider>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>,
)
// transforms: [
  //   encryptTransform({
    //     secretKey: 'my-secret-key',
    //     onError: function (error) {
//       console.log(error);
//     },
//     encryption: CryptoJS.AES.encrypt,
//     decryption: CryptoJS.AES.decrypt,
//   }),
// ],


// console.log('user: ', user.multiFactor.user.email)