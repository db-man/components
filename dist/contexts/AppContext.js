import React from 'react';
export const AppContext = /*#__PURE__*/React.createContext(null);
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === null) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
//# sourceMappingURL=AppContext.js.map