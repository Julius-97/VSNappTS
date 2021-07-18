import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CategoriesListScreenProps } from '../navigation/types';
import Colors from '../constants/Colors';

const CategoriesScreen = (props: CategoriesListScreenProps) => {
  const { categories, isLoading, error } = useTypedSelector(
    (state) => state.categories
  );
  const { retrieveCategories } = useActions();

  const selectedCategoryHandler = (catName: string) => {
    props.navigation.push('ArticlesList', { catName: catName });
  };

  useEffect(() => {
    if (categories.length <= 0) retrieveCategories();
  }, []);

  return (
    <View>
      {isLoading && <Text style={{ textAlign: 'center' }}>loading...</Text>}
      {error && <Text>Some error...{error}</Text>}
      {categories && (
        <FlatList
          data={categories}
          keyExtractor={(cat) => cat.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              style={styles.catBox}
              onPress={() => {
                selectedCategoryHandler(itemData.item.name);
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {itemData.item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  catBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accentFaded,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 2,
    padding: 6,
  },
});

export default CategoriesScreen;
