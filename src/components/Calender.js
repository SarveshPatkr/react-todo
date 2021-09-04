import React, { useState } from 'react'
import "./css/Calender.css"

export default function Calender() {

    var date = new Date()
    console.log('====================================');
    console.log(date);
    console.log('====================================');

    // var month = date.getMonth()
    // var year = date.getFullYear()
    const [month, setMonth] = useState(date.getMonth())
    const [year, setYear] = useState(date.getFullYear())
    var Day = date.getDate()
    console.log(Day)

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

    return (
        <div className="calender">
            <div className="calender-header">
                <div className="calender-header-left">
                    <div className="calender-header-left-year">{year}</div>
                    <div className="calender-header-left-month">{monthName[month]}</div>
                </div>
                <div className="calender-header-right">
                    <div className="calender-header-right-day">{week[date.getDay()]}</div>
                    <div className="calender-header-right-date">{Day}</div>
                </div>
            </div>
            <div className="calender-body">
                <div className="calender-body-week">
                    {week.map((day, index) => {
                        return (
                            <div className="calender-body-week-day" key={index}>{day}</div>
                        )
                    })}
                </div>
                <div className="calender-body-date">
                    {days.map((day, index) => {
                        return (
                            <div className={`calender-body-date-item ${(Day === day) ? ' active' : ''} ${(parseInt(day) ? ' ' : 'disable')}`} key={index}>
                                {day}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
