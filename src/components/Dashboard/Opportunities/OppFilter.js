import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  background,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

const OppFilter = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit, formState } = useForm()

  const onSubmit = (data) => {
    console.log("data: ", data)
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }
  const menuButton = {
    border: "1px solid #E4E7EB",
    bg: "transparent",
    textAlign: "left",
    w: "168px",
    zIndex: "800",
    _hover: {
      bg: "transparent",
    },
    _active: {
      _hover: {
        bg: "transparent",
      },
    },
  }
  const brandCategories = [
    {
      label: "Aerospace / Defense",
      value: "Aerospace_Defense",
    },
    {
      label: "Airline",
      value: "Airline",
    },
    {
      label: "Alcohol",
      value: "Alcohol",
    },
    {
      label: "Apparel",
      value: "Apparel",
    },
    {
      label: "Apparel – Footwear",
      value: "Apparel_Footwear",
    },
    {
      label: "Apparel – Lifestyle",
      value: "Apparel_Lifestyle",
    },
    {
      label: "Apparel – Sporting Goods",
      value: "Apparel_SportingGoods",
    },
    {
      label: "Appliances",
      value: "Appliances",
    },
    {
      label: "Automotive / Mobility",
      value: "Automotive_Mobility",
    },
    {
      label: "Beauty – Hair Care / Color",
      value: "Beauty_Hair Care_Color",
    },
    {
      label: "Beauty – Shaving / Hair Management",
      value: "Beauty_Shaving_HairManagement",
    },
    {
      label: "Beauty – Skin Care",
      value: "Beauty_SkinCare",
    },
    {
      label: "Beer / Seltzers",
      value: "Beer_Seltzers",
    },
    {
      label: "Broadcast",
      value: "Broadcast",
    },
    {
      label: "Broadcast / Media / Entertainment",
      value: "Broadcast_Media_Entertainment",
    },
    {
      label: "Chemicals / Raw Materials / Compounds",
      value: "Chemicals_Raw Materials_Compounds",
    },
    {
      label: "E-commerce",
      value: "E-commerce",
    },
    {
      label: "Education",
      value: "Education",
    },
    {
      label: "Employment / Career Services",
      value: "Employment_CareerServices",
    },
    {
      label: "Energy",
      value: "Energy",
    },
    {
      label: "Financial Services",
      value: "FinancialServices",
    },
    {
      label: "Fitness Equipment / Gyms",
      value: "FitnessEquipment_Gyms",
    },
    {
      label: "Food – Candy / Chocolate",
      value: "Food_Candy_Chocolate",
    },
    {
      label: "Food – Cereal / Packaged Breakfast",
      value: "Food_Cereal_PackagedBreakfast",
    },
    {
      label: "Food – Cookies / Crackers",
      value: "Food_Cookies_Crackers",
    },
    {
      label: "Food – Dairy",
      value: "Food_Dairy",
    },
    {
      label: "Food – Fruit / Nut Bars",
      value: "Food_Fruit_NutBars",
    },
    {
      label: "Food – Fruit / Nut Spreads",
      value: "Food_Fruit_NutSpreads",
    },
    {
      label: "Food – Packaged Coffee",
      value: "Food_PackagedCoffee",
    },
    {
      label: "Food – Pet Food",
      value: "Food_PetFood",
    },
    {
      label: "Food – Restaurant / Quick Service",
      value: "Food_Restaurant_Quick_Service",
    },
    {
      label: "Food – Salty Snacks",
      value: "Food_SaltySnacks",
    },
    {
      label: "Gifts/Novelties",
      value: "Gifts_Novelties",
    },
    {
      label: "Health – Body Care",
      value: "Health_BodyCare",
    },
    {
      label: "Health – Feminine Care",
      value: "Health_FeminineCare",
    },
    {
      label: "Health – Oral Care",
      value: "Health_OralCare",
    },
    {
      label: "Health – Vitamins / Supplements / Cold / Digestion",
      value: "Health_Vitamins_Supplements_Cold_Digestion",
    },
    {
      label: "Healthcare",
      value: "Healthcare",
    },
    {
      label: "Home Improvement",
      value: "HomeImprovement",
    },
    {
      label: "Household – Air Fresheners",
      value: "Household_AirFresheners",
    },
    {
      label: "Household – Baby / Child Care",
      value: "Household_Baby_Child Care",
    },
    {
      label: "Household – Household / Janitorial Cleaners",
      value: "Household_Household_JanitorialCleaners",
    },
    {
      label: "Household – Laundry / Fabric Care",
      value: "Household_Laundry_abricCare",
    },
    {
      label: "Household – Paper Products",
      value: "Household_PaperProducts",
    },
    {
      label: "Industrial",
      value: "Industrial",
    },
    {
      label: "Insurance",
      value: "Insurance",
    },
    {
      label: "Insurance - Auto / Home / Life / Disability",
      value: "Insurance_Auto_Home_Life_Disability",
    },
    {
      label: "Insurance - Health",
      value: "Insurance_ealth",
    },
    {
      label: "Medical Equipment",
      value: "MedicalEquipment",
    },
    {
      label: "Memorabilia",
      value: "Memorabilia",
    },
    {
      label: "Museum",
      value: "Museum",
    },
    {
      label: "Non-Alcoholic Beverages",
      value: "NonAlcoholicBeverages",
    },
    {
      label: "Payment",
      value: "Payment",
    },
    {
      label: "Pharmaceuticals & Medicine",
      value: "Pharmaceuticals_Medicine",
    },
    {
      label: "Pharmacy / Health Retail",
      value: "Pharmacy_HealthRetail",
    },
    {
      label:
        "Professional Services - Financial Corporate Tax / Management Accounting Services",
      value:
        "Professional Services_FinancialCorporateTax_ManagementAccountingServices",
    },
    {
      label:
        "Professional Services - IT Business Strategy / Systems Architecture",
      value: "Professional Services_ITBusinessStrategy_SystemsArchitecture",
    },
    {
      label: "Professional Services - Management / Business Consulting",
      value: "ProfessionalServices_Management_BusinessConsulting",
    },
    {
      label: "Professional Services - Sourcing / Procurement Consulting",
      value: "ProfessionalServices_Sourcing_Procurement_Consulting",
    },
    {
      label: "Retail",
      value: "Retail",
    },
    {
      label: "Shipping / Logistics",
      value: "Shipping_Logistics",
    },
    {
      label: "Technology – AI / VR / Platforms",
      value: "Technology_AI_VR_Platforms",
    },
    {
      label: "Technology – Audio / Visual Equipment",
      value: "Technology_Audio_VisualEquipment",
    },
    {
      label: "Technology – Cellphones / Tablets / Computers",
      value: "Technology_Cellphones_Tablets_Computers",
    },
    {
      label: "Technology – Cloud Services",
      value: "Technology_CloudServices",
    },
    {
      label: "Technology – CRM",
      value: "Technology_CRM",
    },
    {
      label: "Technology – Data Visualization",
      value: "Technology_DataVisualization",
    },
    {
      label: "Technology – Instant Messaging Applications",
      value: "Technology_InstantMessagingApplications",
    },
    {
      label: "Technology – IT / Infrastructure Services",
      value: "Technology_IT_Infrastructure Services",
    },
    {
      label: "Technology – Other",
      value: "Technology_Other",
    },
    {
      label: "Telecommunications",
      value: "Telecommunications",
    },
    {
      label: "Theme Parks",
      value: "ThemeParks",
    },
    {
      label: "Tickets & Hospitality",
      value: "Tickets_Hospitality",
    },
    {
      label: "Tires",
      value: "Tires",
    },
    {
      label: "Tobacco",
      value: "Tobacco",
    },
    {
      label: "Toys & Games",
      value: "Toys_Games",
    },
    {
      label: "Travel – Other",
      value: "Travel_Other",
    },
    {
      label: "Travel Accommodations / Lodging",
      value: "TravelAccommodations_Lodging",
    },
    {
      label: "Travel Experiences",
      value: "TravelExperiences",
    },
    {
      label: "Video Games",
      value: "VideoGames",
    },
    {
      label: "Watches / Timepieces / Timing",
      value: "Watches_Timepieces_Timing",
    },
    {
      label: "Wine / Spirits",
      value: "Wine_Spirits",
    },
  ]
  const online = [
    {
      label: " Instagram Post",
      value: " InstagramPost",
    },
    {
      label: "Instagram Story",
      value: "InstagramStory",
    },
    {
      label: "Instagram Reels",
      value: "InstagramReels",
    },
    {
      label: "Facebook Story",
      value: "FacebookStory",
    },
    {
      label: "Facebook Live",
      value: "FacebookLive",
    },
    {
      label: "YouTube Post",
      value: "YouTubePost",
    },
    {
      label: "TikTok Post",
      value: "TikTokPost",
    },
    {
      label: "Snapchat Story",
      value: "SnapchatStory",
    },
    {
      label: "Snapchat Spotlight",
      value: "SnapchatSpotlight",
    },
    {
      label: "Group Licensing",
      value: "GroupLicensing",
    },
    {
      label: "Podcast Appearance",
      value: "PodcastAppearance",
    },
    {
      label: "Digital Press Interview",
      value: "DigitalPressInterview",
    },
    {
      label: "Photo / Video / Audio Creation",
      value: "Photo_Video_AudioCreation",
    },
    {
      label: "Video Shoutout",
      value: "VideoShoutout",
    },
    {
      label: "Other",
      value: "Other",
    },
  ]
  const Offline = [
    {
      label: 'Appearance / Meet-and-Greet',
     value: 'Appearance_MeetAndGreet',

    },
    {
      label:  'Autograph Signing',
    value:  'AutographSigning',

    },
    {
      label: 'Keynote Speech',
    value:  'KeynoteSpeech',

    },
    {
      label:   'Sport Demonstration',
    value:  'SportDemonstration',

    },
    {
      label:  'Production Shoot (Photo / Video)',
     value: 'ProductionShoot(PhotoVideo)',

    },
    {
    label:   'Product Testing & Feedback',
     value: 'ProductTesting_Feedback',

    },
    {
     label:  'In-person Interview',
     value: 'InPersonInterview',

    },
    {
     label:  'Group Marketing',
     value: 'GroupMarketing',

    },
    {
     label:  'Licensing',
     value:  'Licensing',

    },
  ]
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Menu>
          <MenuButton
            as={Button}
            sx={menuButton}
            onClick={toggleAccordion}
            rightIcon={<ChevronRightIcon />}
          >
            Filters
          </MenuButton>
          <MenuList w={"500px"} px={4} zIndex={99}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Search..." border={"none"} />
            </InputGroup>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Brand categories
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} maxH={"280px"} overflowY={"auto"}>
                  <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      {brandCategories.map((brand) => {
                        const { label, value } = brand
                        return (
                          <Checkbox
                            key={value}
                            value={value}
                            {...register("brandCategory")}
                          >
                            {label}
                          </Checkbox>
                        )
                      })}
                    </InputGroup>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Online
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} maxH={"280px"} overflowY={"auto"}>
                  <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      {online.map((data) => {
                        const { label, value } = data
                        return (
                          <Checkbox key={value} value={value} {...register("online")}>
                            {label}
                          </Checkbox>
                        )
                      })}
                    </InputGroup>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Offline
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} maxH={"280px"} overflowY={"auto"}>
                  <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                      {Offline.map((data) => {
                        const { label, value } = data
                        return (
                          <Checkbox key={value} value={value} {...register("offline")}>
                            {label}
                          </Checkbox>
                        )
                      })}
                    </InputGroup>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button mt={4} colorScheme="twitter" type="submit" w={"full"}>
              Apply
            </Button>
          </MenuList>
        </Menu>
      </form>
    </>
  )
}

export default OppFilter
