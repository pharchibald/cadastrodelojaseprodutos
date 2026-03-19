import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  products: Product[];
}

interface AppState {
  stores: Store[];
  addStore: (name: string, address: string) => void;
  removeStore: (id: string) => void;
  addProductToStore: (storeId: string, product: Omit<Product, 'id'>) => void;
  removeProduct: (storeId: string, productId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  stores: [],

  addStore: (name, address) =>
    set((state) => ({
      stores: [
        ...state.stores,
        { id: Math.random().toString(), name, address, products: [] },
      ],
    })),

  removeStore: (id) =>
    set((state) => ({
      stores: state.stores.filter((s) => s.id !== id),
    })),

  addProductToStore: (storeId, productData) =>
    set((state) => ({
      stores: state.stores.map((s) =>
        s.id === storeId
          ? {
              ...s,
              products: [
                ...s.products,
                { ...productData, id: Math.random().toString() },
              ],
            }
          : s
      ),
    })),

  removeProduct: (storeId, productId) =>
    set((state) => ({
      stores: state.stores.map((s) =>
        s.id === storeId
          ? { ...s, products: s.products.filter((p) => p.id !== productId) }
          : s
      ),
    })),
}));