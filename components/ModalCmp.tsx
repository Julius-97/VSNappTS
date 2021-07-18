import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

type Props = {
  visible: boolean;
  title: string;
  text: string;
  OKtext: string;
  DELtext: string;
  onOK: () => void;
  onDel: () => void;
};

const ModalCmp = (props: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onDel}
    >
      <View style={styles.window}>
        <View style={styles.modalView}>
          <View
            style={{
              padding: 4,
              borderColor: 'black',
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}
            >
              {props.title}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 8,
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 15 }}>
              {props.text}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTopWidth: 1,
              borderColor: 'black',
              paddingVertical: 8,
            }}
          >
            <Pressable
              onPress={props.onOK}
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: 'green',
                marginHorizontal: 10,
                marginVertical: 2,
                borderRadius: 3,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  backgroundColor: '#ccffcc',
                  padding: 3,
                }}
              >
                {props.OKtext}
              </Text>
            </Pressable>
            <Pressable
              onPress={props.onDel}
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: 'red',
                marginHorizontal: 10,
                marginVertical: 2,
                borderRadius: 3,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  backgroundColor: '#ffcccc',
                  padding: 3,
                }}
              >
                {props.DELtext}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  window: {
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalCmp;
