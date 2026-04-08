// Обертка для fwtch, немного упрощает работу с типом данных и ошибок

export class FetchError extends Error {
  public readonly status: number;
  constructor(status: number, statusText: string) {
    super(`HTTP ${status}: ${statusText}`);
    this.status = status;
  }
}

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: RequestInit['body'] | Record<string, unknown> | unknown[];
};

export async function fetcher<T = unknown>(
  url: string,
  options?: FetchOptions,
): Promise<T> {
  const processedOptions: FetchOptions = { ...options };

  if (processedOptions.body && typeof processedOptions.body === 'object') {
    processedOptions.body = JSON.stringify(processedOptions.body);
    processedOptions.headers = {
      'Content-Type': 'application/json',
      ...(processedOptions.headers as Record<string, string>),
    };
  }

  const response = await fetch(url, processedOptions as RequestInit);

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText);
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return (await response.json()) as T;
  }
  return (await response.text()) as T;
}
