
import React from 'react';
import DashboardCards from './DashboardCards';
import ServerList from './ServerList';
import ActivityFeed from './ActivityFeed';

const Dashboard = () => {
  return (
    <div>
      <DashboardCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ServerList />
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Dashboard;
