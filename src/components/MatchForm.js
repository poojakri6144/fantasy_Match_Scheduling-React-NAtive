import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addMatch} from '../redux/matchActions';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import RangePicker from './RangePicker';

const MatchForm = ({onSubmit}) => {
  const navigation = useNavigation();
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [matchFee, setMatchFee] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('idle');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openStartIndex, setOpenStartIndex] = useState();
  const [openEndTime, setOpenEndTime] = useState(false);
  const [openEndIndex, setOpenEndIndex] = useState();
  const [timeSlotLength, setTimeSlotLength] = useState(['']);
  const [timeSlots, setTimeSlot] = useState([]);
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const matchDetails = {
      team1,
      team2,
      matchDate,
      startTime,
      endTime,
      matchFee,
      prizePool,
      venue,
      description,
    };

    try {
      await AsyncStorage.setItem('matchFormData', JSON.stringify(matchDetails));
      console.log('Form data saved successfully.');
      navigation.navigate('MatchDetail');
    } catch (error) {
      console.error('Error saving form data:', error);
    }

    // Create match using Redux
    dispatch(addMatch(matchDetails));
  };

  return (
    <ScrollView style={{marginTop: -20}}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>
            Schedule a Match by Filling this Form
          </Text>
        </View>
        <Text style={styles.label}>Team 1:</Text>
        <TextInput
          style={styles.input}
          value={team1}
          onChangeText={setTeam1}
          placeholder="Enter Team 1"
        />
        <Text style={styles.label}>Team 2:</Text>
        <TextInput
          style={styles.input}
          value={team2}
          onChangeText={setTeam2}
          placeholder="Enter Team 2"
        />
        <Text style={styles.label}>Match Date:</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={styles.input}>
            {date.getDate()} / {date.getMonth()} / {date.getFullYear()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View>
          {timeSlotLength.map((val, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.label}>Start Time:</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenStartTime(true);
                      setOpenStartIndex(index);
                    }}>
                    <Text style={styles.input}>
                      {timeSlots?.[index]?.start?.getHours()} :{' '}
                      {timeSlots?.[index]?.start?.getMinutes()}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.label}>End Time:</Text>

                  <TouchableOpacity
                    onPress={() => {
                      setOpenEndTime(true);
                      setOpenEndIndex(index);
                    }}>
                    <Text style={styles.input}>
                      {timeSlots?.[index]?.end?.getHours()} :{' '}
                      {timeSlots?.[index]?.end?.getMinutes()}
                    </Text>
                  </TouchableOpacity>
                  {console.log('TTTTT', timeSlots[index])}
                </View>
              </View>
            </View>
          ))}
        </View>
        <View>
          <DatePicker
            modal
            mode="time"
            open={openStartTime}
            date={
              timeSlots[openStartIndex] && timeSlots[openStartIndex].start
                ? timeSlots[openStartIndex].start
                : date
            }
            onConfirm={date => {
              setOpenStartTime(false);
              let updatedSlots = [...timeSlots];
              if (updatedSlots[openStartIndex]) {
                updatedSlots[openStartIndex] = {
                  ...updatedSlots[openStartIndex],
                  start: date,
                }; // Update the end time
              } else {
                updatedSlots[openStartIndex] = {start: date}; // If the slot doesn't exist, create a new one
              }
              setTimeSlot(updatedSlots);
            }}
            onCancel={() => {
              setOpenStartTime(false);
            }}
          />
          <DatePicker
            modal
            mode="time"
            open={openEndTime}
            date={
              timeSlots[openEndIndex] && timeSlots[openEndIndex].end
                ? timeSlots[openEndIndex].end
                : date
            }
            onConfirm={date => {
              setOpenEndTime(false);
              let updatedSlots = [...timeSlots];
              if (updatedSlots[openEndIndex]) {
                updatedSlots[openEndIndex] = {
                  ...updatedSlots[openEndIndex],
                  end: date,
                }; // Update the end time
              } else {
                updatedSlots[openEndIndex] = {end: date}; // If the slot doesn't exist, create a new one
              }
              setTimeSlot(updatedSlots);
            }}
            onCancel={() => {
              setOpenEndTime(false);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => setTimeSlotLength(timeSlotLength.concat(['']))}
          style={styles.button}>
          <Text style={styles.buttonText}> + Add new time slot</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Match Fee:</Text>
        <TextInput
          style={styles.input}
          value={matchFee}
          onChangeText={setMatchFee}
          placeholder="Enter Match Fee"
        />
        <Text style={styles.label}>Prize Pool:</Text>
        <TextInput
          style={styles.input}
          value={prizePool}
          onChangeText={setPrizePool}
          placeholder="Enter Prize Pool"
        />
        <Text style={styles.label}>Venue:</Text>
        <TextInput
          style={styles.input}
          value={venue}
          onChangeText={setVenue}
          placeholder="Enter Venue"
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
          multiline={true}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    color: '#000',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    color: '#000',
    height: 40,
    opacity: 0.7,
  },
  header: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 40,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    width: 150,
    height: 40,
    borderRadius: 19,
    backgroundColor: '#000',
    marginBottom: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    padding: 8,
  },
});

export default MatchForm;
