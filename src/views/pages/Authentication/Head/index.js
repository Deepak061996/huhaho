import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Head = () => {
    const navigation = useNavigation(); 

    return (
        <View style={styles.header}>
            <View style={styles.header1}>
                <Image source={require('../../../../assets/logo2.png')} style={styles.logo} />
                
                {/* goBack function sahi likha hai */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon2 name="doubleleft" size={20} color="#FF914D" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
        borderTopRightRadius: 20,
        marginHorizontal: 20
    },
    header1: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '90%' 
    },
    logo: { 
        width: 100, 
        height: 100, 
        left: -20 
    },
});

export default Head;
