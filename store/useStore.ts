import { create } from 'zustand';

interface Item {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface AppState {
  // State
  items: Item[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setItems: (items: Item[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addItem: (item: { name: string; status: string; species: string }) => void;
  fetchItems: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  items: [],
  loading: false,
  error: null,

  // Actions
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addItem: (newItem) => {
    const { items } = get();
    const item: Item = {
      ...newItem,
      id: Date.now(), // Simple ID generation
      image: 'https://via.placeholder.com/150', // Placeholder image
    };
    set({ items: [item, ...items] });
  },

  fetchItems: async () => {
    const { setLoading, setError, setItems } = get();
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character?limit=10');
      const data = await response.json();
      setItems(data.results);
    } catch (error) {
      setError('Failed to fetch items');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  },
})); 