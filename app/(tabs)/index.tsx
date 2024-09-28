import listingData from '@/assets/data/airbnb-listings.json';
import ExplorerHeader from '@/components/ExplorerHeader';
import Listing from '@/components/Listing';
import { ListingType } from '@/types';
import { Stack } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

const Page = () => {
  const [category, setCategory] = useState<string>('');
  const items = useMemo(() => listingData as ListingType[], []);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExplorerHeader onCategoryChanged={setCategory} />,
        }}
      />
      <Listing items={items} category={category} />
    </View>
  );
};

export default Page;
