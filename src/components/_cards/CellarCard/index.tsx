import { BoxProps, Heading, Spinner } from "@chakra-ui/react"
import {
  CellarCardDisplay,
  CellarCardData,
} from "./CellarCardDisplay"
import { useGetCellarQuery } from "generated/subgraph"
import { cellarDataMap } from "data/cellarDataMap"
import { averageTvlActive } from "utils/cellarApy"
import { BigNumber } from "bignumber.js"

interface CellarCardProps extends BoxProps {
  cellarAddress: string
  index?: number
}

export const CellarCard: React.FC<CellarCardProps> = ({
  cellarAddress,
  index,
  ...rest
}) => {
  const [cellarResult] = useGetCellarQuery({
    variables: {
      cellarAddress,
      cellarString: cellarAddress,
    },
  })

  const { data, fetching } = cellarResult

  if (fetching) {
    return <Spinner />
  }

  if (data?.cellar === null || data?.cellar === undefined) {
    return <Heading>Cellar not found</Heading>
  }

  const { asset, dayDatas, tvlActive, tvlTotal } = data.cellar

  // const apy = data && averageApy(dayDatas).toFixed(2)
  const tvm =
    tvlTotal &&
    asset &&
    new BigNumber(tvlTotal).dividedBy(10 ^ asset?.decimals).toString()

  const avgTvlActive = averageTvlActive(dayDatas, tvlActive)
  const {
    name,
    description,
    individualApy,
    cellarApy,
    strategyType,
    managementFee,
    protocols,
  } = cellarDataMap[cellarAddress]

  const cellarCardData: CellarCardData = {
    cellarId: cellarAddress,
    name,
    description,
    tvm: "",
    individualApy,
    cellarApy,
    strategyType,
    managementFee,
    protocols,
  }

  return <CellarCardDisplay data={cellarCardData} {...rest} />
}
