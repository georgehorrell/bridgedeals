import cardStyles from "./Cards.module.css";
import gameStyles from "./Game.module.css";
import React from "react";

const playedCardStyles = {
  invisible: cardStyles.invisible,
  pending: cardStyles.pending,
  solid: null,
};

const PlayedCard = played => {
  if (played === null) {
    return <img className={`${cardStyles.card} ${cardStyles.invisible}`} src={`cards/BACK.svg`} />;
  } else {
    return <img className={`${cardStyles.card} ${playedCardStyles[played.state]}`} src={`cards/${played.card}.svg`} />;
  }
};

export function Played({leftPlayed = null, topPlayed = null, bottomPlayed = null, rightPlayed = null}) {
  return (
    <div className={gameStyles.played}>
      <div className={gameStyles.leftPlayed}>
        {PlayedCard(leftPlayed)}
      </div>
      <div>
        <div className={gameStyles.topPlayed}>
          {PlayedCard(topPlayed)}
        </div>
        <div className={gameStyles.bottomPlayed}>
          {PlayedCard(bottomPlayed)}
        </div>
      </div>
      <div className={gameStyles.rightPlayed}>
        {PlayedCard(rightPlayed)}
      </div>
    </div>
  );
};
