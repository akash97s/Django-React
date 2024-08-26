import React from 'react';

const DataDisplay = ({ data, type }) => {
  return (
    <div>
      <h2>{type === 'users' ? 'User Data' : 'Post Data'}</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {type === 'users'
              ? `${item.name} - ${item.email}`
              : `${item.title}: ${item.body}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
