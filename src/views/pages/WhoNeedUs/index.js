// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   Dimensions,
// } from 'react-native';
// import TopHeader from '../../../components/TopHeader';
// import {useTranslate} from '../../../hooks/useTranslate'; // Keep this import for translation
// import useCommon from '../../../hooks/useCommon';
// import {htmlToText} from 'html-to-text';
// import Loader from '../../../components/Loader';

// const WhoNeedUs = () => {
//   // Destructure values from your custom hook
//   const {whoNeedUs, whoNeedThisLoading} = useCommon();

//   // Get screen width for responsive image sizing
//   const screenWidth = Dimensions.get('screen').width;

//   // State to hold the cleaned plain text content
//   const [plainTextContent, setPlainTextContent] = useState('');

//   // State to hold the array of image URLs extracted from the API response
//   const [imageUrls, setImageUrls] = useState([]);

//   // Translate the "Who Needs Us" title
//   const translatedTxt = useTranslate('Who Needs Us');

//   useEffect(() => {
//     if (whoNeedUs?.data && whoNeedUs.data.length > 0) {
//       const apiData = whoNeedUs.data[0];
//       const whoNeedThisHtml = apiData.who_need_this || ''; // The HTML content

//       // 1. Handle Images: Prioritize the 'images' array if it exists and has content
//       if (
//         apiData.images &&
//         Array.isArray(apiData.images) &&
//         apiData.images.length > 0
//       ) {
//         setImageUrls(apiData.images);
//       } else {
//         // If no 'images' array or it's empty, ensure imageUrls is empty
//         setImageUrls([]);
//       }

//       // 2. Convert HTML content to plain text.
//       // We process the original HTML string, and importantly, skip img tags.
//       const plainText = htmlToText(whoNeedThisHtml, {
//         wordwrap: false,
//         selectors: [
//           {selector: 'img', format: 'skip'}, // Crucially, ignore img tags in HTML for text conversion
//         ],
//         preserveNewlines: false,
//         singleNewLineParagraphs: true,
//         format: {
//           text: function (elem, fn, options) {
//             return elem.children.map(fn).join(' ').replace(/\s+/g, ' ').trim();
//           },
//         },
//       });

//       // If your useTranslate hook is designed to translate dynamic content
//       // from API responses, you might pass plainText to it here.
//       // For now, we'll directly set the plain text.
//       setPlainTextContent(plainText);
//     } else {
//       // Reset states if whoNeedUs data is not available or empty
//       setPlainTextContent('');
//       setImageUrls([]);
//     }
//   }, [whoNeedUs]); // Dependency array: Effect runs when 'whoNeedUs' changes

//   // Console logs for debugging (can be removed in production)
//   console.log('Who Need Us Plain Text Content:', plainTextContent);
//   console.log('Who Need Us Image URLs:', imageUrls);

//   return (
//     <View style={styles.container}>
//       {/* Loader component to show loading state */}
//       <Loader visible={whoNeedThisLoading} />

//       {/* Top Header component */}
//       <TopHeader showBack={true} title={translatedTxt} />

//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         {/* Render images if any URLs are available */}
//         {imageUrls.map((uri, index) => (
//           <Image
//             key={index} // Using index as key is generally okay for static lists
//             source={{uri: uri}} // Set the image source
//             style={[
//               styles.image, // Apply base image styles
//               {
//                 width: screenWidth * 0.95, // Set width relative to screen
//                 height: 225, // Fixed height for consistency
//                 alignSelf: 'center', // Center the image horizontally
//                 marginTop: 15, // Space above each image
//                 marginBottom: 15, // Space below each image
//               },
//             ]}
//             resizeMode="cover" // Cover the image area without distortion
//           />
//         ))}

//         {/* Display the processed plain text content */}
//         <Text style={styles.text}>{plainTextContent}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollViewContent: {
//     paddingBottom: 20, // Add some padding at the bottom of the scroll view
//   },
//   image: {
//     borderRadius: 8, // Example: add some border radius
//   },
//   text: {
//     fontSize: 16,
//     color: 'black',
//     lineHeight: 22,
//     marginHorizontal: 15, // Horizontal margin for text
//     marginTop: 10,
//   },
// });

// export default WhoNeedUs;
//

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  // Removed Image and Dimensions as react-native-render-html handles them
  useWindowDimensions, // Import useWindowDimensions for responsive HTML rendering
} from 'react-native';

// Assuming these paths are correct for your project structure
import TopHeader from '../../../components/TopHeader';
import {useTranslate} from '../../../hooks/useTranslate'; // Keep this import for translation
import useCommon from '../../../hooks/useCommon';
// Removed htmlToText as react-native-render-html replaces its need
import Loader from '../../../components/Loader';

// Import the core library for rendering HTML
import RenderHtml from 'react-native-render-html';

const WhoNeedUs = () => {
  // Destructure values from your custom hook for API calls
  const {whoNeedUs, whoNeedThisLoading} = useCommon();

  // useWindowDimensions hook provides current width, crucial for responsive HTML rendering
  const {width} = useWindowDimensions();

  // State to hold the HTML content fetched from the API
  const [whoNeedThisHtmlContent, setWhoNeedThisHtmlContent] = useState('');

  // Translate the "Who Needs Us" title
  const translatedTxt = useTranslate('Who Needs Us');

  useEffect(() => {
    // Check if data is available and not empty
    if (whoNeedUs?.data && whoNeedUs.data.length > 0) {
      const apiData = whoNeedUs.data[0];
      // Set the HTML content directly. react-native-render-html will parse and render it.
      setWhoNeedThisHtmlContent(apiData.who_need_this || '');
    } else {
      // If no data, reset the HTML content
      setWhoNeedThisHtmlContent('');
    }
  }, [whoNeedUs]); // Dependency array: Effect runs when 'whoNeedUs' object changes

  // Console log for debugging the HTML content being processed
  console.log(
    'Who Need Us HTML Content for Rendering:',
    whoNeedThisHtmlContent,
  );

  return (
    <View style={styles.container}>
      {/* Loader component to indicate data loading state */}
      <Loader visible={whoNeedThisLoading} />

      {/* Top Header component for navigation and title display */}
      <TopHeader showBack={true} title={translatedTxt} />

      {/* ScrollView to ensure content is scrollable if it overflows the screen */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/*
          RenderHtml component takes the HTML string and renders it.
          It intelligently places images and text according to the HTML structure.
        */}
        {whoNeedThisHtmlContent ? (
          <RenderHtml
            // Calculate contentWidth by subtracting horizontal padding from total screen width
            contentWidth={width - 30} // 15px left padding + 15px right padding
            source={{html: whoNeedThisHtmlContent}}
            // Apply custom styles to specific HTML tags
            tagsStyles={htmlStyles}
            // Configuration for image rendering, especially for percentage widths
            renderersProps={{
              img: {
                enableExperimentalPercentSpecInheritance: true,
              },
            }}
          />
        ) : (
          // Display a message if no content is available and loading is complete
          !whoNeedThisLoading && (
            <Text style={styles.noContentText}>
              No content available for "Who Needs Us".
            </Text>
          )
        )}
      </ScrollView>
    </View>
  );
};

// --- Stylesheets ---

// Styles for the HTML tags rendered by react-native-render-html
const htmlStyles = StyleSheet.create({
  // Style for all paragraph (<p>) tags
  p: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 10, // Adds space after each paragraph
  },
  // Style for all heading 3 (<h3>) tags
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#000',
  },
  // Style for all unordered list (<ul>) tags
  ul: {
    marginBottom: 10,
    marginLeft: 15, // Indent lists
  },
  // Style for all list item (<li>) tags
  li: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 5,
  },
  // Style for all image (<img>) tags
  img: {
    // These styles are applied in addition to render-html's own sizing logic.
    // Use for border, margin, etc. Sizing is handled by `contentWidth` and `renderersProps`.
    borderRadius: 8,
    marginVertical: 10, // Add vertical spacing around images
  },
  // Style for all strong (<strong>) tags
  strong: {
    fontWeight: 'bold',
  },
  // Add more styles here for any other HTML tags you expect (e.g., a, table, etc.)
});

// General component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingHorizontal: 15, // Apply horizontal padding to the content within the ScrollView
    paddingBottom: 20, // Add padding at the bottom of the scrollable content
  },
  noContentText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default WhoNeedUs;
