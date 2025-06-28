import React from "react";

// Packages
import { ToastContainer } from "react-toastify";

// Styles
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
  return (
    <>
      {/* Global components - STARTS >> */}
      <ToastContainer
        closeOnClick
        // position "bottom-center" allows us to have the correct slide in animation
        position="bottom-center"
        newestOnTop={false}
        hideProgressBar
        className="Toastify__toast-container-custom"
        // bodyClassName="Toastify__toast-body-custom"
      />
      {/* << ENDS - Global components */}
      {children}
    </>
  );
};

export default AppProviders;
