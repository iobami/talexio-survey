import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const decodeJwt = (jwt: string) => {
  try {
    return JSON.parse(atob(jwt.split('.')[1]))
  } catch (error) {
    return { exp: 0, sessionId: '' }
  }
}
