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
    .woofer-item-info-h2{
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      color: ${({ theme }) => theme.text1};
      margin: 8px 0;

      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);

    }

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
      grid-template-columns: 1fr 1fr;
      margin: 16px 0;

      & > div {
        position: relative;
        cursor: pointer;

        & > span {
          font-size: 12px;
          color: ${({theme}) => theme.text7};
          margin-left: 5px;

          & > span {
            color: ${({theme}) => theme.text1};
          }
        }
        .woof-twitter-list{
          display: none;
          position: absolute;
          left: 50%;
          top: 100%;
          z-index: 10;
          transform: translate(-50%, calc(-100% - 24px));
          cursor: default;
          width: 100%;
          height: 200px;
          border-radius: 10px;
          //overflow: hidden;
          background: ${({ theme }) => theme.bg4};
          box-shadow: 0px 1px 2px rgba(25, 3, 69, 0.25);
          ${({ theme }) => CustomScroll(theme)};
          flex-direction: column;
          .arrow-t{
            width:0;
            height:0;
            border-left:12px solid transparent;
            border-right:12px solid transparent;
            border-top:6px solid ${({ theme }) => theme.bg4};
            position: absolute;
            bottom: 0;
            left: 40%;
            transform: translateY(100%);
          }
          .woof-twitter-list-v{
            flex: 1;
            overflow: hidden;
          }
          .ant-list-item{
            border-color: ${({ theme }) => theme.border1}!important;
            padding: 6px 0;
            &:hover{
              background: rgba(255, 255, 255, 0.03);
            }
          }
          .rc-virtual-list{
            padding: 10px;
          }
          .ant-list-item-meta-content{
            flex: 1;
            overflow: hidden;
          }
          .ant-list-item-meta-avatar{
            margin-right: 2px!important;
          }
          .ant-list-item-meta-title{
            color: ${({ theme }) => theme.text1};
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin: 0;
          }
          .ant-list-item-meta-description{
            color: ${({ theme }) => theme.text2};
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 12px;
          }
        }
        &:hover{
          .woof-twitter-list{
            display: flex;
          }
        }
      }
    }

    .actions-btn {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        margin: 0 10px;
        //width: 99px;
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
