import React from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { updateTask } from '../api/TaskApi';


const initialValues = {
    _id: "",
    title: "",
    description: "",
    is_completed: false,
}; 
const FormModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async values => {
      try {
        await updateTask(values._id, values);
        console.log('Task updated successfully!');
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
  });

  return (
    <Modal visible={isOpen} onCancel={onClose} onOk={formik.handleSubmit} title="Edit Task">
      <Form form={form} onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
        <Form.Item label="Başlık" name="title">
          <Input onChange={formik.handleChange} value={formik.values.title}/>
        </Form.Item>
        <Form.Item label="Açıklama" name="description" value={formik.values.description}>
          <Input onChange={formik.handleChange}  />
        </Form.Item>
        <Form.Item label="Tamamlandı" name="is_completed" valuePropName="checked" >
          <Checkbox onChange={formik.handleChange} checked={formik.values.is_completed}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
