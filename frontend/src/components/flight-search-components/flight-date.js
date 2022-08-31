import 'react-calendar/dist/Calendar.css';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { date_obj, date_objToString } from '../../context/trip/tripSlice';


const FlightDate = ({ bind, title, startDate, alt }) => {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    const handleClickdepart = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleSelectDay = (value, event) => {
        setDate(value)
        setOpen(false)

    }

    const handleCalenderChange = (event) => {
        setAnchorEl(anchorEl)
        setOpen(true)
    }

    useEffect(() => {

        if (bind) {
            dispatch(bind(date_obj(date)))
        }
    }, [date])


    useEffect(() => {
        if (startDate > date)
            setDate(startDate)
    }, [startDate])

    useEffect(() => {
        setOpen(Boolean(anchorEl))
    }, [anchorEl])

    const id =  open ? { title } : undefined;


    return (
        <div className="fss_flex depdate_colm sechver deplbl">
            <div
                className="innerspcr"
                onClick={handleClickdepart}
                aria-describedby={id}
            >
                <p className="srlabel">{title}</p>
                <input
                    name=""
                    type="text"
                    hidden
                    placeholder="Departure"
                />
                <Popper id={'depart'} open={open} anchorEl={anchorEl}>
                   <Calendar
                        minDate={new Date()}
                        id={id}
                        nextLabel={null}
                        next2Label={null}
                        prev2Label={null}
                        prevLabel={null}
                        onDrillDown={handleCalenderChange}
                        onDrillUp={handleCalenderChange}
                        onChange={handleCalenderChange}
                        onViewChange={handleCalenderChange}
                        onClickDay={handleSelectDay}
                        value={date}
                        name='depart' />
                </Popper>
                {alt ? (<p className="airptname" > {alt}</p>) :
                    (<>
                        <p>
                            <span className="ftn25 mgr5">
                                {date.getDate()}
                            </span>
                            <span className="ftn13">
                                {`${date.toLocaleString('en-us', { month: 'short' })}
                                        ${date.getFullYear()}`}
                            </span>
                        </p>
                        <p className="airptname" >
                            {date.toLocaleString('en-us', { weekday: 'long' })}
                        </p>
                    </>)}
            </div>
            <div  ></div>
        </div>
    )
}

export default FlightDate