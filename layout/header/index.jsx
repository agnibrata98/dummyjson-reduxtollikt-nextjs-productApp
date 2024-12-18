import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            My Website
          </Typography>
          <Button color="inherit" component={Link} href='/cms/all-products'>Products</Button>
          {/* <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header