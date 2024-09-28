import { defaultStyles } from '@/constants/Styles';
import { ListingType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutLeft
} from 'react-native-reanimated';
import Colors from '../constants/Colors';

interface Props {
  items: ListingType[];
  category: string;
}

const Listing = ({ category, items }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={style.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image source={{ uri: item.medium_url }} style={style.image} />
            <TouchableOpacity
              style={{ position: 'absolute', top: 30, right: 30 }}
            >
              <Ionicons name={'heart-outline'} size={24} color={Colors.dark} />
            </TouchableOpacity>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Ionicons name={'star'} size={16} />
                <Text style={{ fontFamily: 'mon-sb' }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'mon-sb' }}>$ {item.price}</Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
      />
    </View>
  );
};

const style = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});

export default Listing;
