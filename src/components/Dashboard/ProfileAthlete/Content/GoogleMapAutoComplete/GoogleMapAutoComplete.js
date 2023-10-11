/* eslint-disable react-hooks/exhaustive-deps */
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import { useEffect } from "react"
import { useRef } from "react"
import { Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

const GoogleMapAutoComplete = ({ defaultValue, onSelect }) => {
  const containerRef = useRef()
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "spa_callback",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      clearSuggestions()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    setValue(description, false)
    clearSuggestions()
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0])
      console.log("📍 Coordinates: ", { lat, lng })
      onSelect(description, { lat, lng }) // Call the onSelect callback with the selected value
    })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <Flex key={place_id} py={'10px'} maxH={'200px'} onClick={handleSelect(suggestion)}>
          <Text cursor={'pointer'}><strong>{main_text}</strong> {secondary_text}</Text>
        </Flex>
      )
    })

  useEffect(() => {
    // Set the initial value when defaultValue prop changes
    setValue(defaultValue || "")
  }, [defaultValue])

  return (
    <Flex ref={containerRef} position={"relative"}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon ml={2} />
        </InputLeftElement>
        <Input
          type="text"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search..."
          w="100%"
          minH={"42px"}
          borderBottom={"2px solid #ccc"}
        />
      </InputGroup>
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <Flex
          flexDirection={"column"}
          position={"absolute"}
          top={"40px"}
          className="google-map-suggestions"
        >
          {renderSuggestions()}
        </Flex>
      )}
    </Flex>
  )
}

export default GoogleMapAutoComplete
