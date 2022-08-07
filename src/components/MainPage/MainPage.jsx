import React, { useState, useEffect } from 'react';
import './styles.scss';
import getSquareParametrs from '../../requests/getSquareParametrs';
import Select from 'react-select';
import { squareOptionMapper, coordSquareMapper } from '../../mappers/mappers';
import _ from 'lodash';


function MainPage() {
  const [mainSquare, setMainSquare] = useState(null);
  const [modeApp, setModeApp] = useState(null);
  const [triggerDisableSelect, setTriggerDisableSelect] = useState(false)
  const [optionsMainSquare, setOptionsMainSquare] = useState(null);
  const [renderSquare, setRenderSqure] = useState(null);
  const [hoverSquares, setHoverSquares] = useState([]);
  const [eventSquare, setEventSquare] = useState([]);
  const [startTrigger, setStartTrigger] = useState(false);

  const handleMouseOver = (event, dataSquare) => {
    if (event.currentTarget.classList.contains('square_active')) {
      setEventSquare(dataSquare)
      event.currentTarget.classList.remove('square_active')
    } else {
      setEventSquare([]);
      setHoverSquares(prev => [...prev, dataSquare])
      event.currentTarget.classList.toggle('square_active');
    }
  };

  const triggerMode = () => {
    setStartTrigger(!startTrigger);
  }

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
      <div className="MainPage_configPanel">
        {mainSquare
          ?
          (<Select
            options={optionsMainSquare}
            onChange={(event) => setModeApp(event)}
            isDisabled={triggerDisableSelect}
            className="MainPage_configPanel_select"
          />)
          : null
        }
        <button
          className={startTrigger ? "MainPage_configPanel_button-active" : "MainPage_configPanel_button-disable"}
          onClick={() => {
            triggerMode();
            setTriggerDisableSelect(true);
          }}
        >
          START
        </button>
      </div>
      <div className="MainPage_contentField">
        {
          renderSquare ? renderSquare.map((el, i) => {
            return (<div className="MainPage_contentField_flexRaw" key={i}>
              {el.map((elem, index) => {
                return (
                  <div
                    className={'square'}
                    key={index}
                    onMouseEnter={(event) => startTrigger && handleMouseOver(event, elem)}
                  />
                )
              })}
            </div>)
          }) : null
        }
      </div>
      <div className="MainPage_square-info">
        {
          hoverSquares.length ? _.pullAllWith(hoverSquares, [eventSquare], _.isEqual).map((el, index) => {
            return (<div className="MainPage_square-info_block" key={index}>row {el.raw} col {el.col}</div>)
          }) : null
        }
      </div>
    </div>
  );
}

export default MainPage;
