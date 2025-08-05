import React from 'react';
import {View, Text, ScrollView, Linking, StyleSheet} from 'react-native';
import TopHeader from '../../../components/TopHeader';
import {useTranslate} from '../../../hooks/useTranslate'; // Ensure this hook is used correctly

const AboutUs = () => {
  // Translation for static text
  const tTitle = useTranslate('About Us');
  const tCoreValuesTitle = useTranslate('Our Core Values');
  const twhat_we_offer = useTranslate('What We Offer');
  const tGreen_life = useTranslate('Green Life Cafe');
  const tourFutureGoal = useTranslate('Our Future Goals');
  const ourCommunity = useTranslate('Join the HuHaHo Community');
  const tContactEmail = useTranslate('Email:');
  const tPhone = useTranslate('Phone:');
  const ourvision = useTranslate('Our Vision');

  const ourmission = useTranslate('Our Mission');

  // Defining core values as static text that should be translated
  const coreValues = [
    'Holistic Health: Addressing the interconnectedness of mind, body, and spirit.',
    'Convenience: Streamlining your wellness journey.',
    'Empowerment: Equipping individuals with tools for health.',
    'Integrity: Upholding ethical practices and transparency.',
    'Innovation: Seeking cutting-edge wellness solutions.',
    'Quality: Prioritizing high-quality services and products.',
    'Reliability: Ensuring consistent service delivery.',
    'Service: Committed to exceptional customer experience.',
  ];

  const what_we_offer = [
    'Integrated Healthcare Services: Access to a network of qualified healthcare professionals.',
    'Wellness and Fitness: State-of-the-art fitness facilities, yoga and meditation studios, and personalized wellness programs.',
    'Alternative Medicine: Explore a range of complementary therapies, including Sound Therapy for Healing.',
    'Preventive Health: Proactive health screenings, nutritional counselling, and lifestyle management programs.',
    'Wellness Retail: A curated selection of high-quality wellness products, including Greenlife Products.',
    'Green Life Cafe: Nourishing your body with wholesome, delicious meals and beverages in our on-site cafe, featuring organic and locally sourced ingredients.',
  ];

  const green_life = [
    'At the heart of HuHaHo, you will find our "Green Life Cafe," a culinary extension of our wellness philosophy. We believe that nutrition plays a vital role in overall health, and our cafe provides a space where you can enjoy delicious, healthy meals and beverages.',
    'We focus on using fresh, organic, and locally sourced ingredients whenever possible, ensuring that every dish is not only delicious but also nourishing.',
    'Our menu features a variety of options to cater to different dietary needs and preferences, including vegetarian, vegan, and gluten-free choices.',
  ];

  const futureGoal = [
    'Expansion: We aim to expand our physical presence.',
    'Technology Integration: We will continue to enhance our app.',
    'Partnerships: We seek to collaborate with leading healthcare providers.',
    'Community Outreach: We are committed to giving back to the community.',
    'Global Reach: We hope to expand the HuHaHo concept globally.',
    'Research and Development: We will invest in research and development.',
  ];

  return (
    <>
      <TopHeader showBack={true} title={tTitle} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 50}}
        keyboardShouldPersistTaps="handled">
           <Text style={styles.titleheader}>
          {useTranslate('HuHaHo - Introduction')}
        </Text>
        <Text style={styles.title}>
          {useTranslate('About Us')}
        </Text>
        <Text style={styles.paragraph}>
          {useTranslate(
            "At HuHaHo we believe that true well-being goes beyond physical health — it includes the joy we feel, the hope we carry, and the cultural roots that ground us. Our mission is to nurture wellness, holistic healthcare, happiness and inspire hope, while honouring and preserving the rich cultural values that shape our identity.",
          )}
        </Text>
        <Text style={styles.paragraph}>
          {useTranslate(
            "We work at the intersection of emotional wellness, physical vitality, and cultural wisdom. Whether through community programs, wellness initiatives, or educational outreach, our goal is to create spaces where individuals thrive, families flourish, and traditions are respected and celebrated.\n\nOur initiatives bring together wellness, community care, and cultural preservation to help people lead more meaningful, connected, and healthier lives. Through innovative programs and heartfelt engagement, we empower individuals and communities to thrive.\n\nTogether, we’re building a future where well-being and cultural heritage go hand in hand.\n\nRooted in compassion and purpose, which is deeply human, happier and hopeful.",
          )}
        </Text>

        {/* <Text style={styles.sectionTitle}>{tCoreValuesTitle}</Text> */}

        {/* Check translation and display for core values */}
        {coreValues.map((value, index) => {
          const translatedValue = useTranslate(value); // Translate each core value
          console.log('Translated Core Value:', translatedValue); // Log the translation to check if it works
          // return (
          //   <View key={index} style={styles.bulletPointContainer}>
          //     <Text style={{fontSize: 15}}>●</Text>
          //     <Text style={styles.bulletText}>{translatedValue}</Text>{' '}
          //     {/* Ensure translated value is displayed */}
          //   </View>
          // );
        })}

        {/* <Text style={styles.sectionTitle}>{twhat_we_offer}</Text> */}
        <View>
          {what_we_offer.map((value, index) => {
            const transltedTxt = useTranslate(value);
            // return (
            //   <View key={index} style={styles.bulletPointContainer}>
            //     <Text style={{fontSize: 15}}>●</Text>
            //     <Text style={styles.bulletText}>{transltedTxt}</Text>{' '}
            //     {/* Ensure translated value is displayed */}
            //   </View>
            // );
          })}
        </View>

        {/* <Text style={styles.sectionTitle}>{tGreen_life}</Text> */}
        <View>
          {green_life.map((value, index) => {
            const greenliftTxt = useTranslate(value);
            // return (
            //   <View key={index} style={styles.bulletPointContainer}>
            //     <Text style={{fontSize: 15}}>●</Text>
            //     <Text style={styles.bulletText}>{greenliftTxt}</Text>{' '}
            //     {/* Ensure translated value is displayed */}
            //   </View>
            // );
          })}
        </View>

        {/* <Text style={styles.sectionTitle}>{tourFutureGoal}</Text> */}
        <View>
          {futureGoal.map((value, index) => {
            const futureGoal = useTranslate(value);
            // return (
            //   <View key={index} style={styles.bulletPointContainer}>
            //     <Text style={{fontSize: 15}}>●</Text>
            //     <Text style={styles.bulletText}>{futureGoal}</Text>{' '}
            //     {/* Ensure translated value is displayed */}
            //   </View>
            // );
          })}
        </View>

        <Text style={styles.sectionTitle}>{ourvision}</Text>
        <View>
          <Text style={styles.paragraph}>
            {useTranslate(
              'To create a world where every individual lives with joy, hope, and vibrant health — a world where compassion guides action, well-being is accessible to all, and communities flourish through connection, care, and purpose.',
            )}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>{ourmission}</Text>
        <View>
          <Text style={styles.paragraph}>
            {useTranslate(
              'Guided by compassion and purpose, our mission is to awaken the spirit of happiness, nurture hope, and promote healing in every life we touch. We believe true well-being flows from harmony between body, mind, and soul. Through mindful service, spiritual care, and holistic health practices, we strive to uplift humanity and foster a world rooted in peace, love, and divine connection.',
            )}
          </Text>
        </View>

        {/* <View style={{marginBottom: 50}}>
          {[
            {
              name: 'Mr. Harsh Vashist',
              title: 'MD, Satyam Group of Companies | Founder, HuHaHo',
              email: 'md@sparsh.co',
            },
            {
              name: 'Rakesh Nagpal',
              title: 'Director, HuHaHo | Ex GM - Hero MotoCorp Ltd',
              phone: '9810964628',
              email: 'huhaho@sparsh.co, rakeshnagpal2@gmail.com',
            },
            {
              name: 'Arun Malhotra',
              title: 'Group CEO, Satyam Group of Companies',
              phone: '8800375573',
              email: 'ceo@sparsh.co, arunmalho@gmail.com',
            },
          ].map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDetails}>{contact.title}</Text>
              {contact.phone && (
                <Text style={styles.contactDetails}>
                  {tPhone}: {contact.phone}
                </Text>
              )}
              {contact.email && (
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(`mailto:${contact.email.split(', ')[0]}`)
                  }>
                  {tContactEmail} {contact.email}
                </Text>
              )}
            </View>
          ))}
        </View> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    // alignSelf: 'center',
  },
  titleheader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
     alignSelf: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: 'black',
    lineHeight: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
    // alignSelf: 'center',
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 22,
    left: 10,
    // fontWeight: 400,
  },
  contactCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  contactDetails: {
    fontSize: 14,
    color: 'black',
  },
  link: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AboutUs;
