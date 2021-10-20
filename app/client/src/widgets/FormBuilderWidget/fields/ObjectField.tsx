import React from "react";
import styled from "styled-components";
import { ControllerRenderProps } from "react-hook-form";

import FieldLabel from "../component/FieldLabel";
import fieldRenderer from "./fieldRenderer";
import { SchemaItem } from "../constants";

// Note: Do not use ControllerRenderProps["name"] here for name, as it causes TS stack overflow
type ObjectFieldProps = {
  name: string;
  schemaItem: SchemaItem;
  hideLabel?: boolean;
};

const WRAPPER_PADDING_Y = 10;
const WRAPPER_PADDING_X = 15;

const StyledWrapper = styled.div`
  padding: ${WRAPPER_PADDING_Y}px ${WRAPPER_PADDING_X}px;
  padding-top: 0;
  width: 100%;
`;

function ObjectField({ hideLabel, name, schemaItem }: ObjectFieldProps) {
  const { isVisible = true, label, tooltip } = schemaItem;
  const children = Object.values(schemaItem.children);

  if (!isVisible) {
    return null;
  }

  const renderFields = () => {
    return children.map((schemaItem) => {
      const fieldName = name ? `${name}.${schemaItem.name}` : schemaItem.name;

      return fieldRenderer(
        fieldName as ControllerRenderProps["name"],
        schemaItem,
      );
    });
  };

  const renderedFields = <StyledWrapper>{renderFields()}</StyledWrapper>;

  if (hideLabel) {
    return renderedFields;
  }

  return (
    <FieldLabel label={label} tooltip={tooltip}>
      {renderedFields}
    </FieldLabel>
  );
}

ObjectField.componentDefaultValues = {};

export default ObjectField;