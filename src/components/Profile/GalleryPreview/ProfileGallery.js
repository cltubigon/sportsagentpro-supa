import { Flex } from "@chakra-ui/react"
import { ProfileGallerySekeleton } from "../../Skeleton/Skeletons"
import supabase from "../../../config/supabaseClient"
import { useState } from "react"
import { useEffect } from "react"
import GalleryPopup from "./GalleryPopup"
import ImageOnload from "../../../ImageOnload"

const ProfileGallery = ({ query }) => {
  console.log("--------------------------Gallery Rendered")
  const [imagePathAndHash, setimagePathAndHash] = useState([])
  const [popupOpen, setpopupOpen] = useState(false)
  useEffect(() => {
    const galleryItems =
      query?.data && query.data[0].images && query.data[0].images[0]?.gallery
    const galleryPathAndHash = galleryItems?.map((item) => {
      console.log({ item })
      return { path: item.path, hash: item.hash }
    })
    // .sort((a, b) => b.localeCompare(a))
    console.log({ galleryPathAndHash })
    if (galleryPathAndHash?.length > 0) {
      const publicPathAndHash = galleryPathAndHash?.map((item) => {
        const { path, hash } = item
        const publicpath = supabase.storage.from(`gallery`).getPublicUrl(path, {
          transform: {
            width: 275,
            height: 275,
            resize: "cover", // fill | contain
          },
        })
        return { path: publicpath, hash }
      })
      setimagePathAndHash(publicPathAndHash)
      // if (publicPathAndHash?.length < 6) {
      //   const placeholdersCount = 5 - publicPathAndHash.length
      //   const dummyArray = new Array(placeholdersCount).fill("dummy")
      //   const mergedArray = [...publicPathAndHash, ...dummyArray]
      //   setimagePathAndHash(mergedArray)
      // } else {
      //   setimagePathAndHash(publicPathAndHash)
      // }
    }
  }, [query])

  const handleImageClick = (index) => {
    console.log({ index })
    setpopupOpen((prev) => !prev)
  }

  console.log({ query, imagePathAndHash })

  const imgContainerStyle = {
    h: {
      sph: "75px",
      lph: '100px',
      stl: "144px",
      ltl: "184px",
      slt: "196px",
      llt: "242px",
      sdt: "258px",
      ldt: "275px",
    },
    px: {sph:'2px', lph: '4px'},
    minW: "20%",
  }
  console.log({ imagePathAndHash })
  return (
    <>
      {query?.data ? (
        <Flex px={'12px'} justifyContent={'flex-start'}>
          {imagePathAndHash?.map((item, index) => {
            return (
              index < 5 && (
                <Flex sx={imgContainerStyle} key={index} borderRadius={'150px'} onClick={()=> handleImageClick(index)} >
                  <ImageOnload
                    srcOrigin={item.path?.data?.publicUrl}
                    hash={item?.hash}
                  />
                </Flex>
              )
            )
          })}
        </Flex>
      ) : (
        <ProfileGallerySekeleton
          minH={{
            sph: "75px",
            stl: "144px",
            ltl: "184px",
            slt: "196px",
            llt: "242px",
            sdt: "258px",
            ldt: "275px",
          }}
        />
      )}
      {popupOpen && (
        <GalleryPopup
          setpopupOpen={setpopupOpen}
          imagePathAndHash={imagePathAndHash}
        />
      )}
    </>
  )
}

export default ProfileGallery
// import { Box, Button, Flex, Image, Skeleton } from "@chakra-ui/react"
// import { DummyImage } from "react-simple-placeholder-image"
// import { ProfileGallerySekeleton } from "../../Skeleton/Skeletons"
// import supabase from "../../../config/supabaseClient"
// import { useState } from "react"
// import { useEffect } from "react"
// import GalleryPopup from "./GalleryPopup"
// import ImageOnload from "../../../ImageOnload"

// const ProfileGallery = ({ query }) => {
//   console.log("--------------------------Gallery Rendered")
//   const [imagePathAndHash, setimagePathAndHash] = useState([])
//   const [popupOpen, setpopupOpen] = useState(false)
//   useEffect(() => {
//     const galleryItems =
//       query?.data && query.data[0].images && query.data[0].images[0]?.gallery
//     const galleryPathAndHash = galleryItems?.map((item) => {
//       console.log({ item })
//       return { path: item.path, hash: item.hash }
//     })
//     // .sort((a, b) => b.localeCompare(a))
//     console.log({ galleryPathAndHash })
//     if (galleryPathAndHash?.length > 0) {
//       const publicPathAndHash = galleryPathAndHash?.map((item) => {
//         const { path, hash } = item
//         const publicpath = supabase.storage.from(`gallery`).getPublicUrl(path, {
//           transform: {
//             width: 275,
//             height: 275,
//             resize: "cover", // fill | contain
//           },
//         })
//         return { path: publicpath, hash }
//       })
//       if (publicPathAndHash?.length < 6) {
//         const placeholdersCount = 5 - publicPathAndHash.length
//         const dummyArray = new Array(placeholdersCount).fill("dummy")
//         const mergedArray = [...publicPathAndHash, ...dummyArray]
//         setimagePathAndHash(mergedArray)
//       } else {
//         setimagePathAndHash(publicPathAndHash)
//       }
//     }
//   }, [query])

//   const handleImageClick = () => {
//     setpopupOpen((prev) => !prev)
//   }

//   console.log({ query, imagePathAndHash })

//   const loaderArray = new Array(5).fill(0)
//   return (
//     <>
//       {query?.data ? (
//         <Flex
//           position={"relative"}
//           gap={2}
//           boxSizing="border-box"
//           alignItems={"center"}
//           justifyContent={"space-between"}
//           px={4}
//           // minH={{
//           //   sph: "67px",
//           //   stl: "136px",
//           //   ltl: "176px",
//           //   slt: "186px",
//           //   llt: "234px",
//           //   sdt: "251px",
//           //   ldt: "268px",
//           // }}
//         >
//           {
//             imagePathAndHash?.map((item, index) => {
//               console.log({ index, item })
//               const width = { sph: "23%", stl: "19%" }
//               return item !== "dummy" && index < 5 ? (
//                 <Flex
//                   key={index}
//                   display={index > 4 && { lph: "none", stl: "flex" }}
//                   w={width}
//                   h={"100%"}
//                 >
//                   <ImageOnload
//                     srcOrigin={item.path?.data?.publicUrl}
//                     hash={item.hash}
//                     w={'275px'}
//                     h={"275px"}
//                   />
//                   {/* <Image src={item?.path?.data.publicUrl} onClick={handleImageClick} /> */}
//                 </Flex>
//               ) : (
//                 index < 5 && (
//                   <Flex
//                     key={index}
//                     display={index > 3 && { sph: "none", stl: "flex" }}
//                     w={width}
//                     h={"100%"}
//                   >
//                     <DummyImage bgColor="#A0AEC0" placeholder="280x280" />
//                   </Flex>
//                 )
//               )
//             })
//           }
//           {/* {query.data &&
//             loaderArray?.map((item, index) => {
//               const width = {
//                 sph: "75px",
//                 stl: "144px",
//                 ltl: "184px",
//                 slt: "196px",
//                 llt: "242px",
//                 sdt: "258px",
//                 ldt: "275px",
//               }
//               return (
//                 <Flex
//                   key={index}
//                   display={{ lph: "none", stl: "flex" }}
//                   w={width}
//                   h={"100%"}
//                 >
//                   <Skeleton
//                     startColor="#BCC6D3"
//                     endColor="#d9d9d9"
//                     w={"100%"}
//                     h={{
//                       sph: "75px",
//                       stl: "144px",
//                       ltl: "184px",
//                       slt: "196px",
//                       llt: "242px",
//                       sdt: "258px",
//                       ldt: "275px",
//                     }}
//                   />
//                 </Flex>
//               )
//             })} */}
//           {query.data &&
//             imagePathAndHash?.length === 0 &&
//             loaderArray?.map((item, index) => {
//               return (
//                 <Flex
//                   key={index}
//                   display={{ lph: "none", stl: "flex" }}
//                   w={"19%"}
//                   // h={'280px'}
//                 >
//                   <DummyImage
//                     bgColor="#A0AEC0"
//                     // width={'275px'}
//                     // height={'275px'}
//                     placeholder="280x280"
//                   />
//                 </Flex>
//               )
//             })}
//           <Box
//             position={"absolute"}
//             bottom={{ base: 2, sm: 3, md: 5, lg: 10 }}
//             right={{ base: 5, sm: 7, md: 8, lg: 12 }}
//           >
//             <Button
//               size={{ base: "xs", md: "md" }}
//               bgColor={"transparent"}
//               color={"white"}
//               border={"1px solid #cdcdcd"}
//               dropShadow={"dark-lg"}
//               _hover={{ bgColor: "transparent" }}
//             >
//               View All
//             </Button>
//           </Box>
//         </Flex>
//       ) : (
//         <ProfileGallerySekeleton minH={{
//           sph: "75px",
//           stl: "144px",
//           ltl: "184px",
//           slt: "196px",
//           llt: "242px",
//           sdt: "258px",
//           ldt: "275px",
//         }} />
//       )}
//       {popupOpen && (
//         <GalleryPopup
//           setpopupOpen={setpopupOpen}
//           imagePathAndHash={imagePathAndHash}
//         />
//       )}
//     </>
//   )
// }

// export default ProfileGallery
