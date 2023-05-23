import React from 'react';
import Papa from 'papaparse';

const ExportButton = ({ users }) => {
  const exportUserDataToCsv = () => {
    // Convert the user data to CSV format
    const csvData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }));

    // Create a CSV string
    const csvString = Papa.unparse(csvData, { header: true });

    // Create a Blob with the CSV data
    const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvBlob);
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={exportUserDataToCsv}>Export Users</button>
  );
};

export default ExportButton;
