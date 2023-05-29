import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw, getDefaultKeyBinding } from "draft-js"
import React, { useState, useRef } from "react"
import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import "./richEditor.css"
import "../../../node_modules/draft-js/dist/Draft.css"
import {
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeH1,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from "react-icons/bs"
import { useDispatch } from "react-redux"
import { setContent } from "../../store/actions/buildPostActions"
import { useEffect } from "react"

const RichEditor = ({ borderColorWidthStyle, borderRadius, height, setRawDataString, rawDataParsed, setAvailableCharacters }) => {
    const dispatch = useDispatch()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef(null)

  const characterLimit = 2000
  const characterCount = editorState.getCurrentContent().getPlainText('').length
  const remainingCharacters = characterLimit - characterCount
  // setAvailableCharacters(remainingCharacters)

  const focusEditor = () => {
    editorRef.current.focus()
  }

  const onChangeEditorState = (newEditorState) => {
    setEditorState(newEditorState)
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChangeEditorState(newState)
      return true
    }
    return false
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
      if (newEditorState !== editorState) {
        onChangeEditorState(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChangeEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const toggleBlockType = (blockType) => {
    onChangeEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  let className = "RichEditor-editor"
  const contentState = editorState.getCurrentContent()
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder"
    }
  }

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      // fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  }

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote"
      default:
        return null
    }
  }

  const StyleButton = (props) => {
    const onToggle = (e) => {
      e.preventDefault()
      props.onToggle(props.style)
    }

    const isActive = () => {
      if (props.type === "block") {
        const selection = editorState.getSelection()
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        return blockType === props.style
      } else {
        const currentStyle = editorState.getCurrentInlineStyle()
        return currentStyle.has(props.style)
      }
    }

    return (
      <IconButton
        aria-label={props.label}
        icon={props.icon}
        bgColor={isActive() ? "gray.300" : "gray.100"}
        _hover={{
          backgroundColor: "gray.300",
        }}
        onMouseDown={onToggle}
        ml={1}
      />
    )
  }

  // ------------ RICH TEXT SAVE ------------
  useEffect(()=> {
      const rawData = convertToRaw(editorState.getCurrentContent())
      setRawDataString(JSON.stringify(rawData))
      setAvailableCharacters(remainingCharacters)
  }, [editorState])

  // ------------ RICH TEXT GET ------------
  useEffect(()=> {
    if (rawDataParsed) {
        const theContentState = convertFromRaw(rawDataParsed)
        setEditorState(EditorState.createWithContent(theContentState))
    }
  }, [rawDataParsed])

  return (
    <Box
      className="RichEditor-root"
      sx={borderColorWidthStyle}
      borderRadius={borderRadius}
    >
      <Flex>
        <StyleButton
          type="inline"
          label="Bold"
          style="BOLD"
          icon={<BsTypeBold />}
          onToggle={toggleInlineStyle}
        />
        <StyleButton
          type="inline"
          label="Italic"
          style="ITALIC"
          icon={<BsTypeItalic />}
          onToggle={toggleInlineStyle}
        />
        <StyleButton
          type="inline"
          label="Underline"
          style="UNDERLINE"
          icon={<BsTypeUnderline />}
          onToggle={toggleInlineStyle}
        />
        <StyleButton
          type="inline" // Use inline type for strikethrough
          label="Strikethrough"
          style="STRIKETHROUGH"
          icon={<BsTypeStrikethrough />}
          onToggle={toggleInlineStyle}
        />
        <StyleButton
          type="block"
          label="Unordered List"
          style="unordered-list-item"
          icon={<BsListUl />}
          onToggle={toggleBlockType}
        />
        <StyleButton
          type="block"
          label="Ordered List"
          style="ordered-list-item"
          icon={<BsListOl />}
          onToggle={toggleBlockType}
        />
        <Text ml={'auto'} alignSelf={'flex-end'} color={remainingCharacters < 0 ? 'red' : 'gray.400'} >{remainingCharacters}</Text>
      </Flex>
      <Box
        className={className}
        onClick={focusEditor}
        borderTop={"1px solid #ddd"}
        maxHeight={height}
        overflowY={"auto"}
        overflowX={"hidden"}
      >
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChangeEditorState}
          placeholder={"Create your deal brief here using the instructions above"}
          ref={editorRef}
          spellCheck={true}
        />
      </Box>
    </Box>
  )
}

export default RichEditor