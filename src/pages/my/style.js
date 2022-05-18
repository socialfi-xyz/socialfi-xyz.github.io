import styled from "styled-components";
import {CustomScroll, LayoutContentPage} from "../../theme/style";

export const MyPage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 930px;
  margin: auto;
  ${({ theme }) => CustomScroll(theme)};
  ${LayoutContentPage};
  .ant-spin-nested-loading {
    border-radius: 10px;
    overflow: hidden;
  }

  .u-info-data {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 30px;

    & > div {
      //margin-top: 30px;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 18px;
      /* identical to box height */
      letter-spacing: -0.01em;

      color: ${({ theme }) => theme.text1};
      display: flex;
      align-items: center;
      margin-top: 30px;

      &:nth-child(3n+2) {
        font-weight: 500;
        color: ${({ theme }) => theme.text1};
      }

      &:nth-child(3n+3) {
        display: flex;
        align-items: center;
      }
    }
  }

  .my-page-main {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    background: ${({ theme }) => theme.cardBg1};

    .my-page-main-u {
      padding: 40px 60px;
    }

    .u-info-data-v {
      padding: 0 60px 40px 60px;
    }

    button {
      width: 150px;
      height: 40px;
      padding: 0 8px;
      border: 2px solid #1D9BF0;
      background: transparent;
      border-radius: 6px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height */
      text-align: center;
      color: ${({ theme }) => theme.text1};
    }
  }

  @media (max-width: 750px) {

    .u-info-data {
      grid-template-columns: 1fr 1fr 140px;
      margin-top: 0px;

      & > div {
        max-width: calc(30vw);
        word-wrap: break-word;
        word-break: break-all;
        font-size: 16px;
        font-weight: 400;
      }
    }

    .my-page-main {
      .my-page-main-u {
        padding: 20px;
      }

      .u-info-data-v {
        padding: 10px;
      }

      button {
        width: auto;
        height: 30px;
        font-size: 14px;
        margin: auto;
      }
    }
  }
`
