// FormDataScreen.js

import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateMatch, deleteMatch} from '../redux/matchActions';

const MatchDetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.formData);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const savedFormData = await AsyncStorage.getItem('matchFormData');
        console.log('object', savedFormData);
        if (savedFormData !== null) {
          dispatch(updateMatch(JSON.parse(savedFormData)));
        }
      } catch (error) {
        console.error('Error retrieving form data:', error);
      }
    };

    fetchFormData();
  }, []);

  const handleEdit = () => {
    navigation.navigate('EditForm');
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem('matchFormData');
      dispatch(deleteMatch());
      console.log('Form data deleted successfully.');
    } catch (error) {
      console.error('Error deleting form data:', error);
    }
  };

  console.log('object', formData);
  return (
    <ScrollView>
      <View style={styles.scrollView}>
        <Text>Match Name</Text>
        <View style={styles.container}>
          <View>
            <Text>Team 1</Text>
          </View>
          <View>
            <Text>Time</Text>
            <Text>Time</Text>
          </View>
          <View>
            <Text>Team 2</Text>
          </View>
        </View>
        <View>
          <Text>Match Fee</Text>
          <Text>Prize Pool</Text>
          <Text>Participants</Text>
        </View>

        {/*   <Text style={styles.header}>Form Data</Text>
      {formData && (
        <View style={styles.formDataContainer}>
          <Text style={styles.label}>Team 1: {formData.team1}</Text>
          {/* Display other form data fields
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>  */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: 'auto',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    margin: 30,
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: 'auto',
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // padding: 20,
    // margin: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formDataContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MatchDetailScreen;
