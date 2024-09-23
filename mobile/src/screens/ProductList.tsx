import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import StockList from '../components/Stock/StockList';
import AddStockModal from '../components/Stock/AddStockModal';

const stockData: StockItem[] = [
  { id: '1', name: 'Peça A', quantity: 10, price: 'R$ 100,00' },
  { id: '2', name: 'Peça B', quantity: 5, price: 'R$ 150,00' },
  { id: '3', name: 'Peça C', quantity: 8, price: 'R$ 80,00' },
  { id: '4', name: 'Peça D', quantity: 12, price: 'R$ 120,00' },
  { id: '5', name: 'Peça E', quantity: 3, price: 'R$ 50,00' },
];

const StockScreen = () => {
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<StockItem[]>(stockData);
  const [modalVisible, setModalVisible] = useState(false);

  const updateSearch = (search: string): void => {
    setSearch(search);
    if (search) {
      const filtered = stockData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(stockData);
    }
  };

  const handleAddStockItem = (newItem: StockItem) => {
    stockData.push(newItem);
    setFilteredData([...stockData]); // Update the filtered data to include the new item
    setModalVisible(false); // Close the modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchComponent search={search} onSearchChange={updateSearch} />
      <Button title="Adicionar Peça" onPress={() => setModalVisible(true)} />
      <StockList data={filteredData} />
      <AddStockModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddItem={handleAddStockItem}
      />
    </SafeAreaView>
  );
};

const SearchComponent = ({ search, onSearchChange }: { search: string; onSearchChange: (text: string) => void }) => (
  <SearchBar
    placeholder="Buscar peça..."
    onChangeText={onSearchChange}
    value={search}
    lightTheme
    containerStyle={styles.searchBar}
    inputContainerStyle={styles.inputContainer}
  />
);

export default StockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    backgroundColor: 'white',
  },
});