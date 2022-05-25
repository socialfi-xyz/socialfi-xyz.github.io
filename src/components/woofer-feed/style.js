import styled from "styled-components";
import {FlexCenter} from "../../theme/style";

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
        z-index: 2;
        width: 186px;
        background: #1883CA;
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
          user-select: none;

          & > div {
            display: flex;
            align-items: center;
          }

          .sort-check-item {

            height: 34px;
            white-space: nowrap;
            word-wrap: normal;

            .sort-check-on {

            }

            .sort-check-off {
              opacity: 0.6;
              transform: rotate(180deg);
            }
          }

          img.sort-check {
            width: 12px;
            height: 12px;
          }

          .sort-check-on {
            width: 14px;
            height: 14px;
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

  .woof-loading {
    background: ${({theme}) => theme.cardBg1};
    padding: 50px;
    border-radius: 8px;
    color: ${({theme}) => theme.text1};
    margin: 30px auto;
    ${FlexCenter};

    .icon-loading {
      margin-right: 10px;
    }
  }

  .woof-empty {
    background: ${({theme}) => theme.cardBg1};
    padding: 50px;
    ${FlexCenter};
    border-radius: 8px;
    flex-direction: column;
    margin: 30px auto;

    img {
      width: 140px;
      height: 140px;
    }

    p {
      color: ${({theme}) => theme.text1};
      margin-top: 20px;
    }

    @media (min-width: 375px) and (max-width: 760px) {
      img {
        width: 60px;
        height: 60px;
      }

      p {
        margin-top: 10px;
      }
    }
  }

  .woofer-list {

  }

`
