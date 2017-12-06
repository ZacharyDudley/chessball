import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
// import firebase from './firebase'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)

// firebase.ref().set({
//   games: {
//     gameId: {
//       players: {
//         playerId: {
//           name: '',
//           team: {
//             teamName: '',
//             color: '',
//             guys: {
//               guyId: '',
//               hasBall: false,
//               canMove: true,
//               canShoot: false,
//             }
//           },
//           goals: 0,
//           shots: 0,
//           saves: 0,
//         }
//       },
//       spaces: {
//         spaceId: {
//           playerId: '',
//           containsBall: false,
//         }
//       },
//       state: {
//         currentPlayer: 1,
//       }
//     }
//   }
// })
