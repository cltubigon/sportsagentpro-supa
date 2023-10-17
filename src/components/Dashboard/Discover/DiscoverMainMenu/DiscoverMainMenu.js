import { useSelector } from "react-redux"
import AthleteType from "./AthleteType"
import BrandType from "./BrandType"

const DiscoverMainMenu = () => {
  const userType = useSelector(state => state.auth.user?.userType)
  return (
    <>
      {userType === 'athlete' && <AthleteType />}
      {userType === 'brand' && <BrandType />}
    </>
  )
}

export default DiscoverMainMenu
