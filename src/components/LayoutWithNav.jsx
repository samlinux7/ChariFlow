// src/components/LayoutWithNav.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar.jsx';

export default function LayoutWithNav() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}
