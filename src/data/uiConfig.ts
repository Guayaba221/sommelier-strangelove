import { CellarKey, ConfigProps } from "./types"

export const isBondingEnabled = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const isBondButtonEnabled = (config: ConfigProps) => {
  // aave bond button disabled because program already ended
  return config.cellar.key === CellarKey.PATACHE_LINK
}

export const isRewardsEnabled = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const isTokenAssets = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR
}

export const isPositionTokenAssets = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.CLEAR_GATE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const isCurrentDepositsEnabled = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR
}

export const isCountdownEnabled = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.PATACHE_LINK
}

export const isActiveTokenStrategyEnabled = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const isTVMEnabled = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR
}

export const isAPYEnabled = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR
}

export const isTokenPriceEnabled = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.CLEAR_GATE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const isDailyChangeEnabled = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.CLEAR_GATE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const isIntervalGainPctEnabled = (config: ConfigProps) => {
  return (
    config.cellar.key === CellarKey.CLEAR_GATE_CELLAR ||
    config.cellar.key === CellarKey.PATACHE_LINK
  )
}

export const lpTokenTooltipContent = (config: ConfigProps) => {
  if (config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR)
    return "Unbonded LP tokens earn interest from strategy but do not earn Liquidity Mining rewards"
  if (config.cellar.key === CellarKey.CLEAR_GATE_CELLAR)
    return "The LP tokens represent a user's share of the pool and can always be redeemed for the original tokens"
  return ""
}

export const intervalGainPctTitleContent = (config: ConfigProps) => {
  if (config.cellar.key === CellarKey.PATACHE_LINK)
    return "1W Change vs USDC"
  if (
    config.cellar.key === CellarKey.CLEAR_GATE_CELLAR ||
    config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR
  )
    return "1W Change vs ETH/BTC 50/50"
  return ""
}

export const intervalGainPctTooltipContent = (
  config: ConfigProps
) => {
  if (config.cellar.key === CellarKey.PATACHE_LINK)
    return `% change of token price compared to a benchmark portfolio of USDC`
  if (
    config.cellar.key === CellarKey.CLEAR_GATE_CELLAR ||
    config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR
  )
    return `% change of token price compared to a benchmark portfolio of 50% ETH and 50% BTC`
  return ""
}

export const tokenPriceTooltipContent = (config: ConfigProps) => {
  if (config.cellar.key === CellarKey.PATACHE_LINK) return ""
  if (config.cellar.key === CellarKey.CLEAR_GATE_CELLAR)
    return `The dollar value of the ETH, BTC, and USDC that 1 token can be redeemed for`
  return ""
}

export const isEthBtcChartEnabled = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.CLEAR_GATE_CELLAR
}

export const isUsdcChartEnabled = (config: ConfigProps) => {
  return config.cellar.key === CellarKey.PATACHE_LINK
}
