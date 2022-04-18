import { useState, VFC } from "react"
import {
  FormControl,
  FormErrorMessage,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FormProvider, useForm } from "react-hook-form"
import { BaseButton } from "components/_buttons/BaseButton"
import { AiOutlineInfo } from "react-icons/ai"
import { SecondaryButton } from "components/_buttons/SecondaryButton"
import { ModalInput } from "components/_inputs/ModalInput"
import { CardHeading } from "components/_typography/CardHeading"
import { ModalMenu } from "components/_menus/ModalMenu"
import { Token } from "data/tokenConfig"
import {Link} from 'components/Link'
import { config } from '../../utils/config'
import {
  erc20ABI,
  useSigner,
  useContract,
  useAccount,
  useWaitForTransaction
} from 'wagmi'
import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'
import { useBrandedToast } from 'hooks/chakra'
import { useAaveV2Cellar } from 'context/aaveV2StablecoinCellar'
interface FormValues {
  depositAmount: number
  selectedToken: Token
}

export const DepositForm: VFC = () => {
  const methods = useForm<FormValues>()
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitted }
  } = useForm<FormValues>()

  // const [data, setData] = useState<any>()
  const watchDepositAmount = watch('depositAmount')
  const isError = errors.depositAmount
  const isDisabled =
    isNaN(watchDepositAmount) || watchDepositAmount <= 0 || isError
  const setMax = () => setValue('depositAmount', 100000)

  const { addToast, update, close, closeAll } = useBrandedToast()
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()
  const { aaveCellarSigner, userData, fetchUserData } = useAaveV2Cellar()
  // eslint-disable-next-line no-unused-vars
  const [_, wait] = useWaitForTransaction({
    skip: true
  })

  const erc20Contract = useContract({
    addressOrName: config.CONTRACT.DAI.ADDRESS,
    contractInterface: erc20ABI,
    signerOrProvider: signer
  })

  const onSubmit = async (data: any, e: any) => {
    console.log(data, e)
    // check if approval exists
    const allowance = await erc20Contract.allowance(
      account?.address,
      config.CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS
    )
    const amtInBigNumber = new BigNumber(data?.depositAmount)
    const amtInWei = ethers.utils.parseUnits(amtInBigNumber.toFixed(), 18)

    let needsApproval
    try {
      needsApproval = allowance.lt(amtInWei)
    } catch (e) {
      console.error('Invalid Input')
      return
    }
    console.log(needsApproval)
    if (needsApproval) {
      try {
        const { hash } = await erc20Contract.approve(
          config.CONTRACT.AAVE_V2_STABLE_CELLAR.ADDRESS,
          ethers.constants.MaxUint256
        )
        addToast({
          heading: 'ERC20 Approval',
          status: 'default',
          body: <Text>Approving DAI</Text>,
          isLoading: true,
          closeHandler: close,
          duration: null
        })
        const waitForApproval = wait({ confirmations: 1, hash })
        const result = await waitForApproval
        console.log({ result })
        result?.data?.transactionHash &&
          update({
            heading: 'ERC20 Approval',
            body: <Text>DAI Approved</Text>,
            status: 'success',
            closeHandler: closeAll
          })

        result?.error &&
          update({
            heading: 'ERC20 Approval',
            body: <Text>Approval Failed</Text>,
            status: 'error',
            closeHandler: closeAll
          })
      } catch (e) {
        addToast({
          heading: 'ERC20 Approval',
          body: <Text>Approval Cancelled</Text>,
          status: 'warning',
          closeHandler: closeAll
        })
      }
    }

    // deposit
    let depositConf
    console.log(amtInWei, account?.address)

    try {
      const { hash: depositConf } = await aaveCellarSigner.deposit(
        amtInWei,
        account?.address
        // { gasLimit: '1000000' }
      )

      addToast({
        heading: 'Aave V2 Cellar Deposit',
        status: 'default',
        body: <Text>Depositing DAI</Text>,
        isLoading: true,
        closeHandler: close,
        duration: null
      })
      const waitForDeposit = wait({
        confirmations: 1,
        hash: depositConf
      })

      const depositResult = await waitForDeposit
      console.log({ depositResult })
      depositResult?.data?.transactionHash &&
        update({
          heading: 'Aave V2 Cellar Deposit',
          body: (
            <>
              <Text>Deposit Success</Text>
              <Link
                href={`https://etherscan.io/tx/${depositResult?.data?.transactionHash}`}
              >
                View on Etherscan
              </Link>
            </>
          ),
          status: 'success',
          closeHandler: closeAll
        })

      fetchUserData()
      depositResult?.error &&
        update({
          heading: 'Aave V2 Cellar Deposit',
          body: <Text>Deposit Failed</Text>,
          status: 'error',
          closeHandler: closeAll
        })
    } catch (e) {
      addToast({
        heading: 'Aave V2 Cellar Deposit',
        body: <Text>Deposit Cancelled</Text>,
        status: 'error',
        closeHandler: closeAll
      })
      console.warn('failed to deposit', e)
    }
  }

  const onError = (errors: any, e: any) => {
    console.log(errors, e)
    // try and handle basic cases
    // gasFailure
    // onChain assert
    addToast({
      heading: 'Aave V2 Cellar Deposit',
      body: <Text>Deposit Failed</Text>,
      status: 'error',
      closeHandler: closeAll
    })
  }

  return (
    <VStack
      as='form'
      spacing={8}
      align='stretch'
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormControl isInvalid={isError as boolean | undefined}>
        <InputGroup display='flex' alignItems='center'>
          <ModalInput
            type='number'
            step='any'
            {...register('depositAmount', {
              required: 'Enter amount',
              valueAsNumber: true,
              validate: {
                positive: v => v > 0 || 'You must submit a positive amount.',
                lessThanBalance: v => v < 50 || 'Insufficient balance'
              }
            })}
          />
          <InputRightElement h='100%' mr={3}>
            <SecondaryButton size='sm' borderRadius={8} onClick={setMax}>
              Max
            </SecondaryButton>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage color='energyYellow'>
          <Icon
            p={0.5}
            mr={1}
            color='black'
            bg='energyYellow'
            borderRadius='50%'
            as={AiOutlineInfo}
          />{' '}
          {errors.depositAmount?.message}
        </FormErrorMessage>
      </FormControl>
      <BaseButton
        type='submit'
        isDisabled={isDisabled}
        isLoading={isSubmitting}
        fontSize={21}
        py={6}
        px={12}
      >
        <FormControl>
          <ModalMenu />
        </FormControl>
        <VStack align="flex-start">
          <CardHeading>available</CardHeading>
          <Text as="span">---</Text>
        </VStack>
        <FormControl isInvalid={isError as boolean | undefined}>
          <InputGroup display="flex" alignItems="center">
            <ModalInput
              type="number"
              step="any"
              {...register("depositAmount", {
                required: "Enter amount",
                valueAsNumber: true,
                validate: {
                  positive: (v) =>
                    v > 0 || "You must submit a positive amount.",
                },
              })}
            />
            <InputRightElement h="100%" mr={3}>
              <SecondaryButton
                size="sm"
                borderRadius={8}
                onClick={setMax}
              >
                Max
              </SecondaryButton>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage color="energyYellow">
            <Icon
              p={0.5}
              mr={1}
              color="surface.bg"
              bg="red.base"
              borderRadius="50%"
              as={AiOutlineInfo}
            />{" "}
            {errors.depositAmount?.message}
          </FormErrorMessage>
        </FormControl>
        <BaseButton
          type="submit"
          isDisabled={isDisabled}
          isLoading={isSubmitting}
          fontSize={21}
          py={6}
          px={12}
        >
          Deposit Liquidity
        </BaseButton>
      </VStack>
    </FormProvider>
  )
}
