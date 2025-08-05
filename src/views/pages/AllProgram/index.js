import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Check from 'react-native-vector-icons/FontAwesome';

import TopHeader from '../../../components/TopHeader';
import ProgramsItem from '../../../components/ProgramsItem';
import Loader from '../../../components/Loader';

import useCommon from '../../../hooks/useCommon';
import useDetails from '../../../hooks/useDetail';
import {translateText} from '../../../utils/translate';
import {useTranslate} from '../../../hooks/useTranslate';

const {width} = Dimensions.get('window');

const AllProgram = () => {
  const guestType = useSelector(state => state?.user?.userTypeGuest);
  const navigateDash = useSelector(state => state?.user?.navigateDash);
  console.log(navigateDash, 'navigateDash***', guestType, 'guest type****');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [relatedCategory, setRelatedCat] = useState([]);

  console.log(relatedCategory, 'related category data');

  const [categories, setCategory] = useState([]);

  console.log(categories, 'ksajdfksahdfjkashfgsfsh');
  const navigation = useNavigation();

  const {getTechnique} = useCommon();
  const {getRelatedTechnique, isLoading} = useDetails();
  const {getAllTechnical} = useCommon();
  const language = useSelector(state => state.language.code);
  const translatedHeader = useTranslate('Techniques/Program');

  useEffect(() => {
    if (getTechnique?.data) {
      translateCategories(getTechnique.data);
      // fetchRelatedCategories('1');
    }
  }, [getTechnique, language]);

  const translateCategories = async data => {
    const translated = await Promise.all(
      data.map(async category => {
        const translatedName =
          language === 'en'
            ? category.category_name
            : await translateText(category.category_name, language);
        return {...category, translated_name: translatedName};
      }),
    );
    setCategory(translated);
  };

  const fetchRelatedCategories = async id => {
    const response = await getRelatedTechnique({
      technique_id: id || selectedCategory,
    });
    if (response) {
      translateSubcategories(response?.data);
    }
  };

  const translateSubcategories = async data => {
    const translated = await Promise.all(
      data.map(async sub => {
        const translatedName =
          language === 'en'
            ? sub.name
            : await translateText(sub.name, language);
        return {...sub, translated_name: translatedName};
      }),
    );
    setRelatedCat(translated);
  };

  //get all details

  useEffect(() => {
    if (getAllTechnical) {
      setRelatedCat(getAllTechnical?.data);
    }
  }, [getAllTechnical]);

  return (
    <>
      <TopHeader title={translatedHeader} showBack={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader visible={isLoading} />
        <Text style={styles.heading}>Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({item}) => {
            const isSelected = selectedCategory === item.id;

            return (
              <TouchableOpacity
                style={[styles.itemContainer, {width: width / 4}]}
                onPress={() => {
                  setSelectedCategory(item.id);
                  fetchRelatedCategories(item.id);
                }}>
                {item.vector_icon && (
                  <View style={styles.categoryImage11}>
                    <Image
                      source={{uri: item.vector_icon}}
                      style={styles.categoryImage}
                    />
                  </View>
                )}
                <Text style={styles.categoryText}numberOfLines={1}>{item.translated_name}</Text>
                {isSelected && (
                  <Image
                    source={require('../../../assets/ChecBoxx.png')}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.separator} />
        {relatedCategory.length === 0 ? (
          <Text style={styles.noDataText}>No data available</Text>
        ) : (
          Array.from(
            {length: Math.ceil(relatedCategory.length / 4)},
            (_, rowIndex) => (
              <>
                <View key={rowIndex} style={styles.rowContainer}>
                  {relatedCategory
                    .slice(rowIndex * 4, rowIndex * 4 + 4)
                    .map((sub, index) => (
                      <ProgramsItem
                        key={`${rowIndex}-${index}`}
                        image={sub.image}
                        subtitle={sub.translated_name || sub.name}
                        onPress={() =>
                          navigation.navigate('ServiceDetails', {
                            subcategory: sub.name,
                            navigate_data: sub,
                            categoryType: true,
                          })
                        }
                      />
                    ))}
                </View>
              </>
            ),
          )
        )}
      </ScrollView>
    </>
  );
};

export default AllProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    // marginHorizontal: 15,
    width: '100%',
  },

  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  horizontalScroll: {
    paddingHorizontal: 10,
  },
  listContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    // paddingBottom: 20,
  },
  checkIcon: {
    position: 'absolute',
    top: 40,
    right: 22,
    width: 20,
    height: 20,
  },
  categoryButton: {
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    // marginHorizontal: -5,
  },
  selectedCategory: {
    borderColor: 'red',
  },
  categoryText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },

  categoryImage11: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    backgroundColor: '#E18A5E',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 10,
  },
  rowContainer: {
    // width: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width / 1.05,
    flexDirection: 'row',
    marginVertical: 5,
    // marginHorizontal: -10,
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  horizontalList: {
    paddingHorizontal: 10,
  },

  itemContainer: {
    alignItems: 'center',
    // padding: 10,
  },
});
