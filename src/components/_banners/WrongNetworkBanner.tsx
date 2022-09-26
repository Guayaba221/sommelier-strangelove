import { Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { SecondaryButton } from "components/_buttons/SecondaryButton"
import { BlockIcon } from "components/_icons"
import React, { VFC } from "react"
import { useSwitchNetwork } from "wagmi"

export const WrongNetworkBanner: VFC = () => {
  const { switchNetwork } = useSwitchNetwork()
  return (
    <HStack
      p={4}
      mb={12}
      spacing={4}
      align="flex-start"
      backgroundColor="red.extraDark"
      border="2px solid"
      borderRadius={16}
      borderColor="red.dark"
    >
      <BlockIcon color="red.base" />
      <VStack align="flex-start">
        <Heading size="sm">Wrong Network</Heading>
        <Text>
          You are on the wrong network-- this may couse executing
          contracts to fail. Please switch your network to Ethereum
          chain.
        </Text>
        <SecondaryButton onClick={() => switchNetwork?.(1)}>
          Switch to Ethereum
        </SecondaryButton>
        {/* <Text>
          More details can be found in our{" "}
          <Link href="/terms">
            Terms of Service <ExternalLinkIcon color="purple.base" />
          </Link>
        </Text> */}
      </VStack>
    </HStack>
  )
}
