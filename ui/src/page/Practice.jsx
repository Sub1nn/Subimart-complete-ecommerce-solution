import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Practice = () => {
  const [status, setStatus] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  console.log(status);
  return (
    <>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              label={"Select All"}
              checked={
                status.check1 && status.check2 && status.check3 && status.check4
              }
              onChange={() => {
                setStatus({
                  check1: true,
                  check2: true,
                  check3: true,
                  check4: true,
                });
              }}
            />
          }
          label="Select All"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={status.check1}
              onChange={() => {
                setStatus({ ...status, check1: !status.check1 });
              }}
            />
          }
          label="1"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="success"
              checked={status.check2}
              onChange={() => {
                setStatus({ ...status, check2: !status.check2 });
              }}
            />
          }
          label="2"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="default"
              checked={status.check3}
              onChange={() => {
                setStatus({ ...status, check3: !status.check3 });
              }}
            />
          }
          label="3"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="error"
              checked={status.check4}
              onChange={() => {
                setStatus({ ...status, check4: !status.check4 });
              }}
            />
          }
          label="4"
        />
      </div>
    </>
  );
};

export default Practice;
