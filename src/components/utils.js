const DAYS_IN_WEEK = 7;
const TODAY = new Date()


//кол-во дней в месяце
export const getLengthOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

//день недели первого дня месяца

export const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getUTCDay()
}

//Массив всех дней месяца
export const getDaysOfMonth = (date) => {
    const { month, year, length } = getDateInfo(date)
    return [...new Array(length)].map((day, index) =>
        new Date(year, month, index + 1))

}

const getDateInfo = (date) => {
    return {
        date: date.getDate(),
        day: date.getUTCDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        length: getLengthOfMonth(date),
    }
}


//Массив недель месяца
export const getWeaks = (daysOfMonth) => {
    const [head] = daysOfMonth
    const { date, day, month, year } = getDateInfo(head)

    if (date == 1) { //первые дни месяца

        //дни предыдущего месяца
        const monthBefore = [...new Array(day)]
            .map((item, index) => new Date(year, month, (0 - index)))
            .reverse()

        return [[...monthBefore, ...daysOfMonth.slice(0, DAYS_IN_WEEK - day)],
        ...getWeaks(daysOfMonth.slice(DAYS_IN_WEEK - day, daysOfMonth.length))]
    }

    if (daysOfMonth.length < 7) { // последние дни месяца

        //дни следующего месяца
        const monthAfter = [...new Array(DAYS_IN_WEEK - daysOfMonth.length)]
            .map((item, index) => new Date(year, month + 1, index))

        return [[...daysOfMonth, ...monthAfter]]
    }

    return [daysOfMonth.slice(0, DAYS_IN_WEEK), //середина месяца
    ...getWeaks(daysOfMonth.slice(DAYS_IN_WEEK - day, daysOfMonth.length))
    ]

}

