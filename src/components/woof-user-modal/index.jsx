import React from 'react'
import {Modal} from 'antd'
import './index.less'
import CloseIcon from "../../assets/images/svg/close.svg";

export function WoofUserModal({visible, onClose, list, title}) {

  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      wrapClassName="woof-user-modal-wrap"
      zIndex={1001}
      destroyOnClose
      width="307px"
      closeIcon={<img src={CloseIcon} alt=""/>}
    >
      <div className="woof-user-modal-list custom-scroll">
        {
          list.map((item, index) => (
            <div className="woof-user-modal-item" key={index}>
              <img src={item.avatar} alt=""/>
              <div>
                <h2>{item.name}</h2>
                <p>@{item.username}</p>
              </div>
            </div>
          ))
        }
      </div>
    </Modal>
  )
}
