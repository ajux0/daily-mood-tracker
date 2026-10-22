import React from 'react'

const MoodTrackerContext = React.createContext({
  emojisList: [],
  daysList: [],
  monthsList: [],
  activeEmojiId: '',
  changeActiveEmoji: () => {},
  toggleDateEmoji: () => {},
})

export default MoodTrackerContext
