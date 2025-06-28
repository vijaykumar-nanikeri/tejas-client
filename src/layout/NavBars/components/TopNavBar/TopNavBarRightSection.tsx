import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "src/app-configs/app.config";

type Props = {
  setIsAuthenticated: (value: boolean) => void;
};

function ResponsiveAppBar({ setIsAuthenticated }: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("tokenChanged"));
    handleCloseUserMenu();
  };

  const handleMenuClick = (setting: string) => {
    if (setting === "Logout") {
      handleLogout();
    } else {
      handleCloseUserMenu();
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="User Settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", color: "white" }}>
            U
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => handleMenuClick("Profile")}>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Account")}>
          <Typography>Account Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuClick("Dashboard")}>
          <Typography>Dashboard</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuClick("Logout")}>
          <Typography sx={{ color: "text.primary" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default ResponsiveAppBar;
