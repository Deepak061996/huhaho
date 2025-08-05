import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

const isSmallScreen = width < 400;
const GooglePlacesAutocomplete = ({
  onPlaceSelect,
  API_KEY,
  value,
  onChangeText,
  isEdit,
}) => {
  console.log(value, 'sdfhasjkdfhkjsadfhjsdfhjsk888');
  const [input, setInput] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setInput(value || '');
  }, [value]);
  const fetchSuggestions = async input => {
    if (!input) return;

    setLoading(true);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${input}&language=en`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.predictions) {
        setSuggestions(json.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.log('Autocomplete error:', error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const handleChangeText = text => {
    setInput(text);
    if (text.length > 1) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
    }
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleSelectPlace = place => {
    setInput(place.description);
    setSuggestions([]);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  const renderItem = ({item}) => (
    <Text style={styles.suggestionItem} onPress={() => handleSelectPlace(item)}>
      {item.description}
    </Text>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#edb89f',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: width / 1.23,
          }}>
          <Icon
            name="map-marker"
            size={20}
            color="#484a44"
            style={{marginTop: 0, marginLeft: isSmallScreen ? 50 : 20}}
          />

          <TextInput
            style={styles.input}
            value={input}
            onChangeText={handleChangeText}
            placeholder="Enter address"
            autoCorrect={false}
            autoCapitalize="none"
            editable={isEdit}
          />
        </View>

        {loading && <Text style={styles.loading}>Loading...</Text>}

        {suggestions.length > 0 && !loading && (
          <View style={styles.dropdown}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', '#fff']}
              style={styles.suggestionsWrapper}>
              <FlatList
                data={suggestions}
                renderItem={renderItem}
                keyExtractor={item => item.place_id}
                keyboardShouldPersistTaps="handled"
                scrollEnabled
                nestedScrollEnabled
                style={styles.flatList}
                showsVerticalScrollIndicator={true}
              />
            </LinearGradient>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    justifyContent: 'start',
    alignItems: 'center',
  },
  input: {
    height: 58,
    fontSize: 16,
    // minWidth: '90%',
    width: 280,
    marginLeft: 10,
    color: '#484a44',
  },
  dropdown: {
    marginTop: 8,
    zIndex: 2,
  },
  suggestionsWrapper: {
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    maxHeight: 200,
    width: 290,
  },
  flatList: {
    maxHeight: 200,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  loading: {
    padding: 10,
    fontSize: 16,
    color: 'gray',
  },
});

export default GooglePlacesAutocomplete;
