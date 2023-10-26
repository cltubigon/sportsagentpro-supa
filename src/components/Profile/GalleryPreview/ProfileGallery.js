/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react"
import { ProfileGallerySekeleton } from "../../Skeleton/Skeletons"
import supabase from "../../../config/supabaseClient"
import { useState } from "react"
import { useEffect } from "react"
import GalleryPopup from "./GalleryPopup"
import ImageWithBlurhash from "../../../utils/Blurhash/ImageWithBlurhash"

const ProfileGallery = ({ query }) => {
  console.log("--------------------------Gallery Rendered")
  const [imagePathAndHash, setimagePathAndHash] = useState([])
  const [popupOpen, setpopupOpen] = useState(false)
  const [selectedIndex, setselectedIndex] = useState(null)

  const galleryItems =
    query?.data && query.data[0]?.images && query.data[0]?.images[0]?.gallery

  useEffect(() => {
    const galleryPathAndHash = galleryItems
      ?.map((item, index) => {
        return { path: item.path, hash: item.hash }
      })
      .sort((a, b) => b.path.localeCompare(a.path))

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
    }
  }, [query])

  const handleImageClick = (index) => {
    console.log({ index })
    setselectedIndex(index)
    setpopupOpen((prev) => !prev)
  }

  console.log({ query, imagePathAndHash, galleryItems })

  const imgContainerStyle = {
    // h: {
    //   sph: "75px",
    //   lph: "100px",
    //   stl: "144px",
    //   ltl: "184px",
    //   slt: "196px",
    //   llt: "242px",
    //   sdt: "258px",
    //   ldt: "275px",
    // },
    px: { sph: "2px", lph: "4px" },
    minW: "20%",
  }
  console.log({ imagePathAndHash })
  return (
    <>
      {query?.data ? (
        (galleryItems?.length > 0 && <Flex
          px={"12px"}
          justifyContent={"flex-start"}
          // minH={'100%'}
        >
          {imagePathAndHash?.map((item, index) => {
            return (
              index < 5 && (
                <Flex
                  sx={imgContainerStyle}
                  key={index}
                  borderRadius={"150px"}
                  onClick={() => handleImageClick(index)}
                >
                  <ImageWithBlurhash
                    srcOrigin={item.path?.data?.publicUrl}
                    hash={item?.hash}
                  />
                </Flex>
              )
            )
          })}
        </Flex>)
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
          initialSelectedIndex={selectedIndex}
        />
      )}
    </>
  )
}

export default ProfileGallery
