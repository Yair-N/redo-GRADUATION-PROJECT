import React from 'react'
import styled from 'styled-components'

const Suggestions = ({
    onHover,
    onClick,
    handleActiveSuggestion,
    suggestions = [],
    suggestionsLen,
    activeSuggestion,
    formatSuggestions,
    searchComplete,
}
) => {



    const handleClick = (event, item) => {
        onClick(event, item)
    }


    const handleMouseDown = (event, item) => {
        if (event.button === 0) {
            event.preventDefault()
            handleClick(event, item)
        }
    }

    const handleMouseEnter = (event, index) => {
        event.preventDefault()
        handleActiveSuggestion(index)
        onHover(event)
    }


    if (suggestions.length === 0 || searchComplete) {
        return null
    }
    else
        return (
            <SuggestionsWrapper >
                <div className="line" />
                <ul>
                    {suggestions.slice(0, suggestionsLen).map((item, index) => {


                        return (
                            <li
                                className={activeSuggestion === index ? 'is_active' : ''}
                                onMouseEnter={(event) => handleMouseEnter(event, index, item)}
                                key={`suggestion-${index}`}
                                onMouseDown={(event) => handleMouseDown(event, item)}
                                onClick={() => handleClick(item)}
                            >
                                <div
                                    className="ellipsis"
                                    title={item[Object.keys(item)[0]]}
                                >
                                    {formatSuggestions(item)}
                                </div>
                            </li>

                        )
                    })}
                </ul>
            </SuggestionsWrapper >

        )

}

export default Suggestions


const SuggestionsWrapper = styled.div`
  > div.line {
    border-top-color: ${props => props.theme.lineColor};
    border-top-style: solid;
    border-top-width: 1px;

    margin-bottom: 0px;
    margin-left: 14px;
    margin-right: 20px;
    margin-top: 0px;

    padding-bottom: 4px;
  }

  > ul {
    z-index:2;

    list-style-type: none;
    margin: 0;
    padding: 0px 0 16px 0;
    max-height: ${props => props.theme.maxHeight};
   


    > li {
    display: flex;
    align-items: center;
    padding: 4px 0 4px 0;

    > div {
    margin-left: 13px;
      }
    }
  }

  .ellipsis {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .is_active {
    background-color: ${props => props.theme.hoverBackgroundColor};
  }
`
