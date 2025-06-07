import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PositionService, DepartmentService } from '../../api/employee';
import { Button, Card, Descriptions, message, Space, Tag } from 'antd';
import PositionForm from './PositionForm';

const PositionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch position data
        const positionResponse = await PositionService.getPosition(id);
        setPosition(positionResponse.data);
        
        // Fetch departments for the form dropdown
        const deptResponse = await DepartmentService.getDepartments();
        setDepartments(deptResponse.data);
      } catch (error) {
        message.error('Failed to fetch data');
        navigate('/positions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleFormSuccess = () => {
    setEditModalVisible(false);
    // Refresh the position data
    PositionService.getPosition(id)
      .then(response => setPosition(response.data))
      .catch(error => message.error('Failed to refresh position data'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!position) {
    return <div>Position not found</div>;
  }

  return (
    <>
      <Card
        title="Position Details"
        extra={[
          <Button type="primary" onClick={() => navigate('/positions')}>
            Back to List
          </Button>,
            <Space>
                <Button type="primary" onClick={() => setEditModalVisible(true)}>
                Edit
                </Button>
          </Space>
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{position.id}</Descriptions.Item>
          <Descriptions.Item label="Title">{position.title}</Descriptions.Item>
          <Descriptions.Item label="Department">
            {position.department_name || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Salary Range">
            ${position.salary_range_min} - ${position.salary_range_max}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={position.is_active ? 'green' : 'red'}>
              {position.is_active ? 'Active' : 'Inactive'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {position.description || 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Edit Position Modal */}
      <PositionForm
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSuccess={handleFormSuccess}
        position={position}
        departments={departments}
      />
    </>
  );
};

export default PositionDetail;