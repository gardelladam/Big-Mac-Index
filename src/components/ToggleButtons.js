import React, {useState} from 'react';
import '../App.css';
import styled from 'styled-components';
const Button = styled.button`
  background-color: #bab9be;
  color: black;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

function ToggleGroupedButtons(props) {
    const type_index = ['Raw index', 'Adjusted index'];
    const [active, setActive] = useState(type_index[0]);
    
  
    return (
      <ButtonGroup>
        {type_index.map(type => (
          <ButtonToggle
            key={type}
            active={active === type}
            onClick = {() =>{
                setActive(type)
                props.callback(type);

            }}
          > 
            {type}
          </ButtonToggle>
        ))}
      </ButtonGroup>
    );
  }
  export default ToggleGroupedButtons;