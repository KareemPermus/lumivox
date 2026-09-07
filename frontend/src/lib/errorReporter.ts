const getAppId = (): string => {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_APP_ID) {
    return process.env.NEXT_PUBLIC_APP_ID;
  }
  if (typeof window !== 'undefined') {
    const match = window.location.hostname.match(/^preview-([^.]+)/);
    if (match) return match[1];
  }
  return 'unknown';
};

const reportUrl =
  typeof process !== 'undefined'
    ? process.env?.NEXT_PUBLIC_RUNTIME_ERROR_REPORT_URL
    : undefined;

function sendError(message: string, stack?: string) {
  if (!reportUrl) return;
  fetch(reportUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: getAppId(),
      message,
      stack: stack || '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }),
  }).catch(() => {});
}

export function initErrorReporter() {
  if (typeof window === 'undefined') return;

  window.onerror = (msg, _src, _line, _col, err) => {
    sendError(String(msg), err?.stack);
  };

  window.onunhandledrejection = (e: PromiseRejectionEvent) => {
    sendError(String(e.reason), e.reason?.stack);
  };

  const origError = console.error;
  console.error = (...args: any[]) => {
    sendError(args.map(String).join(' '));
    origError.apply(console, args);
  };
}