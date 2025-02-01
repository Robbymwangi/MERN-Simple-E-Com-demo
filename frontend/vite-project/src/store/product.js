import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
            set({ products: data.data });
        }
    },

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields" };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        }
        return { success: false, message: "Failed to create product" };
    },

    deleteProduct: async (id, options = {}) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            ...options
        });

        const data = await res.json();
        if (data.success) {
            set((state) => ({
                products: state.products.filter((product) => product._id !== id)
            }));
            return { success: true, message: "Product deleted successfully" };
        }
        return { success: false, message: "Failed to delete product" };
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // update the product in the store
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));
        return { success: true, message: "Product updated successfully" };
    }
}));