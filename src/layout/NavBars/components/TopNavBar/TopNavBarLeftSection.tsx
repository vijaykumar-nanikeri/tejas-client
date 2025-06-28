import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Security from "@mui/icons-material/Security";

const pages = ["Dashboard", "Cases", "Reports", "Analytics"];

function TopNavBarLeftSection() {
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
          }}
        >
          <Security sx={{ color: "white" }} />
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
            key={page}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              mx: 1,
              textTransform: "none",
            }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
}
export default TopNavBarLeftSection;
