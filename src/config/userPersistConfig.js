import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers/rootReducer"
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
  blacklist: ['firebase', 'firestore']
  // transforms: [  // TODO: UNCOMMENT IN DEVELOPMENT MODE
  //     encryptTransform({
  //         secretKey: 'yzw&8>`n,$%?c,B,q)(I,HY.`Pqbd`D5o|)GFRqm3|0T^Vx}[yw;l^:`+&5M)Hr',
  //         onError: function (error) {
  //       console.log(error);
  //     },
  //     encryption: CryptoJS.AES.encrypt,
  //     decryption: CryptoJS.AES.decrypt,
  //   }),
  // ],
}

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })]
const enhancers = [applyMiddleware(...middleware)]
const composedEnhancers = composeWithDevTools(...enhancers)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composedEnhancers)
const persistor = persistStore(store)