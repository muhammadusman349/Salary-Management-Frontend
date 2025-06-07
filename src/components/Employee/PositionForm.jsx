import React, { useEffect, useState } from 'react';
import { PositionService } from '../../api/employee';
import { Form, Input, Modal, message, Select, InputNumber } from 'antd';

const PositionForm = ({ visible, onCancel, onSuccess, position, departments }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (position) {
        form.setFieldsValue({
          title: position.title,
          department: position.department?.id,
          description: position.description,
          salary_range_min: position.salary_range_min,
          salary_range_max: position.salary_range_max
        });
      }
    }
  }, [visible, position, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const payload = {
        ...values,
        department: values.department // Ensure department is included
      };

      if (position) {
        await PositionService.updatePosition(position.id, payload);
        message.success('Position updated successfully');
      } else {
        await PositionService.createPosition(payload);
        message.success('Position created successfully');
      }
      
      onSuccess();
    } catch (error) {
      if (error.response?.data) {
        // Handle field-specific errors
        const fieldErrors = error.response.data;
        const formErrors = [];
        
        Object.keys(fieldErrors).forEach((field) => {
          fieldErrors[field].forEach((err) => {
            formErrors.push({
              name: field,
              errors: [err]
            });
          });
        });
        
        form.setFields(formErrors);
      } else {
        message.error(error.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title={position ? 'Edit Position' : 'Create Position'}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Position Title"
          rules={[{ required: true, message: 'Please enter position title' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select>
            {departments.map(department => (
              <Select.Option key={department.id} value={department.id}>
                {department.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="salary_range_min"
          label="Minimum Salary"
          rules={[{ required: true, message: 'Please enter minimum salary' }]}
        >
          <InputNumber 
            style={{ width: '100%' }}
            min={0}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="salary_range_max"
          label="Maximum Salary"
          rules={[{ 
            required: true, 
            message: 'Please enter maximum salary' 
          }, 
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('salary_range_min') <= value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Max salary must be greater than min salary'));
            },
          })]}
        >
          <InputNumber 
            style={{ width: '100%' }}
            min={0}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PositionForm;