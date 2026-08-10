import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register Roboto font to fix rendering issues with special characters.
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8fafc',
    fontFamily: 'Roboto',
  },
  headerBlock: {
    backgroundColor: '#0d9488',
    padding: '40 40 80 40',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 10,
    color: '#ccfbf1',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  ticketContainer: {
    margin: '-50 40 40 40', 
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1pt solid #e2e8f0', 
  },
  ticketSection: {
    padding: 30,
  },
  dashedLine: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    borderTop: '2pt dashed #e2e8f0',
  },
  cutoutLeft: {
    position: 'absolute',
    left: -15,
    top: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8fafc',
    borderRight: '1pt solid #e2e8f0',
  },
  cutoutRight: {
    position: 'absolute',
    right: -15,
    top: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8fafc',
    borderLeft: '1pt solid #e2e8f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  col: {
    flex: 1,
  },
  colRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 9,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: 500,
  },
  statusBadge: {
    padding: '6 14',
    backgroundColor: '#ffffff',
    color: '#0d9488',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  totalAmount: {
    fontSize: 22,
    color: '#0d9488',
    fontWeight: 700,
  },
  infoBox: {
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 6,
  },
  infoBoxTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#334155',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.6,
    marginBottom: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
  }
});

interface VoucherPDFProps {
  booking: {
    id: string;
    title: string;
    location: string;
    date: string;
    status: string;
    price: string;
    duration: string;
    participants?: number;
    paymentMethod?: string;
    paymentStatus?: string;
    operatorName?: string;
    operatorPhone?: string;
    operatorEmail?: string;
    meetingPoint?: string;
    pickupTime?: string;
    travelerName?: string;
    travelerEmail?: string;
    travelerPhone?: string;
    basePrice?: number;
    subTotal?: number;
    discounts?: number;
    totalPaid?: number;
    packingList?: { item: string; required?: boolean }[];
    cancellationPolicy?: string;
  };
}

export default function VoucherPDF({ booking }: VoucherPDFProps) {
  // Fix garbled text: Replace ৳ with BDT, strip weird newlines in location/title
  const safePrice = booking.price ? booking.price.replace(/৳/g, 'BDT ') : 'BDT 0';
  const safeLocation = booking.location ? booking.location.replace(/[\n\r\t]/g, ', ') : '';
  const safeTitle = booking.title ? booking.title.replace(/[\n\r\t]/g, ' ') : '';
  
  // Create a fake verification code (Booking ID + Random 4 chars)
  const verificationCode = `${booking.id}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const isConfirmed = booking.status?.toLowerCase() === 'confirmed';
  const statusLabel = isConfirmed ? '✓ CONFIRMED & PAID' : booking.status;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Block with Solid Background */}
        <View style={styles.headerBlock}>
          <View>
            <Text style={styles.logoText}>BD Travel Spirit</Text>
            <Text style={styles.subtitle}>E-Ticket / Travel Voucher</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.statusBadge}>{statusLabel}</Text>
          </View>
        </View>

        {/* Main Ticket Card */}
        <View style={styles.ticketContainer}>
          
          {/* Top Section: User & ID */}
          <View style={styles.ticketSection}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Passenger Name</Text>
                <Text style={styles.value}>{booking.travelerName || "Guest"}</Text>
                {booking.travelerPhone && <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Ph: {booking.travelerPhone}</Text>}
                {booking.travelerEmail && <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Email: {booking.travelerEmail}</Text>}
              </View>
              <View style={styles.colRight}>
                <Text style={styles.label}>Booking Reference</Text>
                <Text style={[styles.value, { fontWeight: 700 }]}>#{booking.id}</Text>
                <Text style={{ fontSize: 10, color: '#64748b', marginTop: 8 }}>Verification Code:</Text>
                <Text style={{ fontSize: 12, fontWeight: 700, color: '#0d9488', marginTop: 4 }}>{verificationCode}</Text>
              </View>
            </View>
          </View>

          {/* Tear-off Dashed Line Divider */}
          <View style={{ position: 'relative' }}>
            <View style={styles.dashedLine} />
            <View style={styles.cutoutLeft} />
            <View style={styles.cutoutRight} />
          </View>

          {/* Middle Section: Tour Details */}
          <View style={styles.ticketSection}>
            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>Tour Details</Text>
                <Text style={[styles.value, { fontSize: 18, marginBottom: 6, fontWeight: 700, color: '#0f172a' }]}>{safeTitle}</Text>
                <Text style={{ fontSize: 11, color: '#64748b' }}>{safeLocation}</Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.label}>Duration</Text>
                <Text style={styles.value}>{booking.duration || "N/A"}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Scheduled Date</Text>
                <Text style={[styles.value, { color: '#0d9488', fontWeight: 700 }]}>{booking.date}</Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.label}>Participants</Text>
                <Text style={styles.value}>{booking.participants || 1} Person(s)</Text>
              </View>
            </View>

            {/* Financial Summary */}
            <View style={{ marginTop: 12, paddingTop: 16, borderTop: '1pt solid #f1f5f9' }}>
              <Text style={styles.label}>Financial Summary</Text>
              {booking.subTotal ? (
                <>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 10, color: '#64748b' }}>Price Per Person (x{booking.participants || 1})</Text>
                    <Text style={{ fontSize: 10, color: '#64748b' }}>BDT {(booking.basePrice || 0).toLocaleString()}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 10, color: '#64748b' }}>Subtotal</Text>
                    <Text style={{ fontSize: 10, color: '#64748b' }}>BDT {(booking.subTotal || 0).toLocaleString()}</Text>
                  </View>
                  {(booking.discounts || 0) > 0 && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontSize: 10, color: '#ef4444' }}>Discount</Text>
                      <Text style={{ fontSize: 10, color: '#ef4444' }}>- BDT {(booking.discounts || 0).toLocaleString()}</Text>
                    </View>
                  )}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, borderTop: '1pt dashed #e2e8f0' }}>
                    <Text style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Total Paid</Text>
                    <Text style={{ fontSize: 14, fontWeight: 700, color: '#0d9488' }}>BDT {(booking.totalPaid || 0).toLocaleString()}</Text>
                  </View>
                </>
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Total Paid</Text>
                  <Text style={{ fontSize: 14, fontWeight: 700, color: '#0d9488' }}>{safePrice}</Text>
                </View>
              )}
            </View>

            {/* Logistics & Operator */}
            <View style={{ marginTop: 16, paddingTop: 16, borderTop: '1pt solid #f1f5f9', flexDirection: 'row' }}>
              <View style={styles.col}>
                <Text style={styles.label}>Meeting & Pickup</Text>
                <Text style={styles.value}>{booking.meetingPoint || 'See Itinerary'}</Text>
                {booking.pickupTime && <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Time: {booking.pickupTime}</Text>}
                <Text style={{ fontSize: 10, color: '#3b82f6', marginTop: 4 }}>Google Maps Link (Clickable online)</Text>
              </View>
              <View style={styles.colRight}>
                <Text style={styles.label}>Operator Details</Text>
                <Text style={styles.value}>{booking.operatorName || 'BD Travel Spirit'}</Text>
                {booking.operatorPhone && <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Ph: {booking.operatorPhone}</Text>}
                {booking.operatorEmail && <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Email: {booking.operatorEmail}</Text>}
              </View>
            </View>
          </View>

          {/* Need Help & Guidelines */}
          <View style={[styles.ticketSection, { paddingTop: 0 }]}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={[styles.infoBox, { flex: 1 }]}>
                <Text style={styles.infoBoxTitle}>Need Help?</Text>
                <Text style={styles.infoText}>Phone: 16XXX</Text>
                <Text style={styles.infoText}>Email: support@bdtravelspirit.com</Text>
                <Text style={styles.infoText}>Available 9 AM - 6 PM</Text>
              </View>
              
              <View style={[styles.infoBox, { flex: 1.5 }]}>
                <Text style={styles.infoBoxTitle}>Cancellation Policy</Text>
                <Text style={styles.infoText}>{booking.cancellationPolicy || "Free cancellation up to 48 hours before departure. Contact support for changes."}</Text>
              </View>
            </View>

            <View style={[styles.infoBox, { marginTop: 16 }]}>
              <Text style={styles.infoBoxTitle}>Important Guidelines</Text>
              <Text style={styles.infoText}>• Present this voucher and verification code to your guide on arrival.</Text>
              <Text style={styles.infoText}>• Please arrive at the meeting point 15-30 minutes before departure.</Text>
              <Text style={styles.infoText}>• Carry a valid photo ID (NID/Passport) matching the passenger name.</Text>
              
              {booking.packingList && booking.packingList.length > 0 && (
                <>
                  <Text style={[styles.infoBoxTitle, { marginTop: 12 }]}>What to Bring</Text>
                  <Text style={styles.infoText}>{booking.packingList.map(p => `• ${p.item}`).join('\n')}</Text>
                </>
              )}
            </View>
          </View>

        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated on {new Date().toLocaleDateString()}</Text>
          <Text style={styles.footerText}>BD Travel Spirit © {new Date().getFullYear()}</Text>
        </View>

      </Page>
    </Document>
  );
}
