import { useEffect, useState } from 'react';
import { OrganizationService, EmployeeService } from '../../api/employee';
import { UserService } from '../../api/auth';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Spin, 
  message, 
  Card, 
  Typography,
  Descriptions,
  Space,
  Tag,
  Divider
} from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OrganizationsForm = ({ organization, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const [usersRes, employeesRes] = await Promise.all([
          UserService.getUsers(),
          EmployeeService.getEmployees()
        ]);
        
        setUsers(usersRes.data);
        const formattedEmployees = employeesRes.data.map(emp => ({
          ...emp,
          first_name: emp.user?.first_name || emp.first_name,
          last_name: emp.user?.last_name || emp.last_name,
          position: emp.position?.title || emp.position
        }));
        setEmployees(formattedEmployees);
        
        if (organization) {
          const adminId = organization.admin?.id || organization.admin_id || null;
          const employeeIds = organization.employees_detail?.map(e => e.id) || 
                             organization.employees?.map(e => e.id) || [];
          
          const initialValues = {
            name: organization.name,
            admin_id: adminId,
            employee_ids: employeeIds
          };
          
          form.setFieldsValue(initialValues);
          setSelectedEmployeeIds(employeeIds);
          
          // Set selected admin for display
          if (adminId) {
            const admin = usersRes.data.find(u => u.id === adminId) || null;
            setSelectedAdmin(admin);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load required data');
      } finally {
        setFetching(false);
      }
    };
    
    fetchData();
  }, [organization, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        name: values.name.trim(),
        admin_id: values.admin_id || null,
        employee_ids: values.employee_ids || []
      };

      if (organization) {
        await OrganizationService.updateOrganization(organization.id, payload);
        message.success('Organization updated successfully');
      } else {
        await OrganizationService.createOrganization(payload);
        message.success('Organization created successfully');
      }
      onSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error.response?.data?.message || 
                         (organization ? 'Failed to update organization' : 'Failed to create organization');
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminChange = (value) => {
    const admin = value ? users.find(u => u.id === value) || null : null;
    setSelectedAdmin(admin);
    form.setFieldsValue({ admin_id: value });
  };

  const handleEmployeeChange = (value) => {
    setSelectedEmployeeIds(value || []);
  };

  return (
    <Card 
      style={{ maxWidth: 800, margin: '0 auto' }}
      title={
        <Title level={3} style={{ margin: 0 }}>
          {organization ? 'Edit Organization' : 'Create New Organization'}
        </Title>
      }
    >
      {organization && (
        <>
          <Descriptions size="small" column={1} bordered>
            <Descriptions.Item label="Current Admin">
              {organization.admin_detail ? (
                <Space>
                  <UserOutlined />
                  <Text strong>
                    {organization.admin_detail.username || 'No username'} 
                    ({organization.admin_detail.first_name || ''} {organization.admin_detail.last_name || ''})
                  </Text>
                </Space>
              ) : <Tag color="default">Not assigned</Tag>}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
        </>
      )}
      
      <Spin spinning={fetching} tip="Loading data...">
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
          initialValues={{
            name: organization?.name || '',
            admin_id: organization?.admin?.id || organization?.admin_id || null,
            employee_ids: organization?.employees_detail?.map(e => e.id) || organization?.employees?.map(e => e.id) || []
          }}
        >
          <Form.Item
            name="name"
            label="Organization Name"
            rules={[
              { required: true, message: 'Please input organization name' },
              { max: 100, message: 'Name cannot exceed 100 characters' }
            ]}
          >
            <Input 
              placeholder="Enter organization name" 
              allowClear
              disabled={loading}
            />
          </Form.Item>

          <Form.Item 
            name="admin_id" 
            label="Organization Admin"

          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select an admin"
              allowClear
              loading={fetching}
              onChange={handleAdminChange}
              disabled={loading}
              value={selectedAdmin?.id || undefined}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {users.map(user => (
                <Select.Option key={user.id} value={user.id}>
                  <Space>
                    <UserOutlined />
                    <span>
                      {user.username} 
                      {(user.first_name || user.last_name) && 
                        ` (${user.first_name || ''} ${user.last_name || ''})`.trim()}
                    </span>
                  </Space>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item 
            name="employee_ids" 
            label="Employees"
            extra={
              <Text type="secondary">
                {selectedEmployeeIds.length} employee{selectedEmployeeIds.length !== 1 ? 's' : ''} selected
              </Text>
            }
          >
            <Select
              mode="multiple"
              placeholder="Select employees"
              optionFilterProp="children"
              loading={fetching}
              disabled={loading}
              onChange={handleEmployeeChange}
              maxTagCount="responsive"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {employees.map(employee => (
                <Select.Option key={employee.id} value={employee.id}>
                  <Space>
                    <TeamOutlined />
                    <span>
                      {[employee.first_name, employee.last_name].filter(Boolean).join(' ') || 'Unnamed Employee'}
                      {employee.position && ` (${employee.position})`}
                    </span>
                  </Space>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                disabled={fetching}
              >
                {organization ? 'Update Organization' : 'Create Organization'}
              </Button>
              <Button 
                onClick={onCancel} 
                disabled={loading}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default OrganizationsForm;