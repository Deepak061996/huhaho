// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import useCommon from '../../hooks/useCommon'; // Assuming this hook exists and provides getTerms, termsLoading
// import {htmlToText} from 'html-to-text'; // Ensure you have this library installed: npm install html-to-text
// import Loader from '../../components/Loader'; // Assuming this component exists
// import TopHeader from '../../components/TopHeader'; // Assuming this component exists

// const TermsCond = () => {
//   // Destructure values from your custom hook
//   const {getTerms, termsLoading} = useCommon();

//   // Get screen width for responsive image sizing
//   const screenWidth = Dimensions.get('screen').width;

//   // State to hold the cleaned plain text content
//   const [plainTextContent, setPlainTextContent] = useState('');

//   // State to hold the array of image URLs extracted from the API response
//   const [imageUrls, setImageUrls] = useState([]);

//   // Direct string for the title, as translation is removed
//   const screenTitle = 'Terms & Conditions';

//   // useEffect to process API data when it becomes available
//   useEffect(() => {
//     if (getTerms?.data && getTerms.data.length > 0) {
//       const apiData = getTerms.data[0];
//       const termsHtml = apiData.terms_condition || ''; // The HTML content

//       // 1. Handle Images: Prioritize the 'images' array if it exists and has content
//       if (
//         apiData.images &&
//         Array.isArray(apiData.images) &&
//         apiData.images.length > 0
//       ) {
//         setImageUrls(apiData.images);
//       } else {
//         // If the 'images' array is not present or empty, ensure imageUrls is empty
//         setImageUrls([]);
//       }

//       // 2. Convert HTML content to plain text
//       const plainText = htmlToText(termsHtml, {
//         wordwrap: false, // Disable word wrapping for better control
//         selectors: [
//           {selector: 'img', format: 'skip'}, // Crucially, ignore img tags in HTML for text conversion
//         ],
//         preserveNewlines: false, // Remove excessive newlines
//         singleNewLineParagraphs: true, // Reduce multiple newlines to single ones
//         format: {
//           text: function (elem, fn, options) {
//             return elem.children
//               .map(fn)
//               .join(' ')
//               .replace(/\s+/g, ' ') // Reduce multiple spaces to a single space
//               .trim(); // Trim leading/trailing spaces
//           },
//         },
//       });
//       setPlainTextContent(plainText); // Update state with the processed plain text
//     } else {
//       // Reset states if getTerms data is not available or empty
//       setPlainTextContent('');
//       setImageUrls([]);
//     }
//   }, [getTerms]); // Dependency array: Effect runs when 'getTerms' changes

//   // Console logs for debugging (can be removed in production)
//   console.log('Processed Plain Text Content:', plainTextContent);
//   console.log('Extracted Image URLs:', imageUrls);

//   return (
//     <View style={styles.container}>
//       {/* Top Header component */}
//       <TopHeader showBack={true} title={screenTitle} />

//       {/* Loader component to show loading state */}
//       <Loader visible={termsLoading} />

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

// export default TermsCond;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', // Or your desired background color
//   },
//   scrollViewContent: {
//     paddingBottom: 20, // Add some padding at the bottom of the scroll view
//   },
//   image: {
//     // Basic image styles can go here if not dynamic
//     borderRadius: 8, // Example: add some border radius
//   },
//   text: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 22,
//     marginHorizontal: 15, // Horizontal margin for text
//     marginTop: 10,
//   },
// });
//

//

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions, // Import useWindowDimensions for responsive HTML rendering
} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assuming these paths are correct for your project structure
import useCommon from '../../hooks/useCommon';
import Loader from '../../components/Loader';
import TopHeader from '../../components/TopHeader';

// Import the core library for rendering HTML
import RenderHtml from 'react-native-render-html';

const TermsCond = () => {
  // Destructure values from your custom hook for API calls
  const {getTerms, termsLoading} = useCommon();

  // useWindowDimensions hook provides current width, crucial for responsive HTML rendering
  const {width} = useWindowDimensions();

  // State to hold the HTML content fetched from the API
  const [termsHtmlContent, setTermsHtmlContent] = useState('');

  // Title for the screen header
  const screenTitle = 'Terms & Conditions';

  // useEffect to fetch and process API data when getTerms changes
  useEffect(() => {
    // Check if data is available and not empty
    if (getTerms?.data && getTerms.data.length > 0) {
      const apiData = getTerms.data[0];
      // Set the HTML content directly. react-native-render-html will parse and render it.
      setTermsHtmlContent(apiData.terms_condition || '');
    } else {
      // If no data, reset the HTML content
      setTermsHtmlContent('');
    }
  }, [getTerms]); // Dependency array: Effect runs when 'getTerms' object changes

  // Console log for debugging the HTML content being processed
  console.log('HTML Content for Rendering:', termsHtmlContent);

  return (
    <View style={styles.container}>
      {/* Top Header component for navigation and title display */}
      <TopHeader showBack={true} title={screenTitle} />

      {/* Loader component to indicate data loading state */}
      <Loader visible={termsLoading} />

      {/* ScrollView to ensure content is scrollable if it overflows the screen */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/*
          RenderHtml component takes the HTML string and renders it.
          It intelligently places images and text according to the HTML structure.
        */}
        {termsHtmlContent ? (
          <RenderHtml
            // Calculate contentWidth by subtracting horizontal padding from total screen width
            contentWidth={width - 30} // 15px left padding + 15px right padding
            source={{html: termsHtmlContent}}
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
          !termsLoading && (
            <Text style={styles.noContentText}>
              No terms and conditions available.
            </Text>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default TermsCond;

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
    backgroundColor: '#fff', // White background for the entire screen
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
