import {createGlobalStyle} from "styled-components";
import './index.less'

export const FixedGlobalStyle = createGlobalStyle`

  .share-btn iframe{
    display: block!important;
  }
  .flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-content{
    border-radius: 10px;
    overflow: hidden;
    background: ${({ theme }) => theme.cardBg1};
    .ant-modal-header{
      border-bottom: 0;
      background: ${({ theme }) => theme.cardBg1};
      padding: 20px 24px;
    }
    .ant-modal-title{
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      letter-spacing: -0.01em;

      color: #1D9BF0;

    }
    .ant-modal-body{
      padding-top: 10px;
    }
  }
  .ant-checkbox-inner{
    background-color: rgba(213, 195, 250, 0.32);
    color: #fff0f6;
  }

  .add-quota-dialog{
    .ant-steps-item-title{
      color: #FFFFFF!important;
    }
  }

  .input-eth {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    background: #33354C;
    border: 0;

    & > input {
      width: 100%;
      padding-right: 90px;
      height: 40px;
      flex: 1;
      border: 0;
      &:hover{
        border-color: #1D9BF0;
      }
      &:focus{
        border-color: transparent;
        box-shadow: none;
        border-right-width: 1px !important;
        outline: 0;
      }
    }
    .input-menu {
      position: absolute;
      right: 0;
      width: 90px;
      display: flex;
      align-items: center;

      &>span {
        margin-right: 5px;
      }
      button{
        width: 76px;
        height: 30px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;

        color: #1D9BF0;
        border: 2px solid #1D9BF0;
        box-sizing: border-box;
        filter: drop-shadow(0px 1px 2px rgba(25, 3, 69, 0.25));
        border-radius: 6px;
        margin-right: 4px;
        &:hover{
          opacity: 0.8;
        }
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
      -moz-appearance:textfield;
    }
  }

  .btn-submit{
    button{
      width: 100%;
      height: 30px;
      background: #1D9BF0;
      box-shadow: 0px 1px 2px rgba(25, 3, 69, 0.25);
      border-radius: 6px;
      border-color: #1D9BF0;
      &:hover,&:active,&:focus{
        background: #1D9BF0;
        border-color: #1D9BF0;
        opacity: 0.9;
      }
    }
  }
  .btn-primary{
    height: 30px;
    background: #1D9BF0;
    box-shadow: 0px 1px 2px rgba(25, 3, 69, 0.25);
    border-radius: 6px;
    border-color: #1D9BF0;
    color: #ffffff;
    &:hover,&:active,&:focus{
      opacity: 0.9;
      color: #ffffff;
      background: #1D9BF0;
    }
  }
  /*
  .ant-btn[disabled]{
    background: rgba(255, 255, 255, 0.25) !important;
    color: #ffffff;
    border-color: transparent;
  }*/

  .btn-ghost{
    height: 40px;
    padding: 0 8px;
    border: 2px solid #1D9BF0;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */
    text-align: center;
    color: #1D9BF0;
    &:hover, &:active, &:focus{
      border: 2px solid #1D9BF0;
      color: #1D9BF0;
    }
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    background-color: rgba(121, 53, 255, 0.1);
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1D9BF0!important;
    border-color: #1D9BF0!important;
  }
  .ant-checkbox-checked::after{
    border: 1px solid #1D9BF0;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #1D9BF0;
  }

  .custom-scroll{
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(83, 83, 83, 0.5);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: #EDEDED;

    }
  }

  .ant-modal-wrap{
    backdrop-filter: blur(10px);
  }
  .pro-input{
    border: 0;
    background: #33354C;
    height: 44px;
    border-radius: 8px;
  }


  .ant-btn-background-ghost{
    border: 2px solid #1D9BF0;
    border-radius: 8px;
  }

  @keyframes rotate
  {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
.icon-loading{
  img{
    width: 40px;
    height: 40px;
    animation: rotate 1s linear infinite;
  }
}
.ant-message-notice-content{
  background: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  color: ${({ theme }) => theme.text1};
  box-shadow: ${({ theme }) => theme.shadow1};
  img{
    width: 16px;
    height: 16px;
    margin-right: 16px;
  }
}
`
