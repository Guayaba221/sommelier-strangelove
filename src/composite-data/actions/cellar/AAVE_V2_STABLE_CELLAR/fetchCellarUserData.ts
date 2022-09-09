import BigNumber from "bignumber.js"
import { AaveV2CellarV2 } from "src/abi/types"
import { CellarUserData } from "../types"

export const fetchCellarUserData = async (
  contract: AaveV2CellarV2,
  address: string
) => {
  try {
    const userBalance = await contract.balanceOf(address)

    const maxDeposit = await contract.maxDeposit(address)

    const maxWithdraw = await contract.maxWithdraw(address)

    const userData: CellarUserData = {
      maxDeposit: new BigNumber(maxDeposit.toString()),
      maxWithdraw: new BigNumber(maxWithdraw.toString()),
      netValue: new BigNumber(userBalance.toString()),
    }

    return userData
  } catch (error) {
    console.warn("Cannot read user data", error)
    throw error
  }
}