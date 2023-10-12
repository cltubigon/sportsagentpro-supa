/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@chakra-ui/react"
import React, { useEffect, useRef } from "react"
import useUpdateSingleColumn from "../../../../../hooks/update/useUpdateSingleColumn"
import { debounce } from "throttle-debounce"
/* global google */

const GoogleMapLocationAutoComplete = (props) => {
  const { query, initialValue } = props
  const autocompleteInput = useRef(null)
  let autocomplete = null

  const { mutate } = useUpdateSingleColumn(query)

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace()
    // setValue(place?.formatted_address)
    mutate(place?.formatted_address)
    // console.log({ place })
  }

  useEffect(() => {
  // setValue(initialValue)
  if (window.google) {
    // console.log({ google })
    autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.current,
      { types: ["geocode"] }
    )
    autocomplete.addListener("place_changed", handlePlaceChanged)
    return () => {
      // Clean up the autocomplete when the component unmounts
      google?.maps.event.clearInstanceListeners(autocomplete)
    }
  }
  }, [window.google])

  const myDebounce = debounce(500, (value)=> {
    console.log('location: ', value)
    mutate(value)
  })
  const handleInputChange = (e) => {
    myDebounce(e.target.value)
  }

  return (
    <Input
      ref={autocompleteInput}
      defaultValue={initialValue}
      id="autocomplete"
      onChange={handleInputChange}
      className="autoCompleteInput"
      placeholder="Enter your address"
      type="text"
    />
  )
}

export default GoogleMapLocationAutoComplete
