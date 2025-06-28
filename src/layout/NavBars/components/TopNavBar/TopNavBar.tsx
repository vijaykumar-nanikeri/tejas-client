import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import TopNavBarLeftSection from "./TopNavBarLeftSection";
import TopNavBarRightSection from "./TopNavBarRightSection";

type Props = {
  background?: string;
  setIsAuthenticated: (value: boolean) => void;
};

const TopNavBar: React.FC<Props> = ({ setIsAuthenticated }) => {
  return (
    <AppBar
      elevation={4}
      data-testid="topNavBar"
      sx={{
        background: "linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)",
        zIndex: 1110,
      }}
    >
      <Toolbar variant="dense" disableGutters>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: 3,
          }}
        >
          <TopNavBarLeftSection />
          <TopNavBarRightSection setIsAuthenticated={setIsAuthenticated} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
