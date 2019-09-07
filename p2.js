const splitUV = (str) => {
  let max = str.length
  for (let i = 1; i <= max; i++) {
    let subStr = str.substring(0,i)
    let left = (subStr.match(/\(/g) || []).length
    let right = (subStr.match(/\)/g) || []).length
    if(left === right) return i
  }
  return max
}

const isGoodStr = (str) => {
  let result = 0
  str.split('').forEach(v => {
    if(v === '(') result++
    else if(result !== 0) result--
    else return false
  })
  if(result === 0) return true
  else false
}

const makeGoodStr = (str) => {
  if(str.length === 0 || isGoodStr(str)) return str
  let splitPoint = splitUV(str)
  let u = str.substring(0, splitPoint)
  let v = str.substring(splitPoint, str.length)

  console.log(u, v)

  if(isGoodStr(u)) return u + makeGoodStr(v)

  let result = '(' + makeGoodStr(v) + ')'
  let convertU = u.substring(1,u.length-1).split('').map(v => v === '(' ? ')' : '(').reduce((p,v) => p + v, '')
  return result + convertU
}

function solution(p) {
  var answer = makeGoodStr(p);
  return answer;
}

console.log(makeGoodStr('()))((()'))
console.log('()(())()')
