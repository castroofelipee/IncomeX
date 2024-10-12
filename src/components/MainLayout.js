import React, { useState } from 'react';
import Sidebar from './Sidebar/sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="main-layout">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className={`main-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
