import { Info, Interval, DateTime } from 'luxon'

function * iterableDays (interval) {
  let cursor = interval.start.startOf('day')
  while (cursor < interval.end) {
    yield cursor
    cursor = cursor.plus({ days: 1 })
  }
}

const getDaysOfYear = (year) => {
  const now = DateTime.now()
  const startingMonth = year === now.year ? now.month : 1
  const start = DateTime.local(year, startingMonth, 1)
  const end = DateTime.local(year + 1, 1, 1)
  const interval = Interval.fromDateTimes(start, end)
  return iterableDays(interval)
}

const decorateDate = (date, unavailability, isOffsetDate) => {
  return {
    day: date.day,
    weekday: Info.weekdays()[date.weekday - 1],
    weekdayShort: Info.weekdays('short')[date.weekday - 1],
    object: date,
    iso: date.toISODate(),
    unavailable: unavailability[date.toISODate()],
    weekend: [6, 7].includes(date.weekday),
    isOffsetDate
  }
}

const setCalendarForYear = (req, res, year) => {
  res.locals.years = res.locals.years || []
  const unavailability = req.session.data.unavailability
  const daysOfYear = getDaysOfYear(year)
  const months = Info.months().map(month => {
    return { name: month, dates: [] }
  })

  for (const d of daysOfYear) {
    const month = months[d.month - 1]

    // Week days before beginning of month
    if (d.day === 1) {
      const startOffset = d.weekday - 1;

      // loop X times
      [...Array(startOffset)].forEach((_, i) => {
        month.dates.push(decorateDate(d.minus({ days: startOffset - i }), unavailability, true))
      })
    }

    month.dates.push(decorateDate(d, unavailability))

    // Week days after end of month
    if (d.month !== d.plus({ days: 1 }).month) {
      const endOffset = 7 - d.weekday;

      // loop X times
      [...Array(endOffset)].forEach((_, i) => {
        month.dates.push(decorateDate(d.plus({ days: i + 1 }), unavailability, true))
      })
    }
  }

  res.locals.years.push({
    name: year,
    months: months.filter(m => m.dates.length > 0)
  })
}

export const calendarRoutes = router => {
  router.post('/calendar', (req, res, next) => {
    res.locals.success = { heading: 'Your calendar has been updated' }
    next()
  })

  router.all(['/calendar', '/calendar/:year', '/calendar/:year/*'], (req, res, next) => {
    const now = DateTime.now()
    setCalendarForYear(req, res, now.year)
    setCalendarForYear(req, res, now.year + 1)
    next()
  })

  router.all('/calendar', (req, res) => {
    res.render('calendar/year')
  })

  router.all('/calendar/:year/:month', (req, res) => {
    const year = res.locals.years.find(y => y.name === parseInt(req.params.year))
    res.locals.year = year.name
    res.locals.month = year.months.find(m => m.name.toLowerCase() === req.params.month)

    const dates = res.locals.month.dates
    const prevMonthDate = dates[0].object.minus({ days: 1 })
    const nextMonthDate = dates[dates.length - 1].object.plus({ days: 1 })

    res.locals.prevMonth = {
      text: prevMonthDate.toFormat('MMMM'),
      href: `/calendar/${prevMonthDate.toFormat('yyyy/MMMM/').toLowerCase()}`
    }

    res.locals.nextMonth = {
      text: nextMonthDate.toFormat('MMMM'),
      href: `/calendar/${nextMonthDate.toFormat('yyyy/MMMM/').toLowerCase()}`
    }

    res.render('calendar/month')
  })
}
