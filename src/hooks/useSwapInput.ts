import { useEffect, useState, useCallback } from 'react';
import { useStores } from '@stores/context';
import useDebounce from '@/hooks/useDebounce';
import { ZERO_ADDRESS, ETH_SEPOLIA_PROVIDER_URL } from '@/lib/interface';
import { ethers } from 'ethers';


export const useSwapInput = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [isPair, setIsPair] = useState(false);
  const [pair, setPair] = useState<string>(ZERO_ADDRESS);
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
  const { swapStore } = useStores();

  const isZeroAddress = swapStore.fromToken.contract === ZERO_ADDRESS || swapStore.toToken.contract === ZERO_ADDRESS;
  
  useEffect(() => {
    const initProvider = async () => {
      const newProvider = new ethers.JsonRpcProvider(ETH_SEPOLIA_PROVIDER_URL);
      setProvider(newProvider);

    };
    initProvider();
  }, []);


  useEffect(() => {
    if (swapStore.poolContractAddress !== ZERO_ADDRESS) {
      setIsPair(true);
      setPair(swapStore.poolContractAddress);
    }
  }, [swapStore.poolContractAddress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      swapStore.setFromLoading(false);
      swapStore.setToLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);


  const validateInput = useCallback((value: string): boolean => {
    if (!value) return false;
    const number = parseFloat(value);
    if (isNaN(number)) return false;
    if (number < 0) return false;
    const parts = value.split('.');
    if (parts.length > 2) return false;
    return true;
  }, []);

  // const oracleUpdate = useOracle({
  //   account: walletStore.address, 
  //   pair, 
  //   asset0: swapStore.fromAsset, 
  //   asset1: swapStore.toAsset,
  //   amount0: swapStore.fromAmount,
  //   amount1: swapStore.toAmount,
  //   ethPrice: oracleStore.ethPrice
  // });

  // useEffect(() => {
  //   const updateOracleData = async () => {
  //     const isZeroAddress = swapStore.fromToken.contract === ZERO_ADDRESS || swapStore.toToken.contract === ZERO_ADDRESS;

  //     if (!isZeroAddress && swapStore.fromAmount !== '0' && swapStore.toAmount !== '0' && isPair) {
        //  const { swapRate, priceImpact, assetPrices, rateValue } = await oracleUpdate();
        // swapStore.setSwapRate(swapRate);
        // swapStore.setPriceImpact(priceImpact);
        // assetPrices.map((price, index) => {oracleStore.setAssetPrices(price, index)});
        // const slippage = new BN(settingStore.slippage).div(100);
        // const minReceived = new BN(swapStore.toAmount).mul(new BN(1).sub(slippage));
        // const maxSlippage = new BN(swapStore.toAmount).mul(new BN(slippage));
        // swapStore.setMinReceived(minReceived.toString());
        // swapStore.setMaxSlippage(maxSlippage.toString());
        // swapStore.setSwapRateValue(rateValue);
        // swapStore.setRoutePath(swapStore.fromAsset.symbol + ' - ' + swapStore.toAsset.symbol);
      // }
    // };
    
  //   if (!isZeroAddress && isPair) {
  //     updateOracleData();
  //   }
  // }, [swapStore.fromAmount, swapStore.toAmount, isZeroAddress]);

  const updateData = useCallback(async (amount: string) => {
    if (!isPair || !provider) return;
    
    if (BigInt(amount) > BigInt(0)) {
      try {
        // const router = new NadRouter(provider);
        // const amounts = await router.getAmountsOut(BigInt(amount), [swapStore.fromToken.contract, swapStore.toToken.contract]);
        // const newAmount = amounts[1].toString().replace(/,/g, '');
        const amountBN = parseFloat(amount) * 997 / 1000;
        const newAmount = Number(amountBN.toFixed(8)).toString();
        
        if (amount === '' || amount === '0') {
          swapStore.setInitalize();
          return;
        }
        swapStore.setToLoading(true);
        swapStore.setToAmount(newAmount);

      } catch (error) {
        console.error('Error updating amounts:', error);
      } finally {
        swapStore.setFromLoading(false);
        swapStore.setToLoading(false);
      }

      // if (!isZeroAddress) {
      //   await oracleUpdate();
      // } 

    } else {
      swapStore.setFromAmount('');
      swapStore.setToAmount('');
      swapStore.setFromLoading(false);
      swapStore.setToLoading(false);
    }
    
    }, [isPair, swapStore.fromToken.contract, swapStore.toToken.contract, isZeroAddress, swapStore.fromAmount, swapStore.toAmount]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!newValue) {
      setInputValue('');
      setIsValidInput(false);
      swapStore.setFromAmount('');
      swapStore.setToAmount('');
      return;
    }

    let cleanedValue = newValue.replace(/[^0-9.]/g, '');
    
    if (cleanedValue === '.' || cleanedValue === '') {
      setInputValue('0');
      setIsValidInput(false);
      return;
    }

    if (cleanedValue !== '0' && cleanedValue !== '0.') {
      cleanedValue = cleanedValue.replace(/^0+(?=\d)/, '');
    }

    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      return;
    }

    setInputValue(cleanedValue);
    const isValid = validateInput(cleanedValue);
    setIsValidInput(isValid);

    if (isValid) {
      swapStore.setFromAmount(cleanedValue);
    }
  }, [validateInput, swapStore]);

  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!isValidInput || !debouncedInputValue || swapStore.toToken.name === '') {
      swapStore.setToAmount('');
      swapStore.setFromLoading(false);
      swapStore.setToLoading(false);
      return;
    }

    swapStore.setFromLoading(true);
    updateData(debouncedInputValue);
  }, [debouncedInputValue, isValidInput, updateData, swapStore]);




  // const updateButtonState = useCallback((isPair: boolean, pair: string, fromAmount: string, toAmount: string) => {
  //   if (!walletStore.isConnected) return;

  //   const setButtonState = (text: string, disabled: boolean, className: string) => {
  //     buttonStore.setSwapButton(text, disabled, className);
  //   };

  //   if (!isPair && pair === ZERO_ADDRESS) {
  //     if (swapStore.fromAsset.assetId !== ZERO_ADDRESS && swapStore.toAsset.assetId !== ZERO_ADDRESS) {
  //       setButtonState('Insufficient liquidity', true, 'bg-nad-bg-01 text-white opacity-50');
  //       return;
  //     } else {
  //       setButtonState('Swap', true, 'bg-nad-bg-01 text-white opacity-50');
  //       return;
  //     }
  //   } else {
  //     if (fromAmount === '' || toAmount === '') {
  //       setButtonState('Swap', true, 'bg-nad-bg-01 text-white opacity-50');
  //       return;
  //     }

  //     const currentBalance = BN.parseUnits(walletStore.balance || '0', swapStore.fromAsset.decimals || 9);
  //     const formatFromAmount = BN.parseUnits(fromAmount, swapStore.fromAsset.decimals || 9);
  //     const formatToAmount = BN.parseUnits(toAmount, swapStore.toAsset.decimals || 9);
    
  //     if (formatFromAmount.eq(0) || formatToAmount.eq(0)) {
  //       setButtonState('Swap', true, 'bg-nad-bg-01 text-white opacity-50');
  //       return;
  //     }
    
  //     if (formatFromAmount.gt(currentBalance)) {
  //       setButtonState('Insufficient Asset Balance', true, 'bg-nad-bg-01 text-white opacity-50');
  //       return;
  //     }
    
  //     const slippage = 0;
  //     const minReceived = formatToAmount.mul(new BN(1).sub(slippage));
  //     const priceImpact = new BN(swapStore.priceImpact).div(1000);
    
  //     // if (priceImpact.gt(50)) {
  //     //   setButtonState('High price impact', true, 'bg-nad-bg-01 text-white opacity-50');
  //     // } else if (slippage < priceImpact) {
  //     //   setButtonState('Slippage is too high', true, 'bg-nad-bg-01 text-white opacity-50');
  //     // } else {
  //     //   setButtonState(
  //     //     'Swap',
  //     //     false,
  //     //     'bg-gradient-to-r from-nad-bg-01/20 to-nad-bg-01 text-white hover:from-nad-bg-01 hover:to-nad-bg-01/50 transition-all duration-300'
  //     //   );
  //     // }
  //   }


  // }, [walletStore.isConnected, buttonStore, swapStore]);

  // useEffect(() => {
  //   updateButtonState(isPair, pair, swapStore.fromAmount, swapStore.toAmount);
  // }, [updateButtonState, isPair, pair, swapStore.fromAmount, swapStore.toAmount, swapStore.fromAsset.assetId, swapStore.toAsset.assetId]);

  return {
    handleInputChange,
  };

}