import React from "react";

// Styles
import "react-toastify/dist/ReactToastify.css";

import AppProviders from "src/AppProviders";
import AppRoutes from "src/AppRoutes";

const App: React.FC = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);

export default App;
