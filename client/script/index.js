export const markSpaces = (spaces, selectedSpace) => {

  spaces.filter(space => {
    if (space.id === selectedSpace) {
      const [x, y] = space.coords
      console.log(x)
      console.log(y)
      const spaceDiv = document.getElementById(`${x}, ${y}`)
      spaceDiv.classList.add('selected')
      console.log('ADDED?')
    }

    // if (space.hasBall) space.classList.add('hasBall')
  })

}
