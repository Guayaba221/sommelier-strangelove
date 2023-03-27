import { useQuery } from "@tanstack/react-query"
import { getUserData } from "data/actions/common/getUserData"
import { useGetStrategyDataQuery } from "generated/subgraph"
import { useAccount, useSigner } from "wagmi"
import { useAllContracts } from "./useAllContracts"
import { useCoinGeckoPrice } from "./useCoinGeckoPrice"
import { useStrategyData } from "./useStrategyData"

export const useUserStrategyData = (strategyAddress: string) => {
  const { data: signer } = useSigner()
  const { address: userAddress } = useAccount()

  const { data: allContracts } = useAllContracts()
  const strategyData = useStrategyData(strategyAddress)
  const sommPrice = useCoinGeckoPrice("sommelier")

  const [{ data: sgData, error }, reFetch] = useGetStrategyDataQuery({
    variables: { cellarAddress: userAddress! },
    pause: !userAddress,
  })

  const query = useQuery(
    [
      "USE_USER_DATA",
      { signer: true, contractAddress: strategyAddress, userAddress },
    ],
    async () => {
      return await getUserData({
        contracts: allContracts![strategyAddress],
        address: strategyAddress,
        strategyData: strategyData.data!,
        userAddress: userAddress!,
        sommPrice: sommPrice.data!,
        sgData: sgData?.cellar!,
      })
    },
    {
      enabled:
        !!allContracts &&
        !!signer?._isSigner &&
        !!strategyData.data &&
        !!sommPrice.data &&
        !!sgData,
    }
  )
  return query
}
