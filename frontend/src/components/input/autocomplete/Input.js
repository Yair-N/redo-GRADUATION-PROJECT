import React, { useRef } from 'react'
import styled from 'styled-components'
import ClearSearch from './ClearSearch'

const Input = (
    {
        searchTerm,
        setSearchTerm,
        onChange,
        onKeyDown = () => { },
        autoFocus,
        onFocus = () => { },
        handleClear,
        placeholder,
        inputSearchTerm,
    }

) => {

    const inputRef = useRef(null)

    let manualFocus = true

    const handleOnFocus = (event) => {
        manualFocus && onFocus(event)
    }


    const setFocus = () => {
        manualFocus = false
        inputRef?.current && inputRef.current.focus()
        manualFocus = true
    }


    return (
        <InputWrapper>

            <input
                ref={inputRef}
                type={'text'}
                spellCheck={false}
                autoFocus={autoFocus}
                placeholder={placeholder}
                value={searchTerm}
                onChange={onChange}
                onFocus={handleOnFocus}
                onKeyDown={(event) => onKeyDown(event)}
            />

            <ClearSearch
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setFocus={setFocus}
                handleClear={handleClear}
                inputSearchTerm={inputSearchTerm}
            />
        </InputWrapper>
    )
}

export default Input



const InputWrapper = styled.div`

min-height: ${props => props.theme?.height};
display: flex;
align-items: center;

> input {
    width: 100%;

    padding: 0 0 0 13px;

    border: none;
    outline: none;

    background-color: ${props => props.theme.inputBackground};
    font-size: ${props => props.theme.fontSize};
    font-family: ${props => props.theme.fontFamily} 

    color: ${props => props.theme.color};

::placeholder {
    opacity: 1;
    color: ${props => props.theme?.placeholderColor};
    :-ms-input-placeholder {
        color: ${props => props.theme?.placeholderColor};
    }

    ::-ms-input-placeholder {
        color: ${props => props.theme?.placeholderColor};
    }
}
}
`
