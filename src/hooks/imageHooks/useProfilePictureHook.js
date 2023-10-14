import { useQuery } from "@tanstack/react-query"
import supabase from "../../config/supabaseClient"

const fetchData = async () => {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("userID", "3ff4705d-1291-44f4-a651-505358beff5f")
    if (data) {
        return data
    } else if (error) {
        console.log({ error })
    }
}

export const useProfilePictureHook = () => {
  return useQuery(["profile"], fetchData)
}
