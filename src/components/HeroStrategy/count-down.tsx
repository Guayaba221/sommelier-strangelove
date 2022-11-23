import { VStack, Heading, HStack, Text } from "@chakra-ui/react"
import { format, zonedTimeToUtc, utcToZonedTime } from "date-fns-tz"
import { FC } from "react"
import Countdown from "react-countdown"

interface CountDownProps {
  launchDate: string
}

const pad = (d: number) => {
  return d < 10 ? "0" + d.toString() : d.toString()
}

export const CountDown: FC<CountDownProps> = ({ launchDate }) => {
  const timezone = "PST"
  const dateTz = zonedTimeToUtc(new Date(launchDate), timezone)
  const pst = utcToZonedTime(dateTz, timezone)
  const day = format(pst, "iii MMM d")
  const hour = format(pst, "h:mmaaa")

  return (
    <VStack
      background="surface.secondary"
      padding="30px 16px"
      borderRadius={40}
      textAlign="center"
    >
      <Text fontWeight="bold" color="neutral.300">
        Launching on
      </Text>
      <Heading>{day}</Heading>
      <Text fontWeight="bold">
        {hour} {timezone}
      </Text>
      <HStack
        w="full"
        padding={6}
        backgroundColor="surface.tertiary"
        justifyContent="space-between"
        borderRadius="24px"
        fontWeight="semibold"
        color="white"
        fontSize="24px"
        divider={<Text>:</Text>}
      >
        <Countdown
          date={dateTz}
          zeroPadDays={2}
          zeroPadTime={2}
          renderer={({
            days,
            hours,
            minutes,
            seconds,
            completed,
          }) => {
            if (completed) {
              return null
            }

            return (
              <>
                <Text w="4ch">{pad(days)}d</Text>
                <Text w="4ch">{pad(hours)}h</Text>
                <Text w="4ch">{pad(minutes)}m</Text>
                <Text w="4ch">{pad(seconds)}s</Text>
              </>
            )
          }}
        />
      </HStack>
    </VStack>
  )
}