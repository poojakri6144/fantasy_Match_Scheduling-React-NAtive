import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
const RangePicker = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDayPress = day => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(day.dateString);
    }
  };

  const markedDates = {};
  if (selectedStartDate) {
    markedDates[selectedStartDate] = {startingDay: true, color: 'blue'};
  }
  if (selectedEndDate) {
    markedDates[selectedEndDate] = {endingDay: true, color: 'blue'};
  }

  const onClear = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [singleDate, setSingleDate] = useState(null);

  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
    } else if (type === 'end') {
      setEndDate(date);
    } else {
      setSingleDate(date);
    }
  };

  const handleSelectAll = () => {
    // Handle selecting all days
    // Example: setStartDate('start_date_of_range');
    //          setEndDate('end_date_of_range');
  };

  return (
    <View>
      <Text>Select Date Range:</Text>
      <View style={{flexDirection: 'row'}}>
        <DatePicker
          style={{width: 200}}
          date={startDate}
          mode="date"
          placeholder="Select Start Date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => handleDateChange(date, 'start')}
        />
        <DatePicker
          style={{width: 200}}
          date={endDate}
          mode="date"
          placeholder="Select End Date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => handleDateChange(date, 'end')}
        />
      </View>
      <Text>Select a Single Date:</Text>
      <DatePicker
        style={{width: 200}}
        date={singleDate}
        mode="date"
        placeholder="Select Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => handleDateChange(date, 'single')}
      />
      <Button title="Select All" onPress={handleSelectAll} />
    </View>
  );
};

export default RangePicker;
