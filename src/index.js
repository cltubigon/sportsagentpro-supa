import React from "react";
import ReactDOM from "react-dom";
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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "team", "deal"],
};

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const enhancers = [applyMiddleware(...middleware)];

const composedEnhancers = composeWithDevTools(...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composedEnhancers);

const persistedStore = persistStore(store);

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
          <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
            <App />
          </PersistGate>
        </ReactReduxFirebaseProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);



// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { ChakraProvider } from "@chakra-ui/react";
// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./store/reducers/rootReducer";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
// import { getFirestore } from "firebase/firestore";
// import { createFirestoreInstance } from 'redux-firestore';
// import firebase from "firebase/compat/app";
// import { rrfConfig } from "./config/fbConfig";
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { PersistGate } from "redux-persist/integration/react";

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth', 'team', 'deal'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
//   composeWithDevTools(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
//   )
// )

// const persistedStore = persistStore(store);

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
//   persistStore: persistedStore,
// }

// const root = ReactDOM.createRoot(document.getElementById("root"))
//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <ChakraProvider>
//           <ReactReduxFirebaseProvider {...rrfProps}>
//             <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
//               <App />
//             </PersistGate>
//           </ReactReduxFirebaseProvider>
//         </ChakraProvider>
//       </Provider>
//     </React.StrictMode>
//   )