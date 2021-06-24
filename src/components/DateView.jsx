import React from 'react';

export const DateView = ({ data }) => {
  const json = JSON.stringify(data);
  return (
    <div>
      <code>
        {json}
      </code>
    </div>
  );
};
