import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";

const OtpVerification = ({ email, verifyOtp }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp({ email, otp });
      dispatch(openSuccessSnackbar("Email verified successfully"));
    } catch (error) {
      console.error("OTP Verification Error:", error);
      dispatch(
        openErrorSnackbar(
          error.response?.data?.message || "Something went wrong"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        boxShadow:
          " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "2rem",
        gap: "2rem",
        minWidth: "400px",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">OTP Verification</Typography>
      <FormControl>
        <TextField
          color="success"
          variant="outlined"
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </FormControl>

      <Button
        variant="contained"
        type="submit"
        color="success"
        disableRipple
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        Verify OTP
      </Button>
    </form>
  );
};

export default OtpVerification;
