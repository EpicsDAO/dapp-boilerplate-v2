export const mask = (s: string) =>
  `${s.slice(0, 4)}...${s.slice(s.length - 4, s.length)}`
