/* eslint-disable no-unused-vars */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormHelperText, FormControl } from "@mui/material";

const MockAPIForm = ({ onCreate }) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    try {
      const parsedResponse = JSON.parse(data.response); // Validate JSON input
      onCreate({ ...data, response: parsedResponse });
      reset();
    } catch (err) {
      alert("Invalid JSON format in Response!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
      <TextField 
        label="Path" 
        {...register("path", { required: "Path is required" })} 
        fullWidth 
        error={!!errors.path}
        helperText={errors.path?.message}
      />

      <FormControl fullWidth error={!!errors.method}>
        <Controller
          name="method"
          control={control}
          defaultValue="GET"
          rules={{ required: "Method is required" }}
          render={({ field }) => (
            <Select {...field} fullWidth>
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="DELETE">DELETE</MenuItem>
            </Select>
          )}
        />
        {errors.method && <FormHelperText>{errors.method.message}</FormHelperText>}
      </FormControl>

      <TextField
        label="Response (JSON)"
        {...register("response", { required: "Response is required" })}
        multiline
        minRows={5}
        maxRows={10}
        fullWidth
        error={!!errors.response}
        helperText={errors.response?.message}
      />

      <Button variant="contained" type="submit" color="primary" fullWidth>
        Create
      </Button>
    </form>
  );
};

export default MockAPIForm;
