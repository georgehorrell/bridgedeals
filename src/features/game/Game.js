import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGameView,
  selectGameMoves,
  selectGameSeats,
  updateGameAsync,
  selectLoadState,
  LOAD_STATE_INIT,
  LOAD_STATE_ERROR,
  LOAD_STATE_LOADING
} from "./gameSlice";
import {
  selectUserId
} from "../../app/userSlice";
import { Table } from "./Table";
import { BidStack } from "./BidStack";
import { Auction } from "./Auction";
import { Played } from "./Played";

// maps from player ord to layouts
const tableLayouts = {
  N: {
    S: "topHand",
    E: "leftHand",
    W: "rightHand",
    N: "bottomHand"
  },
  E: {
    W: "topHand",
    S: "leftHand",
    N: "rightHand",
    E: "bottomHand"
  },
  S: {
    N: "topHand",
    W: "leftHand",
    E: "rightHand",
    S: "bottomHand"
  },
  W: {
    E: "topHand",
    N: "leftHand",
    S: "rightHand",
    W: "bottomHand"
  }
};

const createTableState = (gameView, gameSeats) => {
  const playerOrd = gameView.Player;
  let tableLayout = JSON.parse(JSON.stringify(tableLayouts[playerOrd]));
  let tableState = {};
  Object.keys(tableLayout).forEach(ord => {
    let dirKey = tableLayout[ord];
    tableState[dirKey] = {
      ord: ord,
      cards: gameView.Hands[ord],
      state: "defocus",
      active: false,
      label: gameSeats[ord].Name,
    };
    if (ord === playerOrd) {
      tableState[dirKey].state = "focus";
    }
  });
  return tableState;
}

const PlayView = gameView => {
  if (gameView.Tricks.length === 0) {
    return <Played />
  }

  const playerOrd = gameView.Player;
  let tableLayout = JSON.parse(JSON.stringify(tableLayouts[playerOrd]));
  let playState = {};

  gameView.Tricks[0].Played.forEach(({P, C}) => {
    console.log(P, C);
    let dirKey = tableLayout[P];
    playState[dirKey] = {
      card: C,
      state: "solid",
    };
  });

  console.log(playState);

  return <Played leftPlayed={playState["leftHand"]} rightPlayed={playState["rightHand"]} topPlayed={playState["topHand"]} bottomPlayed={playState["bottomHand"]} />
};

const AuctionView = validBids => {
  return <Auction validBids={validBids} />
};

function GameView() {
  const loadState = useSelector(selectLoadState);
  const gameView = useSelector(selectGameView);
  const gameMoves = useSelector(selectGameMoves);
  const gameSeats = useSelector(selectGameSeats);

  if (loadState === LOAD_STATE_INIT || loadState === LOAD_STATE_LOADING) {
    return <p>Game is loading, please wait...</p>
  }
  if (loadState === LOAD_STATE_ERROR) {
    return <p>Unexpected error loading game :(</p>
  }

  const tableState = createTableState(gameView, gameSeats);

  let actionView = null;
  if (gameView.State === "PLAY") {
    actionView = PlayView(gameView);
  } else if (gameView.State === "BID") {
    const validBids = gameMoves.map(m => m.Action);
    actionView = AuctionView(validBids);
  }

  return (
    <div className="row center-xs">
      <div className="col-xs-11
                col-sm-11
                col-md-7
                col-lg-8">
        <Table topHand={tableState.topHand}
               bottomHand={tableState.bottomHand}
               leftHand={tableState.leftHand}
               rightHand={tableState.rightHand} >
          {actionView}
        </Table>
      </div>
      <div className="col-xs-11
                col-sm-11
                col-md-4
                col-lg-3">
        <BidStack bidStack={gameView.Bids} />
      </div>
    </div>
  );
}

export function Game() {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  dispatch(updateGameAsync(1, userId));
  return <GameView />
}
