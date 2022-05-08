import styled from 'styled-components'

export const ReWoofView = styled.div`
  .input-error-t{
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: rgba(255, 3, 3, 0.8);
    margin: 0;
  }
  .s-view{
    margin-top: 24px;
  }
  .st-input{
    height: 44px;
  }
  .input-ad{
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
    p{
      font-size: 12px;
      line-height: 18px;
      text-align: right;
      color: #BBBDBF;
    }
  }
  .h-view{
    border-top: 1px dashed rgba(196, 196, 196, 0.2);
  }
  .step-btn-box{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 50px;
    margin-top: 20px;
    .step-radius{
      margin-right: 4px;
    }
    button{
      width: 100%;
      max-width: 280px;
      height: 32px;
      border-radius: 8px;
    }
    .arrow-down-3{
      width: 16px;
      height: 16px;
      margin-left: 8px;
      cursor: pointer;
      &.top-v{
        transform: rotateZ(180deg);
      }
    }
  }
`

