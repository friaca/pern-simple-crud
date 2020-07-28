import React from 'react';
import { SelectContainerStyled, LabelStyled, SelectStyled } from './styles';

export default function Dropdown({ label, options, selected, onSelect }) {
  const optionsDisplay = options.map((option, index) => 
    (<option key={index} value={option.id}>{option.text}</option>))

  function getFullOption(id) {
    return options.find(option => option.id === Number(id));
  }

  return (
    <SelectContainerStyled>
      <LabelStyled>
        {label}
      </LabelStyled>
      <SelectStyled
        value={selected}
        onChange={(event) => onSelect(getFullOption(event.target.value))}
      >
        {optionsDisplay}
      </SelectStyled>
    </SelectContainerStyled>
  )
}
