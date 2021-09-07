import React, { useState } from 'react'
import "./css/Calendar.css"

export default function Calendar() {

    var date = new Date()

    const [month, setMonth] = useState(date.getMonth())

    const [year, setYear] = useState(date.getFullYear())

    var Day = date.getDate()

    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    var firstDay = new Date(year, month, 1).getDay()

    var lastDay = new Date(year, month + 1, 0).getDate()

    var days = []

    for (let i = 0; i < firstDay; i++) {
        days.push('')
    }
    for (let i = 1; i <= lastDay; i++) {
        days.push(i)
    }

    for (let i = 0; i < (days.length % 7 - firstDay); i++) {
        days.push('')
    }

    fetch("http://127.0.0.1:8000/api/event/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(
        (result) => {
            console.log(result)
        }
    )
    const changeMonth = async (event) => {
        if (event.target.value === "next") {
            if (month === 11) {
                setMonth(0)
                setYear(year + 1)
            } else {
                setMonth(month + 1)
            }
        }
        else {
            if (month === 0) {
                setMonth(11)
                setYear(year - 1)
            }
            else {
                setMonth(month - 1)
            }
        }
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-header-left">
                    <div className="calendar-header-left-year">{year}</div>
                    <div className="calendar-header-left-month">{monthName[month]}</div>
                </div>
                <div className="calendar-header-right">
                    <div className="calendar-header-right-day">{week[date.getDay()]}</div>
                    <div className="calendar-header-right-date">{Day}</div>
                </div>
            </div>
            <div className="calendar-body">
                <div className="change-months">
                    <button className="change-months-prev" onClick={changeMonth} value="prev" >prev</button>
                    <button className="change-months-next" onClick={changeMonth} value="next" >next</button>
                </div>
                <div className="calendar-body-week">
                    {week.map((day, index) => {
                        return (
                            <div className="calendar-body-week-day" key={index}>{day}</div>
                        )
                    })}
                </div>
                <div className="calendar-body-date">
                    {days.map((day, index) => {
                        if (day !== '') {
                            return (
                                <div className={`calendar-body-date-item ${((Day === day) && (month === date.getMonth()) && (year === date.getFullYear())) ? ' active' : ''} ${(parseInt(day) ? ' ' : 'disable')}`} key={index}>
                                    <h6>{day}</h6>
                                    <div className="calendar-events">
                                        <div className="calendar-event">
                                            <span>Event Title</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className={`calendar-body-date-item ${((Day === day) && (month === date.getMonth()) && (year === date.getFullYear())) ? ' active' : ''} ${(parseInt(day) ? ' ' : 'disable')}`} key={index}>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
