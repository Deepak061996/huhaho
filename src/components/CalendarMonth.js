import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CalendarMonth = ({ getDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1, // ✅ Make month 1-based
    year: new Date().getFullYear(),
  });

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate(); // month is still 0-based internally
  };

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  useEffect(() => {
    getDateSelect(selectedDate);
  }, []);

  const handleDatePress = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // ✅ 1-based month

    const newSelectedDate = {
      day,
      month,
      year,
    };

    setSelectedDate(newSelectedDate);
    getDateSelect(newSelectedDate);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // this is 0-based, fine for internal usage
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const renderDays = () => {
    let days = [];

    const today = new Date();  //add by shrawan
    today.setHours(0, 0, 0, 0); // Clear tim

    // Add empty slots for the first week
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay}></View>);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
//Add by Shrawan

const dateObj = new Date(year, month, i);
    dateObj.setHours(0, 0, 0, 0); // Normalize date

    const isPast = dateObj < today;

      const isSelected =
        selectedDate.day === i &&
        selectedDate.month === month + 1 && // ✅ compare with 1-based month
        selectedDate.year === year;

      days.push(
        <TouchableOpacity
          key={i}
          disabled={isPast} // ✅ Disable press on past dates
          onPress={() => handleDatePress(i)}
          style={styles.dayContainer}
        >
          <Text style={[styles.day, isSelected ? styles.selectedDay : null]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Icon name="calendar" size={20} color="#E59780" />
        <Text style={styles.year}>{year}</Text>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Icon name="chevron-left" size={18} color="#E59780" />
        </TouchableOpacity>
        <Text style={styles.month}>
          {currentDate.toLocaleString("default", { month: "short" })}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Icon name="chevron-right" size={18} color="#E59780" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdays}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: -30,
    marginTop: -15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E59780",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  year: {
    fontSize: 16,
    color: "#E59780",
  },
  month: {
    fontSize: 16,
    color: "#E59780",
    fontWeight: "bold",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  weekday: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
    flex: 1,
    textAlign: "center",
    marginBottom: -5,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: -4,
  },
  emptyDay: {
    width: "14%",
    aspectRatio: 0.9,
  },
  dayContainer: {
    width: "14%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    marginVertical: -2,
  },
  day: {
    fontSize: 14,
    textAlign: "center",
    width: 28,
    height: 28,
    lineHeight: 32,
    textAlign: "center",
    borderRadius: 14,
  },
  selectedDay: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#E18A5E",
    marginTop: 10,
  },
});

export default CalendarMonth;
