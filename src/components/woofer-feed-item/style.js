import styled from "styled-components";
import {CustomScroll, FlexCenter} from "../../theme/style";

export const WooferFeedItemView = styled.div`
  .woofer-item {
    display: grid;
    grid-template-columns: 1fr 428px;
    grid-column-gap: 16px;
    margin: 24px 0;
    .woofer-item-cv{
      overflow: hidden;
      border-radius: 16px;
      min-width: 350px;
    }
    .woofer-item-cs {
      padding: 8px 0;
      background: ${({theme}) => theme.cardBg1};
      max-height: 520px;
      overflow-y: auto;
      ${({theme}) => CustomScroll(theme)};
      border-radius: 16px;
      & > div {
        position: relative;
        background: ${({theme}) => theme.cardBg1};
        padding: 8px 12px 8px 16px;
        width: 100%;
        height: 100%;

        .tweet-loading {
          width: 100%;
          height: 100%;
          color: ${({ theme }) => theme.text1};
          ${FlexCenter};
          img{
            width: 40px;
            height: 40px;
            animation: rotate 1s linear infinite;
          }
        }
        .tweet-load-error{
          position: absolute;
          left: 0;
          top: 0;
          background: ${({theme}) => theme.cardBg1};
        }
        .twitter-tweet.twitter-tweet-rendered {
          margin: 0 !important;
        }
      }
    }
  }

  .woofer-item-info {
    border: 1px solid ${({theme}) => theme.border1};
    box-sizing: border-box;
    border-radius: 16px;

    .woofer-item-info-data {
      background: ${({theme}) => theme.cardBg1};
      border-radius: 16px;
      padding: 16px 24px;

      .woofer-item-info-data-i {
        display: flex;
        justify-content: space-between;

        span {
          font-weight: 400;
          font-size: 16px;
          line-height: 18px;
          margin: 4px 0;
          color: ${({theme}) => theme.text6};
          &:nth-child(1){
            white-space: nowrap;
          }
          &:nth-last-child(1){
            text-align: right;
          }
        }
      }
    }

    .woofer-item-partake {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 16px 0;

      & > div {
        cursor: pointer;

        & > span {
          font-size: 12px;
          color: ${({theme}) => theme.text7};
          margin-left: 5px;

          & > span {
            color: ${({theme}) => theme.text1};
          }
        }
      }
    }

    .actions-btn {
      width: 100%;
      margin-bottom: 20px;

      button {
        margin: 0 20px;
        width: 99px;
        height: 43px;
      }
    }
  }

  @media (max-width: 750px) {
    .woofer-item {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 16px;
      margin: 24px 0;
    }
  }
`
