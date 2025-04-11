import { RequestData } from '@/types/requestData';

export function encodeRequestToUrl(data: RequestData): string {
  return btoa(JSON.stringify(data));
}

export function decodeRequestFromUrl(encoded: string): RequestData | null {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}
