import React from "react";
import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";

const MockAPIList = ({ mockAPIs, onDelete }) => {
  return (
    <List className="mock-api-list">
      {Object.entries(mockAPIs).map(([path, methods]) => (
        <ListItem key={path} divider className="mock-api-item" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {path} 
          </Typography>
          {Object.entries(methods).map(([method, response]) => (
            <div key={`${path}-${method}`} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1" style={{ color: "#555" }}>
                {method}
              </Typography>
              <pre className="mock-api-response" style={{ flex: 1, padding: "5px", backgroundColor: "#f4f4f4", borderRadius: "5px", marginLeft: "10px" }}>
                {JSON.stringify(response, null, 2)}
              </pre>
              <Button variant="outlined" color="error" onClick={() => onDelete(path, method)}>
                Delete
              </Button>
            </div>
          ))}
        </ListItem>
      ))}
    </List>
  );
};

export default MockAPIList;
