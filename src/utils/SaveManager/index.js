export const save = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch {
    console.error('Could not store state for key:', key)
  }
}

export const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    console.error('Could not read item for key:', key)
  }
}

export const clear = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    console.error('Could not clear item for key:', key)
  }
}
