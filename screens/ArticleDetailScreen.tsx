import React from 'react';
import * as Linking from 'expo-linking';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Image,
  ScrollView,
} from 'react-native';

import { Article } from '../models/article';
import Colors from '../constants/Colors';
import { ArticleDetailsParamList } from '../navigation/types';

const ArticleScreen = (props: ArticleDetailsParamList) => {
  const artId = props.route.params.artId;
  let article: Article | undefined;

  article = useTypedSelector((state) =>
    state.articles.latestArticles.find((art) => art.id === artId)
  );
  if (!article) {
    article = useTypedSelector((state) =>
      state.articles.categoryArticles.find((art) => art.id === artId)
    );
  }

  const toArticleURLHandler = () => {
    Linking.openURL(article!.link);
  };

  const shareLinkHandler = () => {
    Share.share({ message: article!.link });
  };

  if (!article) {
    return (
      <View style={{ alignContent: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Articolo non trovato!
        </Text>
        <Text>C'è stato un errore prova a tornare indietro</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: article.imageURL }}
          style={{ width: '100%', height: 200, resizeMode: 'center' }}
        ></Image>
      </View>
      <View style={styles.description}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Titolo:</Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          {article.title}
        </Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Categorie:</Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          {article.categories.join(' , ')}
        </Text>
      </View>
      <TouchableOpacity style={styles.GTWButton} onPress={toArticleURLHandler}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Vai all'articolo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.GTWButton} onPress={shareLinkHandler}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Condividi link</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 30,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: Colors.accent,
    backgroundColor: 'rgba(255,152,61,0.15)',
  },
  goToWebsite: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 30,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: Colors.accent,
    backgroundColor: 'rgba(255,152,61,0.15)',
  },
  GTWButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 70,
    marginVertical: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.accent,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: Colors.accent,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,152,61,0.15)',
  },
});

export default ArticleScreen;
