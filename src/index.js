import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
// import { store } from "./store/store"
import {
  store as guestPersistedStore,
  persistor as guestPersistor,
} from "./config/userPersistConfig"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={guestPersistedStore}>
      <ChakraProvider>
          <PersistGate
            loading={<div>Loading...</div>}
            persistor={guestPersistor}
          >
            <App />
          </PersistGate>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)
