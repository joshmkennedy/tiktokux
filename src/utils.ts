export function getCoverArt(id: string) {
  if (id) {
    return `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
  }
  return null;
}
