import React from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import LogoutDialog from "./LogoutDialog"
import { Divider, Stack } from "@mui/material"

const GreetingPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  let name = localStorage.getItem("name")

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        sx={{ width: "150px", fontSize: "1rem", color: "white" }}
      >
        Hello {name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ backgroundColor: "#f0f0f0", padding: "8px" }}
        >
          <Typography sx={{ p: 2, color: "#008700" }}>Dashboard</Typography>
          <Divider variant="middle" component="ol" sx={{ width: "100%" }} />
          <LogoutDialog onClose={handleClose} />
        </Stack>
      </Popover>
    </div>
  )
}

export default GreetingPopover
