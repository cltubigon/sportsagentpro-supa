import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
// import { ReactReduxFirebaseProvider } from "react-redux-firebase"
// import { createFirestoreInstance } from "redux-firestore"
// import firebase from "firebase/compat/app"
// import { rrfConfig } from "./config/fbConfig"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PersistGate } from "redux-persist/integration/react"
import {
  store as guestPersistedStore,
  persistor as guestPersistor,
} from "./config/userPersistConfig"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import customTheme from "./config/chakraTheme"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import supabase from "./config/supabaseClient"

const root = ReactDOM.createRoot(document.getElementById("root"))
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={guestPersistedStore}>
        <ChakraProvider theme={customTheme}>
          <PersistGate
            loading={<div>Loading...</div>}
            persistor={guestPersistor}
          >
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              ></ReactQueryDevtools>
            </QueryClientProvider>
          </PersistGate>
        </ChakraProvider>
      </Provider>
    </SessionContextProvider>
  </React.StrictMode>
)
