import { useInfiniteQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchInfiniteData = async ({ pageParam = 1 }, query) => {
  const itemLimit = 10
  const { data, error, count } = await supabase
    .from(query.from)
    .select(query.select, { count: "estimated" })
    .eq(query.eqColumn, query.eqValue)
    .range((pageParam - 1) * itemLimit, pageParam * itemLimit - 1)
    .order(query.order, { ascending: false })
  const totalPages = Math.ceil(count / itemLimit)
  if (error) throw error
  return { data, totalPages }
}

const useInfiniteMultiColumnQueryData = (query) => {
  return useInfiniteQuery(
    [query.key],
    (pageParam) => {
      const data = fetchInfiniteData(pageParam, query)
      return data
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < lastPage.totalPages) {
          return pages.length + 1
        } else return undefined
      },
      refetchInterval: 30000,
    }
  )
}

export default useInfiniteMultiColumnQueryData
