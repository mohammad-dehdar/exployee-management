import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ApiMutationParams<TRequest, TResponse, TError> {
  apiFn: (payload: TRequest) => Promise<TResponse>;
  options?: UseMutationOptions<TResponse, TError, TRequest>;
}

export function useApiMutation<TRequest, TResponse, TError = unknown>({
  apiFn,
  options,
}: ApiMutationParams<TRequest, TResponse, TError>) {
  return useMutation<TResponse, TError, TRequest>({
    mutationFn: apiFn,
    ...options,
  });
}
