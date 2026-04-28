import { ref, onMounted, onUnmounted } from 'vue'
import { useApi } from './useApi'

const isOnline = ref(false)
const isChecking = ref(false)

export const useBackendStatus = () => {
  const { checkHealth } = useApi()
  let intervalId = null

  const updateStatus = async () => {
    isChecking.value = true
    const health = await checkHealth()
    isOnline.value = !!health
    isChecking.value = false
  }

  const startPolling = (ms = 10000) => {
    if (intervalId) return
    updateStatus()
    intervalId = setInterval(updateStatus, ms)
  }

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    isOnline,
    isChecking,
    updateStatus,
    startPolling,
    stopPolling
  }
}
