import './index.css'

const EmojiItem = props => {
  const {emojiDetails, isActive, onSelectEmoji} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  return (
    <li>
      <button
        type="button"
        className={isActive ? 'emoji-button active' : 'emoji-button'}
        onClick={() => onSelectEmoji(id)}
      >
        <p className="emoji-name">{emojiName}</p>
        <span className="emoji-image-box">
          <img src={emojiUrl} alt={emojiName} className="emoji-image" />
        </span>
      </button>
    </li>
  )
}

export default EmojiItem
