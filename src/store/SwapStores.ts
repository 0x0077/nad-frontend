import { autorun, makeObservable, observable, action } from 'mobx';
import { Token, defaultETH, nullToken, TokenConfig } from '@/lib/interface';

class SwapStore {
  @observable tokens: Token[] = [];
  @observable fromToken: Token = defaultETH;
  @observable toToken: Token = nullToken;
  @observable fromAmount: string = '';
  @observable toAmount: string = '';
  @observable fromBalance: string = '0';
  @observable toBalance: string = '0';
  @observable fromTokenPrice: string = '0';
  @observable toTokenPrice: string = '0';
  @observable swapRate: string = '0';
  @observable swapRateValue: string = '0';
  @observable priceImpact: string = '0';
  @observable maxSlippage: string = '0';
  @observable minReceived: string = '0';
  @observable routePath: string = '';
  @observable swapType: number = 0;
  @observable fromLoading: boolean = true;
  @observable toLoading: boolean = true;
  @observable isPendingOpen: boolean = false;
  @observable popularTokens: string[] = [];
  @observable searchLoading: boolean = true;
  @observable poolContractAddress: string = '';

  constructor() {
    makeObservable(this);
  }

  @action
  setInitalize() {
    this.fromAmount = '';
    this.toAmount = '';
    this.fromTokenPrice = '0';
    this.toTokenPrice = '0';
    this.priceImpact = '0';
    this.maxSlippage = '0';
    this.minReceived = '0';
    this.routePath = '';
    this.swapType = 0;
    this.fromLoading = false;
    this.toLoading = false;
  }

  @action
  setFromToken(token: Token) {
    this.fromToken = token;
    this.fromTokenPrice = token.value as string;
  }

  @action
  setToToken(token: Token) {
    this.toToken = token;
    this.toTokenPrice = token.value as string;
  }

  @action
  setFromAmount(amount: string) {
    this.fromAmount = amount;
  }

  @action
  setToAmount(amount: string) {
    this.toAmount = amount;
  }

  @action
  setFromBalance(amount: string) {
    this.fromBalance = amount;
  }

  @action
  setToBalance(amount: string) {
    this.toBalance = amount;
  }

  @action
  setFromTokenPrice(amount: string) {
    this.fromTokenPrice = amount;
  }

  @action
  setToTokenPrice(amount: string) {
    this.toTokenPrice = amount;
  }

  @action
  setSwapRate(amount: string) {
    this.swapRate = amount;
  }

  @action
  setPriceImpact(amount: string) {
    this.priceImpact = amount;
  }

  @action
  setMaxSlippage(amount: string) {
    this.maxSlippage = amount;
  }

  @action
  setMinReceived(amount: string) {
    this.minReceived = amount;
  }

  @action
  setRoutePath(route: string) {
    this.routePath = route;
  }

  @action
  setSwapRateValue(amount: string) {
    this.swapRateValue = amount;
  }

  @action
  setSwapType(type: number) {
    this.swapType = type;
  }

  @action
  setFromLoading(loading: boolean) {
    this.fromLoading = loading;
  }

  @action
  setToLoading(loading: boolean) {
    this.toLoading = loading;
  }

  @action
  setIsPendingOpen(open: boolean) {
    this.isPendingOpen = open;
  }

  @action
  setTokens(tokens: Token[]) {
    this.tokens = tokens;
  }
  
  @action
  setPopularTokens(popularTokens: string[]) {
    this.popularTokens = popularTokens;
  }

  @action
  setSearchLoading(loading: boolean) {
    this.searchLoading = loading;
  }

  @action
  setPoolContractAddress(poolContractAddress: string) {
    this.poolContractAddress = poolContractAddress;
  }
}

export default SwapStore;
