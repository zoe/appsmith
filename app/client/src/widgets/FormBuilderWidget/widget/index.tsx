import React from "react";
import equal from "fast-deep-equal/es6";
import { isEmpty } from "lodash";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import FormBuilderComponent from "../component";
import propertyConfig from "./propertyConfig";
import SchemaParser from "../schemaParser";
import { DerivedPropertiesMap } from "utils/WidgetFactory";
import { Schema } from "../constants";
import { PropertyPaneConfig } from "constants/PropertyControlConstants";

export type FormBuilderWidgetProps = WidgetProps & {
  addFormBuilderWidgets: (widgetId: string, children: WidgetProps[]) => void;
  children?: WidgetProps[];
  isLatestSchemaRendered: boolean;
  schema: Schema;
  primaryFields: string[];
  formData?: Record<string, any>;
};

class FormBuilderWidget extends BaseWidget<
  FormBuilderWidgetProps,
  WidgetState
> {
  state = {
    isSchemaRendered: false,
  };

  static getPropertyPaneConfig() {
    return propertyConfig;
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  componentDidMount() {
    this.constructAndSaveSchemaIfRequired();
  }

  componentDidUpdate(prevProps: FormBuilderWidgetProps) {
    this.constructAndSaveSchemaIfRequired(prevProps);
  }

  constructAndSaveSchemaIfRequired = (prevProps?: FormBuilderWidgetProps) => {
    const prevFormData = prevProps?.formData;
    const currFormData = this.props?.formData;

    if (isEmpty(currFormData)) {
      return;
    }

    // Hot path - early exit
    if (equal(prevFormData, currFormData)) {
      return;
    }

    const schema = SchemaParser.parse(currFormData, this.props.schema);

    // eslint-disable-next-line
    console.log("FORM BUILDER - SCHEMA", schema);
    this.updateWidgetProperty("schema", schema);
  };

  getPageView() {
    return (
      <FormBuilderComponent
        backgroundColor={this.props.backgroundColor}
        inputData={this.props?.formData}
        schema={this.props.schema}
      />
    );
  }

  static getWidgetType(): string {
    return "FORM_BUILDER_WIDGET";
  }
}

export default FormBuilderWidget;