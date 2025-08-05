import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferred Date</Text>
      <View style={styles.header}>
        <Icon name="calendar" size={20} color="#E29578" />
        <Text style={styles.yearText}>2025</Text>
      </View>
      <Calendar
        current={"2025-02-01"}
        minDate={"2025-01-01"}
        maxDate={"2025-12-31"}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#E29578" },
        }}
        theme={{
          selectedDayBackgroundColor: "#E29578",
          todayTextColor: "#E29578",
          arrowColor: "#E29578",
          monthTextColor: "#E29578",
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E29578",
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  yearText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#000",
  },
});

export default CustomCalendar;
