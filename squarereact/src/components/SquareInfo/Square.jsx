import React, { useState } from 'react';
import { useEffect } from 'react';
import './styles.scss';

function Square(props) {
  const [coord, setCoord] = useState(null)
  useEffect(() => {
    setCoord(props)
    console.log(coord);
  }, [props])
  return (
    <div className="square">

    </div>
  );
}

export default Square;
