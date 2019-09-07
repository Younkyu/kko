const operateBuild = (arr, op) => {
  let x = op[0]
  let y = op[1]
  let isBo = op[2]
  let isBuild = op[3]

  let start = arr[y][x]
  let end = isBo ? arr[y][x+1] : arr[y+1][x]

  try {
    if(isBuild && !isBo) {
      if (start[0][1] >= 1 || start[0][0] >= 1 || start[1][1] >= 1 || y === 0) {
        arr[y][x][1][0] = 1
        arr[y+1][x][1][1] = 1
      }
    } else if (isBuild && isBo) {
      if ((start[0][1] >= 1 && end[0][0] >= 1) || (start[1][1] >= 1) || (end[1][1] >= 1) ) {
        arr[y][x][0][0] = 1
        arr[y][x+1][0][1] = 1
      }
    } else if(!isBuild && !isBo) {
      if (end[1][0] !== 1 && (arr[y+1][x+1][1][1] >= 1 || !(arr[y+1][x+1][0][0] >= 1) && (arr[y+1][x][0][1] >= 1) || (arr[y+1][x-1][0][1] >= 1 && arr[y+1][x][0][0] >= 1))) {
        arr[y][x][1][0] = 0
        arr[y+1][x][1][1] = 0
      }
    } else if(!isBuild && isBo) {
      if (!(start[1][0] >= 1 && (start[0][1] == 0)) && !(start[1][1] == 0 && start[0][1] >= 1) && !(end[1][1] == 0 && end[0][1] >= 1)) {
        arr[y][x][0][0] = 0
        arr[y][x+1][0][1] = 0
      }
    }
  } catch (e) {

  }
}

const build = (n, build_frame) => {
  const arr = buildNNArr(n+3)

  build_frame.forEach(v => {
    operateBuild(arr, v)
  })

  let result = []

  for (let i = 0; i < n+1; i++) {
    // let str = ''
    for (let j = 0; j < n+1; j++) {
      if(arr[i][j][0][0] == 1) result.push([j,i,1])
      if(arr[i][j][1][0] == 1) result.push([j,i,0])
      // str += arr[i][j] + ' '
    }
    // console.log(str)
  }

  result.sort((a,b) => {
    if(a[0] == b[0]) return a[1] - b[1]
    return a[0] - b[0]
  })

  return result
}

const buildNNArr = (n) => {
  let arr = []
  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      row.push([[0,0], [0,0]])
    }
    arr.push(row)
  }
  return arr
}

function solution(n, build_frame) {
  var answer = build(n, build_frame);
  return answer;
}

console.log(build(5,[[0,0,0,1],[2,0,0,1],[4,0,0,1],[0,1,1,1],[1,1,1,1],[2,1,1,1],[3,1,1,1],[2,0,0,0],[1,1,1,0],[2,2,0,1]]))
