import { LineProps, Serie } from "@nivo/line"
import { cellarDataMap } from "data/cellarDataMap"
import { useStrategyData } from "data/hooks/useStrategyData"
import { format, subDays } from "date-fns"
import {
  GetAllTimeShareValueQuery,
  GetMonthlyShareValueQuery,
  GetWeeklyShareValueQuery,
} from "src/data/actions/types"
import { fetchWeeklyShareValueData } from "queries/get-weekly-share-value-data"
import { fetchMonthlyShareValueData } from "queries/get-monthly-share-value-data"
import { fetchAllTimeShareValueData } from "queries/get-all-time-share-value-data"
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import { colors } from "theme/colors"
import { OperationContext } from "urql"
import {
  getPreviousMonth,
  getPreviousWeek,
} from "utils/calculateTime"
import { createApyChangeDatum } from "utils/chartHelper"

export interface DataProps {
  series?: Serie[]
  chartProps: Partial<LineProps>
}

export interface ApyData {
  yFormatted: string | number
  xFormatted: string | number
  average: string | number
}

export interface ShowLine {
  apy: boolean
}

type Timeline = "7D" | "30D" | "ALL"

export interface ApyChartContext {
  isFetching: boolean
  isError: boolean
  data: DataProps
  reexecuteWeekly: (
    opts?: Partial<OperationContext> | undefined
  ) => void
  reexecuteMonthly: (
    opts?: Partial<OperationContext> | undefined
  ) => void
  reexecuteAllTime: (
    opts?: Partial<OperationContext> | undefined
  ) => void
  timeArray: {
    title: string
    onClick: () => void
  }[]
  apyChange: ApyData
  setApyChange: Dispatch<SetStateAction<ApyData>>
  showLine: ShowLine
  setShowLine: Dispatch<SetStateAction<ShowLine>>
}

const hourlyChartProps: Partial<LineProps> = {
  axisBottom: {
    format: "%d %H:%M",
    tickValues: "every 3 hours",
  },
  xFormat: "time:%H:%M",
  xScale: {
    type: "time",
    format: "%H:%M",
    useUTC: false,
    precision: "hour",
  },
}
const dayChartProps: Partial<LineProps> = {
  axisBottom: {
    format: "%d",
    tickValues: "every day",
  },
  xFormat: "time:%b %d, %Y",
  xScale: {
    type: "time",
    format: "%d",
    useUTC: false,
    precision: "day",
  },
}
const monthChartProps: Partial<LineProps> = {
  axisBottom: {
    format: "%d",
    tickValues: "every 2 days",
  },
  xFormat: "time:%b %d, %Y",
  xScale: {
    type: "time",
    format: "%d",
    useUTC: false,
    precision: "day",
  },
}
const allTimeChartProps: Partial<LineProps> = {
  axisBottom: {
    format: "%d",
    tickValues: "every 2 days",
  },
  xFormat: "time:%b %d, %Y",
  xScale: {
    type: "time",
    format: "%d",
    useUTC: false,
    precision: "day",
  },
}

const defaultSerieId = "default"

const initialData: ApyChartContext = {
  data: {
    series: [{ id: defaultSerieId, data: [{ x: new Date(), y: 0 }] }],
    chartProps: hourlyChartProps,
  },
  isFetching: true,
  isError: false,
  reexecuteWeekly: () => null,
  reexecuteMonthly: () => null,
  reexecuteAllTime: () => null,
  setApyChange: () => null,
  apyChange: {
    xFormatted: "",
    yFormatted: "",
    average: "",
  },
  timeArray: [
    {
      title: "",
      onClick: () => null,
    },
  ],
  showLine: {
    apy: true,
  },
  setShowLine: () => null,
}

const apyChartContext = createContext<ApyChartContext>(initialData)

const prevWeek = getPreviousWeek()
const prevMonth = getPreviousMonth()

export const ApyChartProvider: FC<{
  address: string
}> = ({ children, address }) => {
  const [showLine, setShowLine] = useState<ShowLine>({
    apy: true,
  })
  const [timeline, setTimeline] = useState<Timeline>("30D")
  const cellarData = Object.values(cellarDataMap).find(
    (item) => item.config.cellar.address === address
  )
  const launchDate = cellarData?.launchDate!
  const { data: strategyData, isLoading: isStrategyDataLoading } =
    useStrategyData(cellarData!.config.cellar.address)
  const launchDay = launchDate ?? subDays(new Date(), 8)
  const launchEpoch = Math.floor(launchDay.getTime() / 1000)

  const [weeklyDataRaw, setWeeklyDataRaw] = useState<
    GetWeeklyShareValueQuery | undefined
  >(undefined)
  const [weeklyIsFetching, setWeeklyIsFetching] = useState(false)
  const [weeklyError, setWeeklyError] = useState(null)
  const [reexecuteWeeklyTrigger, setReexecuteWeeklyTrigger] =
    useState(0) // a state variable to trigger re-fetch

  // useCallback is used to prevent unnecessary re-renders when passing this function down to child components
  const reexecuteWeekly = useCallback(() => {
    setReexecuteWeeklyTrigger((prevState) => prevState + 1)
  }, [])

  useEffect(() => {
    setWeeklyIsFetching(true)
    fetchWeeklyShareValueData(prevWeek, address, cellarData.config.chain.id)
      .then((data) => {
        setWeeklyDataRaw(data)
        setWeeklyIsFetching(false)
      })
      .catch((error) => {
        setWeeklyError(error)
        setWeeklyIsFetching(false)
      })
  }, [prevWeek, address, reexecuteWeeklyTrigger]) // re-execute the effect when 'prevWeek' or 'address' changes

  const [monthlyDataRaw, setMonthlyDataRaw] = useState<
    GetMonthlyShareValueQuery | undefined
  >(undefined)
  const [monthlyIsFetching, setMonthlyIsFetching] = useState(false)
  const [monthlyError, setMonthlyError] = useState(null)
  const [reexecuteMonthlyTrigger, setReexecuteMonthlyTrigger] =
    useState(0) // a state variable to trigger re-fetch

  // useCallback is used to prevent unnecessary re-renders when passing this function down to child components
  const reexecuteMonthly = useCallback(() => {
    setReexecuteMonthlyTrigger((prevState) => prevState + 1)
  }, [])

  useEffect(() => {
    setMonthlyIsFetching(true)
    fetchMonthlyShareValueData(prevMonth, address, cellarData.config.chain.id)
      .then((data) => {
        setMonthlyDataRaw(data)
        setMonthlyIsFetching(false)
      })
      .catch((error) => {
        setMonthlyError(error)
        setMonthlyIsFetching(false)
      })
  }, [prevMonth, address, reexecuteMonthlyTrigger]) // re-execute the effect when 'prevMonth' or 'address' changes

  const [allTimeDataRaw, setAllTimeDataRaw] = useState<
    GetAllTimeShareValueQuery | undefined
  >(undefined)
  const [allTimeIsFetching, setAllTimeIsFetching] = useState(false)
  const [allTimeError, setAllTimeError] = useState(null)
  const [reexecuteAllTimeTrigger, setReexecuteAllTimeTrigger] =
    useState(0) // a state variable to trigger re-fetch

  // useCallback is used to prevent unnecessary re-renders when passing this function down to child components
  const reexecuteAllTime = useCallback(() => {
    setReexecuteAllTimeTrigger((prevState) => prevState + 1)
  }, [])

  useEffect(() => {
    setAllTimeIsFetching(true)
    fetchAllTimeShareValueData(address, cellarData.config.chain.id)
      .then((data) => {
        setAllTimeDataRaw(data)
        setAllTimeIsFetching(false)
      })
      .catch((error) => {
        setAllTimeError(error)
        setAllTimeIsFetching(false)
      })
  }, [address, reexecuteAllTimeTrigger])

  let weeklyData = weeklyDataRaw?.cellar?.dayDatas.filter(
    (item) => new Date(item.date * 1000) > launchDate
  )
  let monthlyData = monthlyDataRaw?.cellar?.dayDatas.filter(
    (item) => new Date(item.date * 1000) > launchDate
  )

  // data inverted
  let allTimeData = allTimeDataRaw?.cellar?.dayDatas
    .filter((item) => new Date(item.date * 1000) > launchDate)
    .reverse()

  // Functions to update data returned by hook
  const setDataWeekly = () => {
    setTimeline("7D")
    let apyDatum = createApyChangeDatum({
      data: allTimeData?.map((item) => {
        return {
          date: item.date,
          shareValue: item.shareValue,
        }
      }),
      launchEpoch,
      decimals: 18, // Cellar decimals
      smooth: true,
      daysSmoothed: 14,
      daysRendered: 30,
    })

    const series = [
      {
        id: "apy",
        data: apyDatum || [],
        color: colors.neutral[100],
        label: "7D",
      },
    ]

    setData({
      series,
      chartProps: monthChartProps, // Note the use of month chart props here, this is due to the fixed time window
    })

    const latestData = series![0].data.at(-1)
    const firstData = series![0].data.at(0)

    const latestDate = format(
      new Date(String(latestData?.x ?? new Date())),
      "d MMM yyyy"
    )
    const dateText = `${format(
      new Date(String(firstData?.x ?? new Date())),
      "d MMM yyyy"
    )} - ${format(
      new Date(String(latestData?.x ?? new Date())),
      "d MMM yyyy"
    )}`
    const valueExists: boolean =
      Boolean(latestData?.y) || String(latestData?.y) === "0"

    let average =
      Number(
        apyDatum?.reduce((a, b) => Number(a) + Number(b.value), 0)
      ) / Number(apyDatum?.length)

    setApyChange({
      xFormatted: dateText,
      yFormatted: `${valueExists ? String(latestData?.y) : "--"}`,
      average: average.toFixed(1) + "%",
    })
  }

  const setDataMonthly = () => {
    setTimeline("30D")
    let apyDatum = createApyChangeDatum({
      data: allTimeData?.map((item) => {
        return {
          date: item.date,
          shareValue: item.shareValue,
        }
      }),
      launchEpoch,
      decimals: 18, // Cellar decimals
      smooth: true,
      daysSmoothed: 30,
      daysRendered: 30,
    })
    const series = [
      {
        id: "apy",
        data: apyDatum || [],
        color: colors.neutral[100],
        label: "30D",
      },
    ]

    setData({
      series,
      chartProps: monthChartProps,
    })

    const latestData = series[0].data.at(-1)
    const firstData = series[0].data.at(0)

    const valueExists: boolean =
      Boolean(latestData?.y) || String(latestData?.y) === "0"
    const dateText = `${format(
      new Date(String(firstData?.x ?? new Date())),
      "d MMM yyyy"
    )} - ${format(
      new Date(String(latestData?.x ?? new Date())),
      "d MMM yyyy"
    )}`
    let average =
      Number(
        apyDatum?.reduce((a, b) => Number(a) + Number(b.value), 0)
      ) / Number(apyDatum?.length)

    setApyChange({
      xFormatted: dateText,
      yFormatted: `${valueExists ? String(latestData?.y) : "--"}`,
      average: average.toFixed(1) + "%",
    })
  }

  const setDataAllTime = () => {
    setTimeline("ALL")
    let apyDatum = createApyChangeDatum({
      data: allTimeData?.map((item) => {
        return {
          date: item.date,
          shareValue: item.shareValue,
        }
      }),
      launchEpoch,
      decimals: 18, // Cellar decimals
      smooth: false,
      daysSmoothed: 0,
      daysRendered: 0,
    })
    const series = [
      {
        id: "apy",
        data: apyDatum || [],
        color: colors.neutral[100],
        label: "All time",
      },
    ]
    setData({
      series,
      chartProps: allTimeChartProps,
    })
    const latestData = series[0].data.at(-1)
    const firstData = series[0].data.at(0)

    const valueExists: boolean =
      Boolean(latestData?.y) || String(latestData?.y) === "0"
    const dateText = `${format(
      new Date(String(firstData?.x ?? new Date())),
      "d MMM yyyy"
    )} - ${format(
      new Date(String(latestData?.x ?? new Date())),
      "d MMM yyyy"
    )}`

    let average =
      Number(
        apyDatum?.reduce((a, b) => Number(a) + Number(b.value), 0)
      ) / Number(apyDatum?.length)

    setApyChange({
      xFormatted: dateText,
      yFormatted: `${valueExists ? String(latestData?.y) : "--"}`,
      average: average.toFixed(1) + "%",
    })
  }

  // Set data to be returned by hook
  const [data, setData] = useState<DataProps>({
    series: [{ id: defaultSerieId, data: [{ x: new Date(), y: 0 }] }],
    chartProps: hourlyChartProps,
  })

  // Set tvl value
  const [apyChange, setApyChange] = useState<ApyData>({
    xFormatted: "",
    yFormatted: "",
    average: "",
  })

  // Grouped loading state
  const isFetching =
    weeklyIsFetching ||
    monthlyIsFetching ||
    allTimeIsFetching ||
    isStrategyDataLoading

  const isError = !!weeklyError || !!monthlyError || !!allTimeError

  const timeArray = [
    {
      title: "7D",
      onClick: setDataWeekly,
    },
    {
      title: "30D",
      onClick: setDataMonthly,
    },
  ]

  // Set monthly data by default
  useEffect(() => {
    const idIsDefault: boolean =
      data?.series![0].id === defaultSerieId
    if (allTimeData && idIsDefault && strategyData) {
      let apyDatum = createApyChangeDatum({
        data: allTimeData?.map((item) => {
          return {
            date: item.date,
            shareValue: item.shareValue,
          }
        }),
        launchEpoch,
        decimals: 18, // Cellar decimals
        smooth: true,
        daysSmoothed: 30,
        daysRendered: 30,
      })

      const series = [
        {
          id: "apy",
          data: apyDatum || [],
          color: colors.neutral[100],
          label: "30D",
        },
      ]

      setData({
        series,
        chartProps: monthChartProps,
      })

      const latestData = series![0].data.at(-1)
      const firstData = series![0].data.at(0)

      const dateText = `${format(
        new Date(String(firstData?.x ?? new Date())),
        "d MMM yyyy"
      )} - ${format(
        new Date(String(latestData?.x ?? new Date())),
        "d MMM yyyy"
      )}`
      const valueExists: boolean =
        Boolean(latestData?.y) || String(latestData?.y) === "0"

      let average =
        Number(
          apyDatum?.reduce((a, b) => Number(a) + Number(b.value), 0)
        ) / Number(apyDatum?.length)

      setApyChange({
        xFormatted: dateText,
        yFormatted: `${valueExists ? String(latestData?.y) : "--"}`,
        average: average.toFixed(1) + "%",
      })
    }
  }, [allTimeData, data, launchEpoch, strategyData])

  const dataC = {
    ...data,
    series: data.series?.filter((item) => {
      if (item.id === "apy") {
        return showLine.apy
      }
      return false
    }),
  }

  return (
    <apyChartContext.Provider
      value={{
        isFetching,
        isError,
        data: dataC,
        reexecuteWeekly,
        reexecuteMonthly,
        reexecuteAllTime,
        timeArray,
        apyChange,
        setApyChange,
        showLine,
        setShowLine,
      }}
    >
      {children}
    </apyChartContext.Provider>
  )
}

export const useApyChart = () => {
  const context = useContext(apyChartContext)

  if (context === undefined) {
    throw new Error(
      "This hook must be used within a ApyChartProvider."
    )
  }

  return context
}
