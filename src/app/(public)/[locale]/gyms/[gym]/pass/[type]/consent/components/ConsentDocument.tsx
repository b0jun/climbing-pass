/* eslint-disable jsx-a11y/alt-text */

import { Gym, Locale, Pass } from '@prisma/client';
import { Document, Page, Text, Image, View, StyleSheet, Font } from '@react-pdf/renderer';

import { interpolate } from '@/app/admin/[gym]/pass-list/[id]/utils/interpolate';
import { dayjsUTC } from '@/shared/lib/dayjs-config';
import en from '@locales/en.json';
import ko from '@locales/ko.json';

// * PDF 폰트 설정
Font.register({
  family: 'Pretendard',
  fonts: [
    {
      src: 'https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff',
      fontWeight: 400,
    },
    {
      src: 'https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff',
      fontWeight: 600,
    },
  ],
});
Font.registerHyphenationCallback((word) => [word]); // * 줄바뀜시 하이픈 제거

// * PDF 스타일 설정
const styles = StyleSheet.create({
  page: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: 'Pretendard',
    fontSize: 12,
  },
  header: {
    marginBottom: 12,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d5db',
    paddingBottom: 8,
    marginBottom: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 6,
    alignItems: 'center',
  },
  infoLabelContainer: {
    backgroundColor: '#C9CCD599',
    width: 60,
    height: '100%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  infoLabelText: {
    fontSize: 12,
  },
  infoValueText: {
    fontSize: 12,
    flex: 1,
  },
  entryTimeRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  agreementContainer: {
    marginTop: 16,
  },
  agreementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  agreementHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#C9CCD599',
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 6,
  },
  agreementHeaderText: {
    fontSize: 12,
  },
  agreementList: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 4,
    paddingVertical: 6,
    gap: 4,
  },
  agreementItem: {
    fontSize: 10,
    gap: 2,
  },
  agreementItemTitle: {
    fontWeight: 'bold',
  },
  agreementItemContent: {
    fontWeight: 'normal',
    marginLeft: 6,
    lineHeight: 0.8,
  },
  signatureWrapper: {
    marginTop: 'auto',
  },
  signatureAgreementText: {
    textAlign: 'center',
    fontWeight: 'medium',
    marginBottom: 16,
  },
  signatureDateText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  signatureContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 100,
    height: 40,
    objectFit: 'contain',
  },
  signatureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7e5e4',
    paddingHorizontal: 8,
    gap: 16,
  },
  signatureNameText: {
    color: '#1f2937',
  },
  signaturePlaceholder: {
    color: '#a8a29e',
    fontSize: 12,
  },
  signatureImage: {
    width: 60,
    height: 40,
    objectFit: 'contain',
    position: 'absolute',
    left: -15,
    top: -13,
  },
} as const);

type PdfDataType = {
  name: Pass['name'];
  phoneNumber: Pass['phoneNumber'];
  dateOfBirth: Pass['dateOfBirth'];
  locale: Locale;
  signData: string;
  gymName: Gym['name'];
  gymLocation: Gym['location'];
};

interface ConsentDocumentProps {
  pdfData: PdfDataType;
}

function parseConsentText(text: string) {
  return text.split('\n\n').map((item) => {
    const [title, ...content] = item.split('\n');
    return { title, content: content.join('\n') };
  });
}

export function ConsentDocument({ pdfData }: ConsentDocumentProps) {
  const createdTime = dayjsUTC();

  // TODO: 동의서 스키마 추가 시 해당 로직 수정 필요
  const isKo = pdfData.locale === 'ko';
  const i18n = isKo ? ko : en;
  const consent = i18n.Consent;
  const consentDesc = interpolate(consent.consentDesc, {
    gymName: isKo ? '돌멩이 클라이밍' : 'Dolmenge Climbing',
    gymLocation: isKo ? '전포점' : 'Jeonpo',
  });
  const consentItems = parseConsentText(consentDesc);

  return (
    <Document>
      <Page style={styles.page}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {pdfData.gymName} {pdfData.gymLocation} 일일 패스 동의서
          </Text>
        </View>

        {/* 개인 정보 */}
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoLabelText}>이름</Text>
            </View>
            <Text style={styles.infoValueText}>{pdfData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoLabelText}>생년월일</Text>
            </View>
            <Text style={styles.infoValueText}>{pdfData.dateOfBirth}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoLabelText}>연락처</Text>
            </View>
            <Text style={styles.infoValueText}>{pdfData.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.entryTimeRow}>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoLabelText}>등록시간</Text>
            </View>
            <Text style={styles.infoValueText}>{createdTime.format('YYYY년 MM월 DD일, A h:mm')}</Text>
          </View>
        </View>

        {/* 동의 내용 */}
        <View style={styles.agreementContainer}>
          <Text style={styles.agreementTitle}>이용약관 및 동의사항</Text>
          <View style={styles.agreementHeader}>
            <Text style={styles.agreementHeaderText}>실내 클라이밍 위험 고지</Text>
          </View>
          <View style={styles.agreementList}>
            {consentItems.map((item, index) => (
              <View key={index} style={styles.agreementItem}>
                <Text style={styles.agreementItemTitle}>{item.title}</Text>
                <Text style={styles.agreementItemContent}>{item.content}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 서명 */}
        <View style={styles.signatureWrapper}>
          <Text style={styles.signatureAgreementText}>
            본인은 약관에 대해 충분히 읽고 이해하였으며 이에 동의하여 일일 패스 이용권을 신청합니다.
          </Text>
          <Text style={styles.signatureDateText}>{createdTime.format('YYYY년 MM월 DD일')}</Text>
          <View style={styles.signatureContent}>
            <Text>신청인</Text>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureNameText}>{pdfData.name}</Text>
              <View>
                <Text style={styles.signaturePlaceholder}>(서명)</Text>
                <Image src={pdfData.signData} style={styles.signatureImage} />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
