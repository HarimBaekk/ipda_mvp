// screens/fitting/AvatarViewer.js
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Colors from '../../constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AvatarViewer({ wornItems, photos }) {
  const rotationY = useRef(new Animated.Value(0)).current;
  const lastRotation = useRef(0);

  // 드래그 제스처 처리
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        // 좌우 드래그로 회전
        const newRotation = lastRotation.current + gesture.dx * 0.5;
        rotationY.setValue(newRotation);
      },
      onPanResponderRelease: (_, gesture) => {
        lastRotation.current += gesture.dx * 0.5;
      },
    })
  ).current;

  // 회전값을 각도로 변환
  const rotation = rotationY.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* 3D 뷰어 플레이스홀더 */}
      <View style={styles.avatarContainer}>
        <Animated.View
          style={[
            styles.avatar,
            {
              transform: [{ rotateY: rotation }],
            },
          ]}
        >
          {/* 아바타 실루엣 (검정 바디수트) */}
          <View style={styles.avatarSilhouette}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarBody} />
            <View style={styles.avatarArms}>
              <View style={styles.avatarArm} />
              <View style={styles.avatarArm} />
            </View>
            <View style={styles.avatarLegs}>
              <View style={styles.avatarLeg} />
              <View style={styles.avatarLeg} />
            </View>
          </View>

          {/* 착용한 옷 표시 (간단한 오버레이) */}
          {wornItems.top && (
            <View style={styles.wornItemIndicator}>
              <Text style={styles.wornItemText}>👕 {wornItems.top.name}</Text>
            </View>
          )}
          {wornItems.bottom && (
            <View style={[styles.wornItemIndicator, { top: 250 }]}>
              <Text style={styles.wornItemText}>👖 {wornItems.bottom.name}</Text>
            </View>
          )}
        </Animated.View>

        {/* 회전 힌트 */}
        <View style={styles.hintContainer}>
          <Ionicons name="swap-horizontal" size={20} color={Colors.textSecondary} />
          <Text style={styles.hintText}>좌우로 드래그하여 회전</Text>
        </View>
      </View>

      {/* 그리드 배경 */}
      <View style={styles.gridBackground} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 그리드 배경 (3D 느낌)
  gridBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  // 아바타 컨테이너
  avatarContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 아바타 실루엣 (검정 바디수트)
  avatarSilhouette: {
    width: 120,
    height: 300,
    alignItems: 'center',
    position: 'relative',
  },
  avatarHead: {
    width: 50,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#000',
    marginBottom: 10,
  },
  avatarBody: {
    width: 80,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 10,
  },
  avatarArms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    position: 'absolute',
    top: 70,
  },
  avatarArm: {
    width: 15,
    height: 80,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  avatarLegs: {
    flexDirection: 'row',
    gap: 10,
  },
  avatarLeg: {
    width: 30,
    height: 120,
    backgroundColor: '#000',
    borderRadius: 8,
  },

  // 착용 아이템 표시
  wornItemIndicator: {
    position: 'absolute',
    top: 150,
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  wornItemText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  // 힌트
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
  },
  hintText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});