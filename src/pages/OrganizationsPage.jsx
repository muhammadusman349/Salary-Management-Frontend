import { useState } from 'react';
import OrganizationsList from '../components/Employee/OrganizationsList';
import OrganizationsDetails from '../components/Employee/OrganizationsDetails';
import OrganizationsForm from '../components/Employee/OrganizationsForm';


const OrganizationsPage = () => {
  const [view, setView] = useState('list');
  const [currentOrg, setCurrentOrg] = useState(null);

  const handleViewDetails = (org) => {
    setCurrentOrg(org);
    setView('details');
  };

  const handleEdit = (org) => {
    setCurrentOrg(org);
    setView('edit');
  };

  const handleCreateNew = () => {
    setCurrentOrg(null);
    setView('create');
  };

  const handleSuccess = () => {
    setView(currentOrg ? 'details' : 'list');
  };

  const handleCancel = () => {
    setView(currentOrg ? 'details' : 'list');
  };

  const handleBackToList = () => {
    setCurrentOrg(null);
    setView('list');
  };

  return (
    <>
      {view === 'list' && (
        <OrganizationsList 
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onCreateNew={handleCreateNew}
        />
      )}
      
      {view === 'details' && currentOrg && (
        <OrganizationsDetails 
          organization={currentOrg}
          onEdit={() => handleEdit(currentOrg)}
          onBack={handleBackToList}
        />
      )}
      
      {(view === 'edit' || view === 'create') && (
        <OrganizationsForm 
          organization={view === 'edit' ? currentOrg : null}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          mode={view}
        />
      )}
    </>
  );
};

export default OrganizationsPage;

// const OrganizationsPage = () => {
//   const [view, setView] = useState('list'); // 'list', 'form', 'details'
//   const [currentOrg, setCurrentOrg] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCreateNew = () => {
//     setCurrentOrg(null);
//     setView('form');
//   };

//   const handleEdit = (organization) => {
//     setCurrentOrg(organization);
//     setView('form');
//   };

//   const handleViewDetails = (organization) => {
//     setCurrentOrg(organization);
//     setView('details');
//   };

//   const handleBackToList = () => {
//     setView('list');
//     setCurrentOrg(null);
//   };

//   const handleSuccess = () => {
//     setView('list');
//     setCurrentOrg(null);
//   };

//   return (
//     <div>
//       {view === 'list' && (
//         <OrganizationsList
//           onCreateNew={handleCreateNew}
//           onEdit={handleEdit}
//           onViewDetails={handleViewDetails}
//         />
//       )}

//       {view === 'form' && (
//         <OrganizationsForm
//           organization={currentOrg}
//           onSuccess={handleSuccess}
//           onCancel={handleBackToList}
//         />
//       )}

//       {view === 'details' && (
//         <OrganizationsDetails
//           organization={currentOrg}
//           onEdit={() => handleEdit(currentOrg)}
//           onBack={handleBackToList}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// export default OrganizationsPage;