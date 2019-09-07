const rotate = (n, weak) => {
  let rotate = []
  let max = Number.MAX_VALUE
  weak.forEach(v => {
    let rotateWeak = weak.map(time => (n+time-v)%n).sort((a,b) => a-b)
    let rotateSum = rotateWeak.reduce((p, v, i) => i !== 0 ? v - rotateWeak[i-1] + p : v, 0)
    if(rotateSum < max) {
      max = rotateSum
      rotate = rotateWeak
    }
  })
  return rotate
}

function solution(n, weak, dist) {

  const r = rotate (n, weak)
  let arr = []
  console.log(r)
  r.reduce((p ,v, i) => arr.push(i !== 0 ? v - r[i-1] : v))
  console.log(arr)

  let max = 0

  let rDist = dist.reverse()

  while (rDist.length > 0 && arr.length > 0 ) {
    const friend = rDist.shift()
    let sum = 0
    let maxCount = 0
    let maxArr = []
    for(let j = 0; j < arr.length; j++) {
      let count = 0
      let copyArr = [...arr]
      for(let i = 0; i < copyArr.length; i++) {
        sum = sum + copyArr[i]
        if(sum >= friend) {
          count = i
          copyArr = copyArr.splice(i + 1, copyArr.length)
        }
      }
      if(maxCount < count) {
        maxCount = count
        maxArr = [...copyArr]
      }
    }
    arr = maxArr
    max++
  }

  var answer = arr.length === 0 ? max : -1
  return answer
}

console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]))
solution(12, 	[1, 5, 6, 10], [1, 2, 3, 4])
