import { injectSpeedInsights } from '@vercel/speed-insights'

export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'production') {
    injectSpeedInsights()
  }
})
