import { Info, Interval, DateTime } from 'luxon'

function * iterableDays (interval) {
  let cursor = interval.start.startOf('day')
  while (cursor < interval.end) {
    yield cursor
    cursor = cursor.plus({ days: 1 })
  }
}

const getDaysOfYear = (year) => {
  const start = DateTime.local(year, 1, 1)
  const end = DateTime.local(year + 1, 1, 1)
  const interval = Interval.fromDateTimes(start, end)
  return iterableDays(interval)
}

const setCalendarYear = (req, res, year) => {
  const unavailability = req.session.data.unavailability
  const daysOfYear = getDaysOfYear(year)
  const months = Info.months().map((month) => {
    return { name: month, dates: [] }
  })

  for (const d of daysOfYear) {
    const month = months[d.month - 1]
    const date = {
      day: d.day,
      weekday: Info.weekdays()[d.weekday - 1],
      weekdayShort: Info.weekdays('short')[d.weekday - 1],
      object: d,
      iso: d.toISODate(),
      unavailable: unavailability.includes(d.toISODate()),
      weekend: [6, 7].includes(d.weekday)
    }

    // Week days before beginning of month
    if (d.day === 1) {
      month.startOffset = d.weekday - 1
    }

    // Week days after end of month
    if (d.month !== d.plus({ days: 1 }).month) {
      month.endOffset = 7 - d.weekday
    }

    month.dates.push(date)
  }

  res.locals.year = year
  res.locals.months = months
}

export const calendarRoutes = router => {
  router.all(['/calendar/:year', '/calendar/:year/*'], (req, res, next) => {
    setCalendarYear(req, res, parseInt(req.params.year))
    next()
  })

  router.all('/calendar/:year', (req, res) => {
    res.render('calendar/year-overview')
  })

  router.all('/calendar/:year/:month', (req, res) => {
    res.locals.month = res.locals.months.find(m => m.name.toLowerCase() === req.params.month)

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
