// // ScheduleDetailsScreen.js
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Button,
//   ScrollView,
//   Alert,
//   SafeAreaView,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {Button as PaperButton} from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {v4 as uuidv4} from 'uuid';
// import DatePicker from 'react-native-date-picker';
// import {FlatList} from 'react-native-gesture-handler';

// const ScheduleScreen = ({navigation}) => {
//   const [formData, setFormData] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [timeRange, setTimeRange] = useState('');
//   const [isTimeRangeModalVisible, setTimeRangeModalVisible] = useState(false);
//   const [startVisible, setStartVisible] = useState(false);
//   const [endVisible, setEndVisible] = useState(false);
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date());
//   const [openStartTime, setOpenStartTime] = useState(false);
//   const [openStartIndex, setOpenStartIndex] = useState();
//   const [openEndTime, setOpenEndTime] = useState(false);
//   const [openEndIndex, setOpenEndIndex] = useState();
//   const [timeSlotLength, setTimeSlotLength] = useState([]);
//   const [timeSlots, setTimeSlot] = useState([]);
//   const [dates, setDate] = useState([]);

//   const showTimePicker = isStart => {
//     isStart ? setStartVisible(true) : setEndVisible(true);
//   };

//   const handleTimeChange = (selectedTime, isStart, date) => {
//     console.log('selected time', selectedTime);
//     setSelectedDate(date);
//     isStart ? setStartTime(selectedTime) : setEndTime(selectedTime);
//     isStart ? setStartVisible(false) : setEndVisible(false);
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchFormData();
//     })();
//     console.log('from 53');
//   }, []);
//   useEffect(() => {
//     // if (!formData || !formData.selectedStartDate || !formData.selectedEndDate) {
//     //   return null;
//     // }
//     if (formData) {
//       const startDate = new Date(formData.selectedStartDate);
//       const endDate = new Date(formData.selectedEndDate);

//       let currentDate = startDate;

//       const newData = [...dates];
//       while (currentDate <= endDate) {
//         console.log(currentDate, '!!!!!');
//         newData.push(currentDate.toISOString());
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//       console.log(newData, 'Pooja');
//       setDate(newData);
//     }
//   }, [formData]);
//   useEffect(() => {
//     console.log(dates, 'from 75');
//     const obj = [...timeSlotLength];
//     dates.forEach(ele => {
//       let newObj = {time: [{start: '', end: ''}], date: [ele]};
//       obj.push(newObj);
//     });
//     console.log(obj, '@@@@@@@@@@@');
//     setTimeSlotLength(obj);
//   }, [dates]);

//   const fetchFormData = async () => {
//     try {
//       const storedFormData = await AsyncStorage.getItem('formData');
//       if (storedFormData) {
//         setFormData({
//           matchName: '111',
//           participants: '888',
//           maxPrize: '88',
//           maxTeams: '88',
//           entryFee: '88',
//           selectedStartDate: '2024-04-16',
//           selectedEndDate: '2024-04-17',
//         });
//         console.log('>>>>>', storedFormData);
//       }
//     } catch (error) {
//       console.error('Error fetching form data:', error);
//     }
//   };

//   const navigateToTimeRange = date => {
//     setSelectedDate(date);
//     setTimeRangeModalVisible(true);
//   };

//   const renderDateButtons = () => {
//     console.log('DDDD', dates);
//     return (
//       <FlatList
//         data={dates}
//         renderItem={(date, idx) => (
//           <View key={idx} style={styles.dateRow}>
//             <View style={{flexDirection: 'column'}}>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontWeight: '700',
//                   color: '#000',
//                   paddingBottom: 10,
//                   paddingTop: -10,
//                 }}
//                 onPress={() => navigateToTimeRange(date)}>
//                 {new Date(date.item).toDateString()}
//               </Text>
//             </View>
//             <View style={{flexDirection: 'row', width: '100%'}}>
//               {/* <Text style={{color:'blue',fontWeight:'600'}}>Match Timing</Text> */}
//               {console.log('######', timeSlotLength)}
//               <View>
//                 <FlatList
//                   data={timeSlotLength}
//                   renderItem={val => {
//                     console.log(val.item.time[0].start, 'RRRRRR');
//                     // {timeSlotLength.map((val, index) => (
//                     const {index, item} = val;
//                     const {time} = item;
//                     const {start} = time[0];
//                     return (
//                       <View key={index}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             padding: 10,
//                           }}>
//                           <View>
//                             <Text style={styles.label}>Start Time:</Text>
//                             <TouchableOpacity
//                               onPress={() => {
//                                 console.log('YYYY');
//                                 setOpenStartTime(true);
//                                 setOpenStartIndex(index);
//                               }}>
//                               {console.log('++++---------', start)}

//                               <Text style={styles.input}>
//                                 {start ? new Date(start).getHours() : null}:
//                                 {start ? new Date(start).getMinutes() : null}
//                               </Text>
//                             </TouchableOpacity>
//                           </View>
//                           <View>
//                             <Text style={styles.label}>End Time:</Text>

//                             <TouchableOpacity
//                               onPress={() => {
//                                 setOpenEndTime(true);
//                                 setOpenEndIndex(idx + index);
//                               }}>
//                               <Text style={styles.input}>
//                                 {timeSlots?.[idx + index]?.end?.getHours()} :{' '}
//                                 {timeSlots?.[idx + index]?.end?.getMinutes()}
//                               </Text>
//                             </TouchableOpacity>
//                             {console.log('TTTTT', timeSlots)}
//                           </View>
//                         </View>
//                       </View>
//                     );
//                     // ))}
//                   }}
//                   keyExtractor={(val, index) => String(val + index)}
//                 />
//               </View>
//               <TouchableOpacity
//                 onPress={() => setTimeSlotLength(timeSlotLength.concat(['']))}
//                 style={styles.button}>
//                 <Text style={styles.buttonText}> + Add new time slot</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         keyExtractor={(date, idx) => String(date + idx)}
//       />
//     );

//     // return dates.map((date, idx) => (
//     //   <View key={idx} style={styles.dateRow}>
//     //     <View style={{flexDirection: 'column'}}>
//     //       <Text
//     //         style={{
//     //           fontSize: 15,
//     //           fontWeight: '700',
//     //           color: '#000',
//     //           paddingBottom: 10,
//     //           paddingTop: -10,
//     //         }}
//     //         onPress={() => navigateToTimeRange(date)}>
//     //         {new Date(date).toDateString()}
//     //       </Text>
//     //     </View>
//     //     <View style={{flexDirection: 'row', width: '100%'}}>
//     //       {/* <Text style={{color:'blue',fontWeight:'600'}}>Match Timing</Text> */}

//     //       <View>
//     //         <FlatList
//     //           data={timeSlotLength}
//     //           renderItem={({val, index}) => {
//     //             // {timeSlotLength.map((val, index) => (
//     //             return (
//     //               <View key={idx + index}>
//     //                 <View
//     //                   style={{
//     //                     flexDirection: 'row',
//     //                     justifyContent: 'space-between',
//     //                     padding: 10,
//     //                   }}>
//     //                   <View>
//     //                     <Text style={styles.label}>Start Time:</Text>
//     //                     <TouchableOpacity
//     //                       onPress={() => {
//     //                         console.log('YYYY');
//     //                         setOpenStartTime(true);
//     //                         setOpenStartIndex(idx + index);
//     //                       }}>
//     //                       {console.log('++++---------', [idx], index)}
//     //                       <Text style={styles.input}>
//     //                         {timeSlots?.[idx + index]?.start?.getHours()} :{' '}
//     //                         {timeSlots?.[idx + index]?.start?.getMinutes()}
//     //                       </Text>
//     //                     </TouchableOpacity>
//     //                   </View>
//     //                   <View>
//     //                     <Text style={styles.label}>End Time:</Text>

//     //                     <TouchableOpacity
//     //                       onPress={() => {
//     //                         setOpenEndTime(true);
//     //                         setOpenEndIndex(idx + index);
//     //                       }}>
//     //                       <Text style={styles.input}>
//     //                         {timeSlots?.[idx + index]?.end?.getHours()} :{' '}
//     //                         {timeSlots?.[idx + index]?.end?.getMinutes()}
//     //                       </Text>
//     //                     </TouchableOpacity>
//     //                     {console.log('TTTTT', timeSlots)}
//     //                   </View>
//     //                 </View>
//     //               </View>
//     //             );
//     //             // ))}
//     //           }}
//     //           keyExtractor={(val, index) => String(val+index)}
//     //         />
//     //       </View>
//     //       <TouchableOpacity
//     //         onPress={() => setTimeSlotLength(timeSlotLength.concat(['']))}
//     //         style={styles.button}>
//     //         <Text style={styles.buttonText}> + Add new time slot</Text>
//     //       </TouchableOpacity>
//     //     </View>
//     //   </View>
//     // ));
//   };

//   const handleSaveMatch = async () => {
//     try {
//       if (selectedDate) {
//         // Retrieve existing scheduled matches from AsyncStorage
//         const scheduledMatches =
//           (await AsyncStorage.getItem('scheduledMatches')) || '{}';
//         const existingMatches = JSON.parse(scheduledMatches);

//         // Create a new match object with match details, selected date, start time, and end time
//         const newMatch = {
//           id: Math.random(),
//           matchName: formData.matchName,
//           participants: formData.participants,
//           maxPrize: formData.maxPrize,
//           maxTeams: formData.maxTeams,
//           entryFee: formData.entryFee,
//           selectedDate: selectedDate,
//           startTime: startTime.toLocaleTimeString(),
//           endTime: endTime.toLocaleTimeString(),
//         };

//         // Add the new match to the existing matches
//         if (existingMatches[selectedDate]) {
//           existingMatches[selectedDate].push(newMatch);
//         } else {
//           existingMatches[selectedDate] = [newMatch];
//         }

//         // Save the updated matches back to AsyncStorage
//         await AsyncStorage.setItem(
//           'scheduledMatches',
//           JSON.stringify(existingMatches),
//         );

//         // Optionally, reset the form data and navigate to HomeScreen
//         // setFormData(null);
//         console.log(scheduledMatches, 'yesss');
//         navigation.navigate('Home');
//       }
//     } catch (error) {
//       Alert.alert('Error saving scheduled match:', error);
//     }
//   };
//   console.log('selcted', selectedDate, formData);

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity>
//         <Ionicons name="arrow-back" color={'#000'} size={20} />
//       </TouchableOpacity>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {formData ? (
//           <View style={styles.detailsContainer}>
//             <Text style={styles.heading}>Match Details</Text>
//             <Text>{`Match Name: ${formData.matchName}`}</Text>
//             <Text>{`Participants: ${formData.participants}`}</Text>
//             <Text>{`Maximum Prize Pool: ${formData.maxPrize}`}</Text>
//             <Text>{`Maximum Teams Allowed: ${formData.maxTeams}`}</Text>
//             <Text>{`Participants: ${formData.entryFee}`}</Text>
//           </View>
//         ) : (
//           <Text>No data available.</Text>
//         )}
//         <Text style={styles.heading}>
//           Select Match Timing for following Dates
//         </Text>

//         <View style={styles.datesContainer}>{renderDateButtons()}</View>
//         <DatePicker
//           modal
//           mode="time"
//           open={openStartTime}
//           date={
//             timeSlots[openStartIndex] && timeSlots[openStartIndex].start
//               ? timeSlots[openStartIndex].start
//               : startTime
//           }
//           onConfirm={date => {
//             setOpenStartTime(false);
//             let updatedSlots = [...timeSlotLength];
//             if (updatedSlots[openStartIndex]) {
//               // updatedSlots[openStartIndex] = {
//               //   ...updatedSlots[openStartIndex],

//               // }; // Update the end time
//               updatedSlots[openStartIndex].time[0].start = `${date}`;
//             } else {
//               updatedSlots[openStartIndex].time[0] = {start: `${date}`}; // If the slot doesn't exist, create a new one
//             }
//             console.log('22222222', updatedSlots[openStartIndex].time);

//             setTimeSlotLength(updatedSlots);
//           }}
//           onCancel={() => {
//             console.log('CCCCC>>>');
//             setOpenStartTime(false);
//           }}
//         />
//         <DatePicker
//           modal
//           mode="time"
//           open={openEndTime}
//           date={
//             timeSlots[openEndIndex] && timeSlots[openEndIndex].end
//               ? timeSlots[openEndIndex].end
//               : endTime
//           }
//           onConfirm={date => {
//             setOpenEndTime(false);
//             let updatedSlots = [...timeSlots];
//             if (updatedSlots[openEndIndex]) {
//               updatedSlots[openEndIndex] = {
//                 ...updatedSlots[openEndIndex],
//                 end: date,
//               }; // Update the end time
//             } else {
//               updatedSlots[openEndIndex] = {end: date}; // If the slot doesn't exist, create a new one
//             }
//             setTimeSlot(updatedSlots);
//           }}
//           onCancel={() => {
//             setOpenEndTime(false);
//           }}
//         />
//         <PaperButton
//           mode="contained"
//           onPress={handleSaveMatch}
//           style={styles.submitButton}>
//           Schedule Match
//         </PaperButton>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   detailsContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 8,
//     elevation: 2,
//     marginBottom: 20,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   datesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   dateButton: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   // Modal styles
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 8,
//     elevation: 5,
//   },
//   modalHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     width: '100%',
//     marginVertical: 10,
//     padding: 10,
//     borderColor: '#3498db',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   dateRow: {
//     flexDirection: 'column',
//     // alignItems: 'center',
//     padding: 20,
//     borderWidth: 1,

//     borderRadius: 5,
//     marginTop: 15,
//     width: '98%',
//     borderColor: '#ccc',
//   },
//   textInput: {
//     marginLeft: 10,
//     borderWidth: 1,
//     borderColor: '#aaa',
//     padding: 5,
//   },
//   submitButton: {
//     width: '80%',
//     marginTop: 20,
//     alignSelf: 'center',
//   },
//   timeButton: {
//     height: 27,
//     width: '25%',
//     backgroundColor: '#000',
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//     borderRadius: 20,
//     borderWidth: 1,
//     flexDirection: 'row',
//   },
// });

// export default ScheduleScreen;

// ScheduleDetailsScreen.js
import React, {useState, useEffect} from 'react';
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
import {Button as PaperButton} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import {useDispatch} from 'react-redux';
import {addMatch} from '../redux/matchActions';

const ScheduleScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRange, setTimeRange] = useState('');
  const [isTimeRangeModalVisible, setTimeRangeModalVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reRender, setRerender] = useState(0);
  const [dates, setDates] = useState([]);

  const showTimePicker = isStart => {
    isStart ? setStartVisible(true) : setEndVisible(true);
  };

  const handleTimeChange = (selectedTime, isStart, date) => {
    console.log('selected time', selectedTime);
    setSelectedDate(date);
    isStart ? setStartTime(selectedTime) : setEndTime(selectedTime);
    isStart ? setStartVisible(false) : setEndVisible(false);
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const storedFormData = await AsyncStorage.getItem('formData');
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
        console.log('#####');
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const navigateToTimeRange = date => {
    setSelectedDate(date);
    setTimeRangeModalVisible(true);
  };

  const renderDateButtons = () => {
    if (!formData || !formData.selectedStartDate || !formData.selectedEndDate) {
      return null;
    }

    const startDate = new Date(formData?.selectedStartDate);
    const endDate = new Date(formData?.selectedEndDate);

    let currentDate = startDate;

    while (currentDate <= endDate) {
      let dateData = {
        date: currentDate.toISOString(),
        times: [{start: '', end: ''}],
      };
      dates.push(dateData);
      // setDates(preVal => [...preVal, dateData]);
      // console.log('1111111', currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      // console.log('2222222', currentDate);
    }

    return (
      dates.length &&
      dates.map((date, index) => (
        <View key={index} style={styles.dateRow}>
          {console.log('ZZZZZZ', index, date)}
          <View style={{flexDirection: 'column'}}>
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
          <View style={{flexDirection: 'row', width: '100%'}}>
            {/* <Text style={{color:'blue',fontWeight:'600'}}>Match Timing</Text> */}

            {date?.times?.length &&
              date?.times.map((val, idx) => {
                return (
                  <>
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
                        width: '24%',
                        borderWidth: 1,
                        borderColor: 'blue',
                        borderRadius: 5,
                        backgroundColor: 'blue',
                      }}
                      onPress={() => showTimePicker(true, `${index}${idx}`)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontWeight: '700',
                          padding: 5,
                          alignSelf: 'center',
                        }}>
                        {' '}
                        {startTime.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
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
                        width: '24%',
                        borderWidth: 1,
                        borderColor: '#5358db',
                        backgroundColor: '#5358db',
                        borderRadius: 5,
                      }}
                      onPress={() => showTimePicker(false)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontWeight: '800',
                          padding: 5,
                          textAlign: 'center',
                        }}>
                        {endTime.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            <TouchableOpacity
              style={{marginTop: 30}}
              onPress={() => {
                // let dateData = [...dates];
                // dateData[index].times.push({start: '', end: ''});
                console.log('>>>>>');
                dates[index].times.push({start: '', end: ''});
                console.log('$$$$$$', dates[index].times);
              }}>
              <Text>+ Add New Time Slot</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={startVisible}
              mode="time"
              onConfirm={time => handleTimeChange(time, true, date)}
              onCancel={() => setStartVisible(false)}
              textColor="#000"
            />

            <DateTimePickerModal
              isVisible={endVisible}
              mode="time"
              onConfirm={time => handleTimeChange(time, false, date)}
              onCancel={() => setEndVisible(false)}
              textColor="#000"
            />
          </View>
        </View>
      ))
    );
  };

  const handleSaveMatch = async () => {
    try {
      if (selectedDate) {
        // Retrieve existing scheduled matches from AsyncStorage
        const scheduledMatches =
          (await AsyncStorage.getItem('scheduledMatches')) || '{}';
        const existingMatches = JSON.parse(scheduledMatches);

        // Create a new match object with match details, selected date, start time, and end time
        const newMatch = {
          id: uuidv4(),
          matchName: formData.matchName,
          participants: formData.participants,
          maxPrize: formData.maxPrize,
          maxTeams: formData.maxTeams,
          entryFee: formData.entryFee,
          selectedDate: selectedDate,
          startTime: startTime.toLocaleTimeString(),
          endTime: endTime.toLocaleTimeString(),
        };

        // Add the new match to the existing matches
        if (existingMatches[selectedDate]) {
          existingMatches[selectedDate].push(newMatch);
        } else {
          existingMatches[selectedDate] = [newMatch];
        }
        dispatch(addMatch(existingMatches));

        // Save the updated matches back to AsyncStorage

        // Optionally, reset the form data and navigate to HomeScreen
        // setFormData(null);
        console.log(scheduledMatches, 'yesss');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error saving scheduled match:', error);
    }
  };
  console.log('selcted', selectedDate, formData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {formData ? (
          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Match Details</Text>
            <Text
              style={{
                color: '#000',
              }}>{`Match Name: ${formData.matchName}`}</Text>
            <Text
              style={{
                color: '#000',
              }}>{`Participants: ${formData.participants}`}</Text>
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
        <Text style={styles.heading}>
          Select Match Timing for following Dates
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default ScheduleScreen;
