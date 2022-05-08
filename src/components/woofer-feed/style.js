import styled from "styled-components";

export const WooferFeedView = styled.div`
  margin-top: 40px;

  .woofer-feed-header {
    display: flex;
    font-style: normal;
    font-weight: 600;
    font-size: 27px;
    line-height: 40px;
    color: ${({theme}) => theme.text1};
    border-bottom: 1px solid ${({theme}) => theme.line1};
    padding-bottom: 9px;

    .woofer-feed-header-l {
      flex: 1;
    }

    .filter-switch {
      position: relative;
      min-width: 110px;
      height: 43px;
      background: #1D9BF0;
      border-radius: 8px;
      justify-content: space-between;
      font-weight: 500;
      font-size: 18px;
      padding: 0 16px;
      cursor: pointer;
      color: #ffffff;

      .filter-switch-list {
        position: absolute;
        right: 0;
        top: 100%;
        width: 186px;
        background: #11639A;
        box-shadow: 0px 1px 4px rgba(25, 3, 69, 0.2);
        border-radius: 16px;
        overflow: hidden;
        display: none;

        & > div {
          display: grid;
          grid-template-columns: 20px 1fr;
          height: 34px;
          font-size: 12px;
          padding: 0 24px;

          img {
            width: 8px;
            height: 8px;
          }

          &:hover {
            background: #1D9BF0;
          }

          &:nth-child(1) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
        }
      }

      &:hover {
        .filter-switch-list {
          display: block;
        }
      }
    }
  }

  .woofer-list {
    .woofer-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 16px;
      margin: 24px 0;

      .woofer-item-cs {

      }

    }

    .woofer-item-tweet {
      background: ${({theme}) => theme.cardBg1};
      border-radius: 16px;
      padding: 16px 24px;
      display: flex;

      .woofer-item-tweet-avatar {
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
      }

      .woofer-item-tweet-c {
        padding-left: 16px;
        font-size: 16px;
        line-height: 22px;

        .woofer-item-tweet-c-head {
          display: flex;
          align-items: center;

          strong {
            color: ${({theme}) => theme.text1};
            font-weight: 600;
            margin-right: 5px;
          }

          span {
            color: #AFB0B9;
          }
        }

        .woofer-item-tweet-content {
          margin-top: 8px;
          font-weight: 400;
          color: ${({theme}) => theme.text6};
          height: auto;
          overflow: hidden;
        }

        .woofer-item-actions {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          margin-top: 20px;

          a {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: ${({theme}) => theme.text7};
            text-decoration: none;

            img {
              width: 16px;
              height: 16px;
              margin-right: 6px;
            }
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
            line-height: 24px;
            color: ${({theme}) => theme.text1};
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

  }

  @media (max-width: 750px) {
    .woofer-list {
      .woofer-item {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 16px;
        margin: 24px 0;
      }
    }
  }

`
