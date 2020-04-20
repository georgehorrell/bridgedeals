import React from "react";
import {Table} from "./Game";
import bidStackStyles from "./BidStack.module.css";

const headPaddingReq = {
  "N": [],
  "E": [""],
  "S": ["",""],
  "W": ["","",""],
}

const tailPaddingReq = {
  N: ["","",""],
  E: ["",""],
  S: [""],
  W: [],
}

// BidsToTable converts an unstructured stream of bids into a table
const BidsToCells = bids => {
  let cells = [];
  if (bids === null || bids.length === 0) {
    return cells;
  } else {
    const firstBid = bids[0];
    cells = cells.concat(headPaddingReq[firstBid.P]);
  }
  cells = cells.concat(bids.map(({ C }) => C));
  const finalBid = bids[bids.length-1];
  cells = cells.concat(tailPaddingReq[finalBid.P]);
  return cells
}

const CellsToTable = cells => {
  let rows = [];
  for (let i = 0; i < cells.length; i+=4) {
    rows.push(
      <tr key={i}>
        <td>{cells[i]}</td>
        <td>{cells[i+1]}</td>
        <td>{cells[i+2]}</td>
        <td>{cells[i+3]}</td>
      </tr>
    )
  }
  return (
    <table className={bidStackStyles.bidStackCell}>
      <thead>
      <tr>
        <th>N</th>
        <th>E</th>
        <th>S</th>
        <th>W</th>
      </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export function BidStack({bidStack}) {
  const cells = BidsToCells(bidStack);
  return CellsToTable(cells);
}
