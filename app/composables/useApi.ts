export const useApi = () => {
  const config = useRuntimeConfig()
  
  // Base URL from .env via runtimeConfig
  const API_BASE_URL = config.public.apiBaseUrl

  /**
   * Predicts fault based on 200x7 time-series data.
   */
  const predictFault = async (signals) => {
    try {
      if (!Array.isArray(signals) || signals.length !== 200 || signals[0].length !== 7) {
        throw new Error('Invalid input shape. Expected a 200x7 matrix.')
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
   * Prioritizes local results/metrics.json if available.
   */
  const getMetrics = async () => {
    try {
      // First try local results folder in public/
      const localResponse = await $fetch('/results/metrics.json')
      return localResponse
    } catch (localError) {
      console.warn('Local metrics not found, falling back to API:', localError)
      try {
        const apiResponse = await $fetch(`${API_BASE_URL}/metrics`)
        return apiResponse
      } catch (apiError) {
        console.error('API Error (getMetrics):', apiError)
        throw apiError
      }
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
