import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, FlatList, useWindowDimensions } from 'react-native';
import Text from '@components/Text';
import Screen from '@components/Screen';
import { SelectCinemaProps } from '@navigators/index';
import palette from '@styles/palette';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/index';
import Button from '@components/Button';

const DATES = [
  { date: '5 Mar' },
  { date: '6 Mar' },
  { date: '7 Mar' },
  { date: '8 Mar' },
  { date: '9 Mar' },
];

type Showtime = {
  time: string;
  hall: string;
  price: number;
  bonus: number;
};

const SHOWTIMES: Showtime[] = [
  { time: '12:30', hall: 'Cinetech + Hall 1', price: 50, bonus: 2500 },
  { time: '13:30', hall: 'Cinetech + Hall 2', price: 75, bonus: 3000 },
  { time: '14:30', hall: 'Cinetech + Hall 3', price: 100, bonus: 3500 },
];

const SelectCinema: React.FC<SelectCinemaProps> = ({ route }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { title } = route.params;

  const handleShowtimePress = () => {
    if (selectedTime === null || selectedDate === null || selectedCinema === null) {
      // You might want to show an alert or message to select all options
      return;
    }

    const selectedHall = SHOWTIMES.find(showtime => showtime.time === selectedTime);
    const selectedDateValue = DATES.find(date => date.date === selectedDate);

    navigation.navigate('BookSeats', {
      hall: selectedHall?.hall || '',
      time: selectedTime,
      date: selectedDateValue?.date || '',
      price: selectedHall?.price || 0,
      movieTitle: title,
    });
  };

  const handleCinemaPress = (item: Showtime) => {
    setSelectedCinema(item.hall);
    setSelectedTime(item.time);
  };

  const renderCinemaImage = ({item}: {item: Showtime}) => {
    return (
      <Pressable onPress={() => handleCinemaPress(item)}>
        <View style={styles.showtimeContainer}>
          <Text style={styles.mr9} weight="Medium" size="small">{item.time}</Text>
          <Text variant="secondary">{item.hall}</Text>
        </View>
        <View style={[
          styles.cinemaImageContainer,
          selectedTime === item.time && styles.cinemaImageContainerSelected
        ]}>
          <Image 
            source={require('../../../assets/images/cinema_image.png')}
            resizeMode="cover"
          />
        </View>
        <View style={styles.mt10}>
          <Text size="small" variant="secondary">From <Text weight="SemiBold">{item.price}$ </Text>or <Text weight="SemiBold">{item.bonus} bonus</Text></Text>
        </View>
      </Pressable>
    );
  };

  const isSelectionComplete = selectedDate && selectedTime && selectedCinema;

  return (
    <Screen showNavbar title={title} subtitle="In Theaters Dec 22 2021">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[
          styles.container,
          isLandscape && styles.containerLandscape,
        ]}>
          <View style={styles.dateSection}>
          <Text style={styles.dateTitle} variant="primary" weight="Medium" size="large">
              Date
            </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.datesContainer}>
                {DATES.map((date, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.dateItem,
                      selectedDate === date.date && styles.selectedDateItem,
                    ]}
                    onPress={() => setSelectedDate(date.date)}
                  >
                    <Text
                      variant={selectedDate === date.date ? 'light' : 'primary'}
                      weight="SemiBold"
                      size="medium"
                    >
                      {date.date}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.showtimesContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={SHOWTIMES}
              renderItem={renderCinemaImage}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
          <Button title="Select Seats" disabled={!isSelectionComplete} onPress={handleShowtimePress} />
        </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLandscape: {
    marginTop: 20,
    paddingBottom: 20,
    flex: undefined, // Remove flex property in landscape
  },
  dateSection: {
    marginBottom: 24,
  },
  datesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    gap: 12,
  },
  dateTitle: {
    marginBottom: 14,
  },
  dateItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(166, 166, 166, 0.1)',
  },
  selectedDateItem: {
    backgroundColor: palette.primary,
    opacity: 1,
  },
  showtimesContainer: {
    marginBottom: 24,
  },
  showtimeItem: {
    backgroundColor: palette.surface_primary,
    borderRadius: 10,
    padding: 16,
  },
  timeContainer: {
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cinemaImageContainer: {
    width: 249,
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(32, 44, 67, 0.1)',
    marginRight: 10,
  },
  cinemaImagesSection:{
    marginTop: 39,
  },
  cinemaImageContainerSelected: {
    borderColor: palette.primary,
  },
  showtimeContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  mr9:{
    marginRight: 9,
  },
  buttonContainer: {
    marginBottom: 26,
  },
  mt10:{
    marginTop: 10,
  },
  selectedShowtimeItem: {
    borderColor: palette.primary,
    borderWidth: 1,
  },
  cinemaTitle: {
    marginBottom: 14,
  },
});

export default SelectCinema;
