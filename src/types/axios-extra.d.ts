// src/types/axios-extra.d.ts
import 'axios';

declare module 'axios' {
  /** 自定义额外控制项 */
  export interface AxiosRequestConfig {
    /** 是否带 Authorization。默认：有 token 就带 */
    extra?: {
      auth?: boolean;
      /** 强制需要登录（无 token 直接抛错） */
      requireAuth?: boolean;
    };
  }
}
