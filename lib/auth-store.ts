import { AuthUser, StoredUserAccount } from './auth-types';

// Pre-seeded Admin & Standard Users
export const INITIAL_USERS: StoredUserAccount[] = [
  {
    id: 'usr_admin_01',
    name: 'Hakeem Muhammad Tariq (Chief Tabib)',
    email: 'admin@tameersehat.pk',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    phone: '+92 300 2489012',
    address: 'Main Dawakhana, Korangi Industrial Area',
    city: 'Karachi',
    provider: 'email',
    createdAt: '2020-01-15T08:00:00.000Z',
    // Precalculated SHA256 of 'tameer_unani_salt_v1_hakeem1990' or computed on first run
    passwordHash: '8b7f87239eeebba4fb7dc3b91a7e289faee32a233b8a1c9bf937213bbfa9cae0',
    orderCount: 142,
    savedMizaj: {
      constitution: 'Balghami (Phlegmatic)',
      urduConstitution: 'بلغمی مزاج',
      testDate: '2025-10-10',
      primaryElement: 'Water / Cold & Wet',
      recommendations: ['Hab-e-Suranjan', 'Majun Suranjan', 'Warm ginger tea'],
      recommendationsUrdu: ['حب سرنجان', 'معجون سرنجان', 'دارچینی و ادرک قہوہ']
    }
  },
  {
    id: 'usr_patient_01',
    name: 'Zahid Mahmood',
    email: 'patient@tameersehat.pk',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    phone: '+92 321 8765432',
    address: 'House # 45-B, Model Town',
    city: 'Lahore',
    provider: 'email',
    createdAt: '2024-03-12T10:30:00.000Z',
    passwordHash: 'e698888b1f5e82a97576a9be8ab99e036e76cf360c7047ff69ffba4a8ee0b146',
    orderCount: 3,
    savedMizaj: {
      constitution: 'Damvi (Sanguine)',
      urduConstitution: 'دموی مزاج',
      testDate: '2026-02-14',
      primaryElement: 'Blood / Hot & Moist',
      recommendations: ['Arq Kasni', 'Sharbat Bazoori', 'Safoof Tabasheer'],
      recommendationsUrdu: ['عرق کاسنی', 'شربت بزوری معتدل', 'سفوف طباشیر']
    }
  }
];

// Global in-memory storage for server execution
// In production serverless/Node environment, this persists across hot reloads and API route calls
const globalForAuth = globalThis as unknown as {
  __TAMEER_USER_STORE?: Map<string, StoredUserAccount>;
};

export function getUserStore(): Map<string, StoredUserAccount> {
  if (!globalForAuth.__TAMEER_USER_STORE) {
    globalForAuth.__TAMEER_USER_STORE = new Map<string, StoredUserAccount>();
    // Populate initial users
    for (const u of INITIAL_USERS) {
      globalForAuth.__TAMEER_USER_STORE.set(u.email.toLowerCase(), u);
    }
  }
  return globalForAuth.__TAMEER_USER_STORE;
}

export function findUserByEmail(email: string): StoredUserAccount | undefined {
  const store = getUserStore();
  return store.get(email.toLowerCase());
}

export function findUserById(id: string): StoredUserAccount | undefined {
  const store = getUserStore();
  for (const user of store.values()) {
    if (user.id === id) return user;
  }
  return undefined;
}

export function saveUser(user: StoredUserAccount): void {
  const store = getUserStore();
  store.set(user.email.toLowerCase(), user);
}

export function sanitizeUser(user: StoredUserAccount): AuthUser {
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}
