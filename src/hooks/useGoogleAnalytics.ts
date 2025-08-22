'use client';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_path: url,
      });
    }
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent('button_click', 'engagement', `${buttonName}${location ? `_${location}` : ''}`);
  };

  const trackFormSubmission = (formName: string) => {
    trackEvent('form_submit', 'engagement', formName);
  };

  const trackDownload = (fileName: string) => {
    trackEvent('file_download', 'engagement', fileName);
  };

  const trackExternalLink = (url: string) => {
    trackEvent('external_link_click', 'engagement', url);
  };

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackDownload,
    trackExternalLink,
  };
};
