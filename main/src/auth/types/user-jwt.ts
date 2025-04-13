import { z } from 'zod'

export const UserJwt = z.object({
  user: z.object({
    sub: z.number(),
  })
})