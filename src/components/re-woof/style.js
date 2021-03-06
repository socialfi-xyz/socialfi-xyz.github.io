import styled from 'styled-components'
import {FlexCenter} from "../../theme/style";

export const ReWoofView = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ theme, modal }) => modal ? '1fr' : '1fr 1fr'};
  grid-column-gap: 24px;
  .re-woof-panel{
    background: ${({theme}) => theme.cardBg1};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    .re-woof-panel-title{
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #1D9BF0;
      margin: 16px 0 0 32px;

    }
    .steps-v{
      position: relative;
      border-bottom: 1px solid ${({ theme }) => theme.line2};
      padding-top: 30px;
      .arrow-l{
        position: absolute;
        left: 20px;
        top: 40px;
        z-index: 1;
        transform: translate(50%, -50%);
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    .steps{
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: auto;
      .step{
        position: relative;
        color: ${({ theme }) => theme.text8};
        &.active{
          color: ${({ theme }) => theme.primary1};
          border-bottom: 2px solid ${({ theme }) => theme.primary1};
          &.n-border{
            border-bottom: 0;
          }
          &>div{
            border-color: ${({ theme }) => theme.primary1};
            background: ${({ theme }) => theme.primary1};
            color: #ffffff!important;
          }
        }
        flex-direction: column;
        ${FlexCenter};
        padding-bottom: 16px;
        &>div{
          width: 40px;
          height: 40px;
          border-radius: 46px;
          ${FlexCenter};
          border: 1px solid ${({ theme }) => theme.text8};
          font-weight: 600;
          font-size: 20px;
          line-height: 29px;
          color: ${({ theme }) => theme.text1};
          img{
            width: 16px;
            height: 16px;
          }
        }
        &>p{
          margin: 16px 0 0 0;
          font-weight: 500;
          font-size: 16px;
          line-height: 18px;
        }
        &>img.arrow-r{
          position: absolute;
          right: 0;
          top: 40%;
          transform: translate(50%, -50%);
          width: 16px;
          height: 16px;
        }
      }
    }
    .panel-v{
      flex: 1;
      padding: 20px 20px 40px 20px;
    }
    .re-tweet-view{
      margin: auto;
      max-width: 800px;
      height: 100%;
      .re-tweet-view-item{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 15px;
        p{
          font-weight: 500;
          font-size: 24px;
          line-height: 36px;
          text-align: center;
          color: ${({ theme }) => theme.primary1};
          margin: 0;
        }
        &>button{
          margin-top: 24px;
          width: 280px;
          height: 32px;
          border-radius: 8px;
        }
      }
    }
    .tweet-link-input{
      width: 100%;
      margin-top: 24px;
    }
    .woof-view{
      margin-top: 24px;
      max-width: 800px;
      .woof-btn{
        margin-top: 24px;
        ${FlexCenter};
        button{
          flex: 1;
          border-radius: 8px;
          margin-right: 8px;
        }
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
  }
  
  
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
      color: #BBBDBF;
      &:nth-child(1){
        text-align: left;
      }
      &:nth-last-child(1){
        text-align: right;
      }
    }
  }
  .h-view{
    border-top: 1px dashed rgba(196, 196, 196, 0.2);
  }


  @media (max-width: 750px) {
    grid-template-columns: 1fr!important;
    .re-woof-panel{
      &:nth-child(1){
        margin-bottom: 10px;
      }
      .steps-v{
        padding-top: 20px;
        .arrow-l{
          position: absolute;
          left: 0;
          top: 20px;
          transform: translate(50%, -50%);
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
      .panel-v{
        padding: 0 10px 15px 10px;
      }
      .re-tweet-view {
        .re-tweet-view-item{
          
        }
      }
    }
  }
  @media (max-width: 450px) {
   
  }
`

