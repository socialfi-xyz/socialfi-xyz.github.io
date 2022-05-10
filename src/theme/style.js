export const LayoutContentPage = `
    flex: 1;
    padding: 0 20px 30px 40px;
    overflow-y: auto;
    @media (max-width: 450px) {
      padding: 0 10px 30px 10px;
    }
`

export const CustomScroll = (theme)=> `
 @media (min-width: 750px) {
    
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: ${theme.scrollBar};
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: transparent;
    }
  }
`
export const FlexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
  `
