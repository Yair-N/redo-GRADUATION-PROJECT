import { React, useRef, useEffect } from 'react'
import { StyledInput } from './input/styled_input'
import { ReactComponent as CancelIcon } from "./cancel-cross-svgrepo-com.svg";
import styled from "styled-components";

const Input = (
    { onKeyDown, onCancel, placeholder, searchTerm, setSearchTerm, onChange },
) => {

    const handleClear = () => {

        setSearchTerm('')
    }

    return (

        <StyledInput >
            <input
                spellCheck={false}
                placeholder={placeholder}
                type={'text'}
                value={searchTerm}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />

            <CancelIcon
                style={searchTerm?.length > 0 ? { display: 'block' } : { display: 'none' }}
                type='button'
                width={20}
                height={20}
                focusable="false"
                onClick={handleClear}
            />


        </StyledInput>
    )
}

export default Input




const StyledInput = styled.div`

            display: flex;
            align-items: center;
            width: 100%;
            border: 2px solid gainsboro;
            border-radius: 4px;
            font-size: 1.2rem;
            z-index: 10;
            background: transparent;
            > input {
                width: 100%;
            
                padding: 0 0 0 13px;
            
                border: none;
                outline: none;
            
                background-color: rgba(0, 0, 0, 0);
                font-size: inherit;
                font-family: inherit;
            
                color: ${(props) => props.color};
            
                ::placeholder {
                  color: ${(props) => props.placeholderColor};
                  opacity: 1;
            
                  :-ms-input-placeholder {
                    color: ${(props) => props.placeholderColor};
                  }
            
                  ::-ms-input-placeholder {
                    color: ${(props) => props.placeholderColor};
                  }}
            &:focus {
                outline: none;
            border-color: lightblue;
            box-shadow: 0 0 4px lightblue;
  }}
            `