import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveMatchToDB = async match => {
  try {
    const existingMatches = await AsyncStorage.getItem('matches');
    let matches = existingMatches ? JSON.parse(existingMatches) : [];
    matches.push(match);
    await AsyncStorage.setItem('matches', JSON.stringify(matches));
  } catch (error) {
    console.error('Error saving match:', error);
  }
};

export const loadMatchesFromDB = async () => {
  try {
    const matches = await AsyncStorage.getItem('matches');
    return matches ? JSON.parse(matches) : [];
  } catch (error) {
    console.error('Error loading matches:', error);
    return [];
  }
};

export const scheduledMatchesList = async () => {
  try {
    const matches = await AsyncStorage.getItem('scheduledMatches');
    return matches ? JSON.parse(matches) : [];
  } catch (error) {
    console.error('Error loading matches:', error);
    return [];
  }
};

export const deleteMatches = async (payload) => {
  const matches = await AsyncStorage.getItem('scheduledMatches');
  let match = JSON.parse(matches);
  // match = Object.keys(match).filter(val => match[val].id !== id);
  delete match[payload.parentIndex].data[payload.index];
  console.log('///////////////////////////////////', match);

  // await AsyncStorage.setItem('scheduledMatches', JSON.stringify(match));
};
