import {css, ThemeProvider as StyledComponentsThemeProvider} from "styled-components";
import {useMemo} from "react";
import {useIsDarkMode} from "../hooks";

export function colors(darkMode = false) {
  return {
    primary1: darkMode ? '#1D9BF0' : '#1D9BF0',
    bg1: darkMode ? '#2D2F45' : '#FFFFFF',
    bg2: darkMode ? '#28293D' : '#FFFFFF',
    bg3: darkMode ? '#0A142F' : '#FAFAFA',

    text1: darkMode ? '#ffffff' : '#0F1419',
    text2: darkMode ? '#AEB9BE' : '#999999',
    text3: darkMode ? '#F5F5F5': '#0F1419',
    text4: darkMode ? '#DFDFDF': '#0F1419',
    text5: darkMode ? '#ffffff' : 'rgba(15, 20, 25, 0.5)',
    text6: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 20, 25, 0.9)',
    text7: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 20, 25, 0.6)',

    line1: darkMode ? '#373951' : 'rgba(15, 20, 25, 0.07)',

    border1: darkMode ? '#373951' : '#FAFAFA',

    cardBg1: darkMode ? '#373951' : '#FAFAFA',
    inputBg1: darkMode ? '#33354C' : '#F0F0F0',
    selectMenuBg: darkMode ? '#1D82C7' : '#1D82C7',
    selectMenuHovBg: darkMode ? '#1D9BF0' : '#1D9BF0',
    disabled: darkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 20, 25, 0.25)',
    scrollBar: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
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

