import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Define props properly outside the component
type DateTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{ padding: 12, backgroundColor: '#e0f2f1', borderRadius: 8 }}
      >
        <Text style={{ fontSize: 16, color: '#00796b', fontWeight: '500' }}>
          📅 {value.toLocaleDateString()} ⏰ {value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        date={value}
        onConfirm={(selectedDate: Date) => {
          setShowPicker(false);
          onChange(selectedDate);
        }}
        onCancel={() => setShowPicker(false)}
        {...({
          headerTextIOS: "Pick a date & time",
          confirmTextIOS: "Confirm",
          cancelTextIOS: "Cancel",
          isDarkModeEnabled: false,
        } as any)}
      />
    </View>
  );
}