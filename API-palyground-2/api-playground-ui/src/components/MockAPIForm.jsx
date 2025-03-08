/* eslint-disable no-unused-vars */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormHelperText, FormControl } from "@mui/material";

const MockAPIForm = ({ onCreate }) => {
  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm();
  const selectedMethod = watch("method", "GET");

  const onSubmit = (data) => {
    try {
      const parsedResponse = JSON.parse(data.response);
      const parsedRequestBody = data.requestBody ? JSON.parse(data.requestBody) : {}; 

      onCreate({ 
        ...data, 
        response: parsedResponse,
        requestBody: parsedRequestBody,
      });

      reset();
    } catch (err) {
      alert("Invalid JSON format in Request or Response!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField label="Path" placeholder="/your-path" {...register("path", { required: "Path is required" })}  error={!!errors.path} fullWidth />

      <FormControl fullWidth>
        <Controller
          name="method"
          control={control}
          defaultValue="GET"
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="DELETE">DELETE</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      {(selectedMethod === "POST" || selectedMethod === "PUT") && (
        <TextField label="Request Body (JSON)" {...register("requestBody")}  error={!!errors.path} minRows={5}
        maxRows={10} multiline fullWidth />
      )}

      <TextField label="Response (JSON)" {...register("response", { required: "Response is required" })} error={!!errors.path} minRows={5}
        maxRows={10} multiline fullWidth />

      <Button variant="contained" type="submit" color="primary">Create</Button>
    </form>
  );
};

export default MockAPIForm;
