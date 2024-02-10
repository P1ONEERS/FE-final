import { Teman } from './teman.model';

export interface ActiveBill {
  tempat: string;
  tanggal: string;
  jam: string;
  total: number;
  selectedFriendsToShow: Teman[];
  status: 'active' | 'closed';
  // ... tambahkan properti lain yang dibutuhkan
}
