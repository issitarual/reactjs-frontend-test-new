import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { getValueFromObject } from "../../utils/basic";

const ControlledTextField = ({
  formProps,
  name,
  validationKey,
  ignoreError = false,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
    rules,
  } = formProps;

  const isError =
    (getValueFromObject(errors, name) !== undefined && !ignoreError) ||
    otherProps.error;

  const zipCodeMask = (value) => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
  };

  return (
    <Controller
      name={name}
      control={control}
      disabled={otherProps.disabled}
      rules={
        otherProps.disabled
          ? { a: () => true }
          : getValueFromObject(rules, validationKey ?? name)
      }
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          {...otherProps}
          value={name === "cep" ? zipCodeMask(value) : value}
          error={isError}
          helperText={
            !isError
              ? otherProps.helperText
              : !ignoreError
              ? getValueFromObject(errors, name)?.message ??
                otherProps.helperText
              : undefined
          }
          onChange={(v) => {
            onChange(v);
            if (!!otherProps.onChange) {
              otherProps.onChange(v);
            }
          }}
          onBlur={() => {
            onBlur();
            if (!!otherProps.onBlur) {
              otherProps.onBlur(value);
            }
          }}
        />
      )}
    />
  );
};

export default ControlledTextField;
