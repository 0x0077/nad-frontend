import { makeObservable, observable, action } from 'mobx';

const DEFAULT_SWAP_BUTTON_CLASS = 'bg-nad-bg-01 text-white hover:opacity-90 hover:bg-nad-bg-01/80 hover:text-white';

class ButtonStore {
  @observable swapButton = {
    text: 'Connect Wallet',
    disabled: false,
    className: DEFAULT_SWAP_BUTTON_CLASS
  };
  
  @observable positionButton = {
    text: 'Select token',
    disabled: true,
    className: '',
  };


  constructor() {
    makeObservable(this);
  }

  @action
  setSwapButton(
    text: string = 'Connect Wallet', 
    disabled: boolean = false, 
    className: string = DEFAULT_SWAP_BUTTON_CLASS
  ) {
    this.swapButton = { text, disabled, className };
  }

  @action
  setPositionButton(text: string = 'Select token', disabled: boolean = true, className: string = '') {
    this.positionButton = { text, disabled, className };
  }

}

export default ButtonStore;
