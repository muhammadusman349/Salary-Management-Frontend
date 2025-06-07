import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DepartmentService } from '../../api/employee';
import { Button, Card, Descriptions, message, Space } from 'antd';
import DepartmentForm from './DepartmentForm';

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  const fetchDepartment = async () => {
    setLoading(true);
    try {
      const response = await DepartmentService.getDepartment(id);
      setDepartment(response.data);
      console.log('Department data:', response.data); // Add this for debugging
    } catch (error) {
      message.error('Failed to fetch department details');
      navigate('/departments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await DepartmentService.deleteDepartment(id);
      message.success('Department deleted successfully');
      navigate('/departments');
    } catch (error) {
      message.error('Failed to delete department');
    }
  };

  if (!department) return <div>Loading...</div>;

  // Updated formatLeadDisplay to use full_name from API
  const formatLeadDisplay = (lead) => {
    if (!lead) return 'Not assigned';
    
    // First try to use full_name if available
    if (lead.full_name) {
      return lead.full_name;
    }
    
    // Fallback to username if full_name not available
    return lead.username || 'Unknown';
  };

  return (
    <div>

      <Card
        title={`Department: ${department.name}`}
        extra={[
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Edit
          </Button>,
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
         ,<Button 
            type="default" 
            onClick={() => navigate('/departments')}
            style={{ marginRight: 8 }}
            >
            ← Back to Departments
            </Button>
        ]}
        loading={loading}
      >
        
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{department.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{department.name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {department.description || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Lead">
            {formatLeadDisplay(department.lead)}
            {department.lead?.role && (
              <div style={{ marginTop: 4, fontSize: '0.8em', color: '#666' }}>
                Role: {department.lead.role}
              </div>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(department.created_at).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {new Date(department.updated_at).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <DepartmentForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchDepartment();
        }}
        department={department}
      />
    </div>
  );
};

export default DepartmentDetail;