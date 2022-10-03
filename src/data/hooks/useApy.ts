import { useQuery } from "@tanstack/react-query"
import { getApy as getApy_AAVE_V2_STABLE_CELLAR } from "data/actions/AAVE_V2_STABLE_CELLAR/getApy"
import { CellarKey, ConfigProps } from "data/types"
import { AaveV2CellarV2, SommStaking } from "src/abi/types"
import { useCreateContracts } from "./useCreateContracts"

export const useApy = (config: ConfigProps) => {
  const { cellarContract, stakerContract } =
    useCreateContracts(config)

  const AAVE_V2_STABLE_CELLAR_QUERY_ENABLED = Boolean(
    config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR &&
      cellarContract.provider &&
      stakerContract?.provider
  )

  const query = useQuery(
    ["USE_APY"],
    async () => {
      if (config.cellar.key === CellarKey.AAVE_V2_STABLE_CELLAR) {
        return await getApy_AAVE_V2_STABLE_CELLAR(
          cellarContract as AaveV2CellarV2,
          stakerContract as SommStaking
        )
      }
      throw new Error("UNKNOWN CONTRACT")
    },
    {
      enabled: AAVE_V2_STABLE_CELLAR_QUERY_ENABLED, // branching example: AAVE_V2_STABLE_CELLAR_QUERY_ENABLED || V1_5_CELLAR_QUERY_ENABLED
    }
  )

  return query
}