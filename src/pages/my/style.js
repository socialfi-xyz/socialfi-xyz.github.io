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
    .u-info-data-item{
      display: grid;
      grid-template-columns: 210px 1fr 160px;
      border-bottom: 1px solid ${({ theme }) => theme.border2};
      padding: 21px 0;
      &:nth-last-child(1){
        border-bottom: 0;
      }
      & > div {
        //margin-top: 30px;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 18px;
        /* identical to box height */
        letter-spacing: -0.01em;

        color: ${({ theme }) => theme.text1};
        display: flex;
        align-items: center;

        &:nth-child(3n+2) {
          font-weight: 500;
          color: ${({ theme }) => theme.text8};
        }

        &:nth-child(3n+3) {
          display: flex;
          align-items: center;
        }
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
      padding: 32px 32px 16px 32px;
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
      .u-info-data-item {
        grid-template-columns: 1fr 1fr 100px;
        margin-top: 0px;
        padding: 15px 0;

        & > div {
          word-wrap: break-word;
          word-break: break-all;
          font-size: 16px;
          font-weight: 400;
          &:nth-child(even){
            padding-left: 5px;
          }
        }
      }
    }

    .my-page-main {
      .my-page-main-u {
        padding: 10px;
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
