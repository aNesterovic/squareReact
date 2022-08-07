import axios from 'axios';

const getSquareParametrs = (setMainSquare) => {
  axios.get('http://demo7919674.mockable.io')
    .then((res) => {
      setMainSquare(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getSquareParametrs;