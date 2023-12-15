import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import CustomizeTextInput from "../CustomizeTextInput/CustomizetextInput";
import { parseToForm } from "../../helps/parseToForm";
import CustomizeButton from "../CustomizeButton/CustomizeButton";

function GeneralForm({ fields, handleData, titleSubmitBtn }) {
  const fieldRender = (field, key, { handleChange, values }) => {
    let element = null;

    switch (field.type) {
      case "text":
        element = (
          <CustomizeTextInput
            key={key}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChangeText={handleChange(field.name)}
            secureTextEntry={false}
          />
        );
        break;
      case "password":
        element = (
          <CustomizeTextInput
            key={key}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChangeText={handleChange(field.name)}
            secureTextEntry={true}
          />
        );
        break;
      default:
        element = (
          <CustomizeTextInput
            key={key}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChangeText={handleChange(field.name)}
            secureTextEntry={false}
          />
        );
        break;
    }

    return element;
  };

  return (
    <Formik
      initialValues={parseToForm(fields)}
      onSubmit={(values) => handleData(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View className="w-full">
          {fields.map((field, key) => (
            <View key={key} className="my-4">
              {fieldRender(field, key, { handleChange, values })}
            </View>
          ))}
          <View className="my-3">
            <CustomizeButton title={titleSubmitBtn} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
}

export default GeneralForm;
