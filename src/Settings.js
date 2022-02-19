import React from 'react'
import { useGameContext } from './GameContext'

const Settings = ({
  setSettings,
}) => {
  const { showCompleted } = useGameContext()

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
    </div>
  )
}

export default Settings;
