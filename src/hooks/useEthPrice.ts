import { useEffect, useState } from 'react';
import axios from 'axios';

 const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get(
        'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      const ethPrice = response.data.price;
      setEthPrice(ethPrice);
    }
    getEthPrice();
  }, []);

  return {
    ethPrice,
  };
};

export default useEthPrice;