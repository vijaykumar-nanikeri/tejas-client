import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";

import TopNavBarLeftSection from "./TopNavBarLeftSection";
import TopNavBarRightSection from "./TopNavBarRightSection";

type StyleProps = {
  background?: string;
};

type Props = {
  background?: string;
  setIsAuthenticated: (value: boolean) => void;
};

const useStyles = makeStyles<StyleProps>(() => ({
  root: (props: StyleProps) => ({
    backgroundColor: props.background,
    borderBottom: "1px solid #dddddd",
    // Overriding default value of zIndex which was 1100, as the same zIndex value is assigned for Sub-TopNavBar.
    zIndex: 1110,
  }),
}));

const TopNavBar: React.FC<Props> = ({ background, setIsAuthenticated }) => {
  const classes = useStyles({ background });

  return (
    <AppBar className={classes.root} elevation={0} data-testid="topNavBar">
      <Toolbar variant="dense" disableGutters>
        <TopNavBarLeftSection />
        <TopNavBarRightSection setIsAuthenticated={setIsAuthenticated} />
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
