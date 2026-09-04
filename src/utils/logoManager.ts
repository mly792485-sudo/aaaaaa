// Utility to manage custom school logo persistence
const LOGO_STORAGE_KEY = 'school_custom_logo_img';
const LOGO_CHANGE_EVENT = 'school_logo_changed';

export function getActiveSchoolLogo(): string {
  try {
    const custom = localStorage.getItem(LOGO_STORAGE_KEY);
    if (custom && custom.startsWith('data:image')) {
      return custom;
    }
  } catch (e) {
    console.error('Failed to read custom logo', e);
  }
  return '/logo.svg';
}

export function setActiveSchoolLogo(dataUrl: string): void {
  try {
    localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
    window.dispatchEvent(new CustomEvent(LOGO_CHANGE_EVENT, { detail: dataUrl }));
  } catch (e) {
    console.error('Failed to save custom logo', e);
  }
}

export function resetSchoolLogo(): void {
  try {
    localStorage.removeItem(LOGO_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(LOGO_CHANGE_EVENT, { detail: '/logo.svg' }));
  } catch (e) {
    console.error('Failed to reset custom logo', e);
  }
}

export function subscribeToLogoChange(callback: (logoUrl: string) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<string>;
    callback(customEvent.detail || getActiveSchoolLogo());
  };
  window.addEventListener(LOGO_CHANGE_EVENT, handler);
  window.addEventListener('storage', () => {
    callback(getActiveSchoolLogo());
  });
  return () => {
    window.removeEventListener(LOGO_CHANGE_EVENT, handler);
  };
}
