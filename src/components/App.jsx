import React, { useState, useEffect } from 'react'
import { monthToArray, getDateInfo } from './utils'

const PARAMS = {
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}

export const App = ({ initDate = new Date() }) => {

    const [state, setState] = useState({
        today: initDate,
        active: initDate
    })

    const handleChangeActiveYear = (argument) => {
        setState(prev => {
            const { year, month } = getDateInfo(prev.active);
            return { ...prev, active: new Date(year + argument, month, 1) }
        })
    }

    const handleChangeActiveMonth = (event) => {

        const month = PARAMS.months.indexOf(event.target.value)

        setState(prev => {
            const year = prev.active.getFullYear();
            return { ...prev, active: new Date(year, month, 1) }
        })
    }

    return <div className="calendar">
        <div className="calendar__nav">
            <div>
                <input
                    type="button"
                    value="&#9668;"
                    onClick={() => handleChangeActiveYear(-1)}
                />
                <span>{state.active.getFullYear()}</span>
                <input
                    type="button"
                    value="&#9658;"
                    onClick={() => handleChangeActiveYear(1)}
                />
            </div>
            <select name="month" value={PARAMS[state.active.getMonth()]} onChange={handleChangeActiveMonth}>
                {PARAMS.months.map(month => <option value={month} key={month}>{month}</option>)}
            </select>
        </div>

        <table className="calendar__body">
            <thead>
                <tr>
                    {PARAMS.days.map(day => <th key={day}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {monthToArray(state.active).map(weak =>
                    <tr key={Math.random() * 100000}>
                        {weak.map(date => {
                            
                            //!!!времянка, переделать
                            const attr = ['calendar__date']
                            date.getMonth() !== state.active.getMonth() && attr.push('date--inactive')
                            date.getDate() == state.today.getDate() && date.getMonth() == state.today.getMonth() && date.getFullYear() == state.today.getFullYear() && attr.push('date--today')

                            return <td className={attr.join(' ')} key={Math.random() * 100000}>
                                {date ? date.getDate() : ""}
                            </td>
                        })}
                    </tr>)}
            </tbody>
        </table>
    </div>
}


