export type Fetcher = <Response = any>(
  query: string,
  options?: {
    mode: string;
  }
) => Promise<{ json: () => Promise<Response>; blob: () => Promise<Response> }>;
