import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';


const RemindOrDiaryModal = ({ isVisible, onClose, onSave }) => {
  const [data, setData] = useState('');

  const handleSave = () => {
    // Xử lý logic khi lưu dữ liệu
    onSave(data);
    // Đóng modal
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View>
        <Text>Nhập dữ liệu:</Text>
        <TextInput
          value={data}
          onChangeText={(text) => setData(text)}
          placeholder="Nhập dữ liệu"
        />
        <TouchableOpacity onPress={handleSave}>
          <Text>Lưu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default RemindOrDiaryModal;