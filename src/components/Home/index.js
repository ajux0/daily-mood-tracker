import {useContext, useState} from 'react'

import MoodTrackerContext from '../../context/MoodTrackerContext'
import Header from '../Header'
import EmojiItem from '../EmojiItem'
import DateItem from '../DateItem'

import './index.css'

const Home = () => {
  const {
    emojisList,
    daysList,
    monthsList,
    activeEmojiId,
    changeActiveEmoji,
    toggleDateEmoji,
  } = useContext(MoodTrackerContext)

  const [monthIndex, setMonthIndex] = useState(0)
  const [filterEmojiId, setFilterEmojiId] = useState(emojisList[0].id)
  const [filterDayId, setFilterDayId] = useState(daysList[0].id)

  const month = monthsList[monthIndex]
  const filterEmoji = emojisList.find(each => each.id === filterEmojiId)
  const filterDay = daysList.find(each => each.id === filterDayId)

  // dates of the active month with the chosen emoji on the chosen day
  const filterCount = month.dates.filter(
    item =>
      item.emojiName === filterEmoji.emojiName &&
      Number(item.date) % 7 === filterDay.dayNumber,
  ).length

  const onClickPrevious = () => setMonthIndex(i => (i + 11) % 12)
  const onClickNext = () => setMonthIndex(i => (i + 1) % 12)

  return (
    <div className="page-container">
      <Header />
      <div className="home-content">
        <div className="home-grid">
          <div className="card emoji-card">
            <ul className="emoji-list">
              {emojisList.map(each => (
                <EmojiItem
                  key={each.id}
                  emojiDetails={each}
                  isActive={each.id === activeEmojiId}
                  onSelectEmoji={changeActiveEmoji}
                />
              ))}
            </ul>
          </div>

          <div className="card calendar-card">
            <div className="month-bar">
              <button
                type="button"
                data-testid="previous-button"
                aria-label="Previous month"
                className="icon-button"
                onClick={onClickPrevious}
              >
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M10 2L3 9l7 7" />
                </svg>
              </button>
              <h1 className="month-name">{month.monthName}</h1>
              <button
                type="button"
                data-testid="next-button"
                aria-label="Next month"
                className="icon-button"
                onClick={onClickNext}
              >
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M4 2l7 7-7 7" />
                </svg>
              </button>
            </div>
            <ul className="calendar-grid weekdays">
              {daysList.map(each => (
                <li key={each.id}>
                  <p className="weekday" data-short={each.day.slice(0, 2)}>
                    {each.day}
                  </p>
                </li>
              ))}
            </ul>
            <ul className="calendar-grid">
              {month.dates.map(item => (
                <DateItem
                  key={item.id}
                  dateDetails={item}
                  onClickDate={() => toggleDateEmoji(month.month, item.id)}
                />
              ))}
            </ul>
          </div>

          <div className="card filter-card">
            <div className="filter-row">
              <select
                className="filter-select"
                aria-label="Emoji name"
                value={filterEmojiId}
                onChange={e => setFilterEmojiId(e.target.value)}
              >
                {emojisList.map(each => (
                  <option key={each.id} value={each.id}>
                    {each.emojiName}
                  </option>
                ))}
              </select>
              <select
                className="filter-select"
                aria-label="Day"
                value={filterDayId}
                onChange={e => setFilterDayId(e.target.value)}
              >
                {daysList.map(each => (
                  <option key={each.id} value={each.id}>
                    {each.day}
                  </option>
                ))}
              </select>
            </div>
            <h1
              className={filterCount < 10 ? 'filter-count pad' : 'filter-count'}
            >
              {filterCount}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
