import { makeObservable, observable } from "mobx";
import WalletStore from "./WalletStores";
import ButtonStore from "./ButtonStores";
import SwapStore from "./SwapStores";
import NotificationStore from "./NotificationStore";

class RootStore {
  @observable walletStore: WalletStore;
  @observable buttonStore: ButtonStore;
  @observable swapStore: SwapStore;
  @observable notificationStore: NotificationStore;

  constructor() {
    this.walletStore = new WalletStore();
    this.buttonStore = new ButtonStore();
    this.swapStore = new SwapStore();
    this.notificationStore = new NotificationStore();
    makeObservable(this);
  }

}

export default RootStore;
