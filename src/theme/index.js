import {css, ThemeProvider as StyledComponentsThemeProvider} from "styled-components";
import {useMemo} from "react";
import {useIsDarkMode} from "../hooks";

export function colors(darkMode = false) {
  return {
    primary1: darkMode ? '#71f1f5' : '#128a8d',
    bg1: darkMode ? '#2a264f' : '#594b95'
  }
}

const MEDIA_WIDTHS = {
  upToSmall: 450,
  upToMedium: 750,
  upToLarge: 1400
}

export function theme(darkMode = false) {
  return {
    ...colors(darkMode),
    mediaWidth: Object.keys(MEDIA_WIDTHS).reduce(
      (accumulator, size) => {
        (accumulator)[size] = (a, b, c) => css`
          @media (max-width: ${(MEDIA_WIDTHS)[size]}px) {
            ${css(a, b, c)}
          }
        `
        return accumulator
      },
      {}
    )
  }
}

export default function ThemeProvider({children}) {
  const {darkMode} = useIsDarkMode()
  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}
