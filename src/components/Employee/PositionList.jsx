import React, { useEffect, useState } from 'react';
import { PositionService, DepartmentService } from '../../api/employee';
import { Table, Button, Space, message, Popconfirm, Select, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import PositionForm from './PositionForm';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deptLoading, setDeptLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchDepartments();
      await fetchPositions();
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchPositions(selectedDepartment);
  }, [selectedDepartment]);

  const fetchDepartments = async () => {
    setDeptLoading(true);
    try {
      const response = await DepartmentService.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      message.error('Failed to fetch departments');
    } finally {
      setDeptLoading(false);
    }
  };

  const fetchPositions = async (departmentId = null) => {
    setLoading(true);
    try {
      const params = departmentId ? { department_id: departmentId } : {};
      const response = await PositionService.getPositions(params);
      
      // The backend should already include department_name in the response
      setPositions(response.data);
    } catch (error) {
      message.error('Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPosition(null);
    setModalVisible(true);
  };

  const handleEdit = (position) => {
    setSelectedPosition(position);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await PositionService.deletePosition(id);
      message.success('Position deleted successfully');
      fetchPositions(selectedDepartment);
    } catch (error) {
      message.error('Failed to delete position');
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/positions/${id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewDetails(record.id)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department_name', // Use the department_name from backend
      key: 'department',
      render: (name) => name || <Tag color="orange">No Department</Tag>,
    },
    {
      title: 'Salary Range',
      key: 'salary_range',
      render: (_, record) => (
        <span>
          ${record.salary_range_min} - ${record.salary_range_max}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active) => (
        <Tag color={is_active ? 'green' : 'red'}>
          {is_active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this position?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Select
          style={{ width: 250 }}
          placeholder="Filter by department"
          allowClear
          loading={deptLoading}
          onChange={(value) => setSelectedDepartment(value)}
          options={departments.map(department => ({
            value: department.id,
            label: department.name,
          }))}
        />
        <Button type="primary" onClick={handleCreate}>
          Add Position
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={positions}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />
      
      <PositionForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchPositions(selectedDepartment);
        }}
        position={selectedPosition}
        departments={departments}
      />
    </div>
  );
};

export default PositionList;