import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    </>
  );
}
export default function DialogBox(props) {
  return (
    <Dialog
      keepMounted
      open={props.openDialog}
      // onClose={handleClose}
      // onClose={(event, reason) => {
      //   if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      //     setOpen(false);
      //   }
      // }}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleClose}
      ></BootstrapDialogTitle>
      <Box>
        <Typography
          id="keep-mounted-modal-title"
          variant="h6"
          component="h2"
          className="mt-3 mx-4 mb-4"
        >
          {props.title}
        </Typography>
        <div className="mb-4">
          {props.Okaybtn ? (
            <Button
              variant="outlined"
              className="ms-4"
              sx={{
                width: 100,
                color: "red",
              }}
              onClick={props.handleOk}
            >
              OK
            </Button>
          ) : (
            <div>
              <Button
                variant="outlined"
                className="ms-4"
                sx={{
                  width: 100,
                  color: "red",
                }}
                onClick={props.handleNo}
              >
                NO
              </Button>
              <Button
                variant="outlined"
                className="float-end me-4"
                sx={{
                  width: 100,
                }}
                onClick={props.handleYes}
              >
                YES
              </Button>
            </div>
          )}
        </div>
      </Box>
    </Dialog>
  );
}
