import React from 'react'
import {Modal} from 'antd'
import './index.less'
import CloseIcon from "../../assets/images/svg/close.svg";
import ReWoof from "../re-woof";

export function WoofModal({onClose, woofType, coWoofItem}) {

  return (
    <Modal
      title={woofType}
      visible={woofType}
      footer={null}
      onCancel={onClose}
      centered
      wrapClassName="woof-modal-wrap"
      zIndex={1001}
      destroyOnClose
      width="560px"
      getContainer={false}
      closeIcon={<img src={CloseIcon} alt=""/>}
    >
      <div className="woof-modal-wrap-box custom-scroll">
        {
          woofType && <ReWoof woofType={woofType} coWoofItem={coWoofItem} onClose={onClose}/>
        }
      </div>
    </Modal>
  )
}
