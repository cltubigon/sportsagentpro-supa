import supabase from "../config/supabaseClient"

// Fetch all athletes
export const fetchAthletes = async () => {
  const { data, error } = await supabase.from("athlete").select("*")
  if (error) throw error
  return data
}

// Fetch all posts
export const fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*")
  if (error) throw error
  return data
}

// Fetch all users
export const fetchUsers = async () => {
  const { data, error } = await supabase.from("users").select("*")
  if (error) throw error
  return data
}