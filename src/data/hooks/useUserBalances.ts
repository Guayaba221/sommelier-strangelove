import { getAcceptedDepositAssetsByChain } from "data/tokenConfig"
import { ResolvedConfig } from "abitype"
import { fetchBalance } from "@wagmi/core"
import { getAddress } from "ethers/lib/utils"
import { useAccount, useNetwork } from "wagmi"
import { chainConfig } from "data/chainConfig"
import { fetchCoingeckoPrice } from "queries/get-coingecko-price"
import { useQuery } from "@tanstack/react-query"

type Balance = {
  decimals: ResolvedConfig['IntType'];
  formatted: string;
  symbol: string;
  value: ResolvedConfig['BigIntType'];
  valueInUSD: number;
}

export const useUserBalances = () => {

  const { address } = useAccount();
  const { chain } = useNetwork();

  const fetchBalances = async () => {
    const depositAssetBalances : Balance[] = [];
    const chainObj = chainConfig.find(
      (item) => item.wagmiId === chain?.id
    )!

    const tokenList = getAcceptedDepositAssetsByChain(chainObj.id);

    await Promise.all(tokenList.map(async (token) => {
      try {
        const balance = await fetchBalance({
          token: token?.symbol !== 'ETH' ? getAddress(token!.address) : undefined,
          address: getAddress(address!)
        });

        if (!balance.value.isZero()) {
          // fix because token comes with different naming
          if (balance.symbol === 'B-rETH-STABLE'){
            balance.symbol = 'rETH BPT'
          }
          const price = await fetchCoingeckoPrice(
            token!,
            "usd"
          );
          const valueInUSD = Number(balance.formatted) * Number(price || 0);
          depositAssetBalances.push({...balance, valueInUSD});
        }
      } catch (error) {
        console.error("error", error);
      }
    }));
    depositAssetBalances.sort(
      (x, y) => y.valueInUSD - x.valueInUSD
    );

    return depositAssetBalances;
  }

  const query = useQuery(
    ["USE_USER_BALANCES"],
    async () => {
      return await fetchBalances()
    }
  )

  return {
    userBalances: query
  }
}
