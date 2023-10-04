import React, { useState, useEffect } from "react"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"

const SlateEditor = () => {
  const editor = withReact(createEditor())
  const [value, setValue] = useState(null) // Start with null or an empty array

  console.log({ value })
  // Use useEffect to set the initial value after component mount
  useEffect(() => {
    setValue([
      {
        type: "paragraph",
        children: [{ text: "Hello, Slate.js!" }],
      },
    ])
  }, [])

  // Render Slate component only when value is not null
  return (
    value && (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        {/* Render your editor here */}
        <Editable />
      </Slate>
    )
  )
}

export default SlateEditor
