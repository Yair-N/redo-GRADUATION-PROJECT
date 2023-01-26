import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import Suggestions from './Suggestions';
import Input from './Input';


import { useFuse } from '../../../hooks/useFuse';


const Autocomplete = ({
    items,
    options,
    suggestionFormat,
    placeholder,
}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [prevTerm, setPrevTerm] = useState("")
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [suggestionsLength, setSuggestionsLength] = useState(0)
    const [selectedObject, setSelectedObject] = useState({})
    const [suggestionString, setSuggestionString] = useState('')

    const inputRef = useRef(null)
    // fuse and display results
    const fuse_options = { ...default_fuse_options, ...options }
    const suggestions = useFuse(searchTerm, items, options = fuse_options);

    const handleClear = () => {
        setActiveSuggestion(-1)
        setSearchTerm("")
        setSuggestionsLength(0)
        setSelectedObject({})
        setSuggestionString("")
    }

    useEffect(() => {
        setSuggestionsLength(suggestions.length)
    }, [suggestions])



    useEffect(() => {
        const resetValues = () => {
            setActiveSuggestion(-1)
            setSuggestionsLength(0)
            setSelectedObject({})
            setSuggestionString("")
        }

        if (searchTerm === "" && prevTerm !== "") {
            resetValues()
        }

    }, [searchTerm])


    const handleInputKeyDown = (event) => {

        if (suggestionsLength > 0) {

            switch (event.key) {

                case 'ArrowDown':
                    event.preventDefault()
                    if (activeSuggestion === -1) {
                        setActiveSuggestion(0)
                    }
                    else setActiveSuggestion(suggestionsLength - 1 > activeSuggestion ? activeSuggestion + 1 : activeSuggestion)
                    break
                case 'ArrowUp':
                    event.preventDefault()
                    if (activeSuggestion > 0) {
                        setActiveSuggestion(activeSuggestion - 1)
                    }

                    break

                case 'Enter':
                    event.preventDefault()
                    if (activeSuggestion > -1) {
                        setSearchTerm(suggestionString)
                    }

                    break
                default:
                    break
            }
        }

    }

    const handleSelected = (selected) => {
        setSearchTerm(selected)
    }

    const handleOnFocus = (event) => {


    }


    const handleSearchTermChange = (event) => {
        setPrevTerm(searchTerm)
        setSearchTerm(event.target.value)
    }
    return (
        <AutocompleteContainer>
            <Input
                value={searchTerm}
                onChange={(event) => handleSearchTermChange(event)}
                placeholder={placeholder}
                onKeyDown={(event) => handleInputKeyDown(event)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} />

            <Suggestions
                suggestions={suggestions}
                suggestionFormat={suggestionFormat}
                options={options}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activaItem={activeSuggestion}
                setSelectedObject={setSelectedObject}
                setSuggestionString={setSuggestionString}

            />

        </AutocompleteContainer>
    );
};

export default Autocomplete

const default_fuse_options = {
    // includeScore: true,
    threshold: .2,
    minMatchCharLength: 2,
    includeMatches: true,
}




export const AutocompleteContainer = styled.div`
            width: 100%;
            margin: 0 auto;
            `;


