// theme.js (or your chosen filename)
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  breakpoints: {
    sph: '0px',     // small phone
    lph: '540px',   // large phone
    stl: "768px",   // small tablet
    ltl: '960px',   // large tablet
    slt: "1024px",  // small laptop
    llt: '1280px',  // large laptop
    sdt: "1366px",  // small desktop
    ldt: '1536px',  // large desktop
  },
});

export default customTheme;