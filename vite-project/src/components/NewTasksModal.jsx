import React from 'react';
import { Modal, Form, Input,Button } from 'antd';
import { useFormik } from 'formik';
import { createTask } from '../api/TaskApi';


const NewTasksModal = ({ visible, onCancel, onOk }) => {
    const currentDateTime = new Date().toISOString(); 
    const formik = useFormik({
      initialValues: {
        id : '',
        description: '',
        created_at: currentDateTime,
      },
      onSubmit: (values) => {
        console.log(values);
        onOk();
      },
    });


    const handleSubmit = async () => {
        try {
          await createTask(formik.values);
          onOk();
        } catch (error) {
          console.error('Görev eklenirken hata oluştu:', error);
        }
      };
  
    return (
      <Modal
        title="Yeni Görev Ekle"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Başlık" name="title">
            <Input {...formik.getFieldProps('title')} type="text"/>
          </Form.Item>
          <Form.Item label="Açıklama" name="description">
            <Input.TextArea {...formik.getFieldProps('description')} type="text"/>
          </Form.Item>
          <Form.Item label="Oluşturulma Tarihi" >
                <Input value={formik.values.created_at} disabled type="text"/>
           </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  
  export default NewTasksModal;
  