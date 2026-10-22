import './index.css'

const ReportItem = props => {
  const {emojiDetails, count} = props
  const {emojiName, emojiUrl} = emojiDetails

  return (
    <li className="report-card card">
      <p className="report-name">{emojiName}</p>
      <img src={emojiUrl} alt={emojiName} className="report-emoji" />
      <p className="report-count">{count}</p>
    </li>
  )
}

export default ReportItem
