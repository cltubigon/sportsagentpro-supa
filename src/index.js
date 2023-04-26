import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, authIsReady, getFirebase, isLoaded } from "react-redux-firebase";
import { getFirestore } from "firebase/firestore";
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "firebase/compat/app";
import { rrfConfig } from "./config/fbConfig";
import theme from "./config/theme/Theme";

// const store = createStore(rootReducer, compose(
//   applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
// ));

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// }

// console.log('rrfProps',rrfProps)
// console.log('store',store)

// const root = ReactDOM.createRoot(document.getElementById("root"))

// function AuthIsLoaded({ children }) {
//   const auth = useSelector(state => state.firebase.auth)
//   // if (!isLoaded(auth)) return <div>Loading Screen...</div>;
//       return children
// }

//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <ChakraProvider>
//           <ReactReduxFirebaseProvider {...rrfProps}>
//             <AuthIsLoaded>
//               <App />
//             </AuthIsLoaded>
//           </ReactReduxFirebaseProvider>
//         </ChakraProvider>
//       </Provider>
//     </React.StrictMode>
//   )


const store = createStore(rootReducer, compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
          </ReactReduxFirebaseProvider>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  )