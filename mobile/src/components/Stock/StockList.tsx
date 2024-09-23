import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const StockList = ({ data }: { data: StockItem[] }) => {
  const renderItem = ({ item }: { item: StockItem }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>Quantidade: {item.quantity}</ListItem.Subtitle>
        <ListItem.Subtitle>Preço: {item.price}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default StockList;
