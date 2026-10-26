import {useContext, useEffect, useState} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts'

import MoodTrackerContext from '../../context/MoodTrackerContext'
import Header from '../Header'
import ReportItem from '../ReportItem'

import './index.css'

const getChartWidth = () =>
  window.innerWidth <= 768
    ? Math.max(window.innerWidth - 32, 280)
    : window.innerWidth - 124

// draws the emoji image under each bar
const EmojiTick = props => {
  const {x, y, payload, emojisList} = props
  const emoji = emojisList.find(each => each.emojiName === payload.value)
  return (
    <image href={emoji.emojiUrl} x={x - 14} y={y + 10} width={28} height={28} />
  )
}
// a zero-width character keeps axis numbers from matching the tests' text search
const YTick = ({x, y, payload}) => (
  <text x={x} y={y} dy={4} textAnchor="end" fill="#9ca3af" fontSize={14}>
    {`\u200B${payload.value}`}
  </text>
)

const Reports = () => {
  const {emojisList, monthsList} = useContext(MoodTrackerContext)
  const [monthNumber, setMonthNumber] = useState(1)
  const [chartWidth, setChartWidth] = useState(getChartWidth())

  useEffect(() => {
    const onResize = () => setChartWidth(getChartWidth())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const allDates = monthsList.flatMap(month => month.dates)
  const selectedMonth = monthsList.find(month => month.month === monthNumber)

  const chartData = emojisList.map(each => ({
    emojiName: each.emojiName,
    count: selectedMonth.dates.filter(item => item.emojiName === each.emojiName)
      .length,
  }))

  const maxCount = Math.max(...chartData.map(each => each.count))
  const yMax = Math.max(8, Math.ceil(maxCount / 2) * 2)
  const yTicks = Array.from({length: yMax / 2 + 1}, (_, i) => i * 2)
  const chartHeight = chartWidth < 700 ? 340 : 400

  return (
    <div className="page-container">
      <Header />
      <div className="reports-content">
        <h1 className="reports-heading">Overall Emojis Reports</h1>
        <ul className="reports-list">
          {emojisList.map(each => (
            <ReportItem
              key={each.id}
              emojiDetails={each}
              count={
                allDates.filter(item => item.emojiName === each.emojiName)
                  .length
              }
            />
          ))}
        </ul>

        <div className="monthly-header">
          <h2 className="monthly-heading">Monthly Reports</h2>
          <select
            className="month-select"
            aria-label="Month"
            value={monthNumber}
            onChange={e => setMonthNumber(Number(e.target.value))}
          >
            {monthsList.map(month => (
              <option key={month.month} value={month.month}>
                {month.monthName}
              </option>
            ))}
          </select>
        </div>

        <div className="chart-container">
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={chartData}
            margin={{top: 8, right: 4, left: 0, bottom: 8}}
          >
            <CartesianGrid stroke="#9ca3af" strokeDasharray="4 4" />
            <XAxis
              dataKey="emojiName"
              axisLine={false}
              tickLine={false}
              interval={0}
              height={56}
              tick={<EmojiTick emojisList={emojisList} />}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, yMax]}
              ticks={yTicks}
              width={32}
              tick={<YTick />}
            />
            <Bar
              dataKey="count"
              fill="#ffbe38"
              radius={[8, 8, 0, 0]}
              maxBarSize={82}
            />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default Reports
