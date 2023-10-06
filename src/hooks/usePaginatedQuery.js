import { useQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchData = async ({
  from,
  select,
  eqColumn,
  eqValue,
  order,
  pageNumber,
  limit,
}) => {
  const { data, count } = await supabase
    .from(from)
    .select(select, { count: "estimated" })
    .eq(eqColumn, eqValue)
    .range((pageNumber - 1) * limit, (pageNumber * limit) - 1)
    .order(order, { ascending: false })
  return {data, count}
}

export const usePaginatedQuery = (query) => {
  return useQuery([query.key, query.pageNumber], () => fetchData(query))
}
