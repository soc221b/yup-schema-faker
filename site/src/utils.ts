const searchParams = new URLSearchParams(window.location.search)
function get(key: string) {
  const value = searchParams.get(key)
  return value === null ? null : decodeURIComponent(value)
}
function set(key: string, value: string) {
  if (get(key) !== value) {
    searchParams.set(key, encodeURIComponent(value))
    if (window.history.pushState) {
      const newUrl = `${location.origin}${location.pathname}?${searchParams.toString()}${location.hash}`
      window.history.pushState({ path: newUrl }, '', newUrl)
    }
  }
}
export const query = {
  get,
  set,
}
