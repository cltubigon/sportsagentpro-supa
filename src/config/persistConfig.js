// import storage from "redux-persist/lib/storage"
// import { encryptTransform } from "redux-persist-transform-encrypt"
// import * as CryptoJS from 'crypto-js';
// import { connect } from "react-redux";


// export const persistConfig = ()=> {
//   return {
//     key: (user) => `root-${user.id}`,
//     storage,
//     blacklist: ["firebase", "firestore"],
    // transforms: [
    //   encryptTransform({
    //     secretKey: 'U2FsdGVkX1+n9rEytX5MJAN56IP0S1Ld=WDBkcIpSwAlzfT9Vfxm3T+jGnsCuTCRvh2LoT29KJ4Ep5ckcFQwqCw=',
    //     onError: function (error) {
    //       console.log(error);
    //     },
    //     encryption: CryptoJS.AES.encrypt,
    //     decryption: CryptoJS.AES.decrypt,
    //   }),
    // ],
//   }
// }