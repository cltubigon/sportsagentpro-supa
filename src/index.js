import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./store/reducers/rootReducer"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase"
import { getFirestore } from "firebase/firestore"
import { createFirestoreInstance } from "redux-firestore"
import firebase from "firebase/compat/app"
import { rrfConfig } from "./config/fbConfig"
import { composeWithDevTools } from "@redux-devtools/extension"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"
import { encryptTransform } from "redux-persist-transform-encrypt"
import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "team", "deal"],
  transforms: [
    encryptTransform({
      secretKey: uuidv4(),
      onError: function (error) {
        console.log(error);
      },
      encryption: CryptoJS.AES.encrypt,
      decryption: CryptoJS.AES.decrypt,
    }),
  ],
}

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })]

const enhancers = [applyMiddleware(...middleware)]

const composedEnhancers = composeWithDevTools(...enhancers)

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composedEnhancers)

const persistedStore = persistStore(store)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  persistStore: persistedStore,
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <PersistGate
            loading={<div>Loading...</div>}
            persistor={persistedStore}
          >
            <App />
          </PersistGate>
        </ReactReduxFirebaseProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)