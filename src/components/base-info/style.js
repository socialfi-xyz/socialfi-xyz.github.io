import styled from "styled-components";

export const UserBaseInfoView = styled.div`
  display: flex;
  margin-bottom: 20px;

  .twitter-base-data {
    flex: 1;
    border: 1px solid ${({ theme }) => theme.inputBg1};
    border-radius: 16px;
    padding: 32px;
    .twitter-avatar {
      display: flex;
      align-items: center;

      & > img {
        width: 78px;
        height: 78px;
        border-radius: 50%;
      }

      & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        font-size: 18px;

        p {
          margin: 0;
          font-style: normal;
          font-weight: 600;
          color: ${({ theme }) => theme.text1};
        }
      }
    }

    .base-data-txt {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 220px 1fr;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      color: ${({ theme }) => theme.text8};
      &>div{
        margin-bottom: 8px;
      }
      &>div:nth-child(2n+2){
        font-weight: 500;
        text-align: right;
      }
    }
  }

  .chart {
    width: 342px;
    border: 1px solid ${({ theme }) => theme.inputBg1};
    border-radius: 16px;
    padding: 10px;
    margin-left: 16px;
  }

  @media (max-width: 750px) {
      flex-direction: column;
      .twitter-base-data{
        .twitter-avatar {
          & > img {
            width: 56px;
            height: 56px;
          }
          & > div {
            font-size: 16px;
          }
        }
        .base-data-txt {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 150px 1fr;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
        }
      }
      .chart{
        width: 100%;
        margin: 10px 0 0 0;
      }
  }
`
