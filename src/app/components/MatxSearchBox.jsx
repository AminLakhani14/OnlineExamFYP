import { Icon, IconButton, Input, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 9,
  width: "100%",
  display: "flex",
  alignItems: "center",
  height: "var(--topbar-height)",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "& .search-box": {
    width: "100%",
    padding: "0 30px",
    display: "flex",
    alignItems: "center",
    "& .input-field": {
      width: "100%",
      marginLeft: "10px",
      color: theme.palette.primary.contrastText,
    },
  },
}));

const MatxSearchBox = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <Icon sx={{ color: "text.primary" }}>search</Icon>
        </IconButton>
      )}

      {open && (
        <SearchContainer>
          <div className="search-box">
            <Input
              placeholder="Search here..."
              autoFocus
              fullWidth
              className="input-field"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggle}>
                    <Icon sx={{ color: "primary.contrastText" }}>close</Icon>
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </SearchContainer>
      )}
    </React.Fragment>
  );
};

export default MatxSearchBox;
