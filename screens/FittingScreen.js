// screens/FittingScreen.js
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const STEPS = {
  INTRO: 'intro',
  CAMERA_FRONT: 'camera_front',
  CAMERA_SIDE: 'camera_side',
  TUTORIAL: 'tutorial',
  MAIN: 'main',
};

const TUTORIAL_STEPS = [
  { step: 1, title: '아바타 확인', description: '촬영한 사진으로 3D 아바타가 생성되었습니다.\n드래그하여 아바타를 회전시켜 보세요.' },
  { step: 2, title: '옷 선택', description: '하단의 카테고리에서 원하는 옷을 선택하세요.\n내 옷장, 추천 상의, 하의 등 다양한 카테고리가 있습니다.' },
  { step: 3, title: '옷 입히기', description: '원하는 옷을 클릭하면 아바타에 자동으로 착용됩니다.\n여러 카테고리를 조합해서 코디해보세요.' },
  { step: 4, title: '각도 조절', description: '아바타를 360도 회전시켜 다양한 각도에서\n코디를 확인할 수 있습니다.' },
  { step: 5, title: '제스처 가이드', description: '마지막으로 제스처 사용법을 알려드릴게요.', gesture: true },
];

const CATEGORIES = [
  { id: 'closet', name: '내 옷장', icon: 'bookmark' },
  { id: 'top', name: '추천 상의', icon: 'shirt-outline' },
  { id: 'bottom', name: '추천 하의', icon: 'man-outline' },
  { id: 'dress', name: '원피스', icon: 'woman-outline' },
  { id: 'outer', name: '아우터', icon: 'shirt' },
  { id: 'shoes', name: '신발', icon: 'footsteps-outline' },
];

const DUMMY_ITEMS = {
  top: Array.from({ length: 10 }, (_, i) => ({
    id: `top-${i}`, name: `상의 ${i + 1}`,
    imageUrl: `https://source.unsplash.com/random/200x200?shirt&sig=${i}`,
    brand: 'BRAND', price: 29000 + i * 5000,
  })),
  bottom: Array.from({ length: 10 }, (_, i) => ({
    id: `bottom-${i}`, name: `하의 ${i + 1}`,
    imageUrl: `https://source.unsplash.com/random/200x200?pants&sig=${i}`,
    brand: 'BRAND', price: 39000 + i * 5000,
  })),
};

function PoseGuide({ isFront }) {
  const joints = isFront ? [
    { x: '50%', y: '15%' }, { x: '35%', y: '25%' }, { x: '65%', y: '25%' },
    { x: '25%', y: '35%' }, { x: '75%', y: '35%' }, { x: '20%', y: '45%' },
    { x: '80%', y: '45%' }, { x: '50%', y: '40%' }, { x: '40%', y: '60%' },
    { x: '60%', y: '60%' }, { x: '38%', y: '80%' }, { x: '62%', y: '80%' },
  ] : [
    { x: '50%', y: '15%' }, { x: '50%', y: '25%' }, { x: '48%', y: '35%' },
    { x: '45%', y: '45%' }, { x: '50%', y: '40%' }, { x: '50%', y: '60%' }, { x: '50%', y: '80%' },
  ];

  return (
    <View style={styles.guideOverlay}>
      <View style={styles.silhouette}>
        {joints.map((joint, i) => (
          <View key={i} style={[styles.joint, { left: joint.x, top: joint.y }]} />
        ))}
      </View>
    </View>
  );
}

export default function FittingScreen() {
  const [step, setStep] = useState(STEPS.INTRO);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('top');
  const [selectedItems, setSelectedItems] = useState({});
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      await cameraRef.current.takePictureAsync();
      setStep(step === STEPS.CAMERA_FRONT ? STEPS.CAMERA_SIDE : STEPS.TUTORIAL);
    }
  };

  const nextTutorial = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setStep(STEPS.MAIN);
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  if (step === STEPS.INTRO) {
    return (
      <View style={styles.container}>
        <View style={styles.introContent}>
          <Ionicons name="sparkles" size={80} color={Colors.accent} />
          <Text style={styles.introTitle}>AI 가상 피팅룸</Text>
          <Text style={styles.introSubtitle}>전신 사진을 촬영하여{'\n'}나만의 3D 아바타를 생성하세요</Text>
          <TouchableOpacity style={styles.startButton} onPress={async () => {
            if (!permission?.granted) await requestPermission();
            setStep(STEPS.CAMERA_FRONT);
          }}>
            <Text style={styles.startButtonText}>피팅 시작하기</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (step === STEPS.CAMERA_FRONT || step === STEPS.CAMERA_SIDE) {
    if (!permission?.granted) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Ionicons name="camera-outline" size={80} color={Colors.textSecondary} />
          <Text style={[styles.permissionText, { marginTop: 20, marginBottom: 30 }]}>카메라 권한이 필요합니다</Text>
          <TouchableOpacity onPress={requestPermission} style={styles.startButton}>
            <Text style={styles.startButtonText}>권한 허용하기</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const isFront = step === STEPS.CAMERA_FRONT;
    return (
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back">
          <View style={styles.cameraHeader}>
            <TouchableOpacity onPress={() => setStep(STEPS.INTRO)}>
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
            <View style={styles.stepIndicator}>
              <Text style={styles.stepText}>{isFront ? '정면' : '측면'} 촬영 ({isFront ? '1' : '2'}/2)</Text>
            </View>
            <View style={{ width: 32 }} />
          </View>
          <PoseGuide isFront={isFront} />
          <View style={styles.cameraFooter}>
            <Text style={styles.guideText}>{isFront ? '가이드에 맞춰 정면을 향해 서주세요' : '가이드에 맞춰 옆으로 서주세요'}</Text>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  if (step === STEPS.TUTORIAL) {
    const current = TUTORIAL_STEPS[tutorialStep];
    return (
      <View style={styles.container}>
        <View style={styles.avatarPlaceholder}>
          <View style={styles.avatarSilhouette}>
            <Ionicons name="person" size={120} color={Colors.textSecondary} />
            <Text style={styles.avatarLabel}>검정 바디수트 착용</Text>
          </View>
        </View>
        <View style={styles.tutorialOverlay}>
          <View style={styles.tutorialModal}>
            <Text style={styles.tutorialStep}>사용법 ({current.step}/5)</Text>
            <Text style={styles.tutorialTitle}>{current.title}</Text>
            <Text style={styles.tutorialDescription}>{current.description}</Text>
            {current.gesture && (
              <View style={styles.gestureGuide}>
                {[
                  { emoji: '👆', title: '방 회전', desc: '한 손가락 밀기' },
                  { emoji: '✌️', title: '시점 이동', desc: '두 손가락 밀기' },
                  { emoji: '🤏', title: '확대·축소', desc: '두 손가락 펴고 오므리기 (핀치)' },
                ].map((g, i) => (
                  <View key={i} style={styles.gestureRow}>
                    <View style={styles.gestureIcon}><Text style={styles.gestureEmoji}>{g.emoji}</Text></View>
                    <View style={styles.gestureTextContainer}>
                      <Text style={styles.gestureTitle}>{g.title}</Text>
                      <Text style={styles.gestureDesc}>{g.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity style={styles.tutorialButton} onPress={nextTutorial}>
              <Text style={styles.tutorialButtonText}>{tutorialStep < 4 ? '다음' : '시작하기'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarViewer}>
        <View style={styles.avatarSilhouette}>
          <Ionicons name="person" size={200} color={Colors.textSecondary} />
          <Text style={styles.avatarLabel}>3D 아바타 (Three.js 구현 예정)</Text>
          <Text style={styles.avatarSubLabel}>검정 바디수트 착용 중</Text>
        </View>
      </View>

      <View style={styles.fittingHeader}>
        <TouchableOpacity onPress={() => setStep(STEPS.INTRO)}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI 피팅룸</Text>
        <TouchableOpacity><Ionicons name="camera-outline" size={24} color={Colors.textPrimary} /></TouchableOpacity>
      </View>

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={['30%', '75%']} enablePanDownToClose={false}>
        <View style={styles.bottomSheetContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryTabs}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={[styles.categoryTab, selectedCategory === cat.id && styles.categoryTabActive]}
                onPress={() => setSelectedCategory(cat.id)}>
                <Ionicons name={cat.icon} size={28} color={selectedCategory === cat.id ? Colors.accent : Colors.textSecondary} />
                <Text style={[styles.categoryTabText, selectedCategory === cat.id && styles.categoryTabTextActive]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.itemsScrollContent}>
            <View style={styles.itemsGrid}>
              {(DUMMY_ITEMS[selectedCategory] || []).map((item) => {
                const isSelected = selectedItems[selectedCategory]?.id === item.id;
                return (
                  <TouchableOpacity key={item.id} style={[styles.itemCard, isSelected && styles.itemCardSelected]}
                    onPress={() => setSelectedItems(prev => ({ ...prev, [selectedCategory]: item }))}>
                    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                    {isSelected && (
                      <View style={styles.checkIcon}>
                        <Ionicons name="checkmark-circle" size={28} color={Colors.accent} />
                      </View>
                    )}
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemBrand}>{item.brand}</Text>
                      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  introContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  introTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.textPrimary, marginTop: 24, marginBottom: 12 },
  introSubtitle: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  startButton: { flexDirection: 'row', backgroundColor: Colors.accent, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, alignItems: 'center', gap: 8 },
  startButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
  permissionText: { color: Colors.textPrimary, fontSize: 16, textAlign: 'center' },
  camera: { flex: 1 },
  cameraHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60 },
  stepIndicator: { backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  stepText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  guideOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', paddingTop: 80 },
  silhouette: { width: SCREEN_WIDTH * 0.5, height: SCREEN_HEIGHT * 0.65, position: 'relative' },
  joint: { position: 'absolute', width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.accent, borderWidth: 3, borderColor: '#fff', marginLeft: -8, marginTop: -8 },
  cameraFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', paddingBottom: 50 },
  guideText: { color: '#fff', fontSize: 16, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, marginBottom: 30, textAlign: 'center' },
  captureButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  captureButtonInner: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.accent },
  avatarPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.backgroundLight },
  avatarViewer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.backgroundLight },
  avatarSilhouette: { alignItems: 'center' },
  avatarLabel: { color: Colors.textSecondary, fontSize: 14, marginTop: 16 },
  avatarSubLabel: { color: Colors.textSecondary, fontSize: 12, marginTop: 4 },
  tutorialOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end', paddingBottom: 40 },
  tutorialModal: { backgroundColor: Colors.backgroundLight, marginHorizontal: 20, borderRadius: 16, padding: 24 },
  tutorialStep: { fontSize: 14, color: Colors.textSecondary, marginBottom: 8 },
  tutorialTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 12 },
  tutorialDescription: { fontSize: 15, color: Colors.textPrimary, lineHeight: 22, marginBottom: 24 },
  gestureGuide: { gap: 20, marginBottom: 24 },
  gestureRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  gestureIcon: { width: 50, height: 50, backgroundColor: Colors.backgroundCard, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  gestureEmoji: { fontSize: 28 },
  gestureTextContainer: { flex: 1 },
  gestureTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
  gestureDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  tutorialButton: { backgroundColor: Colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  tutorialButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
  fittingHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, zIndex: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  bottomSheetContent: { flex: 1 },
  categoryTabs: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 4 },
  categoryTab: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, minWidth: 70 },
  categoryTabActive: { backgroundColor: Colors.backgroundCard },
  categoryTabText: { fontSize: 11, color: Colors.textSecondary, marginTop: 6, fontWeight: '600' },
  categoryTabTextActive: { color: Colors.accent, fontWeight: 'bold' },
  itemsScrollContent: { padding: 16 },
  itemsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  itemCard: { width: (SCREEN_WIDTH - 56) / 2, backgroundColor: Colors.backgroundCard, borderRadius: 12, overflow: 'hidden', position: 'relative', borderWidth: 3, borderColor: 'transparent' },
  itemCardSelected: { borderColor: Colors.accent },
  checkIcon: { position: 'absolute', top: 8, right: 8, backgroundColor: Colors.background, borderRadius: 14 },
  itemImage: { width: '100%', height: 180, backgroundColor: Colors.background },
  itemInfo: { padding: 12 },
  itemBrand: { fontSize: 11, color: Colors.textSecondary, marginBottom: 3 },
  itemName: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 6 },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: Colors.textPrimary },
});