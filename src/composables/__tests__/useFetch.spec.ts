import { describe, expect, it } from 'vitest'
import useFetch from '../useFetch'
import { nextTick } from 'vue'

describe('useFetch', () => {
  it('should fetch data', async () => {
    // Save original fetch
    const originalFetch = global.fetch

    // Mock fetch
    global.fetch = async () =>
      ({ ok: true, json: async () => ({ message: 'Success' }) }) as Response

    const { data, error, refetch } = useFetch({ url: 'https://example.com' })

    // Initial state
    expect(data.value).toBeNull()
    expect(error.value).toBeNull()

    // Fetch data
    await refetch()

    // Wait for state updates
    await nextTick()

    // Check state after fetching data
    expect(data.value).toEqual({ message: 'Success' })
    expect(error.value).toBeNull()

    // Restore original fetch
    global.fetch = originalFetch
  })
})
