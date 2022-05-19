import styled from "styled-components";

export const BuyModalView = styled.div`

  .claim-data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.text1};
    div{
      margin-bottom: 10px;
    }
  }
  .buy-view{
    margin: 20px auto 0 auto;
    max-width: 420px;

    &>.p-t{
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 5px;

      color: #999999;
      span{
        color: #1D9BF0;
        cursor: pointer;
        margin-left: 10px;
      }
    }
    &>.p-b{
      text-align: right;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;

      color: #999999;
    }
  }
  &>.arrow-d{
    display: flex;
    justify-content: center;
    padding-top: 20px;
    img{

    }
  }
  .calc-eth-token{
    text-align: center;
    padding: 10px;

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: ${({ theme }) => theme.text1};
  }
  .btn-submit{
    max-width: 420px;
    margin: auto;
    .tip-p{
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: #BBBDBF;
      margin-bottom: 4px;
    }
    button{
      height: 32px;
    }
  }
`
