import { useState } from 'react';
import './popUp.css'
import ModalForm from './modalForm';

const PopUp = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };
  
    return (
      <div>
        <button onClick={handleButtonClick} id='addButton'>+</button>
        {buttonClicked && <ModalForm toggle={setButtonClicked} />}
      </div>
    );
};

export default PopUp