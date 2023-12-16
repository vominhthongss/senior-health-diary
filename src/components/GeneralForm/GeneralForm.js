import React from "react";
import { View, Button, Text } from "react-native";
import { Formik } from "formik";
import CustomizeTextInput from "../CustomizeTextInput/CustomizetextInput";
import { parseToForm } from "../../helps/parseToForm";
import CustomizeButton from "../CustomizeButton/CustomizeButton";

function GeneralForm({ fields, handleData, titleSubmitBtn }) {
  const fieldRender = (field, key, { handleChange, values, errors }) => {
    let element = null;

    switch (field.type) {
      case "text":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <Text>{errors[field.name]}</Text>}
            </View>
          </View>
        );
        break;
      case "email":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <Text>{errors[field.name]}</Text>}
            </View>
          </View>
        );
        break;
      case "password":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={true}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <Text>{errors[field.name]}</Text>}
            </View>
          </View>
        );
        break;
      default:
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <Text>{errors[field.name]}</Text>}
            </View>
          </View>
        );
        break;
    }

    return element;
  };

  return (
    <Formik
      initialValues={parseToForm(fields)}
      onSubmit={(values) => handleData(values)}
      validate={(values) => {
        const errors = {};
        fields.map((field) => {
          if (!values[field.name] && field.isRequired) {
            errors[field.name] = `Vui lòng nhập ${field.label.toLowerCase()}.`;
          } else if (
            (field.type = "email" && !/\S+@\S+\.\S+/.test(values[field.name]))
          ) {
            errors[field.name] = "Địa chỉ email không hợp lệ.";
          } else if (field.minLength && values[field.name] < field.minLength) {
            errors[
              field.name
            ] = `${field.label} phải có ít nhất ${field.minLength} ký tự.`;
          }
        });
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="w-full">
          {fields.map((field, key) => (
            <View key={key} className="my-4">
              {fieldRender(field, key, { handleChange, values, errors })}
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
