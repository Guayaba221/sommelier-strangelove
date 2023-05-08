import { cellarDataMap } from "data/cellarDataMap"
import { CellarStakingV0815, CellarV0816 } from "src/abi/types"
import { StrategyContracts } from "../types"

import {
  isAPYEnabled,
  isAssetDistributionEnabled,
} from "data/uiConfig"
import { getTokenByAddress, getTokenBySymbol } from "./getToken"
import { add, isBefore, isFuture, subDays } from "date-fns"
import { getStakingEnd } from "../CELLAR_STAKING_V0815/getStakingEnd"
import { getRewardsApy } from "./getRewardsApy"
import { CellarKey, CellarNameKey, ConfigProps } from "data/types"
import { getBaseApy as getV2BaseApy } from "../CELLAR_V2/getBaseApy"
import { getBaseApy } from "./getBaseApy"
import { getChanges } from "./getChanges"
import { getTvm } from "./getTvm"
import { formatDecimals } from "utils/bigNumber"
import { GetStrategyDataQuery } from "generated/subgraph"
import { getPositon } from "./getPosition"
import { config } from "utils/config"
import { getActiveAsset } from "../DEPRECATED/common/getActiveAsset"
import { isComingSoon } from "utils/isComingSoon"
const RYETH_ADDRESS = config.CONTRACT.REAL_YIELD_ETH.ADDRESS

export const getStrategyData = async ({
  address,
  contracts,
  sommPrice,
  wethPrice,
  sgData,
}: {
  address: string
  contracts: StrategyContracts
  sommPrice: string
  wethPrice: string
  sgData?: GetStrategyDataQuery["cellar"]
}) => {
  const data = await (async () => {
    try {
      const strategy = Object.values(cellarDataMap).find(
        ({ config }) => config.cellar.address === address
      )!
      const config: ConfigProps = strategy.config!
      const isRYETH = config.cellarNameKey === "REAL_YIELD_ETH"

      const { stakerContract, cellarContract } = contracts
      const subgraphData = sgData

      const dayDatas = subgraphData?.dayDatas

      const slug = strategy.slug
      const name = strategy.name
      const description = strategy.description
      const logo = config.lpToken.imagePath
      const protocols = strategy.protocols
      const type = strategy.cellarType
      const provider = strategy.strategyProvider
      const launchDate = strategy.launchDate
      const stakingLaunchDate = strategy.stakingLaunchDate
      const isNew =
        !!launchDate &&
        isBefore(launchDate, add(new Date(), { weeks: 2 }))

      const activeAsset = await (async () => {
        if (!subgraphData?.asset?.id) {
          const aAsset = await getActiveAsset(
            cellarContract as CellarV0816
          )
          if (!aAsset) return
          const tokenInfo = getTokenByAddress(aAsset.address)
          return { ...tokenInfo, ...aAsset }
        }
        const tokenInfo = getTokenByAddress(subgraphData.asset.id)
        return { ...tokenInfo, ...subgraphData.asset }
      })()

      let tvm = isComingSoon(launchDate)
        ? undefined
        : isRYETH
        ? //@ts-ignore
          getTvm(Number(subgraphData!.tvlTotal) * Number(wethPrice))
        : getTvm(subgraphData?.tvlTotal)

      const tradedAssets = (() => {
        if (!isAssetDistributionEnabled(config)) {
          const assets = strategy.tradedAssets
          if (!assets) return
          const tokens = assets.map((v) => {
            const token = getTokenBySymbol(v)
            return token
          })

          return tokens
        }

        const positions = subgraphData?.positions
        if (!positions) return
        const tokens = positions?.map((v) => {
          const token = getTokenByAddress(v)
          return token
        })

        return tokens
      })()

      const positionDistribution = (() => {
        if (!subgraphData) return
        return getPositon(
          subgraphData?.positions,
          subgraphData?.positionDistribution
        )
      })()

      const stakingEnd = await getStakingEnd(
        stakerContract as CellarStakingV0815
      )
      const isStakingOngoing =
        stakingEnd?.endDate && isFuture(stakingEnd?.endDate)

      const rewardsApy = await (async () => {
        if (isComingSoon(launchDate)) return
        if (!isStakingOngoing) return

        // FIXME
        // Fetch asset price from coingecko based on subgraph cellar.asset.id
        let assetPrice = "1" // USDC
        if (address === RYETH_ADDRESS) {
          assetPrice = wethPrice
        }

        const apyRes = await getRewardsApy({
          sommPrice,
          assetPrice,
          stakerContract: stakerContract as CellarStakingV0815,
        })
        return apyRes
      })()

      const baseApy = (() => {
        if (isComingSoon(launchDate)) return
        if (!isAPYEnabled(config)) return

        const datas = dayDatas?.slice(0, 10)

        if (config.cellar.key === CellarKey.CELLAR_V2) {
          const launchDay = launchDate ?? subDays(new Date(), 8)
          const launchEpoch = Math.floor(launchDay.getTime() / 1000)
          return getV2BaseApy({
            launchEpoch: launchEpoch,
            baseApy: config.baseApy,
            dayDatas: datas,
          })
        }

        return getBaseApy({
          baseApy: config.baseApy,
          dayDatas: datas,
        })
      })()

      const changes =
        (!isComingSoon(launchDate) &&
          dayDatas &&
          getChanges(dayDatas)) ||
        undefined

      const tokenPrice = (() => {
        if (isComingSoon(launchDate)) return
        if (!subgraphData?.shareValue) return

        const price = formatDecimals(subgraphData.shareValue, 6, 2)
        return `$${price}`
      })()

      return {
        activeAsset,
        address,
        baseApy,
        changes,
        description,
        isNew,
        isStakingOngoing,
        launchDate,
        logo,
        name,
        positionDistribution,
        protocols,
        provider,
        rewardsApy,
        slug,
        stakingEnd,
        tokenPrice,
        tradedAssets,
        tvm,
        type,
        stakingLaunchDate,
      }
    } catch (e) {
      console.error(address, e)
    }
  })()

  return data
}
