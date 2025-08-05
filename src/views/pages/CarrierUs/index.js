import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TopHeader from '../../../components/TopHeader';

const CareerWithUs = () => {
  return (
    <>
      <TopHeader showBack={true} title={'Career With Us'} />
      <ScrollView style={styles.container}>
        
        <Text style={styles.description}>
          Join us on a mission to empower individuals with wellness, mindfulness, and personal growth. 
          At HuHaHo, we are looking for passionate and driven individuals who want to make a real difference in people’s lives.
        </Text>
        
        <View style={styles.bulletContainer}>
          {[ 
            'Impactful Work – Contribute to a platform that enhances mental well-being and personal transformation.',
            'Collaborate with Experts – Work alongside industry veterans, motivational leaders, and healthcare professionals.',
            'Growth & Learning – Get mentorship from renowned professionals across various domains, from mental health to technology.',
            'Innovative Environment – Be part of a dynamic team that values creativity, new ideas, and cutting-edge technology.',
            'Work-Life Balance – We believe in holistic well-being, not just for our users but for our team as well.',
          ].map((value, index) => (
            <View key={index} style={styles.bulletPointContainer}>
              <Text style={styles.bullet}>✔</Text>
              <Text style={styles.bulletText}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  description: {
    fontSize: 18,
    color: 'black',
    marginBottom: 12,
  },
  bulletContainer: {
    paddingLeft: 4,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 20,
    color: 'black',
    marginRight: 8,
  },
  bulletText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 22,
  },
});

export default CareerWithUs;
