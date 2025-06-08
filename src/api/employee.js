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

export const OrganizationService = {
  getOrganizations: async () => {
    return await api.get('/organizations/');
  },
  
  getOrganization: async (id) => {
    return await api.get(`/organizations/${id}/`);
  },
  
  createOrganization: async (data) => {
    return await api.post('/organizations/', data);
  },
  
  updateOrganization: async (id, data) => {
    return await api.put(`/organizations/${id}/`, data);
  },
  
  patchOrganization: async (id, data) => {
    return await api.patch(`/organizations/${id}/`, data);
  },
  
  deleteOrganization: async (id) => {
    return await api.delete(`/organizations/${id}/`);
  },
  
  // Additional methods for organization-specific relationships
  addEmployeeToOrganization: async (organizationId, employeeId) => {
    return await api.post(`/organizations/${organizationId}/employees/`, { employee_id: employeeId });
  },
  
  removeEmployeeFromOrganization: async (organizationId, employeeId) => {
    return await api.delete(`/organizations/${organizationId}/employees/${employeeId}/`);
  },
  
  setOrganizationAdmin: async (organizationId, userId) => {
    return await api.patch(`/organizations/${organizationId}/`, { admin: userId });
  }
};


export const EmployeeService = {
  getEmployees: async () => {
    return await api.get('/employees/');
  },
  getEmployee: async (id) => {
    return await api.get(`/employees/${id}/`);
  },
  createEmployee: async (data) => {
    return await api.post('/employees/', data);
  },
  updateEmployee: async (id, data) => {
    return await api.put(`/employees/${id}/`, data);
  },
  deleteEmployee: async (id) => {
    return await api.delete(`/employees/${id}/`);
  }
};