import { useInfiniteQuery } from "@tanstack/react-query"
import supabase from "../config/supabaseClient"

const fetchInfiniteData = async ({ pageParam = 1 }, query) => {
  console.log('started this stage')
  const itemLimit = query.limit
  const { data, error, count } = await supabase
  .from(query.from)
  .select("*,images(profile_picture)", { count: "estimated" })
  .eq(query.eqColumn, query.eqValue)
  .range((pageParam - 1) * itemLimit, pageParam * itemLimit - 1)
  .order(query.order, { ascending: false })
  console.log('middle of this stage')
  const totalPages = Math.ceil(count / itemLimit)
  if (error) throw error
  console.log({ data })
  console.log('reached last stage')
  return { data, totalPages }
}

const useInfiniteQueryData = (query) => {
  console.count('fetching...')
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
      // refetchInterval: 30000,
    }
  )
}

export default useInfiniteQueryData
