// screens/fitting/TutorialScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Colors from '../../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TUTORIAL_STEPS = [
  {
    id: 1,
    title: '아바타 확인',
    description: '촬영한 사진으로 생성된\n3D 아바타를 확인하세요',
    icon: 'person',
    illustration: '👤',
  },
  {
    id: 2,
    title: '옷 선택',
    description: '하단 탭에서 원하는\n카테고리를 선택하세요',
    icon: 'apps',
    illustration: '👕',
  },
  {
    id: 3,
    title: '옷 입히기',
    description: '옷 카드를 클릭하면\n아바타에 자동으로 착용됩니다',
    icon: 'hand-left',
    illustration: '👆',
  },
  {
    id: 4,
    title: '각도 조절',
    description: '화면을 드래그하여\n360도 회전할 수 있습니다',
    icon: 'sync',
    illustration: '🔄',
  },
  {
    id: 5,
    title: '제스처 가이드',
    description: '한 손가락: 회전\n두 손가락: 확대/축소\n핀치: 줌 인/아웃',
    icon: 'hand-right',
    illustration: '🤏',
  },
];

export default function TutorialScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <View style={styles.container}>
      {/* 진행 표시 */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          사용법 ({currentStep + 1}/{TUTORIAL_STEPS.length})
        </Text>
        <View style={styles.progressBar}>
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* 튜토리얼 내용 */}
      <View style={styles.content}>
        {/* 일러스트 */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>{step.illustration}</Text>
        </View>

        {/* 제목 및 설명 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>
        </View>

        {/* 추가 설명 (필요 시) */}
        {currentStep === 2 && (
          <View style={styles.exampleBox}>
            <Ionicons name="information-circle" size={20} color={Colors.accent} />
            <Text style={styles.exampleText}>
              같은 카테고리 내에서는 하나만 착용 가능합니다
            </Text>
          </View>
        )}

        {currentStep === 4 && (
          <View style={styles.gestureGuide}>
            <View style={styles.gestureItem}>
              <Text style={styles.gestureEmoji}>👆</Text>
              <Text style={styles.gestureText}>방 회전</Text>
              <Text style={styles.gestureSubtext}>한 손가락 밀기</Text>
            </View>
            <View style={styles.gestureItem}>
              <Text style={styles.gestureEmoji}>↕️</Text>
              <Text style={styles.gestureText}>시점 이동</Text>
              <Text style={styles.gestureSubtext}>두 손가락 밀기</Text>
            </View>
            <View style={styles.gestureItem}>
              <Text style={styles.gestureEmoji}>🤏</Text>
              <Text style={styles.gestureText}>확대/축소</Text>
              <Text style={styles.gestureSubtext}>핀치 (펀치)</Text>
            </View>
          </View>
        )}
      </View>

      {/* 다음 버튼 */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentStep === TUTORIAL_STEPS.length - 1 ? '시작하기' : '다음'}
        </Text>
        <Ionicons 
          name={currentStep === TUTORIAL_STEPS.length - 1 ? 'checkmark' : 'arrow-forward'} 
          size={20} 
          color={Colors.textPrimary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  // 진행 표시
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.backgroundLight,
  },
  progressDotActive: {
    backgroundColor: Colors.accent,
    width: 24,
  },

  // 콘텐츠
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  illustration: {
    fontSize: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },

  // 추가 설명
  exampleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 20,
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  // 제스처 가이드
  gestureGuide: {
    width: '100%',
    gap: 16,
    marginTop: 20,
  },
  gestureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  gestureEmoji: {
    fontSize: 32,
  },
  gestureText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  gestureSubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // 다음 버튼
  nextButton: {
    flexDirection: 'row',
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
});