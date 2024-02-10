export interface Teman {
  id_user: number,
  name: string;
  noTelp: string;
  imgSrc: string;
  selectedItems: { name: string; quantity: number; price: number }[];
  disabledItems?: { [itemId: number]: boolean | number };
  userSelectedItems: {
    [id_user: string]: { name: string; quantity: number; price: number }[];
  };
  // tambahkan properti lain jika diperlukan
}
