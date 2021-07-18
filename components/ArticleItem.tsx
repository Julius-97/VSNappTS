import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import Colors from '../constants/Colors';

type Props = {
  categories: string[] | null;
  title: string;
  date: Date;
  onSelect: () => void;
};

const ArticleItem = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.container}>
        <View style={styles.catText}>
          <Text style={{ fontSize: 12 }}>{props.categories && props.categories.join(', ')}</Text>
        </View>
        <View style={styles.title}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {props.title}
          </Text>
        </View>
        <View style={styles.date}>
          <Text style={{ fontSize: 12 }}>
            {format(props.date, 'dd/MM/yy HH:mm')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: Colors.accent,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'rgba(255,152,61,0.15)',
  },
  catText: {
    alignItems: 'flex-end',
  },
  date: {
    alignItems: 'flex-end',
  },
  title: {
    marginVertical: 4,
  },
});

export default ArticleItem;
