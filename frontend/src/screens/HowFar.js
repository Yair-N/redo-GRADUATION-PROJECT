import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import Hero from '../components/layout/Hero'
import RangeBar from '../components/input/RangeBar'
import InputAutocomplete from '../components/input/autocomplete/InputAutocomplete'
import { selectAirports, staticActions} from '../context/static/staticSlice';






const HowFar = () => {

    const airports = useSelector(selectAirports)

    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    // extracted props
    const onSearch = (event) => {
        // console.log('search', event)
    }
    const onHover = (event) => {
        // console.log('hover', event)
    }
    const onSelect = (event, item) => {
        // console.log('selected:', item)
        dispatch(staticActions.setOrigin(item))
    }
    const onFocus = (event) => {
        // console.log('focus', event)
    }
    const onClear = () => {
        dispatch(staticActions.clearOrigin())
    }

    //format example
    const formatSuggestions = (item) => {
        return (
            <>
                <span style={{
                    cursor: 'default'
                    , display: 'flex',
                }}>{item.display_name}</span>
            </>
        )

    }
    const style = {}
    //const items =[]

    useEffect(() => {
        setItems(airports)
    }, [airports])



    return (
        <Hero style={{ zIndex: 3 }}>
            <span>
                Where will you begin your journey?
            </span>
            <InputContainer >
                <InputAutocomplete
                    style={{ zIndex: 1 }}
                    onSearch={onSearch}
                    onHover={onHover}
                    onSelect={onSelect}
                    onFocus={onFocus}
                    onClear={onClear}
                    formatSuggestions={formatSuggestions}
                    items={items}
                    placeholder={'Find an airport by country, city, name or code'}
                    fuseOptions={{ keys: ['display_name','city', 'name'] }}

                />

            </InputContainer>
            <span>
                How far Would you like to travel?
            </span>
            <InputContainer >
                <RangeBar style={{ zIndex: 2 }} />
            </InputContainer>
        </Hero>
    )
}

export default HowFar


const InputContainer = styled.div`
width:100%;
position:relative;
padding:1.5rem;
align-items:center;
justify-content:center;
`