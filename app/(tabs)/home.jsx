import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useNavigation } from 'expo-router';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { markers } from '../../pointer/markers';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  // State to track if the bottom sheet is collapsed (true if collapsed, false if expanded)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // State to track if tab bar should be hidden (true to hide, false to show)
  const [hideTabBar, setHideTabBar] = useState(false);

  // State to track which icon to show (expand or back arrow)
  const [showBackIcon, setShowBackIcon] = useState(false);

  // State to control bottom sheet visibility (true to show, false to hide)
  const [showSheet, setShowSheet] = useState(true);

  // InitialRegion centered on Jeddah, Saudi Arabia
  const initialRegion = {
    latitude: 21.4858,
    longitude: 39.1925,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  // Ref to control the BottomSheet programmatically
  const bottomSheetRef = useRef(null);

  // Snap points for the BottomSheet (I set only collapsed state at 12% heiht)
  const snapPoints = useMemo(() => ['12%'], []);

  // Get navigation object to control tab bar visibility
  const navigation = useNavigation();

  // Callback to update isCollapsed when the BottomSheet changes position
  // Only updates isCollapsed, does not affect icon state
  const handleSheetChange = useCallback((index) => {
    setIsCollapsed(index === 0); // If index is 0, sheet is collapsed
    // Do not change showBackIcon here, only change when icon is pressed
  }, []);

  // Function to handle icon press and toggle tab bar and bottom sheet visibility
  const handleIconPress = () => {
    if (!showBackIcon) {
      setShowSheet(false); // Hide bottom sheet
      setShowBackIcon(true); // Show back arrow
      setHideTabBar(true); // Hide tab bar
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      setShowSheet(true); // Show bottom sheet
      setShowBackIcon(false); // Show expand icon
      setHideTabBar(false); // Show tab bar
      navigation.setOptions({ tabBarStyle: {} });
    }
  };

  return (
    <View style={styles.container}>
      {/* Container for the map and icon */}
      <View style={styles.mapTouchable}>
        <MapView
          provider={PROVIDER_GOOGLE} // to look like google map style
          showsMyLocationButton // Displays a button to center the map on the user's location
          showsUserLocation // Displays the user's current location on the map
          style={styles.map}
          initialRegion={initialRegion} // Sets the initial region of the map
        >
          {/* Loop through the markers array and render a Marker for each item */}
          {markers.map((marker, index) => (
            <Marker
              key={index} // Unique key for each marker
              title={marker.name} // Title for the marker
              coordinate={marker} // Position of the marker
              pinColor="#8F6BDA" // Color of the marker pin
            />
          ))}
        </MapView>

        <TouchableOpacity
          // Style for the icon button
          style={styles.controlIcon}
          // Use the handler to toggle sheet/tab bar/icon
          onPress={handleIconPress}
        >
          <Ionicons
            name={showBackIcon ? 'arrow-back' : 'expand'} // Icon changes based on showBackIcon state
            size={28}
            color="#4E046D"
          />
        </TouchableOpacity>
      </View>

      {/* BottomSheet component */}
      {showSheet && ( // Only show BottomSheet if showSheet is true
        <BottomSheet
          ref={bottomSheetRef} // Reference for controlling the sheet
          index={1} // Initial index (expanded)
          snapPoints={snapPoints} // Snap points for sheet positions
          enablePanDownToClose={false}
          onChange={handleSheetChange} // Callback when sheet position changes
          backgroundStyle={{ borderRadius: 24 }}
        >
          <BottomSheetView>
            {!isCollapsed && ( // Only show content if not collapsed
              <>
                <Text style={styles.bottomSheetText}>جاهز لبدء تجربتك مع سالم؟</Text>
                <TouchableOpacity style={styles.bottomSheetButton}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> 
                     إبدأ الآن
                    
                  
                  </Text>
                 
                </TouchableOpacity>
              </>
            )}
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
}

// Defining styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full screen
  },

  map: {
    width: '100%', // Makes the map take up the full width of the screen
    height: '100%',  // Makes the map take up the full height of the screen
  },

  bottomSheetText: {
    fontSize: 23,
    color: '#4B217F',
    marginBottom: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bottomSheetButton: {
    backgroundColor: '#4B217F',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 105,
    marginBottom: 30,
    marginTop: -5,
    alignItems: 'center',
    alignSelf: 'center',
  },

  mapTouchable: {
    flex: 1,
  },

  controlIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
});
