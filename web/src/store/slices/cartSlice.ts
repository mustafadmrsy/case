import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
	id: number;
	title: string;
	price: number;
	image?: string;
	quantity: number;
};

type CartState = {
	items: CartItem[];
};

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		rehydrate(state, action: PayloadAction<CartItem[] | undefined>) {
			if (Array.isArray(action.payload)) state.items = action.payload;
		},
		addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
			const existing = state.items.find((i) => i.id === action.payload.id);
			if (existing) existing.quantity += 1;
			else state.items.push({ ...action.payload, quantity: 1 });
		},
		removeFromCart(state, action: PayloadAction<number>) {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (item) item.quantity = Math.max(1, action.payload.quantity);
		},
		clearCart(state) {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


