import axios from "axios"

const API_BASE_URL = "https://api.sommelier.finance/merkle/arbitrum/"

export const fetchMerkleData = async (
  vaultAddress: string,
  userAddress: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${vaultAddress}/${userAddress}`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch Merkle data:", error)
    throw error
  }
}
