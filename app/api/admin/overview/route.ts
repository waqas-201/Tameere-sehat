import { NextRequest, NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/jwt';
import { getUserStore, sanitizeUser } from '@/lib/auth-store';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const tokenFromCookie = req.cookies.get('tameer_jwt_token')?.value;
    const token = authHeader?.replace('Bearer ', '') || tokenFromCookie;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyUserToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied: Hakeem Admin credentials required' },
        { status: 403 }
      );
    }

    const store = getUserStore();
    const allUsers = Array.from(store.values()).map(sanitizeUser);

    const mockAdminData = {
      analytics: {
        totalRevenuePkr: 846500,
        monthlyRevenuePkr: 248900,
        totalOrders: 312,
        pendingOrders: 14,
        prescriptionsPending: 5,
        activeConsultations: 8,
        registeredPatients: allUsers.length,
      },
      recentOrders: [
        {
          id: 'ORD-7842',
          customerName: 'Muhammad Salman',
          phone: '+92 300 4892110',
          city: 'Karachi',
          total: 4850,
          status: 'Pending Verification',
          paymentMethod: 'Cash on Delivery',
          date: '2026-08-24 11:30 AM',
          items: 'Tahiri Marham (100g) x 2, Pure Salajeet (20g) x 1'
        },
        {
          id: 'ORD-7841',
          customerName: 'Fatima Noor',
          phone: '+92 333 9812456',
          city: 'Lahore',
          total: 2150,
          status: 'Dispatched',
          paymentMethod: 'JazzCash',
          date: '2026-08-24 09:15 AM',
          items: 'Arq Kasni (500ml) x 2, Sharbat Unab x 1'
        },
        {
          id: 'ORD-7840',
          customerName: 'Dr. Tariq Jamil',
          phone: '+92 312 7789012',
          city: 'Islamabad',
          total: 6200,
          status: 'Delivered',
          paymentMethod: 'Cash on Delivery',
          date: '2026-08-23 04:45 PM',
          items: 'Royal Salajeet Resin Gold x 1, Majun Shabab Awar x 1'
        }
      ],
      pendingPrescriptions: [
        {
          id: 'RX-901',
          patientName: 'Kashif Ali',
          phone: '+92 302 4432198',
          city: 'Faisalabad',
          symptoms: 'Chronic joint pain, cold extremities (Waja-ul-Mafasil)',
          imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
          date: '2026-08-24 08:30 AM',
          status: 'Under Review by Chief Tabib'
        },
        {
          id: 'RX-902',
          patientName: 'Amina Bibi',
          phone: '+92 345 8899123',
          city: 'Multan',
          symptoms: 'Gastric heat, liver sluggishness (Zoaf-e-Jigar)',
          imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
          date: '2026-08-23 06:10 PM',
          status: 'Quotation Ready'
        }
      ],
      activeConsultations: [
        {
          id: 'CONS-401',
          patientName: 'Zubair Ahmed',
          phone: '+92 321 4455667',
          city: 'Peshawar',
          age: 44,
          mode: 'WhatsApp Video Consultation',
          issue: 'Digestive weakness & chronic lethargy',
          scheduledTime: 'Today at 04:00 PM',
          assignedHakeem: 'Hakeem Muhammad Tariq'
        },
        {
          id: 'CONS-402',
          patientName: 'Bushra Rehman',
          phone: '+92 300 7766554',
          city: 'Karachi',
          age: 36,
          mode: 'In-Clinic Dawakhana Visit',
          issue: 'Skin allergy & Safravi Mizaj imbalance',
          scheduledTime: 'Tomorrow at 11:30 AM',
          assignedHakeem: 'Hakeema Tabassum Fatima'
        }
      ],
      users: allUsers,
    };

    return NextResponse.json({
      success: true,
      data: mockAdminData,
    });
  } catch (error) {
    console.error('Admin Overview Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error retrieving admin statistics' },
      { status: 500 }
    );
  }
}
