import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartmentService } from '../../api/employee';
import { Table, Button, Space, message, Popconfirm } from 'antd';
import DepartmentForm from './DepartmentForm';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await DepartmentService.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      message.error('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedDepartment(null);
    setModalVisible(true);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setModalVisible(true);
  };

  const handleViewDetails = (id) => {
    navigate(`/departments/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await DepartmentService.deleteDepartment(id);
      message.success('Department deleted successfully');
      fetchDepartments();
    } catch (error) {
      message.error('Failed to delete department');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewDetails(record.id)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Lead',
      dataIndex: 'lead',
      key: 'lead',
      render: (lead) => lead ? lead.full_name : 'Not assigned',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this department?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleCreate}>
          Add Department
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={departments} 
        rowKey="id" 
        loading={loading}
      />
      <DepartmentForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchDepartments();
        }}
        department={selectedDepartment}
      />
    </div>
  );
};

export default DepartmentList;