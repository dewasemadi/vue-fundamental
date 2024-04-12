import { reactive, toRefs, watchEffect } from 'vue'

interface Params {
  url: string
  enabled?: boolean
}

interface State<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

export default function useFetch<T>(params: Params, options?: RequestInit) {
  const { url, enabled = true } = params
  const state = reactive<State<T>>({ data: null, error: null, loading: false })

  const refetch = async (body?: Record<string, unknown> | FormData) => {
    const isFormData = body instanceof FormData
    Object.assign(state, { data: null, error: null, loading: true })

    try {
      const response = await fetch(url, {
        body: isFormData ? body : JSON.stringify(body),
        ...(isFormData && { headers: { 'Content-Type': 'multipart/form-data' } }),
        ...options
      })
      if (!response.ok) throw new Error(response.statusText || 'Something went wrong.')
      state.data = await response.json()
    } catch (err) {
      state.error = err as Error
    } finally {
      state.loading = false
    }
  }

  if (enabled) watchEffect(() => refetch())

  return { ...toRefs(state), refetch }
}
