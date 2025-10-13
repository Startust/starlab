import { z } from 'zod'

/**
 * 只在运行时读取一次并校验。
 * - 生产环境里，任何缺失会抛错（尽早失败）
 * - 开发环境里也能给出清晰报错信息
 */
const schema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('starlab'),
  NEXT_PUBLIC_API_BASE: z.string().optional().default(''),
})

const parsed = schema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
})

if (!parsed.success) {
  // 这里直接抛错，能在启动时就发现问题
  // 你也可以在开发环境只打印 warning
   
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
 