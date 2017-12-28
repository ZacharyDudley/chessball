export const markSpaces = (space) => {

  // PLACE SELECTED CURSOR ON SPACE
  if (spaceDiv.classList.contains('selected')) {
    spaceDiv.classList.remove('selected')
  } else {
    while (selectedDivs.length) {
      selectedDivs[0].classList.remove('selected')
    }
    if (this.state.selectedPlayerSpace) {
      this.getNeighbors(this.state.selectedPlayerSpace.id, 'remove')
    }
    spaceDiv.classList.add('selected')
  }

  // HIGHLIGHT NEIGHBORS WHEN PLAYER SPACES ARE CLICKED
  if (spaceDiv.classList.contains('player')) {
    if (this.state.selectedPlayerSpace.id !== space.id) {
      if (this.state.selectedPlayerSpace) {
        this.getNeighbors(this.state.selectedPlayerSpace.id, 'remove')
      }
      this.setState({selectedPlayerSpace: space})
      this.getNeighbors(space.id, 'add')
    } else {
      this.getNeighbors(space.id, 'remove')
    }
  }

  // IF NEIGHBOR SPACE IS CLICKED
  if (spaceDiv.classList.contains('neighbor')) {
    console.log('neighbor')
  }


  if (spaceDiv.classList.contains('ball')) {
    console.log('BALL')
  }

  //IF PLAYER SPACE
    //SET STATE
  //IF NEIGHBOR SPACE
    //MOVE PLAYER
  //IF NEIGHBOR SPACE AND BALL
    //HIGHLIGHT BALL OPTIONS
  //IF BALL NEIGHBOR
    //MOVE BALL


}

const getNeighbors = (spaceId, action) => {
  let [x, y] = spaceId.split(', ')
  x = +x
  y = +y

  const neighbors = [
    document.getElementById(`${x - 1}, ${y - 1}`) || undefined,
    document.getElementById(`${x}, ${y - 1}`) || undefined,
    document.getElementById(`${x + 1}, ${y - 1}`) || undefined,
    document.getElementById(`${x - 1}, ${y}`) || undefined,
    document.getElementById(`${x + 1}, ${y}`) || undefined,
    document.getElementById(`${x - 1}, ${y + 1}`) || undefined,
    document.getElementById(`${x}, ${y + 1}`) || undefined,
    document.getElementById(`${x + 1}, ${y + 1}`) || undefined,
  ]

  if (action === 'add') {
    neighbors.forEach(neighborSpace => {
      neighborSpace.classList.add('neighbor')
    })
  } else if (action === 'remove') {
    neighbors.forEach(neighborSpace => {
      neighborSpace.classList.remove('neighbor')
    })
  }
}
