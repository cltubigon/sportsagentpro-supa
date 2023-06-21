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
  Image,
  Text,
  Icon,
  GridItem,
  Grid,
  Heading,
  Box,
} from "@chakra-ui/react"
import { useState } from "react"
import { comStyle } from "../components/Dashboard/Opportunities/styleAthleteOpportunities"
import imageHolderRemovable from "../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsInstagram } from "react-icons/bs"
import { Editor } from "draft-js"

const UtilDrawer = ({
  isOpen,
  onOpen,
  onClose,
  drawerData,
  drawerViewMore,
  setDrawerViewMore,
  handleApply,
}) => {
  const { postContainer, sectionContainer, drawer } = comStyle

  const handleViewMore = () => {
    setDrawerViewMore((prev) => !prev)
  }

  console.log("drawerData: ", drawerData)

  return (
    <>
      {drawerData && (
        <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>{`${size} drawer contents`}</DrawerHeader> */}
            <DrawerBody py={0}>
              <Grid
                templateAreas={`"a a"
                                "b b"
                                "c c"
                                `}
                gridTemplateRows={"2fr 20fr 2fr"}
                gridTemplateColumns={"150px 1fr"}
                h="100vh"
                py={2}
              >
                <GridItem pl="2" area={"a"}>
                  <Flex>
                    <Flex alignItems={"center"} gap={4}>
                      <Image
                        sx={drawer.header.image}
                        src={imageHolderRemovable}
                        alt="Dan Abramov"
                      />
                      <Flex sx={drawer.header.textContainer}>
                        <Text sx={drawer.header.companyName}>
                          {drawerData.postOwnerFirstName}{" "}
                          {drawerData.postOwnerLastName}
                        </Text>
                        <Flex sx={drawer.header.statConainer}>
                          <Text sx={drawer.header.statConainer.text}>Open</Text>
                          <Icon
                            as={FaCircle}
                            sx={drawer.header.statConainer.icon}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem
                  display={"flex"}
                  overflowY={"auto"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  area={"b"}
                >
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.details.secContainer}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Details
                      </Heading>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Activities</Text>
                        <Text sx={drawer.details.data} noOfLines={[1]}>
                          {drawerData.selectedActivities.length > 0 &&
                            drawerData.selectedActivities
                              .map((activity) => {
                                return activity.activityTitle
                              })
                              .join(" • ")}
                        </Text>
                      </Flex>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Expires</Text>
                        <Text sx={drawer.details.data}>
                          {(drawerData.postExpirationDate.utcFormat !==
                            "Invalid Date" &&
                            drawerData.postExpirationDate.utcFormat) ||
                            "-"}
                        </Text>
                      </Flex>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Compensation</Text>
                        <Text sx={drawer.details.data}>
                          {`$${parseFloat(
                            drawerData.totalPayment.toFixed(2)
                          ).toLocaleString()}`}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex sx={sectionContainer}>
                    <Flex
                      sx={drawer.brief.secContainer}
                      maxHeight={drawerViewMore && "220px"}
                    >
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Brief
                      </Heading>
                      <Text sx={drawer.brief.postTitle}>
                        {drawerData.postTitle}
                      </Text>
                      <Flex noOfLines={drawerViewMore && [4]}>
                        <Editor editorState={drawerData.editorState} readOnly />
                      </Flex>
                    </Flex>
                    <Text sx={drawer.brief.viewMore} onClick={handleViewMore}>
                      {drawerViewMore ? "View more" : "View less"}
                    </Text>
                  </Flex>
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.activities.secContainer}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Activities
                      </Heading>
                      <Flex
                        sx={drawer.activities.tableContainer}
                        maxH={drawerViewMore && "200px"}
                      >
                        <Flex sx={drawer.activities.rowContainer} flexGrow={1}>
                          <Text>Activity</Text>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                          <Flex sx={drawer.activities.tableData}>
                            <Icon as={BsInstagram} />
                            <Text>Instagram Post</Text>
                          </Flex>
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"200px"}
                        >
                          <Text>Fulfillment date</Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                          <Text sx={drawer.activities.tableData}>
                            7/7/23 @ 2:00AM CST
                          </Text>
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"150px"}
                        >
                          <Text>Value</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                          <Text sx={drawer.activities.tableData}>$50.00</Text>
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"150px"}
                        >
                          <Text>Status</Text>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                          <Flex
                            sx={drawer.activities.tableData}
                            flexGrow={"100%"}
                            gap={2}
                            alignItems={"center"}
                          >
                            <Text>Draft</Text>
                            <Icon
                              as={FaCircle}
                              boxSize={2}
                              color={"green.400"}
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Tags
                      </Heading>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem area={"c"} sx={drawer.applyGrid}>
                  <Button colorScheme="twitter" w={"100%"} onClick={(event)=> handleApply(drawerData.id, event)}>
                    Apply Now
                  </Button>
                </GridItem>
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

export default UtilDrawer
