import { useLayoutEffect, useRef, useState } from 'react';
import { createSearchParams, useSearchParams, type NavigateOptions, type URLSearchParamsInit } from 'react-router-dom';

/** Keep controlled filters responsive while the router commits a navigation. */
export function useFilterParams() {
  const [routeParams, setRouteParams] = useSearchParams();
  const routeKey = routeParams.toString();
  const [params, setLocalParams] = useState(() => new URLSearchParams(routeKey));
  const latest = useRef(params);
  const pending = useRef<string | null>(null);

  useLayoutEffect(() => {
    // Ignore an intermediate navigation while a newer filter is still pending.
    if (pending.current !== null && pending.current !== routeKey) return;
    pending.current = null;
    const next = new URLSearchParams(routeKey);
    latest.current = next;
    setLocalParams(next);
  }, [routeKey]);

  function setParams(next: URLSearchParamsInit | ((previous: URLSearchParams) => URLSearchParamsInit), options?: NavigateOptions) {
    const value = createSearchParams(typeof next === 'function' ? next(latest.current) : next);
    latest.current = value;
    pending.current = value.toString() === routeKey ? null : value.toString();
    setLocalParams(value);
    setRouteParams(value, options);
  }

  return [params, setParams] as const;
}
