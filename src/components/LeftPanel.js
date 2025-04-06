import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./LeftPanel.css"; 

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Common styles
  const tableStyles = {
    size: "small",
    sx: { '& td, & th': { py: 0.5 } }
  };

  const containerStyles = {
    backgroundColor: '#ebf6f5',
    mb: 2,
    boxShadow: 'none',  // Remove Paper component's default shadow
    borderBottom: '1px solid rgb(46, 46, 46)', // Add bottom border
    '& .MuiPaper-root': {
      boxShadow: 'none'  // Remove nested Paper components' shadows
    },
    '& .MuiTable-root': {
      borderBottom: '1px solid rgb(46, 46, 46)' // Add border to table
    }
  };

  const headerStyles = {
    variant: "h6",
    sx: { 
      p: 0.5,
      fontWeight: 'bold',
      backgroundColor: '#5cbdb9',
      color: 'white'
    }
  };

  const cellStyles = {
    header: {
      sx: { 
        fontWeight: 'bold',
        color: '#5cbdb9'
      }
    },
    headerCenter: {
      align: "center",
      sx: { 
        fontWeight: 'bold',
        color: '#5cbdb9'
      }
    },
    center: {
      align: "center"
    }
  };

  return (
    <div className="sidebar" style={{
      width: isCollapsed ? '46px' : '280px', // Increased from 24px to accommodate margin
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: isCollapsed ? 'transparent' : '#ebf6f5',
      padding: isCollapsed ? '0' : '10px',
      border: 'none',  // Remove border
      boxShadow: 'none'  // Remove shadow
    }}>
      <IconButton 
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          position: 'absolute',
          ...(isCollapsed ? {
            left: '2px',
            top: '5px',
            width: '42px',
            height: '42px',
            padding: 0,
            minWidth: 'unset',
            marginRight: '2px', // Add margin
          } : {
            right: '2px',
            top: '5px',
            width: '42px',
            height: '42px',
          }),
          zIndex: 9999, // Ensure button stays on top
          backgroundColor: '#5cbdb9',
          color: 'white',
          margin: '2px',
          border: '1px solid rgb(46, 46, 46)',  // Very subtle border
          '&:hover': {
            backgroundColor: '#4ba9a5'
          }
        }}
      >
        {isCollapsed ? <ChevronRightIcon sx={{ fontSize: '1.2rem' }} /> : <ChevronLeftIcon sx={{ fontSize: '1.2rem' }} />}
      </IconButton>

      <div style={{ 
        width: '280px',
        transition: 'transform 0.3s ease, opacity 0.2s ease',
        transform: isCollapsed ? 'translateX(-280px)' : 'translateX(0)',
        opacity: isCollapsed ? 0 : 1,
        visibility: isCollapsed ? 'hidden' : 'visible',
      }}>
        {/* RBC Analysis Table */}
        <TableContainer component={Paper} sx={containerStyles}>
          <Typography {...headerStyles}>RBC Analysis</Typography>
          <Table {...tableStyles}>
            <TableHead sx={{ backgroundColor: '#ebf6f5' }}>
              <TableRow>
                <TableCell {...cellStyles.header}>Type</TableCell>
                <TableCell {...cellStyles.headerCenter}>Count</TableCell>
                <TableCell {...cellStyles.headerCenter}>%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Angled Cells</TableCell>
                <TableCell align="center">222</TableCell>
                <TableCell align="center">67%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Borderline Ovalocytes</TableCell>
                <TableCell align="center">50</TableCell>
                <TableCell align="center">20%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Burr Cells</TableCell>
                <TableCell align="center">87</TableCell>
                <TableCell align="center">34%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fragmented Cells</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">0.12%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ovalocytes</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rounded RBC</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Teardrops</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* WBC Analysis Table */}
        <TableContainer component={Paper} sx={containerStyles}>
          <Typography {...headerStyles}>WBC Analysis</Typography>
          <Table {...tableStyles}>
            <TableHead sx={{ backgroundColor: '#ebf6f5' }}>
              <TableRow>
                <TableCell {...cellStyles.header}>Type</TableCell>
                <TableCell {...cellStyles.headerCenter}>Count</TableCell>
                <TableCell {...cellStyles.headerCenter}>%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Basophil</TableCell>
                <TableCell align="center">222</TableCell>
                <TableCell align="center">67%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Eosinophil</TableCell>
                <TableCell align="center">50</TableCell>
                <TableCell align="center">20%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lymphocyte</TableCell>
                <TableCell align="center">87</TableCell>
                <TableCell align="center">34%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monocyte</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">0.12%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Platelets Table */}
        <TableContainer component={Paper} sx={{ ...containerStyles, mb: 0 }}>
          <Typography {...headerStyles}>Platelets</Typography>
          <Table {...tableStyles}>
            <TableBody>
              <TableRow>
                <TableCell {...cellStyles.header}>Count</TableCell>
                <TableCell {...cellStyles.center}>222</TableCell>
              </TableRow>
              <TableRow>
                <TableCell {...cellStyles.header}>Percentage</TableCell>
                <TableCell {...cellStyles.center}>67%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Sidebar;
