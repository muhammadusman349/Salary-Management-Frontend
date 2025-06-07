import {employeeApi as api} from './axios';

export const DepartmentService = {
  getDepartments: async () => {
    return await api.get('/departments/');
  },
  getDepartment: async (id) => {
    return await api.get(`/departments/${id}/`);
  },
  createDepartment: async (data) => {
    return await api.post('/departments/', data);
  },
  updateDepartment: async (id, data) => {
    return await api.put(`/departments/${id}/`, data);
  },
  deleteDepartment: async (id) => {
    return await api.delete(`/departments/${id}/`);
  }
};

export const PositionService = {
  getPositions: async (departmentId = null) => {
    const params = departmentId ? { department_id: departmentId } : {};
    return await api.get('/positions/', { params });
  },
  getPosition: async (id) => {
    return await api.get(`/positions/${id}/`);
  },
  createPosition: async (data) => {
    return await api.post('/positions/', data);
  },
  updatePosition: async (id, data) => {
    return await api.put(`/positions/${id}/`, data);
  },
  deletePosition: async (id) => {
    return await api.delete(`/positions/${id}/`);
  }
  
};
