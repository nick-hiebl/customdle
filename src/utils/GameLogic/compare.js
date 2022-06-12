export const compare = (guess, actual) => {
  const len = actual.length
  const res = new Array(len).fill('no')
  const counts = {}
  for (let i = 0; i < len; i++) {
    if (actual[i] === guess[i]) {
      res[i] = 'exact'
    } else {
      counts[actual[i]] = (counts[actual[i]] || 0) + 1
    }
  }

  for (let i = 0; i < len; i++) {
    if (res[i] === 'no') {
      if (counts[guess[i]]) {
        counts[guess[i]] -= 1
        res[i] = 'partial'
      }
    }
  }

  return res
}
