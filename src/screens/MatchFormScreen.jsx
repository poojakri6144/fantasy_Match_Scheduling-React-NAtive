// MatchForm.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addMatch } from '../redux/matchActions';
// import { saveFormData } from "../redux/matchSlice";
import { useRoute } from '@react-navigation/native';

const MatchFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [matchName, setMatchName] = useState('');
  const [participants, setParticipants] = useState('');
  const [maxPrize, setMaxPrize] = useState('');
  const [maxTeams, setMaxTeams] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [matchNameError, setMatchNameError] = useState('');
  const [team1Error, setTeam1Error] = useState('');
  const [team2Error, setTeam2Error] = useState('');
  const [participantsError, setParticipantsError] = useState('');
  const [entryFeeError, setEntryFeeError] = useState('');
  const [maxPrizeError, setMaxPrizeError] = useState('');
  const [maxTeamsError, setMaxTeamsError] = useState('');
  const [sceduleData, setScheduleData] = useState('');
  const route = useRoute();
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const { parentIndex, index } = route?.params || {};
  console.log("ZZZZZ", sceduleData)

  const fetchFormData = async () => {
    try {
      const scheduledMatches = await AsyncStorage.getItem('scheduledMatches');

      if (scheduledMatches) {
        const scheduledMatchesData = JSON.parse(scheduledMatches);
        const selectedDate = scheduledMatchesData[parentIndex].data[index];
        const matchDetails = scheduledMatchesData[parentIndex];
        console.log("KKKKK", scheduledMatchesData[parentIndex])
        const editData = {
          date: selectedDate?.date,
          time: selectedDate?.times,
          entryFee: matchDetails?.entryFee,
          matchName: matchDetails?.matchName,
          team1:matchDetails?.team1,
          team2:matchDetails?.team2,
          maxPrize: matchDetails?.maxPrize,
          maxTeams: matchDetails?.maxTeams,
          participants: matchDetails?.participants
        }
        setMatchName(matchDetails?.matchName)
        setParticipants(matchDetails?.participants)
        setTeam1(matchDetails?.team1),
        setTeam2(matchDetails?.team2),
        setEntryFee(matchDetails?.entryFee);
        setMaxPrize(matchDetails?.maxPrize);
        setMaxTeams(matchDetails?.maxTeams);
        setSelectedStartDate(matchDetails?.date)

        setScheduleData(editData)
      }
    } catch (error) {
      console.error('Error retrieving form data:', error);
    }
  };

  useEffect(() => {
    if (parentIndex && index) {
      console.log("HERE")
      fetchFormData(parentIndex, index);
    }
  }, [route])
  const isNumeric = value => {
    return /^[0-9]+$/.test(value);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!matchName) {
      setMatchNameError('Match Name is required');
      isValid = false;
    } else {
      setMatchNameError('');
    }
    if (!team1) {
      setTeam1Error('Team 1 is required');
      isValid = false;
    } else {
      setTeam1Error('');
    }
    if (!team2) {
      setTeam2Error('Team 2 is required');
      isValid = false;
    } else {
      setTeam2Error('');
    }

    if (!participants || !isNumeric(participants)) {
      setParticipantsError('Participants must be a valid number');
      isValid = false;
    } else {
      setParticipantsError('');
    }

    if (!entryFee || !isNumeric(entryFee)) {
      setEntryFeeError('Entry Fee must be a valid number');
      isValid = false;
    } else {
      setEntryFeeError('');
    }

    if (!maxPrize || !isNumeric(maxPrize)) {
      setMaxPrizeError('Maximum Prize must be a valid number');
      isValid = false;
    } else {
      setMaxPrizeError('');
    }

    if (!maxTeams || !isNumeric(maxTeams)) {
      setMaxTeamsError('Maximum Teams allowed must be a valid number');
      isValid = false;
    } else {
      setMaxTeamsError('');
    }

    return isValid;
  };

  const showCalendar = () => {
    setCalendarVisibility(true);
  };

  const hideCalendar = () => {
    setCalendarVisibility(false);
  };

  const handleDateSelect = date => {
    console.log("GGGG", date)
    if (parentIndex && index) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      hideCalendar();
    }
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (!selectedEndDate && date >= selectedStartDate) {
      setSelectedEndDate(date);
      hideCalendar();
    } else {
      // Reset selection if invalid range
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };
  const areDatesValid = () => {
    return selectedStartDate && selectedEndDate;
  };
  const selectAllDays = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    setSelectedStartDate(firstDayOfMonth.toISOString().split('T')[0]);
    setSelectedEndDate(lastDayOfMonth.toISOString().split('T')[0]);
  };
  const saveFormData = async () => {
    try {
      const formData = {
        matchName,
        team1,
        team2,
        participants,
        maxPrize,
        maxTeams,
        entryFee,
        selectedStartDate,
        selectedEndDate,
      };
      await AsyncStorage.setItem('formData', JSON.stringify(formData));
      Alert.alert(
        'Form Data Saved!',
        'You can now proceed to select time slot.',
      );
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const handleSubmission = async () => {
    if (validateInputs()) {
      saveFormData({
        matchName,
        team1,
        team2,
        participants,
        maxPrize,
        maxTeams,
        entryFee,
        selectedStartDate,
        selectedEndDate,
      });

      await saveFormData();
      navigation.navigate('Schedule Match', { parentIndex: `${parentIndex}`, index: `${index}` });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Text style={styles.label}>Match Name</Text>
        <TextInput
          placeholder="Enter Match Name"
          value={matchName}
          onChangeText={text => setMatchName(text)}
          style={styles.input}
          error={!!matchNameError}
        />
        {matchNameError ? (
          <Text style={styles.errorText}>{matchNameError}</Text>
        ) : null}
        <Text style={styles.label}>Team 1</Text>
        <TextInput
          placeholder="Enter Team 1"
          value={team1}
          onChangeText={text => setTeam1(text)}
          style={styles.input}
          error={!!team1Error}
        />
        {team1Error ? (
          <Text style={styles.errorText}>{team1Error}</Text>
        ) : null}
        <Text style={styles.label}>Team 2</Text>
        <TextInput
          placeholder="Enter Team 2"
          value={team2}
          onChangeText={text => setTeam2(text)}
          style={styles.input}
          error={!!team2Error}
        />
        {team2Error ? (
          <Text style={styles.errorText}>{team2Error}</Text>
        ) : null}
        <Text style={styles.label}>Participants</Text>
        <TextInput
          placeholder="Enter Participants"
          value={participants}
          onChangeText={text => setParticipants(text)}
          keyboardType="numeric"
          style={styles.input}
          error={!!participantsError}
        />
        {participantsError ? (
          <Text style={styles.errorText}>{participantsError}</Text>
        ) : null}
        <Text style={styles.label}>Entry Fee</Text>
        <TextInput
          placeholder="Enter Entry Fee"
          value={entryFee}
          onChangeText={text => setEntryFee(text)}
          keyboardType="numeric"
          style={styles.input}
          error={!!entryFeeError}
        />
        {entryFeeError ? (
          <Text style={styles.errorText}>{entryFeeError}</Text>
        ) : null}
        <Text style={styles.label}>Maximum Prize</Text>
        <TextInput
          placeholder="Enter Maximum Prize"
          value={maxPrize}
          onChangeText={text => setMaxPrize(text)}
          keyboardType="numeric"
          style={styles.input}
          error={!!maxPrizeError}
        />
        {maxPrizeError ? (
          <Text style={styles.errorText}>{maxPrizeError}</Text>
        ) : null}
        <Text style={styles.label}>Maximum Prize</Text>
        <TextInput
          placeholder="Enter Maximum Teams allowed"
          value={maxTeams}
          onChangeText={text => setMaxTeams(text)}
          keyboardType="numeric"
          style={styles.input}
          error={!!maxTeamsError}
        />
        {maxTeamsError ? (
          <Text style={styles.errorText}>{maxTeamsError}</Text>
        ) : null}

        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ width: '50%', marginBottom: 20 }}>
            <TouchableOpacity onPress={showCalendar} style={styles.buttonDate}>
              <Ionicons name="calendar" color={'#050a40'} size={20} />
              <Text style={styles.buttonText}>
                {areDatesValid() ? 'Change Match Dates' : 'Select Match Dates'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%' }}>
            {
              parentIndex && index ? <></> : <TouchableOpacity
                onPress={selectAllDays}
                style={styles.buttonDateAllDays}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  color={'#050a40'}
                  size={20}
                />
                <Text style={styles.buttonText}>Select All Days</Text>
              </TouchableOpacity>
            }

          </View>
        </View>
        {isCalendarVisible && (
          <Calendar
            style={{ marginBottom: 5 }}
            onDayPress={day => handleDateSelect(day.dateString)}
            minDate={currentDateString}
            markedDates={{
              [selectedStartDate]: { startingDay: true, color: 'green' },
              [selectedEndDate]: { endingDay: true, color: 'green' },
            }}
          />
        )}
        <Text style={styles.label}>{parentIndex && index ? `Match Date` : `Match Start Date`}</Text>
        <TextInput
          value={selectedStartDate || 'Select Start Date'}
          // value={maxTeams}
          // onChangeText={text => setMaxTeams(text)}
          // keyboardType="numeric"
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}
        // error={!!maxTeamsError}
        />
        {
          parentIndex && index ? <></> : <>
            <Text style={styles.label}>Match End Date</Text>
            <TextInput
              value={selectedEndDate || 'Select End Date'}
              // value={maxTeams}
              // onChangeText={text => setMaxTeams(text)}
              // keyboardType="numeric"
              style={styles.input}
              editable={false}
              selectTextOnFocus={false}
            // error={!!maxTeamsError}
            /></>
        }

       
        <TouchableOpacity
          onPress={handleSubmission}
          style={styles.submitButton}>
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              marginLeft: 5,
              fontWeight: '600',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Create Match
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
    color: '#000',
    marginLeft: 5,
  },
  input: {
    width: '98%',
    height: '5%',
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FCFCFC',
    borderColor: '#e1e4e6',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: '90%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#050a40',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButton: {
    width: '60%',
    height: 48,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#050a40',
  },
  buttonText: {
    color: '#050a40',
    fontSize: 13,
    marginLeft: 5,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  // label: {
  //   fontSize: 16,
  //   marginLeft: 15,
  //   marginRight: 5,
  //   color: '#3a393b',
  // },
  selectedDateContainer: {
    flex: 1,
  },
  selectedDate: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  buttonDate: {
    padding: 15,
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginTop: 5,
    marginLeft: 5,
    flexDirection: 'row',
  },
  buttonDateAllDays: {
    padding: 15,
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginTop: 5,
    marginLeft: 18,
    flexDirection: 'row',
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default MatchFormScreen;
