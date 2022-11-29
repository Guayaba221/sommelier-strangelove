import BigNumber from "bignumber.js"
import { useUserStakes } from "data/hooks/useUserStakes"
import { CellarV0815, CellarV0816 } from "src/abi/types"
import { formatUSD, toEther } from "utils/formatCurrency"
import { useToken } from "wagmi"
import { getCellarShareBalance } from "./getCellarShareBalance"

export const getNetValueWithStaking = async ({
  activeAsset,
  cellarContract,
  lpToken,
  userStakes,
}: {
  activeAsset?: ReturnType<typeof useToken>["data"]
  cellarContract: CellarV0815 | CellarV0816
  lpToken?: string
  userStakes?: ReturnType<typeof useUserStakes>["data"]
}) => {
  try {
    const cellarShareBalance = await getCellarShareBalance({
      cellarContract,
      lpToken,
      userStakes,
    })
    let nv = new BigNumber(
      toEther(
        cellarShareBalance?.toString(),
        activeAsset?.decimals,
        false,
        2
      )
    )
    if (userStakes?.claimAllRewardsUSD) {
      nv = nv.plus(userStakes.claimAllRewardsUSD)
    }
    const formattedNetValue = nv.toFixed(2, 0)

    return {
      value: nv,
      formatted: formatUSD(formattedNetValue),
    }
  } catch (error) {
    console.warn("Cannot read cellar data", error)
    throw error
  }
}