// screens/MyPageScreen.js
import { Ionicons } from '@expo/vector-icons';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

export default function MyPageScreen() {
  const membershipTier = 'free'; // free, basic, premium, vip

  const MenuItem = ({ icon, title, badge, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={24} color={Colors.textPrimary} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <View style={styles.menuRight}>
        {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 프로필 헤더 */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>패션러버</Text>
            <View style={styles.membershipBadge}>
              <Ionicons name="star" size={14} color={Colors.membership[membershipTier]} />
              <Text style={[styles.membershipText, { color: Colors.membership[membershipTier] }]}>
                {membershipTier.toUpperCase()}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* 팔로워/팔로잉 */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>256</Text>
            <Text style={styles.statLabel}>팔로워</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>143</Text>
            <Text style={styles.statLabel}>팔로잉</Text>
          </View>
        </View>
      </View>

      {/* 멤버십 정보 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>멤버십 혜택</Text>
        <View style={styles.membershipCard}>
          <View style={styles.membershipRow}>
            <Text style={styles.membershipLabel}>AI 피팅 잔여</Text>
            <Text style={styles.membershipValue}>3회</Text>
          </View>
          <View style={styles.membershipRow}>
            <Text style={styles.membershipLabel}>코디 요청 잔여</Text>
            <Text style={styles.membershipValue}>무제한</Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>프리미엄 업그레이드</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 쇼핑 관리 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>쇼핑</Text>
        <MenuItem icon="cart-outline" title="장바구니" badge="5" />
        <MenuItem icon="heart-outline" title="찜한 상품" badge="12" />
        <MenuItem icon="time-outline" title="최근 본 상품" />
        <MenuItem icon="receipt-outline" title="주문/배송 조회" />
        <MenuItem icon="star-outline" title="리뷰 관리" />
      </View>

      {/* 나의 활동 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>나의 활동</Text>
        <MenuItem icon="create-outline" title="작성한 코디 요청" />
        <MenuItem icon="gift-outline" title="받은 코디 제안" badge="3" />
        <MenuItem icon="people-outline" title="팔로우한 인플루언서" />
        <MenuItem icon="bookmark-outline" title="저장한 콘텐츠" />
      </View>

      {/* 포인트/쿠폰 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>혜택</Text>
        <MenuItem icon="wallet-outline" title="포인트" badge="2,340P" />
        <MenuItem icon="pricetag-outline" title="쿠폰" badge="5장" />
      </View>

      {/* 인플루언서 전환 */}
      <TouchableOpacity style={styles.influencerBanner}>
        <Ionicons name="sparkles" size={32} color={Colors.accent} />
        <View style={styles.influencerText}>
          <Text style={styles.influencerTitle}>인플루언서로 활동하기</Text>
          <Text style={styles.influencerSubtitle}>코디 제안하고 수익 창출하세요</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // 프로필 섹션
  profileSection: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: Colors.backgroundLight,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.backgroundLight,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
  },

  // 통계
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },

  // 섹션
  section: {
    paddingVertical: 12,
    borderBottomWidth: 8,
    borderBottomColor: Colors.backgroundLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  // 멤버십 카드
  membershipCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
  },
  membershipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  membershipLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  membershipValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundCard,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  upgradeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },

  // 메뉴 아이템
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  // 인플루언서 배너
  influencerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.accent,
    gap: 16,
  },
  influencerText: {
    flex: 1,
  },
  influencerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  influencerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  bottomPadding: {
    height: 40,
  },
});