import { config } from "utils/config"
import { CellarKey, CellarRouterKey, StakerKey } from "../types"
import { depositAssetTokenList } from "../tokenConfig"

export const aaveStable = {
  name: "aave2",
  description:
    "The Aave stablecoin strategy aims to select the optimal stablecoin lending position available to lend across Aave markets on a continuous basis.",
  strategyType: "Stablecoin",
  strategyTypeTooltip: "Strategy uses Stablecoin lending",
  managementFee: "0.25%",
  protocols: "AAVE",
  strategyAssets: [
    "USDC",
    "GUSD",
    "BUSD",
    "USDT",
    "DAI",
    "FEI",
    "FRAX",
    "sUSD",
    "USDP",
  ],
  performanceSplit: {
    depositors: 90,
    protocol: 10,
  },
  strategyBreakdown: {
    goals: `The Aave stablecoin strategy aims to select the optimal stablecoin lending position available to lend across Aave markets on a continuous basis. The goal is to outperform a static strategy of lending any single stablecoin. Returns are amplified for Sommelier users as they will not suffer opportunity costs from passively sitting in less profitable lending positions at any given moment.`,
    strategy: `This strategy involves observation of several variables including Aave interest rates, rate volatility, gas fees, slippage estimations, and TVL. This data is the input for a custom predictive model which recommends position adjustments periodically. The entire process is automated as the model delivers a feed to Sommelier validators who relay necessary function calls to the Cellar.
      <img src="/assets/images/net-yield-over-time.png" alt="net yield over time" />`,
    "somm alpha": `The alpha Sommelier delivers for this strategy is generated by a brilliant model that determines the precise moment that is best to capitalize on new market conditions. For the first time in DeFi history, you can benefit from a dynamic model rather than relying on static vault architecture. Cellars are not limited by rigid smart contract code which only allows positions to be adjusted under a narrow set of circumstances.

      The Aave Strategy uses high-powered predictive analytics to respond instantly when opportunity arises. Every second, we are monitoring and predicting APYs, gas fees, price volatility, liquidity, slippage and more. Rather than a simple formula such as "if gas fees <= current_apy/12, {claim_rewards}", the Aave Strategy is continually primed with real-time data points to make intelligent decisions. We bring statistics to DeFi without compromising decentralization. This has never been possible until now.`,
  },
  strategyProvider: {
    logo: "/assets/images/seven-seas.png",
    title: "Seven Seas",
    href: "https://7seas.capital/",
    tooltip:
      "A Strategy Provider is responsible for providing the instructions for a cellar to execute",
  },
  depositTokens: {
    list: depositAssetTokenList,
  },
  config: {
    id: config.CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
    lpToken: {
      address: config.CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
    },
    cellarRouter: {
      address: config.CONTRACT.CELLAR_ROUTER.ADDRESS,
      abi: config.CONTRACT.CELLAR_ROUTER.ABI,
      key: CellarRouterKey.CELLAR_ROUTER,
    },
    cellar: {
      address: config.CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
      abi: config.CONTRACT.AAVE_V2_STABLE_CELLAR.ABI,
      key: CellarKey.AAVE_V2_STABLE_CELLAR,
    },
    staker: {
      address: config.CONTRACT.AAVE_STAKER.ADDRESS,
      abi: config.CONTRACT.AAVE_STAKER.ABI,
      key: StakerKey.AAVE_STAKER,
    },
    rewardTokenAddress: config.CONTRACT.SOMMELLIER.ADDRESS,
  },
}
