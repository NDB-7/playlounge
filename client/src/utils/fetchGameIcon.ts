const ICONS: { [key: string]: string } = {
  UNO: "uno-icon.svg",
};

export function fetchGameIcon(game: string) {
  const icon = ICONS[game];

  if (icon) return icon;
  else return null;
}
