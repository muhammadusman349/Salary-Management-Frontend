import React, { useEffect, useState } from 'react';
import { DepartmentService } from '../../api/employee';
import { UserService } from '../../api/auth';
import { Form, Input, Modal, message, Select } from 'antd';

const DepartmentForm = ({ visible, onCancel, onSuccess, department }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchUsers();
      form.resetFields();
      if (department) {
        form.setFieldsValue({
          name: department.name,
          description: department.description,
          lead: department.lead?.id || null // Set lead from the lead object
        });
      }
    }
  }, [visible, department, form]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Prepare data according to your Django model
      const departmentData = {
        name: values.name,
        description: values.description,
        lead_id: values.lead || null // Send null if no lead is selected
      };

      if (department) {
        await DepartmentService.updateDepartment(department.id, departmentData);
        message.success('Department updated successfully');
      } else {
        await DepartmentService.createDepartment(departmentData);
        message.success('Department created successfully');
      }
      
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title={department ? 'Edit Department' : 'Create Department'}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter department name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="lead"
          label="Department Lead"
        >
          <Select
            loading={usersLoading}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            placeholder="Select department lead"
          >
            {users.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.username} ({user.first_name} {user.last_name})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartmentForm;