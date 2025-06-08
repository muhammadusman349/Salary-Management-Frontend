import { useState } from 'react';
import { OrganizationService } from '../../api/employee';
import { 
  Button, 
  Card, 
  Descriptions, 
  Divider, 
  Popconfirm, 
  message, 
  List, 
  Tag, 
  Avatar, 
  Typography,
  Space,
  Skeleton,
  Empty
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

const OrganizationsDetails = ({ organization, onEdit, onBack, loading }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await OrganizationService.deleteOrganization(organization.id);
      message.success('Organization deleted successfully');
      onBack();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to delete organization');
    } finally {
      setDeleting(false);
    }
  };

  const getAdminDisplay = () => {
    if (!organization?.admin_detail) {
      return <Tag color="default">Not assigned</Tag>;
    }

    const { username, first_name, last_name, email } = organization.admin_detail;
    const fullName = [first_name, last_name].filter(Boolean).join(' ');
    
    return (
      <Space direction="vertical" size={2}>
        <Tag icon={<UserOutlined />} color="blue">
          {username}
        </Tag>
        {fullName && <Text>{fullName}</Text>}
        {email && <Text type="secondary">{email}</Text>}
      </Space>
    );
  };

  const renderEmployeeItem = (employee) => {
    const fullName = [employee.first_name, employee.last_name].filter(Boolean).join(' ') || 'Unnamed Employee';
    
    return (
      <List.Item key={employee.id}>
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={<Text strong>{fullName}</Text>}
          description={
            <Space direction="vertical" size={2}>
              {employee.position && (
                <Text>
                  <Text strong>Position:</Text> {employee.position}
                </Text>
              )}
            </Space>
          }
        />
      </List.Item>
    );
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!organization) {
    return (
      <Empty
        description="Organization not found"
        style={{ margin: '40px 0' }}
      >
        <Button type="primary" onClick={onBack} icon={<ArrowLeftOutlined />}>
          Back to list
        </Button>
      </Empty>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Button 
        type="link" 
        onClick={onBack}
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: 16 }}
      >
        Back to list
      </Button>

      <Card
        title={<Title level={3} style={{ margin: 0 }}>{organization.name}</Title>}
        extra={
          <Space>
            <Button 
              type="primary" 
              onClick={onEdit}
              icon={<EditOutlined />}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete this organization?"
              description="All associated data will be permanently removed."
              onConfirm={handleDelete}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button 
                danger 
                icon={<DeleteOutlined />}
                loading={deleting}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle">
          <Descriptions.Item label="Admin">
            {getAdminDisplay()}
          </Descriptions.Item>
          <Descriptions.Item label="Created At" span={2}>
            <Tag icon={<ClockCircleOutlined />}>
              {organization.created_at ? new Date(organization.created_at).toLocaleString() : 'N/A'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            <Tag icon={<SyncOutlined />}>
              {organization.updated_at ? new Date(organization.updated_at).toLocaleString() : 'N/A'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left" style={{ marginTop: 24 }}>
          <TeamOutlined /> Employees ({organization.employees_detail?.length || 0})
        </Divider>

        {organization.employees_detail?.length > 0 ? (
          <List
            dataSource={organization.employees_detail}
            renderItem={renderEmployeeItem}
            rowKey="id"
            bordered
            pagination={{
              pageSize: 5,
              hideOnSinglePage: true,
              showSizeChanger: false,
              simple: true
            }}
          />
        ) : (
          <Empty
            description="No employees assigned to this organization"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={onEdit}>
              Assign Employees
            </Button>
          </Empty>
        )}
      </Card>
    </div>
  );
};

export default OrganizationsDetails;