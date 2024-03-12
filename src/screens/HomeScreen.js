import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card, Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {saveFormData} from '../redux/matchSlice';
import {deleteMatch} from '../redux/matchActions';
import { useRoute } from '@react-navigation/native';

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formData = useSelector(state => state.matches);
  const [scheduledMatches, setScheduledMatches] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState(null);

  const route = useRoute();
  const { refreshData } = route?.params || {};

  console.log('object', formData, scheduledMatches);

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.log('Failed to clear AsyncStorage: ', error);
    }
  }

  const navigateToCreateMatch = () => {
    navigation.navigate('Create Match');
  };

  useEffect(() => {
    loadScheduledMatches();
  }, []);

useEffect(()=>{
  if(refreshData){
    loadScheduledMatches();

  }
},[route])

  const loadScheduledMatches = async () => {
    try {
      const matches = await AsyncStorage.getItem('scheduledMatches');
      if (matches) {
        setScheduledMatches(JSON.parse(matches));
      }
    } catch (error) {
      console.error('Error loading scheduled matches:', error);
    }
  };

  const handelEditMatch = (parentIndex,index) => {
    navigation.navigate('Edit Match',{parentIndex:`${parentIndex}`,index:`${index}` });
  };

  const handleDeleteMatch = (parentIndex,index) => {
    console.log("1111111",parentIndex,index)
    Alert.alert(
      'Delete Match',
      'Are you sure you want to delete this match?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteMatch(parentIndex,index)),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const confirmDelete = async id => {
    await deleteMatchFromAsyncStorage(id);
    loadScheduledMatches();
  };
  const renderMatchItem = () => {
    return(<>
    <View>
      {
        scheduledMatches?.map((match,parentIndex)=>(
          <>
          {match?.data?.map((item,index)=>{
            if(item?.date){
              const date = new Date(item?.date)
              return(<>
              <View style={styles.matchItem} key={`${parentIndex}-${index}`}>
        <Card
          containerStyle={{
            width: 350,
            alignSelf: 'center',
            margin: 10,
            borderRadius: 10,
            elevation: 5,
          }}>
          <View key={index}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
                color: '#333',
              }}>
              {match?.matchName}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                margin: 15,
              }}>
              <View>
                <Text style={{color:'blue',fontWeight:'600'}}>{match?.team1}</Text>
              </View>
              <View>
                <View style={styles.detailRow}>
                  <Icon
                    name="clock"
                    type="font-awesome-5"
                    solid
                    color="#e67e22"
                    size={18}
                  />
                  {item?.times?.map((time)=>{
                    return(<ScrollView horizontal style={{ padding:5}} showsHorizontalScrollIndicator={true}>
                       <Text style={styles.detailText}>{new Date(time?.start).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} - {new Date(time?.end).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</Text>
                    </ScrollView>)
                  })}
                 
                </View>
              </View>
              <View>
                <Text style={{color:'blue',fontWeight:'600'}}>{match?.team2}</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.detailRow}>
              <Icon
                name="calendar-alt"
                type="font-awesome-5"
                solid
                color="#9b59b6"
                size={18}
              />
              <Text style={styles.detailText}>{`${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="users"
                type="font-awesome-5"
                solid
                color="#3498db"
                size={18}
              />
              <Text style={styles.detailText}>
                {match?.participants} Participants
              </Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="rupee" color={'green'} size={20} />
              <Text style={styles.detailText}>{match?.maxPrize} Prize Pool</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="users"
                type="font-awesome-5"
                solid
                color="#e74c3c"
                size={18}
              />
              <Text style={styles.detailText}>{match?.maxTeams} Teams Allowed</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="money" color="green" size={20} />
  
              <Text style={styles.detailText}>{match?.entryFee} Entry Fee</Text>
            </View>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handelEditMatch(parentIndex,index)}>
              <Icon
                name="edit"
                type="font-awesome-5"
                solid
                color="#3498db"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDeleteMatch(parentIndex,index)}>
              <Icon
                name="trash-alt"
                type="font-awesome-5"
                solid
                color="#e74c3c"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
              </>)
            }

          })}
          </>
        ))

      }
    </View>
    </>)};
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={navigateToCreateMatch}>
          <View
            style={{
              display: 'flex',
              alignSelf: 'flex-end',
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 5,
              width: 150,
              alignItems: 'center',
              marginTop: 30,
              marginBottom: 20,
            }}>
            <Ionicons name="add" size={30} color="#000" />
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#000'}}>
              Add new match
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          {renderMatchItem()}
          {/* <FlatList
            data={scheduledMatches}
            keyExtractor={item => item?.id?.toString()}
            renderItem={renderMatchItem}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#050a40',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  matchCard: {
    backgroundColor: '#fff',
    // padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchItem: {
    // borderWidth:1,
    // borderRadius:10,
    // borderColor:'grey',
    marginTop: 10,
    padding: 10,
    width: 360,
    alignSelf: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
    color: '#555',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 5,
  },
  matchContainer: {
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
    backgroundColor: '#fff',
  },
  scrollView: {
    height: 'auto',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 20,
    margin: 30,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
