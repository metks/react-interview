import { useState, useEffect, useCallback, useRef } from "react";
import type { ApiResponse, ApiError } from "../types";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Use refs to store the latest versions of callbacks and apiCall
  const apiCallRef = useRef(apiCall);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Update refs when props change
  useEffect(() => {
    apiCallRef.current = apiCall;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCallRef.current();

      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        if (onSuccessRef.current) {
          onSuccessRef.current(response.data);
        }
      } else {
        const error: ApiError = {
          message: response.error || "Unknown error occurred",
          status: 0,
        };

        setState({
          data: null,
          loading: false,
          error,
        });

        if (onErrorRef.current) {
          onErrorRef.current(error);
        }
      }
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        data: null,
        loading: false,
        error: apiError,
      });

      if (onErrorRef.current) {
        onErrorRef.current(apiError);
      }
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for mutations (POST, PUT, DELETE)
export function useMutation<T, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Use refs to store the latest versions of callbacks and mutationFn
  const mutationFnRef = useRef(mutationFn);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Update refs when props change
  useEffect(() => {
    mutationFnRef.current = mutationFn;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  const mutate = useCallback(async (variables: TVariables) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await mutationFnRef.current(variables);

      if (response.success) {
        setState({
          data: response.data ?? null,
          loading: false,
          error: null,
        });

        if (onSuccessRef.current) {
          onSuccessRef.current(response.data);
        }

        return response.data;
      } else {
        const error: ApiError = {
          message: response.error || "Unknown error occurred",
          status: 0,
        };

        setState({
          data: null,
          loading: false,
          error,
        });

        if (onErrorRef.current) {
          onErrorRef.current(error);
        }

        throw error;
      }
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        data: null,
        loading: false,
        error: apiError,
      });

      if (onErrorRef.current) {
        onErrorRef.current(apiError);
      }

      throw apiError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}
