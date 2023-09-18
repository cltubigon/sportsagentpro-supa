import React, { useEffect, useRef } from "react"
import { Box, Text } from "@chakra-ui/react"
import { useState } from "react"

export const Test = () => {
  const [items, setItems] = useState([])
  const observerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulated API call for fetching more items
    const fetchMoreItems = () => {
      setIsLoading(true)
      setTimeout(() => {
        const newItems = [...items, ...Array(10).fill(null)]
        setItems(newItems)
        setIsLoading(false)
      }, 1000)
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.3, // Trigger when 10% of the element is visible
    }

    // Initialize the Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !isLoading) {
        fetchMoreItems()
      }
    }, options)

    // Start observing the sentinel element
    if (observerRef.current) {
      observerRef.current.observe(document.querySelector(".sentinel"))
    }

    return () => {
      // Clean up the observer when the component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [items, isLoading])

  const [totalItems, setTotalItems] = useState(null)
  useEffect(() => {
    setTotalItems(items.length + 5)
  }, [items])
  console.log("totalItems: ", totalItems)
  return (
    <Box pt={"88px"}>
      {items.map((item, index) => (
        <Box
          key={index}
          height="100px"
          border="1px solid #ccc"
          marginBottom="1rem"
          padding="1rem"
            className={index === totalItems && 'sentinel'}
        >
          Item {index + 1}
        </Box>
      ))}
      <div className="sentinel" style={{ height: "10px" }}></div>
      {isLoading && <p>Loading...</p>}
    </Box>
  )
}
