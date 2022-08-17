import {
  Stack,
  Input,
  Text,
  HStack,
  InputProps,
  FormErrorMessage,
  Icon,
  Image,
} from "@chakra-ui/react"
import { InformationIcon } from "components/_icons"
import { getKeplr, mainnetChains } from "graz"
import { useBrandedToast } from "hooks/chakra"
import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { AiOutlineInfo } from "react-icons/ai"
import { validateSommelierAddress } from "utils/validateSommelierAddress"

export const InputSommelierAddress: React.FC<InputProps> = ({
  children,
  ...rest
}) => {
  const { addToast, closeAll } = useBrandedToast()
  const {
    register,
    formState,
    setError,
    watch,
    clearErrors,
    setValue,
  } = useFormContext()

  const watchSommelierAddress = watch("sommelierAddress")

  useEffect(() => {
    const isValid = validateSommelierAddress(watchSommelierAddress)
    if (watchSommelierAddress && !isValid) {
      setError("sommelierAddress", {
        message: "Address is not valid",
        type: "validate",
      })
    } else {
      clearErrors("sommelierAddress")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSommelierAddress])

  const onAutofillClick = async () => {
    try {
      const keplr = getKeplr()
      if (!keplr) throw new Error("Keplr not found")
      const key = await keplr.getKey(mainnetChains.sommelier.chainId)
      if (!key.bech32Address) throw new Error("Address not defined")
      setValue("sommelierAddress", key.bech32Address)
    } catch (e) {
      const error = e as Error
      addToast({
        heading: "Autofill from Keplr",
        body: <Text>{error.message}</Text>,
        status: "error",
        closeHandler: closeAll,
      })
    }
  }

  return (
    <Stack spacing={2}>
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" color="neutral.400" fontSize="xs">
          Sommelier Address
        </Text>
        <HStack as="button" spacing={1} onClick={onAutofillClick}>
          <Text fontWeight="bold" color="white" fontSize="xs">
            Autofill from
          </Text>
          <Image
            src="/assets/images/keplr.png"
            alt="Keplr logo"
            width={4}
          />
        </HStack>
      </HStack>
      <Input
        placeholder="Enter Sommelier address"
        fontSize="xs"
        fontWeight={700}
        boxShadow="orangeOutline1"
        variant="unstyled"
        borderRadius="16px"
        px={4}
        py={6}
        maxH="64px"
        _placeholder={{
          fontSize: "lg",
        }}
        type="text"
        {...register("sommelierAddress", {
          required: "Enter Sommelier address",
        })}
        {...rest}
      />
      <FormErrorMessage>
        <Icon
          p={0.5}
          mr={1}
          color="surface.bg"
          bg="red.base"
          borderRadius="50%"
          as={AiOutlineInfo}
        />
        <Text fontSize="xs" fontWeight="semibold" color="red.light">
          {formState.errors.sommelierAddress?.message}
        </Text>
      </FormErrorMessage>
      <HStack spacing="6px">
        <InformationIcon color="orange.base" boxSize="12px" />
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="orange.light"
        >
          You need to have a Cosmos wallet to bridge SOMM from
          Ethereum Mainnet to Sommelier.
        </Text>
      </HStack>
    </Stack>
  )
}