import styled from "styled-components";
import {CustomScroll, LayoutContentPage} from "../../theme/style";

export const HomePage = styled.div`
  ${({ theme }) => CustomScroll(theme)};
  ${LayoutContentPage};
  .home-view{
    max-width: 1000px;
    margin: 0 auto;

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
      background: ${({theme}) => theme.cardBg1};
      border-radius: 16px;
      padding: 40px 88px;
      margin-top: 24px;
    }
  }

  @media (max-width: 750px) {
    .home-banner {
      padding: 40px 40px;
    }
  }
  @media (max-width: 450px) {
    .home-banner {
      padding: 30px 20px;
    }
  }
`
