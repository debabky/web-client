import { api } from '@/api'

export const auth = (nonce: string) => api.get(`/auth-data/${nonce}`)
