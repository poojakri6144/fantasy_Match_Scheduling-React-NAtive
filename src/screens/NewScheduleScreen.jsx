import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button as PaperButton } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addMatch } from '../redux/matchActions';
import Toast from 'react-native-simple-toast';
import { useRoute } from '@react-navigation/native';


const NewScheduleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);
  const [dates, setDates] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startVisible, setStartVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeEditingIndex, setTimeEditingIndex] = useState();
  const [dateEditingIndex, setDateEditingIndex] = useState();
  const route = useRoute();
  const {parentIndex,index} = route.params;
console.log("!!!!!!!!!!!",parentIndex,">>>",index)
  const [endVisible, setEndVisible] = useState(false);
  const showTimePicker = isStart => {
    isStart ? setStartVisible(true) : setEndVisible(true);
  };

  function isTimeInRange(array, givenTime) {
    const time = new Date(givenTime);

    for (let obj of array) {
      if (obj.start !== '' && obj.end !== '') {
        const startTime = new Date(obj.start);
        const endTime = new Date(obj.end);

        if (time >= startTime && time <= endTime) {
          return true;
        }
      }
    }

    return false;
  }

  const handleTimeChange = (selectedTime, isStart, date) => {
    if (isTimeInRange(dates[dateEditingIndex].times, selectedTime)) {
      setStartVisible(false);
      setEndVisible(false);
      Toast.show('Please select different time slot.', Toast.LONG);
    } else {
      if (isStart) {
        setStartVisible(false);
        let dateData = [...dates];
        console.log('SSSS', dateData[dateEditingIndex].times, timeEditingIndex);
        dateData[dateEditingIndex].times[timeEditingIndex].start = selectedTime;
        setDates(dateData);
      } else {
        setEndVisible(false);
        let dateData = [...dates];
        dateData[dateEditingIndex].times[timeEditingIndex].end = selectedTime;
        setDates(dateData);
      }
    }
  };

  const fetchFormData = async () => {
    try {
      const storedFormData = await AsyncStorage.getItem('formData');
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
       

        console.log('#####', storedFormData);
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    if(formData){
      const startDate = new Date(formData?.selectedStartDate);
      const endDate = formData?.selectedEndDate && new Date(formData?.selectedEndDate);
      let currentDate = startDate;
      if (!endDate && currentDate) {
        console.log("TTTRRRUUUEEE",formData);
        let dateData = {
          date: currentDate.toISOString(),
          times: [{ start: '', end: '' }],
        };
        setDates([dateData]);
      }
      while (currentDate <= endDate) {
        let dateData = {
          date: currentDate.toISOString(),
          times: [{ start: '', end: '' }],
        };
        setDates(preVal => [...preVal, dateData]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

  }, [formData]);

  const handleSaveMatch = async () => {
    try {
      if (dates) {
        // Retrieve existing scheduled matches from AsyncStorage
        const scheduledMatches =
          (await AsyncStorage.getItem('scheduledMatches')) || '[]';
        let existingMatches = JSON.parse(scheduledMatches);
        // Create a new match object with match details, selected date, start time, and end time
        const newMatch = {
          matchName: formData.matchName,
          team1:formData.team1,
          team2:formData.team2,
          participants: formData.participants,
          maxPrize: formData.maxPrize,
          maxTeams: formData.maxTeams,
          entryFee: formData.entryFee,
          data: dates,
        };
        console.log("KKKK", typeof parentIndex,"||",index)
        if(parentIndex != 'undefined' && index != 'undefined'){
          console.log("@#@#@#@#@#@#@#@#@#@#>>>>>>>>>>>>>>>>>>")
          existingMatches[parentIndex] = newMatch
        }else{
          console.log("@#@#@#@#@#@#@#@#@#@#")
          existingMatches.push(newMatch)
        }
        // dispatch(addMatch(existingMatches));
        console.log("MMMMMM", newMatch)
        console.log("YYYYYYYY", existingMatches)
                      try {
                        await AsyncStorage.setItem(
                          'scheduledMatches',
                          JSON.stringify(existingMatches),
                        );
                      } catch (error) {
                        console.error('Error saving form data:', error);
                      }
        // Save the updated matches back to AsyncStorage

        // Optionally, reset the form data and navigate to HomeScreen
        // setFormData(null);
        console.log(scheduledMatches, 'yesss');
                       navigation.navigate('Scheduled Matches',{refreshData:true});
      }
    } catch (error) {
      Alert.alert('Error saving scheduled match:', error);
    }
  };

  const renderDateButtons = () => {
    console.log("++++++++++++++++++++++++++++++++")

    if (!formData || !formData.selectedStartDate) {
      return;
    } else {
      return (
        <>
        {console.log("UUUUUU",dates)}
          {dates.length > 0 &&
            dates.map((date, index) => (
              <View key={index} style={styles.dateRow}>
                <View style={{ flexDirection: 'column' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#000',
                      paddingBottom: 10,
                      paddingTop: -10,
                    }}
                    onPress={() => navigateToTimeRange(date)}>
                    {new Date(date?.date).toDateString()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                  }}>
                  {date?.times?.length &&
                    date?.times.map((val, idx) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 15,
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '600',
                              marginTop: 5,
                              marginLeft: -5,
                            }}>
                            Start Time:{' '}
                          </Text>
                          <TouchableOpacity
                            style={{
                              height: 30,
                              width: '25%',
                              padding: 5,
                              borderWidth: 1,
                              borderColor: '#5358db',
                              borderRadius: 5,
                              backgroundColor: '#5358db',
                            }}
                            onPress={() => {
                              setTimeEditingIndex(idx);
                              setDateEditingIndex(index);
                              showTimePicker(true);
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: '700',
                                // padding: 3,
                                alignSelf: 'center',
                              }}>
                              {' '}
                              {val?.start !== ''
                                ? val?.start?.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                                : 'select'}
                            </Text>
                          </TouchableOpacity>

                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '600',
                              marginTop: 5,
                              marginLeft: 15,
                            }}>
                            End Time:{' '}
                          </Text>
                          <TouchableOpacity
                            style={{
                              height: 30,
                              width: '25%',
                              borderWidth: 1,
                              borderColor: '#5358db',
                              backgroundColor: '#5358db',
                              borderRadius: 5,
                            }}
                            onPress={() => {
                              setTimeEditingIndex(idx);
                              setDateEditingIndex(index);
                              showTimePicker(false);
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: '800',
                                padding: 5,
                                textAlign: 'center',
                              }}>
                              {val?.end
                                ? val?.end.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                                : 'select'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    backgroundColor: '#ccc',
                    width: '50%',
                    padding: 5,
                    borderRadius: 20,
                    alignSelf: 'flex-end',
                  }}
                  onPress={() => {
                    let dateData = [...dates];
                    dateData[index].times.push({ start: '', end: '' });
                    setDates(dateData);
                    console.log('>>>>>');
                    // dates[index].times.push({start: '', end: ''});
                    console.log('$$$$$$', dates[index].times);
                  }}>
                  <Text style={{ color: '#000', marginLeft: 5 }}>
                    + Add New Time Slot
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          <DateTimePickerModal
            isVisible={startVisible}
            mode="time"
            onConfirm={time => handleTimeChange(time, true)}
            onCancel={() => setStartVisible(false)}
            textColor="#000"
          />

          <DateTimePickerModal
            isVisible={endVisible}
            mode="time"
            onConfirm={time => handleTimeChange(time, false)}
            onCancel={() => setEndVisible(false)}
            textColor="#000"
          />
        </>
      );
    }
  };

  const displayMatchDetails = () => {
    return (
      <>
        {formData ? (
          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Match Details</Text>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>{`Match Name: ${formData.matchName}`}</Text>
               <Text
              style={{
                color: '#000',
              }}>{`Participants: ${formData.team1}`}</Text>
               <Text
              style={{
                color: '#000',
              }}>{`Team 1: ${formData.team2}`}</Text>
            <Text
              style={{
                color: '#000',
              }}>{`Team 2: ${formData.participants}`}</Text>
            <Text
              style={{
                color: '#000',
              }}>{`Maximum Prize Pool: ${formData.maxPrize}`}</Text>
            <Text
              style={{
                color: '#000',
              }}>{`Maximum Teams Allowed: ${formData.maxTeams}`}</Text>
            <Text
              style={{
                color: '#000',
              }}>{`Participants: ${formData.entryFee}`}</Text>
          </View>
        ) : (
          <Text>No data available.</Text>
        )}
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {displayMatchDetails()}
          <Text style={styles.heading}>
            Select Match Time Slot for following Dates
          </Text>

          <View style={styles.datesContainer}>{renderDateButtons()}</View>
          <PaperButton
            mode="contained"
            onPress={handleSaveMatch}
            style={styles.submitButton}>
            Schedule Match
          </PaperButton>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 5,
  },
  dateRow: {
    flexDirection: 'column',
    // alignItems: 'center',
    padding: 20,
    borderWidth: 1,

    borderRadius: 5,
    marginTop: 15,
    width: '98%',
    borderColor: '#ccc',
  },
  textInput: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 5,
  },
  submitButton: {
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
  },
  timeButton: {
    height: 27,
    width: '25%',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
  },
});

export default NewScheduleScreen;
