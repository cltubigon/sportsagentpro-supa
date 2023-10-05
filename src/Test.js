import { Flex } from "@chakra-ui/react"
import { FixedSizeGrid as Grid } from "react-window"

export const Test = () => (
  <Flex pt={"88px"}>
    <Grid
      columnCount={1000}
      columnWidth={100}
      height={150}
      rowCount={1000}
      rowHeight={35}
      width={300}
    >
      {/* {Cell} */}
      {/* <Flex style={style}>
        Item {rowIndex},{columnIndex}
      </Flex> */}
    </Grid>
  </Flex>
)
