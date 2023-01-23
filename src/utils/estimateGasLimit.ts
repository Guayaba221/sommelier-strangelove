import { BigNumber, BigNumberish } from "ethers"

const PAD = [1.15, 1.3, 1.45]

export const gasLimitMargin = (
  gasEstimated: BigNumber,
  margin?: number
) =>
  gasEstimated
    .mul(Number((margin ? margin : 1.1) * 100).toFixed()) // default increase 10%
    .div(100)

export const estimateGasLimit = async (
  fn: Promise<BigNumber>,
  knownGasLimit: BigNumberish,
  margin?: number
) => {
  try {
    const gas = await fn
    return gasLimitMargin(gas, margin).toString()
  } catch (error) {
    return knownGasLimit
  }
}
/**
 *
 * @example
 * const gasLimitEstimated = await estimateGasLimitWithRetry(
 *     cellarRouterSigner.estimateGas.depositAndSwap,
 *     cellarRouterSigner.callStatic.depositAndSwap,
 *     [
 *       payload.cellarAddress,
 *       1,
 *       swapData,
 *       amountInWei,
 *       payload.selectedToken?.address!,
 *     ],
 *     600000,
 *     1000000
 *   )
 */
export const estimateGasLimitWithRetry = async (
  fnEstimateGas: any,
  fnCallStatic: any,
  args: any[],
  knownGasLimit: BigNumberish,
  maxGasLimit?: BigNumberish
) => {
  const gasEstimatedRes = await estimateGasLimit(
    fnEstimateGas(...args),
    knownGasLimit,
    1
  )
  let gasLimitEstimated = BigNumber.from(gasEstimatedRes)

  const pad = [1.15, 1.3, 1.45]
  let count = 1
  const maxTries = 3
  while (count <= maxTries) {
    try {
      const gasLimit = gasLimitMargin(
        gasLimitEstimated,
        pad[count - 1]
      )
      const tx = await fnCallStatic(...args, {
        gasLimit,
      })
      if (tx) {
        gasLimitEstimated = gasLimit
        break
      }
    } catch (e) {
      if (count === maxTries) {
        gasLimitEstimated = BigNumber.from(maxGasLimit || 1000000)
      }
      count++
    }
  }
  return gasLimitEstimated
}
