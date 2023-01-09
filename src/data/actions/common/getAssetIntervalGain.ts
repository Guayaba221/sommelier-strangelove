import { getGainPct } from "utils/getGainPct"
import { MarketChartResponse } from "./fetchMarketChart"

// shift back coin gecko data is intentional
export const getAssetIntervalGain = async (
  day: number,
  marketChartData: MarketChartResponse
) => {
  try {
    const data = marketChartData
    const previousData = data.prices[1]

    // coingecko returns the latest date with 2 hour value, 00:00 data and latest hour data. We get the 00:00 value with length - 2 index
    const todayIndex = data.prices.length === day + 1 ? -2 : -1
    const todayData = data.prices.at(todayIndex)

    if (!todayData) throw new Error("todayData undefined")
    const result = getGainPct(todayData[1], previousData[1])

    return result
  } catch (error) {
    console.warn(error)
    throw error
  }
}
