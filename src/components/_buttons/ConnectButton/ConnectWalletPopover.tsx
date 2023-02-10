import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useToast,
  Text,
  HStack,
  Spinner,
  Portal,
} from "@chakra-ui/react"
import { BaseButton, BaseButtonProps } from "../BaseButton"
import { MoneyWalletIcon } from "components/_icons"
import { useAccount, useConnect } from "wagmi"
import React from "react"
import { analytics } from "utils/analytics"
import { ConnectButtonProps } from "."
import useBetterMediaQuery from "hooks/utils/useBetterMediaQuery"
import Image from "next/image"

export const ConnectWalletPopover = ({
  unstyled,
  ...rest
}: ConnectButtonProps) => {
  const toast = useToast()
  const {
    isConnected,
    isConnecting,
    connector: activeConnector,
  } = useAccount()
  const isLarger768 = useBetterMediaQuery("(min-width: 768px)")

  const styles: BaseButtonProps | false = !unstyled && {
    p: 3,
    bg: "surface.primary",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "surface.secondary",
    minW: "max-content",
    fontFamily: "Haffer",
    fontSize: 12,
    icon: MoneyWalletIcon,
    iconProps: {
      bgColor: "unset",
      borderRadius: "unset",
      _groupHover: {
        bgColor: "unset",
      },
    },
    _hover: {
      bg: "purple.dark",
      borderColor: "surface.tertiary",
    },
  }

  const { connect, connectors, pendingConnector } = useConnect({
    onError: (error, args) => {
      toast({
        title: "Connection failed!",
        description: error.message,
        status: "error",
        isClosable: true,
      })

      analytics.track("wallet.connect-failed", {
        error: error.name,
        message: error.message,
        wallet: args.connector.name,
      })
    },
    onSuccess: (data, args) => {
      const { account } = data
      toast({
        title: "Connected",
        description: "Your wallet is connected",
        status: "success",
        isClosable: true,
      })
      if (account && account.length) {
        analytics.track("wallet.connect-succeeded", {
          account,
          wallet: args.connector.name,
        })
      }
    },
  })

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <BaseButton {...styles} {...rest}>
          Connect {isLarger768 && "Wallet"}
        </BaseButton>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          p={2}
          borderWidth={1}
          borderColor="purple.dark"
          borderRadius={12}
          bg="surface.bg"
          fontWeight="semibold"
          _focus={{
            outline: "unset",
            outlineOffset: "unset",
            boxShadow: "unset",
          }}
          w="auto"
          zIndex={401}
        >
          <PopoverBody p={0}>
            <Stack>
              {connectors
                .filter(
                  (x) => x.ready && x.id !== activeConnector?.id
                )
                .map((x) => (
                  <Stack
                    key={x.id}
                    as="button"
                    py={2}
                    px={4}
                    fontSize="sm"
                    onClick={() => {
                      analytics.track(
                        "wallet.connect-wallet-selection",
                        {
                          wallet: x.name,
                        }
                      )
                      connect({ connector: x })
                    }}
                    _hover={{
                      cursor: "pointer",
                      bg: "purple.dark",
                      borderColor: "surface.tertiary",
                    }}
                  >
                    <HStack>
                      {isConnecting &&
                      x.id === pendingConnector?.id ? (
                        <Spinner />
                      ) : (
                        <Image
                          src={`/assets/icons/${x?.name?.toLowerCase()}.svg`}
                          alt="wallet logo"
                          width={24}
                          height={24}
                        />
                      )}

                      <Text fontWeight="semibold">{x.name}</Text>
                    </HStack>
                  </Stack>
                ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}