import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  cartId: string;
  product: Product;
  size: string;
  customMeasurements?: {
    bust?: string;
    waist?: string;
    hip?: string;
    shoulder?: string;
    sleeveLength?: string;
    garmentLength?: string;
    notes?: string;
  };
  quantity: number;
}

export interface OrderItem {
  product: Product;
  size: string;
  quantity: number;
  price: number;
  customMeasurements?: CartItem['customMeasurements'];
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Atelier Processing' | 'Hand Embroidery & Crafting' | 'Quality Inspection' | 'Dispatched via Express Courier' | 'Delivered';
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
}

export interface UserMeasurements {
  bust: string;
  waist: string;
  hip: string;
  shoulder: string;
  sleeveLength: string;
  garmentLength: string;
}

export interface CustomerInquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  occasionDate?: string;
  category: string;
  message: string;
}

export interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, customMeasurements?: CartItem['customMeasurements'], quantity?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  orders: CustomerOrder[];
  placeOrder: (customerDetails: { name: string; phone: string; email: string; address: string; notes?: string }) => CustomerOrder;

  savedMeasurements: UserMeasurements;
  saveMeasurements: (m: UserMeasurements) => void;

  inquiries: CustomerInquiry[];
  submitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'date'>) => CustomerInquiry;

  toastMessage: string | null;
  clearToast: () => void;
  showToast: (msg: string) => void;

  checkoutOnWhatsApp: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const defaultMeasurements: UserMeasurements = {
  bust: '',
  waist: '',
  hip: '',
  shoulder: '',
  sleeveLength: '',
  garmentLength: '',
};

export const StoreContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('heritage_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('heritage_wishlist');
      return saved ? JSON.parse(saved) : [1, 3];
    } catch {
      return [1, 3];
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('heritage_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'HP-84291',
          date: 'Yesterday, 4:30 PM',
          items: [
            {
              product: {
                id: 1,
                name: 'Noor Handcrafted Chikankari Suit Set',
                tagline: 'Lucknowi artisan embroidery on mulmul chanderi',
                price: 8499,
                category: 'Chikankari',
                image: '/assets/chikankari_suit.png',
                images: ['/assets/chikankari_suit.png'],
                description: '',
                details: [],
                fabric: 'Mul Chanderi',
                craft: 'Lucknowi Chikankari',
                care: '',
                sizes: ['M'],
                inStock: true,
              },
              size: 'M',
              quantity: 1,
              price: 8499,
            },
          ],
          total: 8499,
          status: 'Hand Embroidery & Crafting',
          customerName: 'Patron',
          phone: '+91 73034 66990',
          email: 'client@example.com',
          address: 'Civil Lines, New Delhi, 110054',
          notes: 'Standard expedited delivery',
        },
      ];
    } catch {
      return [];
    }
  });

  const [savedMeasurements, setSavedMeasurements] = useState<UserMeasurements>(() => {
    try {
      const saved = localStorage.getItem('heritage_measurements');
      return saved ? JSON.parse(saved) : defaultMeasurements;
    } catch {
      return defaultMeasurements;
    }
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('heritage_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('heritage_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('heritage_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('heritage_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('heritage_measurements', JSON.stringify(savedMeasurements));
  }, [savedMeasurements]);

  useEffect(() => {
    localStorage.setItem('heritage_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, size: string, customMeasurements?: CartItem['customMeasurements'], quantity = 1) => {
    const isCustom = !!customMeasurements;
    const cartId = `${product.id}-${size}-${isCustom ? 'custom-' + Date.now() : 'std'}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing && !isCustom) {
        return prev.map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [...prev, { cartId, product, size, customMeasurements, quantity }];
    });

    showToast(`Added "${product.name}" (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item removed from your bag');
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.setItem('heritage_cart', '[]');
    } catch (e) {
      console.error(e);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved item to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const placeOrder = (details: { name: string; phone: string; email: string; address: string; notes?: string }): CustomerOrder => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: CustomerOrder = {
      orderId: `HP-${randomNum}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: cart.map((item) => ({
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
        customMeasurements: item.customMeasurements,
      })),
      total: cartTotal,
      status: 'Atelier Processing',
      customerName: details.name,
      phone: details.phone,
      email: details.email,
      address: details.address,
      notes: details.notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.orderId} successfully registered in your atelier account!`);
    return newOrder;
  };

  const saveMeasurements = (m: UserMeasurements) => {
    setSavedMeasurements(m);
    showToast('Your bespoke measurements have been saved for future orders');
  };

  const submitInquiry = (inquiryData: Omit<CustomerInquiry, 'id' | 'date'>): CustomerInquiry => {
    const newInquiry: CustomerInquiry = {
      ...inquiryData,
      id: `INQ-${Date.now().toString().slice(-5)}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast('Your styling inquiry has been received! Meghna will connect with you shortly.');
    return newInquiry;
  };


  const checkoutOnWhatsApp = () => {
    if (cart.length === 0) return;
    const brandWhatsApp = '917303466990';
    let text = `*New Order Inquiry — Heritage Palate by Meghna*\n`;
    text += `Instagram: @heritagepalatebymeghna\n`;
    text += `Bio: A space for true handloom lovers ✨\n\n`;
    text += `Hello Meghna! I would like to place an order for the following handcrafted items:\n\n`;
    
    cart.forEach((item, index) => {
      text += `*${index + 1}. ${item.product.name}*\n`;
      text += `• Size: ${item.size}\n`;
      text += `• Quantity: ${item.quantity}\n`;
      text += `• Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
      if (item.customMeasurements) {
        text += `• Custom Fit: Bust: ${item.customMeasurements.bust || '-'}, Waist: ${item.customMeasurements.waist || '-'}, Hip: ${item.customMeasurements.hip || '-'}\n`;
      }
      text += `\n`;
    });

    text += `*Total Order Value:* ₹${cartTotal.toLocaleString('en-IN')}\n\n`;
    text += `Please confirm availability and share payment/delivery details. Thank you!`;

    // Save order into localStorage and clear shopping bag
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: CustomerOrder = {
      orderId: `HP-${randomNum}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: cart.map((item) => ({
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
        customMeasurements: item.customMeasurements,
      })),
      total: cartTotal,
      status: 'Atelier Processing',
      customerName: 'WhatsApp Patron',
      phone: '+91 73034 66990',
      email: 'patron@heritagepalate.com',
      address: 'Order placed via WhatsApp Concierge (+91 73034 66990)',
      notes: 'WhatsApp order inquiry sent to designer Meghna',
    };

    // Synchronously commit to localStorage before window.open to prevent race conditions
    try {
      const savedOrders = localStorage.getItem('heritage_orders');
      const existingOrders: CustomerOrder[] = savedOrders ? JSON.parse(savedOrders) : [];
      localStorage.setItem('heritage_orders', JSON.stringify([newOrder, ...existingOrders]));
      localStorage.setItem('heritage_cart', '[]');
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    showToast(`Order #${newOrder.orderId} sent to WhatsApp! Your bag has been cleared.`);

    const url = `https://wa.me/${brandWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        orders,
        placeOrder,
        savedMeasurements,
        saveMeasurements,
        inquiries,
        submitInquiry,
        toastMessage,
        clearToast,
        showToast,
        checkoutOnWhatsApp,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreContextProvider');
  }
  return context;
};
