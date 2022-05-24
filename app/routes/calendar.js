import { Info, Interval, DateTime } from 'luxon'

function * days (interval) {
  let cursor = interval.start.startOf('day')
  while (cursor < interval.end) {
    yield cursor
    cursor = cursor.plus({ days: 1 })
  }
}

const start = DateTime.local(2022, 1, 1)
const end = DateTime.local(2023, 1, 1)
const interval = Interval.fromDateTimes(start, end)

export const calendarRoutes = router => {
  router.all('/calendar/year', (req, res, next) => {
    const weekdays = Info.weekdays()
    const months = Info.months().map((month) => {
      return { name: month, dates: [] }
    })

    for (var d of days(interval)) {
      const month = months[d.month - 1]
      const date = {
        day: d.day,
        weekday: weekdays[d.weekday - 1],
        object: d
      }

      if (d.day === 1) {
        month.startOffset = d.weekday - 1
      }

      if (d.month !== d.plus({ days: 1 }).month) {
        month.endOffset = 7 - d.weekday
      }

      month.dates.push(date)
    }

    res.locals.weekdays = weekdays
    res.locals.months = months
    next()
  })
}
