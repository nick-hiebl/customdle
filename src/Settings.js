import React, { useCallback } from 'react'

import { useGameContext } from './GameContext'

const Settings = ({
  reset,
  setSettings,
}) => {
  const { showCompleted, showKeyboard } = useGameContext()

  const doReset = useCallback(() => {
    reset()
    document.getElementById('reset').blur()
  }, [reset])

  return (
    <>
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
      <div className="reset">
        <button onClick={doReset} id="reset">Reset</button>
      </div>
    </>
  )
}

export default Settings;
