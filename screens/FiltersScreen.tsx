import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Notifications from 'expo-notifications';
import * as SecStore from 'expo-secure-store';
import axios from 'axios';
import { API_LOCATION, API_PORT } from '@env';

import ModalCmp from '../components/ModalCmp';
import CustomHeaderButton from '../components/HeaderButton';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { FiltersScreenProps } from '../navigation/types';

type res = {
  tokenID: string;
  categories: [
    {
      name: string;
      _id: string;
    }
  ];
};

const FiltersScreen = (props: FiltersScreenProps) => {
  const [pushEnable, setPushEnable] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState(false);
  const { retrieveCategories } = useActions();
  const categories = useTypedSelector((state) => state.categories.categories);
  const [switchesValue, setSwitchesValue] = useState<boolean[]>([]);

  const askPermissionHandler = () => {
    Notifications.getPermissionsAsync()
      .then((status) => {
        if (!status.granted) {
          return Notifications.requestPermissionsAsync();
        } else return status;
      })
      .then((status) => {
        if (status.granted) {
          setPushEnable((prec) => !prec);
        }
      });
  };

  const setPushNotifications = async () => {
    let token = await SecStore.getItemAsync('token');
    if (!token) {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      SecStore.setItemAsync('token', token);
    }
    let selectedCategories = switchesValue
      .map((sw, i) => {
        if (sw) {
          return categories[i].id;
        } else return '';
      })
      .filter((catID) => catID !== '');
    if (pushEnable === false) {
      selectedCategories = [];
    }
    axios.post(
      `http://${API_LOCATION}:${API_PORT}/pushNotifications/${token}`,
      {
        categories: selectedCategories,
      }
    );
  };

  useEffect(() => {
    if (categories.length <= 0) retrieveCategories();
  }, []);

  const load = useCallback(async () => {
    const token = await SecStore.getItemAsync('token');
    if (token) {
      let res: any;
      try {
        res = await axios.get(
          `http://${API_LOCATION}:${API_PORT}/pushNotifications/${token}`
        );
        const data: res = res.data;
        const swConf = categories.map((cat) => false);
        data.categories.forEach((cat1) => {
          const idx = categories.findIndex((cat2) => cat1.name === cat2.name);
          if (idx > -1) {
            swConf[idx] = true;
          }
        });
        if (swConf.some((sw) => sw === true)) setPushEnable(true);
        setSwitchesValue(swConf);
      } catch (err) {
        console.log('token not found');
      }
    }
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0) load();
  }, [categories]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
              iconSize={30}
              onPress={() => setModalVisible(true)}
            />
          </HeaderButtons>
        );
      },
    });
  });

  return (
    <View>
      {modalVisible && (
        <ModalCmp
          title="Abilitazione notifiche push"
          text="Scegliendo di salvare queste impostazioni riceverai una notifica ogni volta che viene pubblicato un articolo appartenente alle categorie da te scelte"
          DELtext="NO"
          OKtext="SALVA"
          onDel={() => {
            setModalVisible(false);
          }}
          onOK={() => {
            setModalVisible(false);
            setPushNotifications();
          }}
          visible={modalVisible}
        />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text>Abilita notifiche push</Text>
        <Switch
          value={pushEnable}
          onValueChange={() => {
            askPermissionHandler();
          }}
        />
      </View>
      {pushEnable && (
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, textAlign: 'center' }}>
              ricordati di salvare le impostazioni toccando l'icona 'salva'
            </Text>
          </View>
          <View>
            <FlatList
              ListFooterComponent={() => <View style={{ height: 150 }}></View>}
              data={categories}
              renderItem={(itemData) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 3,
                  }}
                >
                  <Text>{itemData.item.name}</Text>
                  <Switch
                    value={switchesValue[itemData.index]}
                    onValueChange={() => {
                      setSwitchesValue((prev) => {
                        prev[itemData.index] = !prev[itemData.index];
                        return prev.slice();
                      });
                    }}
                  />
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default FiltersScreen;
