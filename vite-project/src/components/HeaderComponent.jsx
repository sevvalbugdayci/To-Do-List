import React from "react";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NewTasksModal from "./NewTasksModal";
import { useState } from "react";
function HeaderComponent() {
  const [modalVisible, setModalVisible] = useState(false);

    const handleModalOk = () => {
      setModalVisible(false);
    };

    const handleModalCancel = () => {
      setModalVisible(false);
    };
    return (
        <div className="header">
          <h3 style={{ flex: 1 , textAlign:'left'}}>To Do List</h3>
          <Button type="primary" icon={<PlusOutlined />}  onClick={() => setModalVisible(true)}>
            Yeni Görev
          </Button>
          <NewTasksModal visible={modalVisible} onCancel={handleModalCancel} onOk={handleModalOk}/>
        </div>
      );
}



export default HeaderComponent;