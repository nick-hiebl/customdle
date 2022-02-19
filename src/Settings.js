import React from 'react'
import { useGameContext } from './GameContext'

const Settings = ({
  setSettings,
}) => {
  const { showCompleted, showKeyboard } = useGameContext()

  return (
    <div className="settings">
      <input
        type="checkbox"
        checked={showCompleted}
        onChange={() => setSettings((settings) => ({
          ...settings,
          showCompleted: !settings.showCompleted,
        }))}
      /> Show completed words?
      <br />
      <input
        type="checkbox"
        checked={showKeyboard}
        onChange={() => setSettings((settings) => ({
          ...settings,
          showKeyboard: !settings.showKeyboard,
        }))}
      /> Show keyboard?
    </div>
  )
}

export default Settings;
