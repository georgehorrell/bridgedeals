import React from "react";

import gameStyles from "./Game.module.css";
import cardStyles from "./Cards.module.css";

const handOrientation = {
  vertical: cardStyles.vhandCompact,
  horizontal: cardStyles.hhandCompact
};

const handCardState = {
  defocus: cardStyles.defocus,
  focus: cardStyles.focus,
  played: cardStyles.played
};

const Hand = ({cards, orient, state, active, ord, label}) => {
  const activeStyle = active ? cardStyles.activeHand : null;

  const cardElems = cards.map((c, i) => (
    <img key={`${c}-${i}`} className={`${cardStyles.card} ${handCardState[state]}`} src={`cards/${c}.svg`} />
  ));

  return (
    <div>
      <div className={gameStyles.handLabel}>
        <span className={gameStyles.handOrd}>
          ({ord})
        </span>
        <span>
          {label}
        </span>
      </div>
      <div
        className={`${cardStyles.hand} ${handOrientation[orient]} ${activeStyle}`}
      >
        {cardElems}
      </div>
    </div>
  );
};

export function Table({topHand, leftHand, rightHand, bottomHand, children}) {
  return (
    <div className={gameStyles.table}>
      <div className={gameStyles.handRowH}>
        <div className={gameStyles.topHand}>
          {Hand(Object.assign({}, topHand, {orient: "horizontal"}))}
        </div>
      </div>
      <div className={gameStyles.handRowV}>
        <div className={gameStyles.leftHand}>
          {Hand(Object.assign({}, leftHand, {orient: "vertical"}))}
        </div>
        {children}
        <div className={gameStyles.rightHand}>
          {Hand(Object.assign({}, rightHand, {orient: "vertical"}))}
        </div>
      </div>
      <div className={gameStyles.handRowH}>
        <div className={gameStyles.bottomHand}>
          {Hand(Object.assign({}, bottomHand, {orient: "horizontal"}))}
        </div>
      </div>
    </div>
  );
}
