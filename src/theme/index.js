import {css, ThemeProvider as StyledComponentsThemeProvider} from "styled-components";
import {useMemo} from "react";
import {useIsDarkMode} from "../hooks";

export function colors(darkMode = false) {
  return {
    primary1: darkMode ? '#1D9BF0' : '#1D9BF0',
    bg1: darkMode ? '#2D2F45' : '#FFFFFF',
    bg2: darkMode ? '#28293D' : '#FFFFFF',
    bg3: darkMode ? '#0A142F' : '#FAFAFA',
    bg4: darkMode ? 'rgba(48,49,74,0.95)' : 'rgba(255,255,255,0.95)',
    bg5: darkMode ? 'linear-gradient(208.92deg, #11174C -25.24%, #0C103A 116.73%)' : 'rgb(225,241,255)',
    bg6: darkMode ? '#0B0F39' : '#ffffff',
    bg7: darkMode ? '#3359A3' : 'rgba(29,155,240,0.05)',
    bg8: darkMode ? 'linear-gradient(316deg,#258BD8 1%, transparent 40%)' : 'linear-gradient(316deg, #42ABF3 1%, transparent 40%)',
    bg9: darkMode ? 'linear-gradient(216.69deg, #0F1545 0.27%, #101648 100.66%)' : 'linear-gradient(205.77deg, rgba(29, 155, 240, 0.04) -12.07%, rgba(177, 212, 236, 0.05) 101.15%)',

    text1: darkMode ? '#ffffff' : '#0F1419',
    text2: darkMode ? '#AEB9BE' : '#999999',
    text3: darkMode ? '#F5F5F5': '#0F1419',
    text4: darkMode ? '#DFDFDF': '#0F1419',
    text5: darkMode ? '#ffffff' : 'rgba(15, 20, 25)',
    text6: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 20, 25, 0.9)',
    text7: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 20, 25, 0.6)',
    text8: darkMode ? '#BBBDBF' : 'rgba(15, 20, 25, 0.5)',
    text9: darkMode ? 'rgba(255, 255, 255, 0.8)' : '#0F1419',
    text10: darkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 20, 25, 0.95)',
    text11: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 20, 25, 0.8)',

    line1: darkMode ? '#373951' : 'rgba(15, 20, 25, 0.07)',
    line2: darkMode ? 'rgba(187, 189, 191, 0.2)' : 'rgba(187, 189, 191, 0.2)',

    border1: darkMode ? '#373951' : '#FAFAFA',
    border2: darkMode ? '#33354C' : '#F0F0F0',

    cardBg1: darkMode ? '#373951' : '#FAFAFA',
    inputBg1: darkMode ? '#33354C' : '#F0F0F0',
    selectMenuBg: darkMode ? '#1D82C7' : '#1D82C7',
    selectMenuHovBg: darkMode ? '#1D9BF0' : '#1D9BF0',
    disabled: darkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 20, 25, 0.25)',
    scrollBar: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    shadow1: darkMode ? '0px 1px 6px 1px rgba(255, 255, 255, 0.05)' : '0px 1px 6px 1px rgba(0,0,0,0.15)'
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

