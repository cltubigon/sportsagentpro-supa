import React from "react";
import ReactDOM from "react-dom/client"
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { getFirestore } from "firebase/firestore";
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "firebase/compat/app";
import { rrfConfig } from "./config/fbConfig";
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from "redux-persist/integration/react";
import { store as guestPersistedStore, persistor as guestPersistor } from './store/guestUser'


const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: guestPersistedStore.dispatch,
  createFirestoreInstance,
  persistStore: guestPersistor,
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
<React.StrictMode>
  <Provider store={guestPersistedStore}>
    <ChakraProvider>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={<div>Loading...</div>} persistor={guestPersistor}>
          <App />
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </ChakraProvider>
  </Provider>
</React.StrictMode>
)