
const compression = (str) => {
  let max = str.length
  let result = max
  for (let unit = 1; unit <= max / 2; unit++) {
    let n = 1
    let compressedStr = ''
    let point = 0
    for (let i = 0; i + unit + unit <= max;) {
      let compare = str.substring(i, i + unit)
      point = i + unit
      while (point + unit <= max && compare === str.substring(point, point + unit)) {
        n = n + 1
        point = point + unit
      }
      if (n === 1) compressedStr = compressedStr + compare
      else compressedStr = compressedStr + n + compare
      n = 1
      i = point
    }
    if (point <= max) compressedStr = compressedStr + str.substring(point, max)

    if (result > compressedStr.length) result = compressedStr.length
  }

  return result
}

function solution (s) {
  let answer = compression(s)
  return answer
}
