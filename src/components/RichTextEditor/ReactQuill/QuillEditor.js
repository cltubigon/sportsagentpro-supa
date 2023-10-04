import { Flex, Text } from "@chakra-ui/react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import { debounce } from "throttle-debounce"
import { SET_QUIL_DATA } from "../../../store/actions/postActions"
import "./QuillStyle.css"
import { useRef, useState } from "react"
import EditorCount from "./EditorCount"
import { useDispatch, useSelector } from "react-redux"
import { SET_CONTENT } from "../../../store/actions/buildPostActions"

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    // [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image"],
    // [{ align: [] }, { color: [] }, { background: [] }],
    // ["clean"],
  ],
}

// const formats = [
//   //   'font',
//   //   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   //   "image",
//   "align",
//   "color",
//   "background",
// ]

function QuillEditor() {
  console.log("quilEditor rendered")
  const dispatch = useDispatch()
  const defaultValue = useSelector((state) => state.build.postContent)
  const [characters, setCharacters] = useState(0)
  const limitCharacters = 2001

  const debounceEditor = debounce(500, ({ editor }) => {
    dispatch(SET_CONTENT(editor.getHTML()))
  })

  // console.log({ length })

  const handleChange = (content, delta, source, editor) => {
      const data = { content, delta, source, editor }
      // console.log({ data })
      // console.log(editor.getLength())
      setCharacters(editor.getLength())
      debounceEditor(data)
  }

  return (
    <Flex w={"100%"} mb={"70px"} h={"300px"} position={"relative"}>
      <ReactQuill
        style={{ height: "100%", width: "100%" }}
        theme="snow"
        modules={modules}
        defaultValue={defaultValue}
        // value={value}
        onChange={handleChange}
      />
      {characters > 0 && (
        <EditorCount count={characters} limitCharacters={limitCharacters} />
      )}
    </Flex>
  )
}

export default QuillEditor
