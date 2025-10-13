// src/lib/api.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { useRef, useEffect } from 'react';
import { toast } from 'sonner';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

import { useAuthStore } from '@/stores/auth';

/** 后端基础地址（允许为空，走相对路径） */
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? '';

/** Axios 实例（统一出口） */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 若不需要跨域 cookie，可改为 false
});

/** —— 请求拦截：可选附带 token、支持本地 requireAuth —— */
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  const extra = config.extra; // 来自 axios 的类型扩展（见 d.ts）

  // A) 强制鉴权：无 token 直接终止
  if (extra?.requireAuth && !token) {
    throw new Error('UNAUTHENTICATED');
  }

  // B) 是否附带 Authorization：默认有 token 就带；可被 extra.auth 覆盖
  const shouldAttach = extra?.auth ?? Boolean(token);
  if (shouldAttach && token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

/** —— 响应拦截：全局错误提示 —— */
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status as number | undefined;
    const message: string = error?.response?.data?.message || error?.message || 'Request failed';

    switch (status) {
      case 400:
        toast.warning(`Bad Request: ${message}`);
        break;
      case 401:
        toast.error('Unauthorized, please log in again.');
        // 可按需自动登出：
        // useAuthStore.getState().logout()
        break;
      case 403:
        toast.error('Forbidden: You do not have permission.');
        break;
      case 404:
        toast.warning('Not Found');
        break;
      case 500:
        toast.error('Server error, please try again later.');
        break;
      default:
        toast.error(message);
    }

    return Promise.reject(error);
  },
);

/** —— 基础请求封装（T 为响应 data 的类型） —— */
export async function request<T>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url'>,
): Promise<T> {
  const res: AxiosResponse<T> = await apiClient.request<T>({ url, ...(config ?? {}) });
  return res.data;
}

/** 便捷方法（严格类型） */
export function get<T>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>) {
  return request<T>(url, { method: 'GET', ...(config ?? {}) });
}

export function post<T, B = unknown>(
  url: string,
  data?: B,
  config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>,
) {
  return request<T>(url, { method: 'POST', data, ...(config ?? {}) });
}

export function put<T, B = unknown>(
  url: string,
  data?: B,
  config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>,
) {
  return request<T>(url, { method: 'PUT', data, ...(config ?? {}) });
}

export function del<T>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>) {
  return request<T>(url, { method: 'DELETE', ...(config ?? {}) });
}

/** —— 带可选 toast 的 SWR Hook —— */
export type UseApiToastOptions = {
  /** 初次加载时的提示；true=默认文案 */
  loading?: boolean | string;
  /** 成功时提示（仅首轮或 mutate 后一次）；true=默认文案 */
  success?: boolean | string;
  /** 失败时提示；true=默认文案（将覆盖 loading 占位） */
  error?: boolean | string;
};

export function useApi<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration<T> & { toast?: UseApiToastOptions },
): SWRResponse<T, unknown> {
  const toastId = useRef<string | number | null>(null);
  const swr = useSWR<T>(key, fetcher, {
    onSuccess: (data, k, cfg) => {
      if (options?.toast?.success) {
        const msg = typeof options.toast.success === 'string' ? options.toast.success : 'Loaded';
        if (toastId.current != null) {
          toast.success(msg, { id: toastId.current });
          toastId.current = null;
        } else {
          toast.success(msg);
        }
      }
      options?.onSuccess?.(data, k, cfg);
    },
    onError: (err, k, cfg) => {
      if (options?.toast?.error) {
        const msg =
          typeof options.toast.error === 'string'
            ? options.toast.error
            : (err as Error)?.message || 'Request failed';
        if (toastId.current != null) {
          toast.error(msg, { id: toastId.current });
          toastId.current = null;
        } else {
          toast.error(msg);
        }
      }
      options?.onError?.(err, k, cfg);
    },
    revalidateOnFocus: false,
    ...(options ?? {}),
  });

  // 首次加载时显示 loading 占位
  const showLoading = Boolean(options?.toast?.loading);
  useEffect(() => {
    if (!showLoading) return;
    if (!swr.isLoading) return;
    if (toastId.current != null) return;

    const msg = typeof options?.toast?.loading === 'string' ? options.toast.loading : 'Loading...';
    toastId.current = toast.loading(msg);

    // 清理：组件卸载或本轮结束
    return () => {
      if (toastId.current != null) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLoading, swr.isLoading]);

  return swr;
}
