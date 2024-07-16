import React, { useEffect, useState } from "react"
import { CardStat } from "components/CardStat"
import { BaseButton } from "components/_buttons/BaseButton"
import { useBrandedToast } from "hooks/chakra"
import { Text, VStack } from "@chakra-ui/react"
import { MerkleRewards } from "../../../../abi/types/MerkleRewards"
import {
  usePublicClient,
  useWalletClient,
  useAccount,
  useSwitchChain,
} from "wagmi"
import { getContract, isHex, keccak256, toBytes } from "viem"

const MERKLE_CONTRACT_ADDRESS =
  "0x6D6444b54FEe95E3C7b15C69EfDE0f0EB3611445"

interface MerklePointsProps {
  userAddress?: string
  merkleRewardsApy?: number
  fetchMerkleData: () => Promise<any>
}

export const MerklePoints = ({
  userAddress,
  merkleRewardsApy,
  fetchMerkleData,
}: MerklePointsProps) => {
  const [merklePoints, setMerklePoints] = useState<string | null>(
    null
  )
  const [merkleData, setMerkleData] = useState<any>(null)
  const [isArbitrum, setIsArbitrum] = useState<boolean>(false)
  const { addToast, close } = useBrandedToast()

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { isConnected, chain: wagmiChain } = useAccount() // Use useAccount to get the current chain
  const { switchChainAsync } = useSwitchChain()

  useEffect(() => {
    if (wagmiChain) {
      setIsArbitrum(wagmiChain.id === 42161) // Set isArbitrum based on chain ID
    }
  }, [wagmiChain])

  useEffect(() => {
    if (userAddress) {
      const fetchData = async () => {
        try {
          const response = await fetchMerkleData()

          if (response.Response) {
            const totalBalance = response.Response.total_balance
            if (totalBalance && parseFloat(totalBalance) > 0) {
              setMerklePoints(totalBalance)
              setMerkleData(response.Response.tx_data)
            } else {
              setMerklePoints("0.00")
              setMerkleData(null)
            }
          } else {
            setMerklePoints("0.00")
            setMerkleData(null)
          }
        } catch (error) {
          console.error("Failed to fetch Merkle points data:", error)
          addToast({
            heading: "Error fetching data",
            status: "error",
            body: (
              <Text>
                Failed to fetch Merkle points data:{" "}
                {(error as Error).message}
              </Text>
            ),
            closeHandler: close,
            duration: null,
          })
          setMerklePoints("0.00")
          setMerkleData(null)
        }
      }

      fetchData()
    } else {
      setMerklePoints(null)
      setMerkleData(null)
    }
  }, [userAddress])

  const ensureHexPrefix = (value: string) =>
    value?.startsWith("0x") ? value : `0x${value}`

  const formatPoints = (points: string): string => {
    const number = parseFloat(points)
    if (number >= 1e9) {
      return `${(number / 1e9).toFixed(2)}B`
    } else if (number >= 1e6) {
      return `${(number / 1e6).toFixed(2)}M`
    } else if (number >= 1e3) {
      return `${(number / 1e3).toFixed(2)}K`
    } else {
      return number.toFixed(2)
    }
  }

  const handleClaimMerklePoints = async () => {
    if (!walletClient) {
      addToast({
        heading: "Wallet Not Connected",
        status: "error",
        body: (
          <Text>
            Please connect your wallet to claim Merkle rewards.
          </Text>
        ),
        closeHandler: close,
        duration: null,
      })
      return
    }

    if (merkleData && publicClient) {
      try {
        const merkleRewardsContract = getContract({
          address: MERKLE_CONTRACT_ADDRESS,
          abi: MerkleRewards,
          client: walletClient,
        })

        const hasClaimed = await merkleRewardsContract.read.claimed([
          keccak256(
            toBytes(ensureHexPrefix(merkleData.rootHashes[0]))
          ) as `0x${string}`,
          userAddress as `0x${string}`,
        ])
        if (hasClaimed) {
          addToast({
            heading: "Claim Info",
            status: "info",
            body: <Text>Claim has already been made</Text>,
            closeHandler: close,
            duration: null,
          })
          return
        }

        const rootHashes = merkleData.rootHashes.map(
          (hash: string) => {
            const prefixedHash = ensureHexPrefix(hash)
            if (!isHex(prefixedHash)) {
              throw new Error(`Invalid hex string: ${prefixedHash}`)
            }
            return prefixedHash
          }
        )

        const merkleProofs = merkleData.merkleProofs.map(
          (proofArray: string[]) =>
            proofArray.map((proof: string) => {
              const prefixedProof = ensureHexPrefix(proof)
              if (!isHex(prefixedProof)) {
                throw new Error(
                  `Invalid hex string: ${prefixedProof}`
                )
              }
              return prefixedProof
            })
        )

        const tx = await merkleRewardsContract.write.claim([
          userAddress,
          rootHashes,
          merkleData.tokens,
          merkleData.balances,
          merkleProofs,
        ])

        if (tx?.wait) {
          await tx.wait()
          addToast({
            heading: "Success",
            status: "success",
            body: <Text>Claim successful</Text>,
            closeHandler: close,
            duration: null,
          })
        } else {
          throw new Error("Transaction object is invalid")
        }
      } catch (error) {
        if (error instanceof Error && "code" in error) {
          if ((error as any).code === "UNPREDICTABLE_GAS_LIMIT") {
            console.error(
              "Claim failed: It has already been claimed or another error occurred",
              error
            )
            addToast({
              heading: "Claim Failed",
              status: "error",
              body: (
                <Text>
                  Claim failed: It has already been claimed or another
                  error occurred
                </Text>
              ),
              closeHandler: close,
              duration: null,
            })
          } else {
            console.error("Claim failed:", error)
            addToast({
              heading: "Claim Failed",
              status: "error",
              body: (
                <Text>Claim failed: {(error as Error).message}</Text>
              ),
              closeHandler: close,
              duration: null,
            })
          }
        } else {
          console.error("An unknown error occurred:", error)
          addToast({
            heading: "Unknown Error",
            status: "error",
            body: (
              <Text>
                An unknown error occurred: {(error as Error).message}
              </Text>
            ),
            closeHandler: close,
            duration: null,
          })
        }
      }
    } else {
      console.error("Web3 provider not found or no merkle data")
      addToast({
        heading: "Error",
        status: "error",
        body: <Text>Web3 provider not found or no merkle data</Text>,
        closeHandler: close,
        duration: null,
      })
    }
  }

  return (
    <VStack spacing={4} alignItems="flex-start">
      <CardStat
        label="Merkle Points"
        tooltip="The number of Merkle points accumulated. Please note that you will only receive ARB rewards if you also stake your shares in the SOMM staking contract."
        alignSelf="flex-start"
        spacing={0}
      >
        {userAddress
          ? merklePoints !== null
            ? formatPoints(merklePoints)
            : "Loading..."
          : "--"}
      </CardStat>
      <BaseButton
        onClick={handleClaimMerklePoints}
        isDisabled={
          !userAddress ||
          merklePoints === null ||
          merklePoints === "0.00" ||
          !isArbitrum // Disable if not on Arbitrum chain
        }
      >
        Claim Merkle Rewards
      </BaseButton>
    </VStack>
  )
}
