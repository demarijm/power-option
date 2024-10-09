"use client";
import { RouterOutputs } from "@/trpc/react";
import { create } from "zustand";

// Define the types for Block and Layout
interface Layout {
	id: number;
	blockId: string;
	x: number;
	y: number;
	w: number;
	h: number;
	createdAt: string;
	updatedAt: string;
}

interface Block {
	id: string;
	viewId: string;
	name: string;
	type: string;
	ticker: string;
	createdAt: string;
	updatedAt: string;
	layout: Layout;
}

type Blocks = RouterOutputs["block"]["getByView"];

// Define the store state and actions
interface BlockStore {
	clientBlocks: Block[];
	setBlocks: (newBlocks: Block[]) => void;
	toggleEditMode: () => void;
	editMode: boolean;
	updateBlockLayout: (blockId: string, newLayout: Partial<Layout>) => void;
}

// Create the Zustand store with TypeScript types
export const useBlockStore = create<BlockStore>((set) => ({
	clientBlocks: [],
	setBlocks: (newBlocks) => set({ clientBlocks: newBlocks }),
	editMode: false,
	toggleEditMode: () =>
		set((state) => {
			return { editMode: !state.editMode };
		}),
	updateBlockLayout: (blockId, newLayout) =>
		set((state) => {
			return {
				clientBlocks: state.clientBlocks?.map((block) =>
					block.id === blockId
						? {
								...block,
								layout: {
									...block.layout,
									...newLayout,
								},
							}
						: block,
				),
			};
		}),
}));
