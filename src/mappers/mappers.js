const squareOptionMapper = (mapData) => {
  return mapData.map((el) => {
    return { label: el.name, value: el.field }
  })
}

const coordSquareMapper = (countSquare) => {
  const arr = []
  for (let raw = 1; raw <= countSquare/5; raw++) {
    arr.push([{col: 1, raw},{col: 2, raw},{col: 3, raw},{col: 4, raw},{col: 5, raw}])
  }
  return arr;
}

export {squareOptionMapper, coordSquareMapper}