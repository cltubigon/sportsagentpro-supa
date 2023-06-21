import {
  Drawer,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"

const UtilDrawer = ({ btnStyle, Text }) => {
  const [size, setSize] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDrawer = () => {
    setSize('xl')
    onOpen()
  }

  const sizes = ["xs", "sm", "md", "lg", "xl", "full"]

  return (
    <>
        <Button sx={btnStyle} onClick={handleDrawer} w={'100%'} >
          {Text}
        </Button>

        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`${size} drawer contents`}</DrawerHeader>
            <DrawerBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Consequat nisl vel pretium lectus quam id. Semper quis lectus
                nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
                quis varius quam quisque. Massa ultricies mi quis hendrerit
                dolor magna eget est lorem. Erat imperdiet sed euismod nisi
                porta. Lectus vestibulum mattis ullamcorper velit.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </>
  )
}

export default UtilDrawer
