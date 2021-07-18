import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ArticlesListScreenProps } from '../navigation/types';
import { format } from 'date-fns';

import ArticleItem from '../components/ArticleItem';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const ArticlesListScreen = (props: ArticlesListScreenProps) => {
  const isCategory = !!props.route.params;
  const { retrieveLatestArticles, retrieveCategoryArticles } = useActions();
  const { categoryArticles, latestArticles, isLoading, error, lastUpdateTime } =
    useTypedSelector((state) => state.articles);

  useEffect(() => {
    isCategory
      ? retrieveCategoryArticles(props.route.params.catName!)
      : retrieveLatestArticles();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {error && <Text>Some error...{error}</Text>}
      {latestArticles && (
        <FlatList
          data={isCategory ? categoryArticles : latestArticles}
          refreshing={isLoading}
          onRefresh={retrieveLatestArticles}
          ListHeaderComponent={() => {
            if (isCategory) return <View></View>;
            else
              return (
                <View>
                  <Text style={{ textAlign: 'center' }}>
                    {'ultimo aggiornamento: ' + format(lastUpdateTime, 'HH:mm')}
                  </Text>
                </View>
              );
          }}
          renderItem={(itemData) => (
            <ArticleItem
              categories={isCategory ? null : itemData.item.categories}
              date={itemData.item.date}
              onSelect={() => {
                props.navigation.push('ArticleDetail', {
                  artId: itemData.item.id,
                });
              }}
              title={itemData.item.title}
            />
          )}
          ListFooterComponent={() => <View style={{ height: 30 }}></View>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ArticlesListScreen;
