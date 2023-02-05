/////////////////////////////////
// DayListItem Component
/////////////////////////////////

import React from "react";
import classNames from "classnames";

// Stylesheet
import "components/DayListItem.scss";

// Component
export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = function(spots) {
    if (spots === 0) {
      return ("no spots remaining");
    } else if (spots === 1) {
      return ("1 spot remaining");
    } else {
      return (`${spots} spots remaining`);
    };
  }

  const spotsLeft = formatSpots(props.spots);

  return (
    <li onClick={props.setDay} className={dayClass} key={props.id}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsLeft}</h3>
    </li>
  );
}
