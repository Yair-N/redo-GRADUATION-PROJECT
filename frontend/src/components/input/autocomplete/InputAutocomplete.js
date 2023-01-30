import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Fuse from "fuse.js";

import Input from './Input'
import Suggestions from './Suggestions'
import { defaultTheme, defaultFuseOptions } from '../../../conf/autocompletconf'


// import useFuse from '../../../hooks/useFuse'

const InputAutocomplete = (
  {
    items,
    fuseOptions = {},
    onSearch = () => { },
    onHover = () => { },
    onSelect = () => { },
    onFocus = () => { },
    onClear = () => { },
    placeholder = '',
    autoFocus = false,
    style = {},
    suggestionKey = '',
    inputSearchTerm = '',
    formatSuggestions = null,
    showItemsOnFocus = false,
    maxSuggestions = 12
  }

) => {

  const theme = { ...defaultTheme, ...style }
  const options = { ...defaultFuseOptions, ...fuseOptions }
  const itemList = items ? items : []
  const fuse = new Fuse(itemList, options)

  const [searchTerm, setSearchTerm] = useState(inputSearchTerm)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [activeItem, setActiveItem] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [searchComplete, setSearchComplete] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)


  const suggestionsLen = maxSuggestions > 0 && maxSuggestions <= suggestions.length > 0 ? maxSuggestions : suggestions.length

  useEffect(() => {
    const handleDocumentClick = () => {
      setSearchComplete(true)
    }

    document.addEventListener('click', handleDocumentClick)

    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])


  useEffect(() => {
    switch (searchComplete) {
      case true:
        setSuggestions([])

        break
      case false:
        if (searchTerm.length > 1) {
          let results = fuse.search(searchTerm);
          setSuggestions(results.map(({ item }) => item))
        }
        else setSuggestions([])

        break
    }

  }, [searchTerm, searchComplete])

  const reset = () => {
    setSearchTerm(inputSearchTerm)
    setActiveSuggestion(-1)
    setSelectedItem({})
  }

  const handleChange = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
    setActiveSuggestion(-1)
    setSelectedItem({})
    setSearchComplete(false)
    setHasFocus(true)
    onSearch(event)
  }



  const handleClear = () => {
    reset()
    onClear()
  }

  const updateActiveSuggestion = (index) => {
    setActiveSuggestion(index)
    setActiveItem(suggestions[index])
  }

  const handleOnKeyDown = (event) => {
    // console.log(event)
    switch (event.key) {
      case 'Enter':
        if (activeSuggestion > -1 && suggestions.length > 0) {
          event.preventDefault()
          handleSelection(event, activeItem)
        }

        break
      case 'ArrowUp':
        if (activeSuggestion > 0)
          updateActiveSuggestion(activeSuggestion - 1)
        break
      case 'ArrowDown':
        if (activeSuggestion < suggestionsLen - 1)
          updateActiveSuggestion(activeSuggestion + 1)
        break

        break
      case 'Escape':
        event.preventDefault()
        onClear()
        reset()
        break
      default:
        break
    }
  }


  const handleFormatting = (item) => {
    if (suggestionKey.length > 1 || formatSuggestions) {

      return formatSuggestions ? formatSuggestions(item) : `${suggestionKey}:${item[suggestionKey]}`
    } else {
      // handle a case with no key name or suggestion formatting
      return `${Object.keys(item)[0]}:${item[Object.keys(item)[0]]}`
    }
  }

  const stringifySuggestion = (item) => {
    let string = ""
    let element = handleFormatting(item)

    if (typeof (element.$$typeof) === 'symbol') {
      let children = element['props']['children']['props']['children']
      console.log(children, children.length)
      string = typeof (children) === Array ? children.join("").toString() : children
    }
    return string

  }

  const handleSelection = (event, item) => {
    if (searchTerm !== inputSearchTerm && suggestions.length > 0) {
      setSearchTerm(stringifySuggestion(item))
      setSearchComplete(true)
      onSelect(event, item)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <div className='wrapper'>
          <Input
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={(event) => handleChange(event)}
            onKeyDown={handleOnKeyDown}
            onClear={onClear}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            inputSearchTerm={inputSearchTerm}
            handleClear={handleClear}
            onFocus={onFocus}
          />
          <Suggestions
            onClick={handleSelection}
            handleActiveSuggestion={updateActiveSuggestion}
            setActiveItem={setActiveItem}
            setActiveSuggestion={setActiveSuggestion}
            setSearchTerm={setSearchTerm}
            setSelectedItem={setSelectedItem}
            formatSuggestions={handleFormatting}
            suggestionsLen={suggestionsLen}
            activeItem={activeItem}
            activeSuggestion={activeSuggestion}
            suggestions={suggestions}
            searchComplete={searchComplete}
            onHover={onHover}
          />
        </div>
      </MainWrapper>
    </ThemeProvider>
  )

}

export default InputAutocomplete



const MainWrapper = styled.div`
  position: relative;

  height: ${props => parseInt(props.theme.maxHeight) + 2 + 'px'};
  > .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-width: ${props => props.theme.maxWidth ? props.theme.maxWidth : '100%'} ;
    min-width:${props => props.theme.minWidth ? props.theme.minWidth : '100%'} ;
    border: ${props => props.theme.border};
    border-radius: ${props => props.theme.borderRadius};

    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};

    font-size: ${props => props.theme.fontSize};
    font-family: ${props => props.theme.Family};

    z-index: ${props => props.theme.zIndex};

    &:hover {
      box-shadow: ${props => props.theme.boxShadow};
    }
    &:active {
      box-shadow: ${props => props.theme.boxShadow};
    }
    &:focus-within {
      box-shadow: ${props => props.theme.boxShadow};
    }
  }
`