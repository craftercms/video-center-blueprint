

export function isAuthoring() {
  const html = document.documentElement;
  const attr = html.getAttribute('data-craftercms-preview');
  return (
    // eslint-disable-next-line no-template-curly-in-string
    attr === '${modePreview?c}' || // Otherwise disable/enable if you want to see pencils in dev server.
    attr === 'true'
  );
}
