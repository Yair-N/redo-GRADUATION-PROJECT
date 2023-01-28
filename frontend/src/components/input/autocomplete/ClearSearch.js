import React from 'react'
import styled from 'styled-components'



const ClearSearch = (
    {
        setSearchTerm,
        searchTerm,
        setFocus = () => { },
        handleClear = () => { },
        inputSearchTerm,
        handleClearSearchTerm
    }
) => {

    const handleClick = () => {
        handleClear()
        setFocus()
    }


    if (searchTerm?.length > 0) {
        return (
            <IconContainer
                id={'clearIcon'}
            >
                <svg

                    onClick={handleClick}
                    focusable={"false"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    viewBox={"0 0 30 20"}>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59
                12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                    </path>

                </svg>
            </IconContainer>)
    } else {
        return (
            <IconContainer
                id={'searchIcon'}
            >
                <svg

                    focusable={"false"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    viewBox={"0 0 30 20"}
                >
                    <path
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0
                    9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6
                    0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    >
                    </path>
                </svg>
            </IconContainer >
        )
    }


}

export default ClearSearch


const IconContainer = styled.div`
margin: ${props => props.theme.iconMargin};


    &:hover {
        cursor:${props => props?.id === 'clearIcon' ? 'pointer' : 'text'}
        }
}


> svg {
width:${props => props.theme.iconWidth ? props.theme.iconWidth : 20};
height:${props => props.theme.iconHeight ? props.theme.iconHeight : 20};

fill: ${props => props.theme.iconColor};

}

`
