import styled from "styled-components";
import {CustomScroll, LayoutContentPage} from "../../theme/style";

export const HomePage = styled.div`
  ${LayoutContentPage};
  padding-right: 0;
  .home-view{
    margin: 0 auto;
    height: 100%;
    overflow: auto;
    ${({ theme }) => CustomScroll(theme)};
    .home-header {
      font-style: normal;
      font-weight: 600;
      font-size: 27px;
      line-height: 40px;
      color: ${({theme}) => theme.text1};
      border-bottom: 1px solid ${({theme}) => theme.line1};
      padding-bottom: 9px;
    }

    .home-banner {
      margin-top: 24px;
    }
  }
`
