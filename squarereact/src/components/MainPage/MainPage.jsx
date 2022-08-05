import React, { useState, useEffect } from 'react';
import './styles.scss';
import getSquareParametrs from '../../requests/getSquareParametrs';
import Select from 'react-select';
import { squareOptionMapper, coordSquareMapper } from '../../mappers/mappers'
import Square from '../SquareInfo/Square'


function MainPage() {
  const [mainSquare, setMainSquare] = useState(null);
  const [modeApp, setModeApp] = useState(null);
  const [optionsMainSquare, setOptionsMainSquare] = useState(null);
  const [renderSquare, setRenderSqure] = useState(null);

  useEffect(() => {
    getSquareParametrs(setMainSquare);
  }, []);

  useEffect(() => {
    if (mainSquare) {

      setOptionsMainSquare(squareOptionMapper(mainSquare))
    }
  }, [mainSquare]);

  useEffect(() => {
    if (modeApp) {
      setRenderSqure(() => coordSquareMapper(modeApp.value))
    }
  }, [modeApp]);

  return (
    <div className="MainPage">
      <div>
        {mainSquare
          ?
          (<Select
            options={optionsMainSquare}
            onChange={(event) => setModeApp(event)}
          />)
          : null
        }
        <button>START</button>
      </div>
      <div>
        {
          renderSquare ? renderSquare.map((el) => {
            return el.map((elem, index) => {
              return (<div>
                (<Square coord={elem} key={index} />)
              </div>)
            })
          }) : null
        }
      </div>
    </div>
  );
}

export default MainPage;
