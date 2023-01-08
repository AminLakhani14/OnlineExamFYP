import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const HeadBreadCrumb = (props) => {
  return (
    <div className="row m-0 mt-3">
      <div className="mb-2 m-1">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={props?.url}
            className="d-flex align-items-center"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            <p className="m-0">{props?.text1}</p>
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            {props?.text2}
          </Typography>
        </Breadcrumbs>
      </div>
      <hr />
    </div>
  );
};

export default HeadBreadCrumb;
