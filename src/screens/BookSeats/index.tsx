import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Screen from '@components/Screen';
import Text from '@components/Text';
import palette from '@styles/palette';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@components/Button';
import SeatTag from './components/SeatTag';
import { BookSeatsProps } from '@navigators/index';
import { useOrientation } from '@hooks/useOrientation';


const screenImage = require('../../../assets/images/theatre_screen.png');

type SeatStatus =  'selected' | 'not_available' | 'vip' | 'regular';

interface SeatProps {
  status: SeatStatus;
  onPress: () => void;
}

interface SelectedSeat {
  id: string;
  row: number;
  seatNumber: number;
}

const Seat = ({ status, onPress }: SeatProps) => (
  <Pressable
    onPress={status === 'not_available' ? undefined : onPress}
    style={[styles.seat, styles[status]]}
  >
    <View />
  </Pressable>
);

const ROWS = 10;
const SEATS_PER_ROW = 14;
const BOOKED_SEATS = ['0-1', '0-2', '1-4', '2-3', '3-7', '4-5', '5-2', '6-8', '7-1', '8-4', '9-6'];

const BookSeatsScreen = ({ route }: BookSeatsProps) => {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  const { hall, time, date, movieTitle } = route.params;

  const zoomableViewRef = useRef<ReactNativeZoomableView>(null);
  const scrollViewRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const isLandscape = useOrientation();

  const execAfterZoom = async () => {
    if (scrollViewRef && zoomableViewRef?.current) {
      const currentZoom = await zoomableViewRef.current.getZoomLevel();
      setScrollEnabled(currentZoom < 1.01);
    }
  };

  const handleSeatPress = (seatId: string, row: number, seatNumber: number) => {
    setSelectedSeats(prev => {
      const existingSeat = prev.find(seat => seat.id === seatId);
      if (existingSeat) {
        return prev.filter(seat => seat.id !== seatId);
      }
      return [...prev, { id: seatId, row: row + 1, seatNumber: seatNumber + 1 }];
    });
  };

  const handleZoomIn = () => {
    zoomableViewRef.current?.zoomBy(0.1);
  };

  const handleZoomOut = () => {
    zoomableViewRef.current?.zoomBy(-0.1);
  };

  const renderSeats = () => {
    const rows = [];
    for (let row = 0; row < ROWS; row++) {
      const seats = [];
      for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
        const seatId = `${row}-${seat}`;
        const status: SeatStatus = BOOKED_SEATS.includes(seatId) ? 'not_available'
          : selectedSeats.some(s => s.id === seatId) ? 'selected'
          : row >= ROWS - 1 ? 'vip'
          : 'regular';

        seats.push(
          <Seat
            key={seatId}
            status={status}
            onPress={() => handleSeatPress(seatId, row, seat)}
          />
        );
      }
      rows.push(
        <View key={row} style={styles.row}>
          <Text style={styles.rowLabel}>{row + 1}</Text>
          <View style={styles.seatsRow}>{seats}</View>
        </View>
      );
    }
    return rows;
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      // VIP seats are in the last row (row 10)
      const isVIP = seat.row === ROWS;
      return total + (isVIP ? 150 : 50);
    }, 0);
  };

  return (
    <Screen horizontalPadding={0} showNavbar title={movieTitle} showBackButton subtitle={`${date} | ${time} ${hall}`}>
      <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
        <View style={[styles.seatsContainer, isLandscape && styles.landscapeSeatsContainer]}>
          <ScrollView horizontal scrollEnabled={scrollEnabled} ref={scrollViewRef}>
            <ReactNativeZoomableView
              maxZoom={1.5}
              minZoom={0.5}
              zoomStep={0.5}
              initialZoom={0.7}
              contentHeight={300}
              contentWidth={300}
              bindToBorders={false}
              ref={zoomableViewRef}
              onZoomAfter={execAfterZoom}
              onShiftingEnd={execAfterZoom}
              disablePanOnInitialZoom={true}
            >
              <View>
                <View style={styles.screenContainer}>
                  <Image source={screenImage} />
                  <Text style={styles.screenLabel}>SCREEN</Text>
                </View>
                {renderSeats()}
              </View>
            </ReactNativeZoomableView>
          </ScrollView>
          <View style={styles.zoomControls}>
            <Pressable style={styles.zoomButton} onPress={handleZoomIn}>
              <Icon name='plus' size={10.73} color='#000000' />
            </Pressable>
            <Pressable style={styles.zoomButton} onPress={handleZoomOut}>
              <Icon name='minus' size={10.73} color='#000000' />
            </Pressable>
          </View>
        </View>

        <View style={[styles.bottomContainer, isLandscape && styles.landscapeBottomContainer]}>
          <View style={styles.legend}>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.seat, styles.selected]} />
                <Text variant="secondary" weight="Medium">Selected</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.seat, styles.not_available]} />
                <Text variant="secondary" weight="Medium">Not available</Text>
              </View>
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.seat, styles.vip]} />
                <Text variant="secondary" weight="Medium">VIP (150$)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.seat, styles.regular]} />
                <Text variant="secondary" weight="Medium">Regular (50$)</Text>
              </View>
            </View>
          </View>

          {selectedSeats.length > 0 && (
            <View style={styles.selectedSeatsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.seatTags}>
                  {selectedSeats.map((seat) => (
                    <SeatTag
                      key={seat.id}
                      row={seat.row}
                      seatNumber={seat.seatNumber}
                      onCancel={() => handleSeatPress(seat.id, seat.row - 1, seat.seatNumber - 1)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
          <View style={[styles.ctaContainer]}>
            <View style={styles.priceContainer}>
              <Text variant="primary" weight="Medium" size="x_small">Total</Text>
              <Text variant="primary" weight="SemiBold" size="large">${calculateTotalPrice()}</Text>
            </View>
            <View style={styles.ctaButtonContainer}>
              <Button 
                title="Proceed to pay" 
                onPress={() => {}} 
                disabled={selectedSeats.length === 0}
              />
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seatsContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: palette.surface_primary,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    minHeight: 252,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  screenLabel: {
    marginTop: -28,
    color: palette.text_secondary,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  rowLabel: {
    width: 20,
    marginRight: 8,
    textAlign: 'center',
    color: palette.text_secondary,
  },
  seatsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  seat: {
    width: 24,
    height: 24,
    borderRadius: 4,
    margin: 1,
  },
  regular: {
    backgroundColor: palette.primary,
  },
  selected: {
    backgroundColor: palette.tag_gold,
  },
  not_available: {
    backgroundColor: palette.disabled,
  },
  vip:{
    backgroundColor: palette.tag_purple,
  },
  legend: {
    alignItems: 'flex-start',
    marginTop: 26,
    gap: 15,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 55.65,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.84,
    minWidth: 120,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  zoomButton: {
    width: 29.13,
    height: 29.13,
    borderRadius: 20,
    borderWidth: 0.9,
    borderColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButtonText: {
    fontSize: 10.73,
    color: '#000000',
    lineHeight: 10.73,
  },
  selectedSeatsContainer: {
    marginTop: 16,
  },
  seatTags: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 'auto',
  },
  priceContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: palette.surface_primary,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  ctaButtonContainer: {
    flex: 5,
  },
  landscapeContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  landscapeSeatsContainer: {
    width: '60%',
    height: '100%',
  },
  landscapeBottomContainer: {
    width: '40%',
    height: '100%',
    paddingTop: 20,
    minHeight: 'auto',
  },
});

export default BookSeatsScreen;
