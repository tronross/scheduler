/////////////////////////
// DayList Component
/////////////////////////

import React from 'react';

import DayListItem from './DayListItem';

// Component
export default function DayList(props) {
  const days = props.days;
  
  const dayList = days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
        data-testid="day"
      />
    )
  })  

  return (
    <ul>{dayList}</ul>
  );
}
