import React from 'react'
import AirportSearch from '../search-autocomplete/AirportSearch'
import { useDispatch } from 'react-redux'


const FlightSearchInput = ({ title, bind, choice }) => {

    const [result, setResult] = React.useState(false)
    const [airport, setAirport] = React.useState({})
    const dispatch = useDispatch()
    const handleChange = (item) => {

        setResult(false)

    }

    const handleOnSelect = (item) => {
        setResult(true)
        setAirport(item)
        dispatch(bind(item))
    }

    const handleClear = () => {

        setResult(false)
    }




    return (
        <div className="fss_flex depcity_colm sechver">
            <div
                className="innerspcr"
                onClick={() => null}
            >
                <p className="srlabel">{title}</p>
                {/* <input
                    onKeyDown={() => null}
                    type="text"
                    onChange={() => null}
                    onBlur={() => null}
                    className="autoFlll cityinput"
                    placeholder={title}
                    onClick={() => null}

                /> */}
                <AirportSearch
                    
                    onClear={handleClear}
                    onSelect={handleOnSelect}
                    onSearch={handleChange}
                    result={choice}
                    placeholder={title.toUpperCase()}
                    styling={{
                        iconColor: "#3498DB",
                        borderRadius: 0,
                        border: 0,
                        fontFamily: 'typography.fontFamily',
                        height: '26px',
                        padding: 0,
                        width: '100%',
                    }} />
                <p
                    className="airptname tellipsis"
                    onClick={() => null}
                >
                    {result && `${airport.name} ${airport.country_name}`}
                </p>
            </div>
        </div>
    )
}

export default FlightSearchInput