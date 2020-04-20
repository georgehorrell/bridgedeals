import React from "react";
import auctionStyles from './Auction.module.css';

const mags = [1,2,3,4,5,6,7];
const suits = ["C", "D", "H", "S", "NT"];

const generateCell = (cellAction, validBids, colSpan) => {
  let cellClassName = `${auctionStyles.cell} `;
  if (validBids.includes(cellAction)) {
    cellClassName += `${auctionStyles.active}`;
  }
  return <td colSpan={colSpan} key={cellAction} className={cellClassName}>{cellAction}</td>
};

export function Auction({validBids}) {
  const rows = suits.map(s => {
    const buttons = mags.map(m => {
      const cellAction = `${m}${s}`;
      return generateCell(cellAction, validBids, 1);
    });
    return <tr key={s}>{buttons}</tr>
  }).concat([
    <tr key={`extra`}>
      {generateCell("PASS", validBids, 3)}
      <td/>
      {generateCell("DBL", validBids, 3)}
    </tr>
  ]);
  return <table className={auctionStyles.auctionTable}>
    <tbody>
    {rows}
    </tbody>
  </table>
}
