import { React, useRef, useEffect } from 'react'
import styled from 'styled-components';



const Suggestions = (
    {

        searchTerm = '',
        onFocus = () => { },
        options,
        items,
        suggestionFormat,
        handle_selection,
        suggestions,
        activaItem,
        setSuggestionString,
        setSelectedObject,

    }

) => {

    const ref = useRef(null)

    useEffect(() => {
        const updateSelection = (suggestions) => {
            if (suggestions?.length > 0 && activaItem > -1) {
                setSelectedObject(suggestions[activaItem])
                let element = suggestionFormat(suggestions[activaItem])
                let string = element['props']['children']['props']['children'].join("").toString()
                setSuggestionString(string)
            }
        }

        return updateSelection(suggestions)

    }, [activaItem])




    return (
        <SuggestionsContainer >
            <SuggestionsDropdown
                show={searchTerm.length > 0 && suggestions.length > 0}
            >
                <List ref={ref}
                >

                    {suggestions.map((item, index) => (
                        <SuggestionItem
                            index={index}
                            active={activaItem}
                            key={index}>{suggestionFormat(item)}</SuggestionItem>
                    ))}
                </List>
            </SuggestionsDropdown>
        </SuggestionsContainer>
    )
}

export default Suggestions




const SuggestionsContainer = styled.div`
            position: relative;
            `;

const SuggestionsDropdown = styled.div`
            position: absolute;
            width: 100%;
            border: 2px solid gainsboro;
            border-radius: 4px;
            margin-top: 2px;
            box-sizing: border-box;
            display: ${({ show }) => (show ? "block" : "none")};
            `;


const List = styled.ol`
            list-style: none;
            text-align: start;
            font-size: 1.1rem;
            padding: 0;
            margin: 0;
            `;

const SuggestionItem = styled.li`
            padding: 1.1rem;
            transition: all 250ms ease-in-out;
            background:${(props) => (props.active === props.index ? '#cccccc' : 'inherit')};
            &:hover {
                background: #cccccc;
  }
  
            `;