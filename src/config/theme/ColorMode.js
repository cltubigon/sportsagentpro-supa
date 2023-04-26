import { Box, Button, Icon, cookieStorageManager, useColorMode } from "@chakra-ui/react"
import { useEffect } from "react";
import { FiSun } from "react-icons/fi"

function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode()
return (
    <Box position={"fixed"} zIndex={999} bottom={"20px"} right={"20px"} >
        <Icon p={2} borderRadius={"3px"} as={FiSun} cursor={"pointer"} boxSize={"34px"} onClick={toggleColorMode} />
        {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button> */}
    </Box>
    )
}

export default ColorMode