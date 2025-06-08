import { useEffect, useState } from 'react';
import { OrganizationService } from '../../api/employee';
import { Button, Table, Spin, message, Typography, Popconfirm, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const OrganizationsList = ({ onViewDetails, onCreateNew }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await OrganizationService.getOrganizations();
      setOrganizations(response.data);
    } catch (error) {
      message.error('Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await OrganizationService.deleteOrganization(id);
      message.success('Organization deleted successfully');
      fetchOrganizations();
    } catch (error) {
      message.error('Failed to delete organization');
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Admin',
      dataIndex: 'admin_detail',
      key: 'admin',
      render: (admin) => admin ? admin.username : 'Not assigned',
    },
    {
      title: 'Employees',
      dataIndex: 'employees_detail',
      key: 'employees',
      render: (employees) => employees?.length || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => onViewDetails(record)}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure to delete this organization?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger
              loading={deletingId === record.id}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Title level={2}>Organizations</Title>
        <Button type="primary" onClick={onCreateNew}>
          Create New Organization
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table 
          dataSource={organizations} 
          columns={columns} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{
            emptyText: 'No organizations found'
          }}
        />
      </Spin>
    </div>
  );
};

export default OrganizationsList;