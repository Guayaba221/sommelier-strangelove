import { ReactElement, VFC } from 'react'
import { Image, ImageProps } from '@chakra-ui/react'

export interface Token {
  icon: ReactElement
  symbol: string
  address: string
}

const MenuIcon: VFC<ImageProps> = ({ alt, ...rest }) => (
  <Image boxSize={4} alt={alt} {...rest} />
)

export const tokenConfig: Token[] = [
  {
    icon: <MenuIcon src='/assets/icons/dai.svg' alt='Dai logo' />,
    symbol: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f'
  },
  {
    icon: <MenuIcon src='/assets/icons/usdc.svg' alt='USD Coin logo' />,
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  },
  {
    icon: <MenuIcon src='/assets/icons/usdt.svg' alt='Tether logo' />,
    symbol: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  },
  {
    icon: <MenuIcon src='/assets/icons/fei.svg' alt='Fei logo' />,
    symbol: 'FEI',
    address: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA'
  },
  {
    icon: <MenuIcon src='/assets/icons/tusd.svg' alt='TrueUSD logo' />,
    symbol: 'TUSD',
    address: 'TUSDB-888'
  },
  {
    icon: <MenuIcon src='/assets/icons/busd.svg' alt='Binance USD logo' />,
    symbol: 'BUSD',
    address: 'BUSD-BD1'
  },
  {
    icon: <MenuIcon src='/assets/icons/gusd.svg' alt='Gemini Dollar logo' />,
    symbol: 'GUSD',
    address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd'
  }
]
