// Header.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "gray" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Button color="inherit" href="/test">
            Home
          </Button>
          <Button color="inherit" href="/dashboard">
            Dashboard
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* User Icon */}
        <div className="hidden md:flex items-center">
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} component="a" href="/">
          Home
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component="a" href="/dashboard">
          Dashboard
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
