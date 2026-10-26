import './index.css'

const DateItem = props => {
  const {dateDetails, onClickDate} = props
  const {date, emojiUrl} = dateDetails

  return (
    <li>
      <button type="button" className="date-button" onClick={onClickDate}>
        <p className="date-text">{date}</p>
        {emojiUrl !== '' && (
          <img src={emojiUrl} alt={date} className="date-emoji" />
        )}
      </button>
    </li>
  )
}

export default DateItem
