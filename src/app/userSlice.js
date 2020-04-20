import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    id: 1,
    name: "unknown",
  },
  reducers: {},
});

export const {

} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const updateGameAsync = (gameId, player) => dispatch => {
//   fetch(`http://127.0.0.1:8080/game/view/${gameId}?player=${player}`)
//     .then(res => res.json())
//     .then((data) => {
//       dispatch(updateGameView(data.View.State));
//       dispatch(updateGameMoves(data.View.Moves));
//     }).catch((error) => {
//     console.error('Error:', error);
//   });
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserId = state => state.user.id;
// export const selectGameMoves = state => state.game.moves;
// export const selectGamePlayer = state => state.game.player;

export default slice.reducer;
