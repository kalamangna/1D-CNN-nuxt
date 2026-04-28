export const useApi = () => {
  const config = useRuntimeConfig()
  
  // Base URL for the Flask API
  const API_BASE_URL = 'http://localhost:5001'

  /**
   * Predicts fault based on 200x6 time-series data.
   */
  const predictFault = async (signals) => {
    try {
      if (!Array.isArray(signals) || signals.length !== 200 || signals[0].length !== 6) {
        throw new Error('Invalid input shape. Expected a 200x6 matrix.')
      }

      const response = await $fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: { signals },
        headers: { 'Content-Type': 'application/json' }
      })

      return response
    } catch (error) {
      console.error('API Error (predictFault):', error)
      throw error
    }
  }

  /**
   * Fetches model performance metrics.
   */
  const getMetrics = async () => {
    try {
      const response = await $fetch(`${API_BASE_URL}/metrics`)
      return response
    } catch (error) {
      console.error('API Error (getMetrics):', error)
      throw error
    }
  }

  /**
   * Checks the health of the backend API.
   */
  const checkHealth = async () => {
    try {
      const response = await $fetch(`${API_BASE_URL}/health`)
      return response
    } catch (error) {
      return null
    }
  }

  return {
    predictFault,
    getMetrics,
    checkHealth,
    API_BASE_URL
  }
}
