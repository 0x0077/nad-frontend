import { makeObservable, observable, computed, action, reaction } from "mobx";
import { type Address } from "viem";
import type { IReactionDisposer } from "mobx";

class WalletStore {
  @observable address: Address | undefined = undefined;
  @observable isConnected: boolean = false;
  @observable isConnecting: boolean = false;
  @observable balance: string | undefined = undefined;
  @observable symbol: string | undefined = undefined;
  @observable chainId: number | undefined = undefined;

  constructor() {
    makeObservable(this);
  }

  onWalletChange(callback: () => void): IReactionDisposer {
    return reaction(
      () => ({
        address: this.address,
        chainId: this.chainId,
        isConnected: this.isConnected,
      }),
      () => callback(),
      {
        fireImmediately: true
      }
    );
  }

  onBalanceChange(callback: () => void): IReactionDisposer {
    return reaction(
      () => this.balance,
      () => callback(),
      {
        fireImmediately: true
      }
    );
  }

  @action
  setWalletState(state: {
    address?: Address;
    isConnected?: boolean;
    isConnecting?: boolean;
    balance?: string;
    symbol?: string;
    chainId?: number;
  }) {
    Object.assign(this, state);
  }

  @action
  reset() {
    this.address = undefined;
    this.isConnected = false;
    this.isConnecting = false;
    this.balance = undefined;
    this.symbol = undefined;
    this.chainId = undefined;
  }

  @computed
  get shortAddress() {
    if (!this.address) return '';
    return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
  }

  @computed
  get chainName() {
    return this.chainId === 1 ? 'Monad Testnet' : 'Unknown Network';
  }

  @computed
  get formattedBalance() {
    if (!this.balance || !this.symbol) return '';
    const balanceInEth = parseFloat(this.balance) / Math.pow(10, 18); // Convert from wei to ETH
    const formattedBalance = balanceInEth.toFixed(4);
    return `${formattedBalance}`;
  }
}

export default WalletStore;