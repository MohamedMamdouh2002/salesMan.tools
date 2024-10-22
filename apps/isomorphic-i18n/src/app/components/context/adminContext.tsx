'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context (optional, for TypeScript)
interface AdminContextType {
    isUpdate: boolean;
    setIsUpdate: (value: boolean) => void; // يجب أن تستقبل قيمة من نوع boolean
}

// Create the AdminContext with default values
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Create a provider component
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(true);



  return (
    <AdminContext.Provider value={{ isUpdate, setIsUpdate }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the AdminContext
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
