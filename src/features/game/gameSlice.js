import { createSlice } from '@reduxjs/toolkit';

export const LOAD_STATE_INIT = "LOAD_STATE_INIT";
export const LOAD_STATE_LOADING = "LOAD_STATE_LOADING";
export const LOAD_STATE_COMPLETE  = "LOAD_STATE_COMPLETE";
export const LOAD_STATE_ERROR   = "LOAD_STATE_ERROR";

export const slice = createSlice({
  name: 'game',
  initialState: {
    loadState: LOAD_STATE_INIT,
    seats: {
      N: {
        id: "",
        label: "UNKNOWN"
      },
      E: {
        id: "",
        label: "UNKNOWN"
      },
      S: {
        id: "",
        label: "UNKNOWN"
      },
      W: {
        id: "",
        label: "UNKNOWN"
      },
    },
    view: {
      Bids: [],
    },
    moves: [],
  },
  reducers: {
    updateGameView: (state, action) => {
      state.view = action.payload;
    },
    updateGameMoves: (state, action) => {
      state.moves = action.payload;
    },
    updateGamePlayer: (state, action) => {
      state.player.ord = action.payload;
    },
    updateLoadState: (state, action) => {
      state.loadState = action.payload;
    },
    updateGameSeats: (state, action) => {
      state.seats = action.payload;
    }
  },
});

export const {
  updateGameView,
  updateGameMoves,
  updateGameSeats,
  updatePlayerOrd,
  updateLoadState
} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateGameAsync = (gameId, player) => dispatch => {
  dispatch(updateLoadState(LOAD_STATE_LOADING));
  fetch(`http://127.0.0.1:8080/game/view/${gameId}?playerId=${player}`)
    .then(res => {
      if (!res.ok) {
        res.isFetchError = true
        throw res
      } else {
        return res.json()
      }
    })
    .then((data) => {
      dispatch(updateGameView(data.Game.State));
      dispatch(updateGameMoves(data.Game.Moves));
      dispatch(updateGameSeats(data.Game.Seats));
      dispatch(updateLoadState(LOAD_STATE_COMPLETE));
    }).catch((error) => {
      dispatch(updateLoadState(LOAD_STATE_ERROR));
      if (error.isFetchError) {
        error.text().then( msg => {
          console.error('Error:', msg);
        });
      } else {
        console.log("error encountered: ", error);
      }
    });
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectGameView = state => state.game.view;
export const selectGameMoves = state => state.game.moves;
export const selectGameSeats = state => state.game.seats;
export const selectGamePlayer = state => state.game.player;
export const selectLoadState  = state => state.game.loadState;

export default slice.reducer;
