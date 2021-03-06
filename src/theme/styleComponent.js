import styled from 'styled-components'
import {Button, Input} from 'antd'
import {FlexCenter} from './style'

export const STInput = styled.div`
  display: flex;
  align-items: center;
  background: ${({theme}) => theme.inputBg1} !important;
  padding: 0 10px 0 0!important;
  border-radius: 8px;
    overflow: hidden;

  .select-view {
    ${FlexCenter};
    position: relative;
    padding: 0 8px;
    z-index: 2;
    color: ${({theme}) => theme.text1};
    border: 2px solid rgba(194, 194, 194, 0.5);
    box-sizing: border-box;
    filter: drop-shadow(0px 1px 2px rgba(25, 3, 69, 0.25));
    border-radius: 8px;
    cursor: pointer;
    height: 30px;

    & > span {
      //margin-right: 16px;
      min-width: 40px;
    }

    .select-view-menu {
      display: none;
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
      z-index: 1;
      width: 100%;
      padding: 5px 0;
      background: ${({theme}) => theme.selectMenuBg};
      box-shadow: 0px 1px 4px rgba(25, 3, 69, 0.2);
      border-radius: 8px;
      overflow: hidden;

      & > div {
        color: #ffffff;
        padding: 5px 10px;
        font-size: 12px;

        & > img {
          width: 10px;
          opacity: 0;
            margin-right: 4px;
          &.active {
            opacity: 1;
          }
        }

        &:hover {
          opacity: 0.8;
          background: ${({theme}) => theme.selectMenuHovBg};
        }
      }

      &:active {
        display: none;
      }
    }

    &:hover {
      .select-view-menu {
        display: block;
      }
    }
  }

  .st-input-box {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    background: ${({theme}) => theme.inputBg1};
    border: 0;

    & > input {
      width: 100%;
      height: 40px;
      flex: 1;
      border: 0;
      background: transparent !important;

      &:focus {
        border-color: transparent;
        box-shadow: none;
        border-right-width: 1px !important;
        outline: 0;
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
      -moz-appearance: textfield;
    }

    button {
      background: ${({theme}) => theme.inputBg1};
      color: ${({theme}) => theme.text1};
      border-radius: 8px;
      border: 2px solid rgba(194, 194, 194, 0.5);
      filter: drop-shadow(0px 1px 2px rgba(0, 29, 49, 0.25));
      width: 60px;
      height: 30px;
    }

    .st-input-menu {
      & > span {
        color: ${({theme}) => theme.text1};
        margin-right: 10px;
      }
    }
  }
`
export const CInput = styled(Input)`
  background: ${({theme}) => theme.inputBg1} !important;
  color: ${({theme}) => theme.text1};
  width: 100%;
  border: 0;

  &:focus {
    border: 0;
  }
`

export const CButton = styled(Button)`
  &.ant-btn-primary {
    border-color: ${({theme}) => theme.primary1};
    background: ${({theme}) => theme.primary1};
    color: #ffffff;
  }

  &.ant-btn-background-ghost {
    background: transparent;
    color: ${({theme}) => theme.text1} !important;
  }

  &.ant-btn-primary[disabled] {
    background: ${({theme}) => theme.disabled} !important;
    color: #ffffff;
    border-color: transparent;
  }
`

export const StepRadius = styled.div`
  border-radius: 50%;
  color: ${({theme}) => theme.text1};
  border: 2px solid ${(props) => props.disabled ? props.theme.disabled : props.theme.primary1};
  font-size: 12px;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 0;
  padding-top: 2px;
  margin-right: 8px;
`
export const ModalView = styled.div`

  .ant-modal-content {
    border-radius: 10px;
    overflow: hidden;
    background: ${({theme}) => theme.cardBg1};

    .ant-modal-header {
      border-bottom: 0;
      background: ${({theme}) => theme.cardBg1};
      padding: 20px 24px;
    }

    .ant-modal-title {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      letter-spacing: -0.01em;

      color: #1D9BF0;

    }

    .ant-modal-body {
      padding-top: 10px;
    }
  }
`
