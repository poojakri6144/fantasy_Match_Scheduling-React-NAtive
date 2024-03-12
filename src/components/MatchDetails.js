import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MatchDetail = () => {
  return (
    <View style={styles.matchItem}>
      <Card
        containerStyle={{
          width: 350,
          alignSelf: 'center',
          margin: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              // marginBottom: 10,
              color: '#333',
            }}>
            Match Name
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              margin: 15,
            }}>
            <View>
              <Text>IND</Text>
            </View>
            <View>
              <View style={styles.detailRow}>
                <Ionicons name="time" color="#000" size={18} />
                <Text style={styles.detailText}>9:00 PM - 3:00 PM</Text>
              </View>
            </View>
            <View>
              <Text>PAK</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome name="calendar" color="#000" size={18} />
            <Text style={styles.detailText}>12-09-2024</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome name="users" color="#000" size={18} />
            <Text style={styles.detailText}>Participants</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome name="rupee" color={'#000'} size={18} />
            <Text style={styles.detailText}>Prize Pool</Text>
          </View>
          <View style={styles.detailRow}>
            <AntDesign name="team" color="#000" size={18} />

            <Text style={styles.detailText}>Teams Allowed</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome name="money" color="#000" size={18} />
            <Text style={styles.detailText}> Entry Fee</Text>
          </View>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton} onPress={''}>
            <AntDesign name="edit" color={'#000'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            // onPress={() => handleDeleteMatch(item.id)}
          >
            <Ionicons name="trash" color="#e74c3c" size={20} />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};
export default MatchDetail;
const styles = StyleSheet.create({});
