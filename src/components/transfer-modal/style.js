import styled from "styled-components";

export const TransferModalView = styled.div`
  padding: 0 30px 20px 30px;
  .transfer-view{
    .p-t{
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.01em;

      color: ${({ theme }) => theme.text1};
      margin: 24px 0 5px 0;
    }
    .input-eth{
      border-radius: 6px;
      overflow: hidden;
      .input-menu{
        right: -8px;
        button{
          background: #33354C;
          color: #FFFFFF;
        }
      }
    }
    .p-b{
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: right;

      color: #999999;
      margin-top: 2px;
    }
  }
  .btn-submit{
    margin-top: 20px;
    button{
      height: 32px;
    }
  }
`
