import styled from "styled-components";
import {CustomScroll, LayoutContentPage} from "../../theme/style";

export const AirdropPage = styled.div`
  ${LayoutContentPage};
  ${({ theme }) => CustomScroll(theme)};
  padding: 0 94px !important;

  .airdrop-page-view {
    display: flex;
    flex-direction: column;
    max-width: calc(100vw - 20px);

    border-radius: 10px;

    .airdrop-steps {
      display: flex;
      min-height: 98px;
      margin-bottom: 40px;
      padding: 0 30px;

      .airdrop-step-line {
        flex: 1;
        padding: 0 16px;

        span {
          display: block;
          width: 100%;
          height: 2px;
          background: rgba(187, 189, 191, 0.2);
          margin-top: 32px;
        }

        &.success {
          span {
            background: rgba(29, 155, 240, 0.4);;
          }
        }
      }

      .airdrop-step {
        position: relative;
        height: 64px;

        div {
          img {
            display: none;
          }
        }

        &.ing, &.success {
          div {
            background: #1D9BF0;
            color: #ffffff;
            border: 0;

            img {
              display: none;
            }
          }

          p {
            color: #1D9BF0;
          }
        }

        &.success {
          div {
            span {
              display: none;
            }

            img {
              display: block;
            }
          }
        }

        div {
          width: 64px;
          height: 64px;
          border: 2px solid rgba(187, 189, 191, 0.8);
          box-sizing: border-box;

          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          line-height: 26px;
          /* identical to box height, or 71% */


          color: rgba(187, 189, 191, 0.8);
        }

        p {
          position: absolute;
          height: 18px;
          left: 50%;
          bottom: -36px;
          transform: translateX(-50%);
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 18px;
          /* identical to box height, or 100% */
          white-space: nowrap;
          color: rgba(187, 189, 191, 0.8);
          margin: 0;
        }
      }
    }

    .airdrop-main {
      flex: 1;
      padding: 30px;

      .content-wallet {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #373951;
        border-radius: 16px;

        .btn-primary {
          width: 240px;
          height: 50px;
          font-style: normal;
          font-size: 24px;
          line-height: 33px;
        }
      }

      .analyze-view {

        .analyze-twitter-input {
          display: flex;
          align-items: center;
          height: 70px;
          left: 480px;
          top: 331px;

          background: ${({ theme }) => theme.inputBg1};
          border-radius: 16px;

          input {
            background: transparent;
            height: 100%;
            border: 0;
            box-shadow: none;
            font-size: 16px;
            padding-left: 20px;
            caret-color: ${({ theme }) => theme.text1};
            color: ${({ theme }) => theme.text1};

            &::-webkit-input-placeholder {
              color: rgba(194, 194, 194, 0.5);
            }

            &:active, &:hover, &:focus {
              border: 0;
              box-shadow: none;
            }
          }

          .btn-primary {
            margin-right: 32px;
            width: 124px;
            height: 38px;
            font-size: 16px
          }
        }

        .loading-view {
          min-height: 200px;
          width: 100%;
          background: ${({ theme }) => theme.inputBg1};
          margin-top: 16px;
          border-radius: 16px;

          div {
            min-height: 200px;
            width: 100%;
            background-clip: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${({ theme }) => theme.text1};
          }
        }
      }
    }

    .analyze-twitter-data {
      max-width: 800px;
      margin: auto;
      background: ${({ theme }) => theme.cardBg1};
      padding: 32px;
      border-radius: 16px;

      textarea {
        background: ${({ theme }) => theme.inputBg1};
        border-radius: 15px;
        border: 0;

        &::-webkit-input-placeholder {
          color: rgba(194, 194, 194, 0.5);
        }

        color: ${({ theme }) => theme.text1};

        &:active, &:hover, &:focus {
          box-shadow: none;
          border: 0;
        }

        min-height: 170px;
        font-size: 16px;
        padding: 10px;
      }

      .share-claim {
        display: flex;
        padding: 5px 0;

        .tip-info {
          flex: 1;
          font-size: 10px;
          color: #BBBDBF;
        }

        .btn-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;

          & > div {
            display: flex;
            align-items: center;
          }

          .btn-primary {
            width: 80px;
            min-width: 80px;
            margin-left: 10px;
            border-radius: 20px;
            border: 0;

            &.loading {
              width: 100px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 750px) {
    padding: 10px !important;
    .airdrop-page-view {
      .airdrop-steps {
        margin-top: 20px;
        min-height: 30px;
        margin-bottom: 30px;

        .airdrop-step-line {
          span {
            margin-top: 14px;
          }
        }

        .airdrop-step {
          div {
            width: 30px;
            height: 30px;
            font-size: 18px;
          }

          p {
            font-size: 12px;
            bottom: 0px;
          }
        }
      }

      .airdrop-main {
        padding: 20px 10px;

        .analyze-view {
          .analyze-twitter-input {
            height: 60px;

            .btn-primary {
              margin-right: 10px;
            }
          }
        }
      }

      .analyze-twitter-data {
        padding: 10px;
      }
    }
  }



`
