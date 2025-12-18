// import React from 'react';
// import { View, ActivityIndicator } from 'react-native';

// export default function LoadingScreen(){
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <ActivityIndicator size="large" />
//     </View>
//   );
// }


import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      {/* Optional: Add a subtle logo or app name */}
      <Text style={styles.brandText}>VastraLense</Text>
      
      {/* Main loading indicator */}
      <View style={styles.indicatorContainer}>
        {/*
          Using 'white' or a metallic color (like a light gold or silver hex code) 
          for the indicator adds to the luxurious feel.
          'size="large"' is good, but 'color' is key.
        */}
        <ActivityIndicator size="large" color="#FFD700" /> 
        
        {/* Optional: Add a descriptive loading message */}
        <Text style={styles.loadingText}>
          Preparing your experience...
        </Text>
      </View>
      
      {/* Optional: A footer element */}
      <Text style={styles.footerText}>
        © VastraLense
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // A deep, rich background color is essential for luxury
    backgroundColor: '#1E1E1E', // Dark Charcoal or near-black
    alignItems: 'center',
    justifyContent: 'space-around', // Use 'space-around' to position brand/footer text
    paddingVertical: 50,
  },
  brandText: {
    fontSize: 28,
    fontWeight: '300', // Lighter weight fonts feel more modern and premium
    color: '#FFD700', // Gold color
    letterSpacing: 8, // Wide letter spacing adds sophistication
    textTransform: 'uppercase',
  },
  indicatorContainer: {
    // Center the indicator and text block
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 14,
    color: '#D4AF37', // A softer gold/bronze for supporting text
    letterSpacing: 2,
    fontWeight: '400',
  },
  footerText: {
    fontSize: 12,
    color: '#A9A9A9', // Dim Gray for a subtle footer
    fontWeight: '200',
    letterSpacing: 1,
  }
});