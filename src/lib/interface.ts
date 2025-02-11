
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ETH_ADDRESS = '0x0C8aFD1b58aa2A5bAd2414B861D8A7fF898eDC3A';
export const ETH_SEPOLIA_PROVIDER_URL = 'https://eth-sepolia.g.alchemy.com/v2/iR14HNK9WIzmVirPdqF9Mj597fZ_3Cma';

export const defaultETH: Token = {
  name: 'USDT.e',
  icon: '/usdt.png',
  symbol: 'USDT.e',
  contract: '0x3Adf21A6cbc9ce6D5a3ea401E7Bae9499d391298',
  balance: '0 USDT.e',
  value: '$0',
  decimals: 6,
  amount: '0',
};

export const nullToken: Token = {
  name: '',
  icon: '',
  symbol: '',
  contract: '0x0000000000000000000000000000000000000000',
  balance: '0',
  value: '0',
  decimals: 18,
  amount: '0',
};

export interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface Token {
  name: string;
  icon: string;
  symbol: string;
  contract: string;
  balance?: string;
  value?: string;
  amount?: string;
  decimals: number;
  popular?: string;
}

export interface ButtonProps {
  onAction: () => void;
  buttonName: string;
  src: string;
  fromAmount: string;
  toAmount: string;
  alt: string;
  className: string;
  children: React.ReactNode;
  onConnect: () => void;
}

export interface HeaderProps {
  onOpenCard: () => void;
  onDisconnected: () => void;
}

export interface WalletInfo {
  name: string;
  icon: string;
}

export interface PoolInfoProps {
  tokens: Token[];
  onAction: () => void;
}

export interface PositionProps {
  addLiquidityOpen: () => void;
  removeLiquidityOpen: () => void;
  cardClick: () => void;
  tokens: Token[];
  hasPosition: boolean;
  isCardOpen: boolean;
  noPositionSpan1: string;
  isExplore: boolean;
  type:string;
  poolAssetId: string;
  amounts?: [string, string];
}

export interface PoolDetailProps {
  tokens: Token[];
  statsName: string;
  statsValue: string;
  buttonName: string;
  onButtonClick: () => void;
  isActive: boolean;
  poolAssetId: string;
  initialData?: any;
}

export interface RemoveLiquidityProps {
  tokens: Token[];
  pool: PoolButtonProps;
  buttonName: string;
  onAction: () => void;
}

export interface AssetInputProps {
  tokens: Token[];
}

export interface CreatePositionProps {
  tokens: Token[];
  popularTokens: string[];
  onAction: (index: number) => void;
  poolType: string;
}

export interface PositionConfirmProps {
  tokens: Token[];
  amounts: string[];
  onAction: () => void;
  isExplore: boolean;
  poolAssetId: string;
  poolType: string;
  isPreview: boolean;
}

export interface Position {
  tokens: Token[];
  type:string;
}

export interface PositionPageProps {
  positions: Position[];
}

export interface InputProps {
  onTokenCardOpen: () => void;
  token: Token;
  onTokenChange: (token: Token) => void;
}

export interface SelectTokenProps {
  onAction: (token: Token | null) => void;
  tokens: Token[];
  popularTokens: string[];
  isFromToken: boolean;
  isSwapAction: boolean;
}

export interface SwapCardProps {
  onSwapClose: () => void;
  onSetClose: () => void;
  onTokenCardOpen: (isFrom: boolean) => void;
  onConnectOpen: () => void;
  tokens: Token[];
}

interface ReviewInfo {
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  amount: string;
  value: string;
}

interface SwapDetailInfo {
  title: string;
  value: string;
}

export interface SwapConfirmProps {
  onAction: () => void;
  onSwap: () => void;
  reviewInfo: ReviewInfo;
  swapDetailInfo: SwapDetailInfo;
}

export interface SwapDetailProps {
  title: string;
  value: string;
  price: string;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export interface SwapNotificationProps {
  onAction: () => void;
  isOpen: boolean;
  notifiType: 'submitted' | 'succeed';
  message: string;
}

export interface SwapSettingProps {
  onAction: () => void;
  value: string;
  isChecked: boolean;
}

export interface PoolButtonProps {
  tokens: Token[];
  type: string;
  tvl: string;
  volume: string;
  apr: string;
  poolAssetId: string;
}

export interface IPoolStatistics {
  tvl: string;
  apr: string;
  fees: string;
  volume: string;
  liquidity: string;
}


export type TransactionStatus = 'pending' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: TransactionStatus;
  hash?: string;
  open?: boolean;
  animationDelay?: number;
}

export interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

export const PoolStatistics = {
  new(
    tvl: string,
    apr: string,
    fees: string,
    volume: string,
    liquidity: string
  ): IPoolStatistics {
    return { tvl, apr, fees, volume, liquidity };
  },
};

export const IAsset = {
  new(
    name: string,
    icon: string,
    symbol: string,
    contract: string,
    decimals: number,
    popular: string
  ): Token {
    return { name, icon, symbol, contract, decimals, popular };
  },
}

export interface TokenConfig {
  tokens: Token[];
  popularTokens: string[];
}

