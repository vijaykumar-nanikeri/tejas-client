import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { WebPaths } from "src/routing/routes";
import logoImage from "images/logo.png";

const pages = [
  { name: "Home", path: WebPaths.Home },
  { name: "Petition", path: WebPaths.Petition },
];

function TopNavBarLeftSection() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 3,
        }}
      >
        <Avatar
          sx={{
            mr: 2,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            width: 40,
            height: 40,
          }}
        >
          <img
            src={logoImage}
            alt="TEJAS Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "4px",
            }}
          />
        </Avatar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
          }}
        >
          TEJAS
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              mx: 1,
              textTransform: "none",
            }}
            onClick={() => handleNavigation(page.path)}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
}
export default TopNavBarLeftSection;
