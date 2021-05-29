import React, { useState } from 'react'
import { getDaysOfMonth, getWeaks } from './utils'

const PARAMS = {
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}

export const App = ({ initDate = new Date() }) => {

    const [state, setState] = useState({
        today: initDate,
        active: initDate
    })

    const daysOfMonth = getDaysOfMonth(state.active)
    const weaksOfMonth = getWeaks(daysOfMonth)

    return <div className="calendar">
        <select name="month">
            {PARAMS.months.map(month => <option value={month} key={month}>{month}</option>)}
        </select>

        <table className="calendar__body">
            <thead>
                <tr>
                    {PARAMS.days.map(day => <th key={day}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {weaksOfMonth.map(weak =>
                    <tr key={Math.random() * 100000}>
                        {weak.map(date => {
                            return <td className={`calendar__date${date.getMonth() == state.active.getMonth() ? "" : " date--inactive" }`} key={Math.random() * 100000}>
                                {date ? date.getDate() : ""}
                            </td>
                        })}
                    </tr>)}
            </tbody>
        </table>
    </div>
}


