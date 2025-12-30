// screens/FittingScreen.js
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

export default function FittingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Ionicons name="sparkles" size={64} color={Colors.accent} />
        <Text style={styles.title}>AI 피팅룸</Text>
        <Text style={styles.subtitle}>
          3D 공간에서 가상으로{'\n'}옷을 입어보세요
        </Text>
        
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>피팅 시작하기</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 오늘의집 스타일 3D 레이아웃으로{'\n'}
            상품을 배치하고 확인할 수 있습니다
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: Colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});