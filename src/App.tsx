import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Heart, 
  Star, 
  Check, 
  Instagram, 
  ArrowRight, 
  Lock, 
  Mail, 
  ChevronDown, 
  MapPin, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Copy,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BOUTIQUE_PRODUCTS, CLIENT_REVIEWS, BOUTIQUE_STORIES } from './data';
import { Product, CartItem, Review, Story } from './types';
import PremiumCustomCursor from './components/PremiumCustomCursor';

// Device Performance / Fluidity optimization hook
function useDevicePerformance() {
  const [tier, setTier] = useState<'low' | 'medium' | 'high'>('high');
  const [fps, setFps] = useState<number>(60);
  const [cores, setCores] = useState<number>(4);

  useEffect(() => {
    try {
      const c = navigator.hardwareConcurrency || 4;
      setCores(c);

      let score = 0;
      if (c >= 8) score += 3;
      else if (c >= 4) score += 2;
      else score += 1;

      const mem = (navigator as any).deviceMemory || 4;
      if (mem >= 8) score += 3;
      else if (mem >= 4) score += 2;
      else score += 1;

      // Evaluate FPS diagnostic of the phone screen
      let frameCount = 0;
      let startTime = performance.now();
      let rafId: number;

      const runFpsCheck = (time: number) => {
        frameCount++;
        const elapsed = time - startTime;
        if (elapsed < 200) {
          rafId = requestAnimationFrame(runFpsCheck);
        } else {
          const calculatedFps = Math.round((frameCount * 1000) / elapsed);
          setFps(calculatedFps);
          
          if (calculatedFps >= 55) {
            score += 4; // High-end or responsive screen refresh (60Hz / 90Hz / 120Hz)
          } else if (calculatedFps >= 30) {
            score += 2;
          }

          if (score >= 8) {
            setTier('high');
          } else if (score >= 5) {
            setTier('medium');
          } else {
            setTier('low');
          }
        }
      };

      rafId = requestAnimationFrame(runFpsCheck);
      return () => cancelAnimationFrame(rafId);
    } catch (e) {
      setTier('high');
    }
  }, []);

  const smoothScroll = tier !== 'low';
  
  // High-performance phones display full ultra-blur, lower phones get fast transparent backs
  const backdropBlurClass = tier === 'low' 
    ? 'bg-white/95 shadow-md border-b border-zinc-200' 
    : tier === 'medium'
    ? 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-zinc-200/50'
    : 'bg-white/30 backdrop-blur-md shadow-sm border-b border-white/20';

  // Config spring physics or simple fast linear transitions based on device
  const springTransitionConfig = tier === 'low'
    ? { duration: 0.16, ease: 'easeOut' }
    : tier === 'medium'
    ? { type: 'spring', damping: 26, stiffness: 220 }
    : { type: 'spring', damping: 18, stiffness: 350 }; // gorgeous snappy spring for excellent responsiveness

  return { tier, fps, cores, smoothScroll, backdropBlurClass, springTransitionConfig };
}

export default function App() {
  const perf = useDevicePerformance();
  // Dynamic products database loaded from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('strollo_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing strollo_products from localStorage', e);
      }
    }
    return BOUTIQUE_PRODUCTS;
  });

  const updateProductsState = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('strollo_products', JSON.stringify(newProducts));
  };

  // Secret routing checking for separate but connected Administration Space
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.search.includes('admin=');
  });

  useEffect(() => {
    const checkRoute = () => {
      const active = window.location.hash === '#admin' || window.location.search.includes('admin=');
      setIsAdminRoute(active);
    };
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    const interval = setInterval(checkRoute, 1000);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
      clearInterval(interval);
    };
  }, []);

  const navigateToAdmin = (active: boolean) => {
    if (active) {
      window.location.hash = '#admin';
    } else {
      window.location.hash = '';
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
    setIsAdminRoute(active);
  };

  // Administration Panel States
  const [adminUser, setAdminUser] = useState<string>(() => localStorage.getItem('strollo_admin_username') || '');
  const [adminPass, setAdminPass] = useState<string>(() => localStorage.getItem('strollo_admin_password') || '');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('strollo_admin_logged_in') === 'true';
  });
  
  // Login input states
  const [loginUser, setLoginUser] = useState<string>('');
  const [loginPass, setLoginPass] = useState<string>('');
  
  // Register setup input states (for creating credentials himself)
  const [setupUser, setSetupUser] = useState<string>('');
  const [setupPass, setSetupPass] = useState<string>('');

  // Form state for adding/editing a product
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [newProdName, setNewProdName] = useState<string>('');
  const [newProdPrice, setNewProdPrice] = useState<string>('');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState<string>('');
  const [newProdCategory, setNewProdCategory] = useState<'baskets' | 'crocs' | 'sandales' | 'accessories'>('baskets');
  const [newProdImage, setNewProdImage] = useState<string>('');
  const [newProdTag, setNewProdTag] = useState<string>('');
  const [newProdDesc, setNewProdDesc] = useState<string>('');
  const [newProdDetails, setNewProdDetails] = useState<string>('');
  const [newProdUsage, setNewProdUsage] = useState<string>('');

  // Navigation & Categorization
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Interactive States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Story Modals
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [storyProgress, setStoryProgress] = useState<number>(0);
  
  // Newsletter Subscriptions
  const [subscriptionEmail, setSubscriptionEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  
  // Promo Coupon Code Support
  const [promoInput, setPromoInput] = useState<string>('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  
  // Simulated Checkout Flow
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'shipping' | 'submitting' | 'success'>('idle');
  const [orderFinished, setOrderFinished] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: 'Ouagadougou',
    zip: 'Karpala',
    phone: '',
    paymentMethod: 'orange_money',
  });
  
  // Save order details to generate custom WhatsApp links
  const [lastCompletedOrder, setLastCompletedOrder] = useState<{
    items: CartItem[];
    total: number;
    discountCode: string | null;
  } | null>(null);

  const updateInvoiceItemQty = (index: number, diff: number) => {
    if (!lastCompletedOrder) return;
    const newItems = [...lastCompletedOrder.items];
    const newQty = Math.max(1, newItems[index].quantity + diff);
    newItems[index] = { ...newItems[index], quantity: newQty };
    
    // Recalculate
    const subtotal = newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discount = lastCompletedOrder.discountCode ? (subtotal * 0.15) : 0;
    const delivery = subtotal > 150000 || subtotal === 0 ? 0 : 2000;
    const newTotal = Math.max(0, subtotal - discount + delivery);
    
    setLastCompletedOrder({
      ...lastCompletedOrder,
      items: newItems,
      total: newTotal
    });
  };

  const updateInvoiceItemName = (index: number, newName: string) => {
    if (!lastCompletedOrder) return;
    const newItems = [...lastCompletedOrder.items];
    newItems[index] = {
      ...newItems[index],
      product: {
        ...newItems[index].product,
        name: newName
      }
    };
    setLastCompletedOrder({
      ...lastCompletedOrder,
      items: newItems
    });
  };

  const removeInvoiceItem = (index: number) => {
    if (!lastCompletedOrder) return;
    const newItems = lastCompletedOrder.items.filter((_, i) => i !== index);
    
    // Recalculate
    const subtotal = newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discount = lastCompletedOrder.discountCode ? (subtotal * 0.15) : 0;
    const delivery = subtotal > 150000 || subtotal === 0 ? 0 : 2000;
    const newTotal = Math.max(0, subtotal - discount + delivery);
    
    setLastCompletedOrder({
      ...lastCompletedOrder,
      items: newItems,
      total: newTotal
    });
    showToast('Article retiré de la facture.');
  };
  
  // Feedback Toasts
  const [toast, setToast] = useState<string | null>(null);
  
  // Mock Phone clock
  const [phoneTime, setPhoneTime] = useState<string>('12:00 PM');
  
  // Accordion active FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Live Clock Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // safety
      const minsStr = minutes < 10 ? '0' + minutes : minutes;
      setPhoneTime(`${hours}:${minsStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 20000);
    return () => clearInterval(interval);
  }, []);

  // Story progress bar timer
  useEffect(() => {
    let timer: any;
    if (activeStory) {
      setStoryProgress(0);
      timer = setInterval(() => {
        setStoryProgress((prev) => {
          if (prev >= 100) {
            if (activeStoryIdx < activeStory.slides.length - 1) {
              setActiveStoryIdx(activeStoryIdx + 1);
              return 0;
            } else {
              setActiveStory(null);
              setActiveStoryIdx(0);
              return 0;
            }
          }
          return prev + 2; 
        });
      }, 80);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeStory, activeStoryIdx]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Actions
  const showToast = (message: string) => {
    setToast(message);
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Retiré des favoris.');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Ajouté aux favoris !');
    }
  };

  const addToCart = (product: Product, quantity = 1, silent = false) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity }]);
    }
    if (!silent) {
      showToast(`${product.name} ajouté au panier.`);
    }
  };

  const updateCartQty = (productId: string, amount: number) => {
    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCart(updated);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
    showToast('Retiré du panier.');
  };

  const applyCouponCode = () => {
    setPromoError(null);
    const parsed = promoInput.trim().toUpperCase();
    if (parsed === 'SOL15' || parsed === 'WELCOME15') {
      setActiveDiscount({ code: parsed, percent: 15 });
      showToast('Code de réduction -15% appliqué !');
    } else if (parsed === '') {
      setPromoError('Saisissez un code.');
    } else {
      setPromoError('Code invalide. Essayez SOL15');
    }
  };

  const getWhatsAppOrderLink = () => {
    if (!lastCompletedOrder) return '#';
    
    const itemsText = lastCompletedOrder.items.map(item => 
      `- ${item.product.name} (Qté: ${item.quantity}) - ${(item.product.price * item.quantity).toLocaleString()} FCFA`
    ).join('\n');
    
    const paymentMethodLabel = 
      formData.paymentMethod === 'orange_money' ? 'Orange Money 🧡' :
      formData.paymentMethod === 'wave' ? 'Wave Mobile 💙' :
      formData.paymentMethod === 'moov_money' ? 'Moov Money 💚' :
      'Espèces à la livraison 💵';

    const rawText = `Bonjour STROLLO Sneakers !
Une nouvelle commande a été passée sur votre boutique.

✦ --- DÉTAILS CLIENT --- ✦
• Nom & Prénom : ${formData.name}
• Téléphone : ${formData.phone}
• Lieu de livraison : ${formData.address}, ${formData.city} (${formData.zip})
• E-mail : ${formData.email}
• Mode de Règlement : ${paymentMethodLabel}

✦ --- ARTICLES COMMANDÉS --- ✦
${itemsText}

• TOTAL COMMANDE : ${lastCompletedOrder.total.toLocaleString()} FCFA${lastCompletedOrder.discountCode ? ` (Code Réduction: ${lastCompletedOrder.discountCode})` : ''}

Merci !`;

    return `https://wa.me/22664284773?text=${encodeURIComponent(rawText)}`;
  };

  // Administration Panel Handlers
  const handleSetupAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupUser.trim() || !setupPass.trim()) {
      showToast("Veuillez saisir un nom d'utilisateur et un mot de passe.");
      return;
    }
    const user = setupUser.trim();
    const pass = setupPass.trim();
    setAdminUser(user);
    setAdminPass(pass);
    localStorage.setItem('strollo_admin_username', user);
    localStorage.setItem('strollo_admin_password', pass);
    localStorage.setItem('strollo_admin_logged_in', 'true');
    setIsAdminAuthenticated(true);
    showToast("Votre compte administrateur a été configuré !");
    setSetupUser('');
    setSetupPass('');
  };

  const handleLoginAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser.trim() === adminUser && loginPass.trim() === adminPass) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('strollo_admin_logged_in', 'true');
      showToast("Accès administrateur autorisé.");
      setLoginUser('');
      setLoginPass('');
    } else {
      showToast("Identifiants de connexion invalides.");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('strollo_admin_logged_in');
    showToast("Session administrateur fermée.");
  };

  const handleResetCredentials = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser vos identifiants ? Vous devrez en recréer de nouveaux.")) {
      setAdminUser('');
      setAdminPass('');
      localStorage.removeItem('strollo_admin_username');
      localStorage.removeItem('strollo_admin_password');
      localStorage.removeItem('strollo_admin_logged_in');
      setIsAdminAuthenticated(false);
      showToast("Identifiants réinitialisés avec succès !");
    }
  };

  const handlePriceChangeInline = (productId: string, val: string) => {
    const parsed = parseInt(val);
    if (!isNaN(parsed)) {
      const updated = products.map(p => p.id === productId ? { ...p, price: parsed } : p);
      updateProductsState(updated);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Voulez-vous vraiment retirer ce produit de la boutique ?")) {
      const updated = products.filter(p => p.id !== productId);
      updateProductsState(updated);
      showToast("Produit supprimé de la boutique.");
    }
  };

  const startEditingProduct = (p: Product) => {
    setEditingProdId(p.id);
    setNewProdName(p.name);
    setNewProdCategory(p.category);
    setNewProdPrice(p.price.toString());
    setNewProdOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setNewProdImage(p.image);
    setNewProdTag(p.tag || '');
    setNewProdDesc(p.description);
    setNewProdDetails(p.ingredientsOrDetails.join(', '));
    setNewProdUsage(p.usageTips);
    
    // Toast alert
    showToast(`Modification de: ${p.name}`);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdImage) {
      showToast("Veuillez remplir au moins le nom, le prix et l'image !");
      return;
    }
    
    const parsedPrice = parseInt(newProdPrice);
    if (isNaN(parsedPrice)) {
      showToast("Le prix doit être un nombre valide.");
      return;
    }

    const parsedOriginalPrice = newProdOriginalPrice ? parseInt(newProdOriginalPrice) : undefined;

    const savedProductObj: Product = {
      id: editingProdId || `prod-custom-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: newProdImage,
      tag: newProdTag || undefined,
      description: newProdDesc || "Modèle d’exception disponible sur commande chez STROLLO.",
      ingredientsOrDetails: newProdDetails ? newProdDetails.split(",").map(s => s.trim()) : ["Qualité Premium garantie", "Disponible en plusieurs pointures"],
      usageTips: newProdUsage || "Prenez votre pointure habituelle. Nettoyez avec soin."
    };

    let updated;
    if (editingProdId) {
      updated = products.map(p => p.id === editingProdId ? { ...p, ...savedProductObj } : p);
      showToast("Produit mis à jour avec succès !");
    } else {
      updated = [savedProductObj, ...products];
      showToast("Nouveau produit ajouté !");
    }

    updateProductsState(updated);
    
    // Clear product fields
    setEditingProdId(null);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdOriginalPrice('');
    setNewProdImage('');
    setNewProdTag('');
    setNewProdDesc('');
    setNewProdDetails('');
    setNewProdUsage('');
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("Voulez-vous réinitialiser votre catalogue aux paires d'origine ? Toutes vos modifications personnalisées seront effacées.")) {
      updateProductsState(BOUTIQUE_PRODUCTS);
      showToast("Catalogue réinitialisé à l’origine !");
    }
  };

  // Pricing math
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = activeDiscount ? (cartSubtotal * activeDiscount.percent) / 100 : 0;
  const deliveryFee = cartSubtotal > 150000 || cartSubtotal === 0 ? 0 : 2000;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const startCheckout = () => {
    if (cart.length === 0) {
      showToast('Votre panier est vide.');
      return;
    }
    setCheckoutStep('shipping');
  };

  const handleCheckoutFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      showToast('Veuillez renseigner les champs obligatoires.');
      return;
    }
    setCheckoutStep('submitting');
    
    setLastCompletedOrder({
      items: [...cart],
      total: cartTotal,
      discountCode: activeDiscount ? activeDiscount.code : null,
    });

    setTimeout(() => {
      setCheckoutStep('success');
      setOrderFinished(false);
    }, 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail || !subscriptionEmail.includes('@')) {
      showToast('Adresse e-mail non valide.');
      return;
    }
    setIsSubscribed(true);
    showToast('Bienvenue ! Code -15% actif : SOL15');
  };

  const copyPromoCode = () => {
    navigator.clipboard.writeText('SOL15');
    setCopiedCode(true);
    showToast('Code SOL15 copié !');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const faqs = [
    {
      q: 'Où se situe exactement votre boutique STROLLO Sneakers ?',
      a: 'Notre boutique physique est idéalement située à Ouagadougou, dans le quartier KARPALA, à proximité immédiate de la Clinique KASSAM 📍. Passez faire un tour pour essayer vos paires favorites !'
    },
    {
      q: 'Quels sont vos moyens de paiement acceptés ?',
      a: 'Nous acceptons les règlements rapides par Orange Money (OM), Wave Mobile Money, Moov Money, ainsi que le paiement en espèces à la livraison ou directement en boutique à Karpala.'
    },
    {
      q: 'Quels sont vos délais de livraison au Burkina Faso ?',
      a: 'Pour Ouagadougou, nous livrons en moins de 24 heures (souvent en quelques heures). Nous expédions également par colis sécurisés vers Bobo-Dioulasso, Koudougou, Ouahigouya et autres cités.'
    },
    {
      q: 'Vos paires de baskets et crocs sont-elles authentiques ?',
      a: 'Absolument ! Chez STROLLO Sneakers, toutes nos baskets, crocs et sandales passent par un contrôle qualité très minutieux pour garantir le confort originel et une robustesse exemplaire.'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (isAdminRoute) {
    return (
      <div id="admin-workspace-page" className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased flex flex-col p-4 md:p-8 relative selection:bg-red-500/30 selection:text-white">
        {/* Abstract lights */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Global Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-6 right-6 z-[100] max-w-sm bg-zinc-900 border border-zinc-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
              id="toast-notification"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-650 bg-red-600 animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Console Header */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-left font-sans">
              <h1 className="text-lg font-black tracking-wider uppercase text-white font-sans flex items-center gap-2">
                STROLLO <span className="text-red-500">Sneakers</span>
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Espace Administration Sécurisé</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateToAdmin(false)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              👁️ Voir le Site Client (Visiteur)
            </button>
          </div>
        </div>

        {/* Workstation Container */}
        <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col justify-center">
          {adminUser === '' ? (
            /* SETUP SECURITY CREDENTIALS */
            <div className="max-w-md w-full mx-auto my-12 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-left font-sans">
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/25 flex items-center justify-center text-red-500 mb-6 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-white text-center uppercase tracking-wide mb-2 font-sans">Initialisation de l'Administration</h2>
              <p className="text-xs text-zinc-400 text-center leading-relaxed mb-6">
                Créez vos accès personnalisés. Ceux-ci seront stockés en toute sécurité dans ce navigateur pour bloquer les intrus.
              </p>

              <form onSubmit={handleSetupAdmin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Identifiant unique (ex: admin)</label>
                  <input 
                    type="text" 
                    required
                    value={setupUser}
                    onChange={(e) => setSetupUser(e.target.value)}
                    placeholder="Votre identifiant"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-600 text-white placeholder-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Mot de Passe Secret</label>
                  <input 
                    type="password" 
                    required
                    value={setupPass}
                    onChange={(e) => setSetupPass(e.target.value)}
                    placeholder="Saisissez votre mot de passe secret"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-600 text-white placeholder-zinc-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-600/10 cursor-pointer"
                >
                  Valider & Enregistrer mes Accès
                </button>
              </form>
            </div>
          ) : !isAdminAuthenticated ? (
            /* LOGIN SCREEN */
            <div className="max-w-md w-full mx-auto my-12 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-left font-sans">
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/25 flex items-center justify-center text-red-500 mb-6 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-white text-center uppercase tracking-wide mb-2 font-sans">Connexion requise</h2>
              <p className="text-xs text-zinc-400 text-center leading-relaxed mb-6">
                Le catalogue Strollo est sécurisé. Veuillez vous authentifier pour accéder à la console de gestion.
              </p>

              <form onSubmit={handleLoginAdmin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Identifiant</label>
                  <input 
                    type="text" 
                    required
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="Votre nom d'utilisateur admin"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500 text-white placeholder-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Mot de Passe</label>
                  <input 
                    type="password" 
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500 text-white placeholder-zinc-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-600/10 cursor-pointer"
                >
                  Se Connecter à la Console
                </button>

                <div className="pt-4 border-t border-zinc-800 text-center">
                  <button
                    type="button"
                    onClick={handleResetCredentials}
                    className="text-[10px] text-zinc-500 hover:text-red-500 font-bold underline cursor-pointer"
                  >
                    Mot de passe oublié ? Réinitialiser et Recréer mes accès
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN WORKSTATION DASHBOARD */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left font-sans">
              
              {/* Left Column: Form (Col span 5) */}
              <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <h3 className="text-xs font-black uppercase text-white tracking-widest flex items-center gap-2 font-sans">
                    {editingProdId ? '✍️ Modifier la paire' : '➕ Ajouter une nouvelle paire'}
                  </h3>
                  {editingProdId && (
                    <button 
                      onClick={() => {
                        setEditingProdId(null);
                        setNewProdName('');
                        setNewProdPrice('');
                        setNewProdOriginalPrice('');
                        setNewProdImage('');
                        setNewProdTag('');
                        setNewProdDesc('');
                        setNewProdDetails('');
                        setNewProdUsage('');
                      }}
                      className="text-[10px] bg-zinc-800 hover:bg-zinc-750 px-2.5 py-1 rounded text-red-500 font-bold cursor-pointer"
                    >
                      annuler l'édition
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Nom de la paire *</label>
                      <input 
                        type="text" 
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="Nike TN Karpala"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-semibold focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Rayon / Catégorie *</label>
                      <select 
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="baskets">Baskets</option>
                        <option value="crocs">Crocs</option>
                        <option value="sandales">Sandales</option>
                        <option value="accessories">Accessoires</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Prix de Vente (FCFA) *</label>
                      <input 
                        type="number" 
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        placeholder="35000"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono font-semibold focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Ancien Prix (barré)</label>
                      <input 
                        type="number" 
                        value={newProdOriginalPrice}
                        onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                        placeholder="45000"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono font-semibold focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Illustration Image URL *</label>
                    <input 
                      type="text" 
                      required
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="Collez l'adresse de l'image"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-500 mb-1.5"
                    />
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: 'Jordan Red', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop' },
                        { label: 'Dunk Shade', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop' },
                        { label: 'Crocs Red', url: 'https://images.unsplash.com/photo-1619521062002-e1d17d64bc9b?q=80&w=600&auto=format&fit=crop' },
                        { label: 'Sandale Class', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop' }
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setNewProdImage(preset.url)}
                          className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-750 rounded text-[9.5px] text-zinc-300 font-bold cursor-pointer hover:text-white"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Tag (ex: Tendance)</label>
                      <input 
                        type="text" 
                        value={newProdTag}
                        onChange={(e) => setNewProdTag(e.target.value)}
                        placeholder="Nouveauté"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Détails techniques (séparés par ,)</label>
                      <input 
                        type="text" 
                        value={newProdDetails}
                        onChange={(e) => setNewProdDetails(e.target.value)}
                        placeholder="Semelle amortissante, Pointure 40-44"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Description Complète</label>
                    <textarea 
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Présentation accrocheuse..."
                      className="w-full h-16 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-650 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {editingProdId ? '💾 Enregistrer la Fiche' : '➕ Ajouter Live au Catalogue'}
                  </button>
                </form>
              </div>

              {/* Right Column: List & Stats (Col span 7) */}
              <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
                
                {/* Statistics Banner */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-850">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase block leading-tight">Total Articles</span>
                    <span className="text-xl font-bold text-red-500 font-mono">{products.length}</span>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-850">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase block leading-tight">Valeur Moyenne</span>
                    <span className="text-xl font-bold text-white font-mono">
                      {Math.round(products.reduce((sum, p) => sum + p.price, 0) / (products.length || 1)).toLocaleString()} 
                      <span className="text-xs text-zinc-400 ml-1">F</span>
                    </span>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-850 flex flex-col justify-between">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase block leading-tight">Session active</span>
                    <span className="text-xs font-extrabold text-red-500 font-mono truncate">@{adminUser}</span>
                  </div>
                </div>

                {/* List Header control */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-3">
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">
                    Catalogue Live ({products.length} ARTICLES)
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRestoreDefaults}
                      className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-750 rounded text-[9px] font-extrabold uppercase text-zinc-300 tracking-wider transition-all border border-zinc-700 cursor-pointer"
                    >
                      Restaurer Originels
                    </button>
                    <button
                      onClick={handleLogoutAdmin}
                      className="px-2.5 py-1.5 bg-red-650/15 hover:bg-red-600/20 text-red-400 rounded text-[9px] font-extrabold uppercase tracking-wider transition-all hover:text-white border border-red-500/25 cursor-pointer"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>

                {/* Search / Category filter to quickly manage rows */}
                <div className="flex flex-wrap gap-1">
                  {['all', 'baskets', 'crocs', 'sandales', 'accessories'].map((cId) => (
                    <button
                      key={cId}
                      onClick={() => setSelectedCategory(cId)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all tracking-wide cursor-pointer ${selectedCategory === cId ? 'bg-red-600 text-white' : 'bg-zinc-950 text-zinc-400 border border-zinc-850 hover:bg-zinc-800'}`}
                    >
                      {cId === 'all' ? 'Tous' : cId === 'accessories' ? 'Accessoires' : cId} ({cId === 'all' ? products.length : products.filter(p => p.category === cId).length})
                    </button>
                  ))}
                </div>

                {/* Product live rows with direct price typing! */}
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar select-none">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-zinc-950 rounded-xl border border-zinc-850/60 justify-between">
                      
                      {/* Thumbnail & Title */}
                      <div className="flex items-center gap-3 overflow-hidden flex-1">
                        <img 
                          src={p.image} 
                          className="w-10 h-10 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0" 
                          alt="" 
                        />
                        <div className="truncate text-left flex-1 font-sans">
                          <p className="text-xs font-black text-white truncate leading-tight mb-0.5">{p.name}</p>
                          <div className="flex gap-1.5 items-center">
                            <span className="text-[9px] font-extrabold font-mono text-zinc-500 capitalize">{p.category}</span>
                            {p.tag && <span className="bg-red-600/10 text-red-500 border border-red-500/15 text-[8px] font-black uppercase px-1 rounded">{p.tag}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Modifier Operations */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        
                        {/* Numerical Inline Price Input with FCFA */}
                        <div className="relative">
                          <input 
                            type="number"
                            value={p.price}
                            onChange={(e) => handlePriceChangeInline(p.id, e.target.value)}
                            className="w-[100px] pl-2 pr-5 py-1.5 font-mono text-xs text-right font-extrabold text-red-500 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-red-550"
                          />
                          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-zinc-500 pointer-events-none font-mono">F</span>
                        </div>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => {
                            startEditingProduct(p);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-1 px-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-lg text-xs font-bold text-white transition-all cursor-pointer"
                          title="Éditer la fiche complète"
                        >
                          ✍️ Échanger
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 bg-zinc-900 hover:bg-red-600/20 text-zinc-400 hover:text-red-500 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>

                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="p-8 text-center bg-zinc-950/40 rounded-xl border border-zinc-850/60">
                      <p className="text-xs text-zinc-500 font-bold">Aucun article trouvé dans cette catégorie.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="page-wrapper" className="min-h-screen bg-gradient-to-tr from-[#eef6f9] via-[#f4fafc] to-[#ebf4f8] text-zinc-900 font-sans antialiased flex flex-col items-center py-0 px-0 relative overflow-x-hidden selection:bg-red-200">
      
      {/* High Performance Premium Custom Desktop Cursor */}
      <PremiumCustomCursor />

      {/* Subtle Repeating Brand Logo Watermarks across the entire site background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] select-none z-0 filter grayscale" 
        style={{ 
          backgroundImage: "url('/src/assets/images/strollo_logo_1781364471188.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '110px 110px',
        }} 
      />

      {/* Premium Minimalist Blueprint Grid / Dot Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4] select-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#d3e3eb 1.2px, transparent 1.2px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Decorative Brand Watermark Logo Layers - "somewhat in the foreground but less visible" */}
      <div className="absolute top-[18%] left-[-160px] md:left-[-100px] w-[500px] h-[500px] md:w-[650px] md:h-[650px] opacity-[0.035] pointer-events-none select-none z-0 transform -rotate-12 transition-transform duration-[4000ms] ease-out">
        <img 
          src="/src/assets/images/strollo_logo_1781364471188.jpg" 
          alt="" 
          className="w-full h-full object-contain rounded-full filter grayscale contrast-[1.1]" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute top-[62%] right-[-180px] md:right-[-120px] w-[550px] h-[550px] md:w-[700px] md:h-[700px] opacity-[0.028] pointer-events-none select-none z-0 transform rotate-45 transition-transform duration-[5000ms] ease-out">
        <img 
          src="/src/assets/images/strollo_logo_1781364471188.jpg" 
          alt="" 
          className="w-full h-full object-contain rounded-full filter grayscale contrast-[1.1]" 
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Premium Multi-Color Background Glowing Accents (Abstract Pale Blue & Sky Blue Orbs) */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-sky-500 via-blue-400 to-transparent opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-900 via-sky-600 to-transparent opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Action Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-6 z-[100] max-w-sm bg-black text-white px-5 py-3 rounded-xl shadow-2xl border border-zinc-850 flex items-center gap-3"
            id="toast-notification"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="aesthetic-showcase-container" className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col min-h-screen">
        
        {/* Main Direct Web Viewport Area */}
        <div id="mobile-viewport" className="flex-grow w-full bg-transparent relative flex flex-col pb-24 min-h-screen">
          
          {/* Elegant simple background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            <div className="absolute top-[10%] right-[-10%] w-72 h-72 rounded-full bg-blue-300/10 blur-3xl" />
            <div className="absolute bottom-[20%] left-[-15%] w-80 h-80 rounded-full bg-sky-200/10 blur-3xl" />
          </div>

              {/* STICKY GLASSMORPHIC HEADER */}
              <div className={`sticky top-0 z-30 px-4 py-3 flex items-center justify-between ${perf.backdropBlurClass}`}>
                <span className="font-sans text-xs tracking-[0.25em] font-black text-black uppercase">
                  STROLLO SNEAKERS
                </span>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsCartOpen(true)} 
                    className="relative p-1.5 rounded-full hover:bg-zinc-100 text-black transition-colors cursor-pointer"
                    id="shopping-bag-header-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {cart.length > 0 && (
                      <motion.span 
                        initial={{ scale: 0.5 }} 
                        animate={{ scale: 1 }}
                        className="absolute -top-0.5 -right-0.5 bg-red-650 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                      >
                        {cart.reduce((s, c) => s + c.quantity, 0)}
                      </motion.span>
                    )}
                  </button>
                </div>
              </div>

              {/* BIO CONTENT */}
              <div id="bio-header-section" className="flex flex-col items-center pt-6 px-6 text-center">
                
                {/* Logo Image with interactive hover animation & subtle load-in */}
                <motion.div 
                  initial={{ scale: 0.82, opacity: 0, rotate: -8 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.15 }}
                  whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.2 } }}
                  className="relative mb-3.5 w-24 h-24 rounded-full bg-zinc-100 border-2 border-red-600 p-0.5 shadow-md cursor-pointer group"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center text-white text-3xl font-extrabold italic relative">
                    <img 
                      src="/src/assets/images/strollo_logo_1781364471188.jpg" 
                      alt="STROLLO Sneakers Logo" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Verified badge */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                    className="absolute bottom-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md z-20 border-2 border-white"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[4.5]" />
                  </motion.div>
                </motion.div>

                {/* Animated "STROLLO Sneakers" Title */}
                <motion.h2 
                  initial={{ y: 22, opacity: 0, scale: 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.28 }}
                  className="text-xl font-black text-black tracking-tight uppercase"
                >
                  STROLLO Sneakers
                </motion.h2>

                {/* Animated tagline */}
                <motion.p 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.42 }}
                  className="text-[10px] uppercase tracking-[0.25em] text-red-600 font-bold mb-3"
                >
                  _ Baskets | Crocs | Sandales _
                </motion.p>

                <p className="text-xs text-zinc-650 leading-relaxed px-4 mb-4 font-normal">
                  Boutique à <strong className="text-black font-bold">Karpala près de la Clinique Kassam</strong> 📍. Une sélection d'exception de baskets, crocs et sandales de prestige.
                </p>



                {/* Micro Value badges */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5 select-none animate-fade-in">
                  <span className="text-[9.5px] bg-orange-50 text-[#FF6600] border border-orange-100/60 px-2.5 py-0.5 rounded-full font-sans font-black flex items-center gap-1">
                    🧡 Orange Money & Wave Acceptés
                  </span>
                  <span className="text-[9px] bg-zinc-100 text-zinc-900 px-2.5 py-0.5 rounded-full font-bold">
                    ✦ Baskets Exclusives
                  </span>
                  <span className="text-[9px] bg-zinc-100 text-zinc-900 px-2.5 py-0.5 rounded-full font-bold">
                    ✦ Crocs & Sandales
                  </span>
                  <span className="text-[9px] bg-zinc-100 text-zinc-900 px-2.5 py-0.5 rounded-full font-bold">
                    ✦ Livraison Rapide 🇧🇫
                  </span>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-2.5">
                  <a href="#instagram" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-red-500 hover:border-red-500 transition-all">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://wa.me/22664284773" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-red-500 hover:border-red-500 transition-all">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.004 0C5.378 0 .004 5.374.004 12c0 2.112.551 4.167 1.597 5.978L0 24l6.191-1.625A11.93 11.93 0 0012.004 24c6.623 0 12-5.374 12-12s-5.377-12-12-12zm6.653 17.151c-.266.751-1.341 1.373-1.854 1.412-.511.037-.999.208-3.197-.677-2.812-1.134-4.609-3.99-4.75-4.177-.14-.187-.999-1.328-.999-2.531s.631-1.796.855-2.039c.224-.243.489-.304.653-.304.164 0 .327.001.469.006.148.005.347-.056.543.418.2.484.693 1.688.755 1.812.062.125.103.271.02.438-.083.167-.124.271-.249.418-.124.145-.262.324-.374.435-.125.122-.256.255-.11.503.146.248.65 1.071 1.393 1.733.959.851 1.762 1.114 2.012 1.238.25.124.396.103.543-.062.148-.166.633-.738.802-.988.17-.25.337-.208.566-.123.23.085 1.458.687 1.71 1.812.049.25.124.417.062.542z"/>
                    </svg>
                  </a>
                  <a href="#newsletter" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-red-500 hover:border-red-500 transition-all">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>



              {/* STORIES SELECTOR */}
              <div id="stories-ribbon" className="border-t border-b border-zinc-100 py-3.5 my-3 px-4 bg-zinc-50/50">
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {BOUTIQUE_STORIES.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => {
                        setActiveStory(story);
                        setActiveStoryIdx(0);
                      }}
                      className="flex flex-col items-center gap-1 flex-shrink-0 group cursor-pointer focus:outline-none"
                    >
                      <div className="p-0.5 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 group-hover:scale-105">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-full object-cover bg-zinc-100"
                        />
                      </div>
                      <span className="text-[9.5px] font-bold text-zinc-800">
                        {story.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CATEGORIES PILLS (FIXED TO DYNAMIC KEYS IN DATA.TS) */}
              <div id="category-selector" className="flex justify-center space-x-4 mt-2 border-y border-zinc-50 py-2.5 select-none w-full px-4 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'Sélection Pro' },
                  { id: 'baskets', label: 'Baskets' },
                  { id: 'crocs', label: 'Crocs' },
                  { id: 'sandales', label: 'Sandales' },
                  { id: 'accessories', label: 'Accessoires' }
                ].map((cat) => {
                  const count = cat.id === 'all' 
                    ? products.length 
                    : products.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[10px] uppercase tracking-wider font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                        selectedCategory === cat.id 
                          ? 'text-red-600 border-b-2 border-red-600 pb-0.5' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`px-1 rounded-md text-[8.5px] font-bold font-mono ${
                        selectedCategory === cat.id 
                          ? 'bg-red-600 text-white' 
                          : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* PRODUCTS FLUID GRID */}
              <div id="product-grid" className={`px-4 py-4 flex-grow ${perf.tier === 'high' ? 'contain-performance' : ''}`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((p) => {
                    const isWish = wishlist.includes(p.id);
                    return (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className="group bg-white rounded-2xl p-2.5 flex flex-col border border-zinc-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-red-650 hover:border-red-600/30 hover:shadow-[0_8px_24px_rgba(220,38,38,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer relative"
                      >
                        {/* Favorite button */}
                        <button
                          onClick={(e) => toggleWishlist(p.id, e)}
                          className="absolute top-4 right-4 z-10 w-6 h-6 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-zinc-450 hover:text-red-600 shadow-sm cursor-pointer"
                        >
                          <Heart className={`w-3 h-3 ${isWish ? 'fill-red-600 text-red-600' : 'text-zinc-400'}`} />
                        </button>

                        {/* Floating Hot tag */}
                        {p.tag && (
                          <div className="absolute top-4 left-4 z-10 bg-black text-white text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded">
                            {p.tag}
                          </div>
                        )}

                        {/* Product image container */}
                        <div className="w-full aspect-square bg-zinc-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative border border-zinc-100">
                          <img 
                            src={p.image} 
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1 mb-1 opacity-75">
                              <Star className="w-2.5 h-2.5 fill-red-600 text-red-600 stroke-0" />
                              <span className="text-[9px] font-extrabold font-mono text-zinc-900">{p.rating.toFixed(1)}</span>
                              <span className="text-[8.5px] text-zinc-450">({p.reviewsCount})</span>
                            </div>

                            <h3 className="text-[11px] font-extrabold tracking-tight text-zinc-900 truncate mb-1 group-hover:text-red-650 group-hover:text-red-600">
                              {p.name}
                            </h3>
                          </div>

                          <div>
                            <p className="text-[11px] text-red-600 font-bold mb-2 font-mono">
                              {p.price.toLocaleString()} FCFA
                              {p.originalPrice && (
                                <span className="text-[9px] text-zinc-400 line-through ml-1.5 font-normal">
                                  {p.originalPrice.toLocaleString()} F
                                </span>
                              )}
                            </p>

                            <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(p);
                                }}
                              className="w-full py-2 bg-black hover:bg-red-600 text-white text-[9.5px] font-extrabold rounded-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              Acheter
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

               {/* VIP CLUB NEWSLETTER */}
              <div id="newsletter" className="mx-4 mt-6 mb-4 p-5 rounded-3xl bg-zinc-50 border border-zinc-100 text-center relative overflow-hidden">
                <h3 className="font-sans text-xs font-black text-black tracking-wide uppercase mb-1">
                  Rejoignez le Club VIP STROLLO
                </h3>
                <p className="text-[11px] text-zinc-500 mb-4 px-4 leading-relaxed">
                  Abonnez-vous pour être informé en premier lors des arrivages exclusifs de baskets, crocs de prestige et ventes privées.
                </p>

                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm mx-auto">
                    <input 
                      type="email" 
                      placeholder="Votre adresse e-mail" 
                      required
                      value={subscriptionEmail}
                      onChange={(e) => setSubscriptionEmail(e.target.value)}
                      className="flex-grow bg-white text-xs px-3 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 focus:ring-1 focus:ring-red-600 outline-none"
                    />
                    <button 
                      type="submit"
                      className="bg-black hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      Recevoir
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-[11px] text-emerald-950 font-semibold mb-0">Inscription réussie !</p>
                    <p className="text-[10px] text-zinc-500">Bienvenue dans le club. Vous recevrez nos alertes arrivages de prestige très bientôt.</p>
                  </motion.div>
                )}
              </div>

              {/* WHATSAPP SUPPORT */}
              <div id="customer-support-section" className="mx-4 mt-4 p-5 rounded-3xl bg-zinc-50 border border-zinc-100 text-center relative overflow-hidden">
                <h3 className="font-sans text-xs font-black text-black tracking-wide uppercase mb-1.5 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Support WhatsApp Direct
                </h3>
                <p className="text-[11px] text-zinc-500 mb-4 px-4 leading-relaxed">
                  Des questions sur nos modèles, tailles ou besoin de commander directement ? Échangez avec nous sur WhatsApp au <strong className="text-zinc-900 font-bold">+226 64 28 47 73</strong>.
                </p>
                <a 
                  href="https://wa.me/22664284773?text=Bonjour%20STROLLO%20Sneakers%20!%20J'aimerais%20avoir%20plus%20d'informations%20sur%20vos%20baskets%20disponibles." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                  onClick={() => showToast('Ouverture de WhatsApp...')}
                >
                  Continuer sur WhatsApp
                </a>
              </div>

              {/* ACCORDION FAQ */}
              <div id="faq-section" className="px-5 py-4 mt-4 select-none shrink-0">
                <h3 className="font-sans text-xs font-black text-black uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  Foire Aux Questions (FAQ)
                </h3>

                <div className="space-y-2">
                  {faqs.map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="border-b border-zinc-100 pb-2">
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full flex justify-between items-center text-left py-1 text-xs font-semibold text-zinc-800 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <span className={`text-base font-bold text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-red-650 text-red-600' : ''}`}>+</span>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-1"
                            >
                              <p className="text-[11px] text-zinc-500 leading-relaxed bg-zinc-50/50 p-2 rounded">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* GEOLOCATION MAP COMPONENT */}
              <div id="geolocation-section" className="mx-4 mt-6 p-5 rounded-3xl bg-zinc-50 border border-zinc-100 select-none">
                <h3 className="font-sans text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600 animate-bounce" />
                  Notre Géolocalisation
                </h3>
                <p className="text-[11px] text-zinc-550 mb-3.5 leading-normal">
                  Retrouvez notre boutique à <strong className="text-zinc-900">Karpala, tout près de la Clinique Kassam</strong> à Ouagadougou. Passez nous voir pour essayer vos pointures !
                </p>

                {/* Google Maps Iframe */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/60 bg-zinc-100 relative mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.4374384666014!2d-1.4795328239014167!3d12.353381628172935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2ebe41662c5bbf%3A0xa9ff7aee41ca69d1!2sStrollosneakers!5e0!3m2!1sfr!2sbf!4v1717320000000!5m2!1sfr!2sbf"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                    title="Carte STROLLO Sneakers Karpala"
                  />
                </div>

                {/* Open in Maps primary CTA */}
                <a 
                  href="https://maps.google.com/?q=Strollosneakers,+Karpala,+Ouagadougou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-red-650 text-white text-[10.5px] font-extrabold uppercase py-3 px-4 rounded-xl transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                  onClick={() => showToast("Ouverture de l'itinéraire sur Google Maps...")}
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  Ouvrir l’itinéraire Google Maps
                </a>
              </div>

              {/* CO-CREDITS STATEMENT */}
              <div className="px-5 py-8 mt-4 text-center border-t border-zinc-100 select-none text-[10px] text-zinc-400 leading-normal font-sans">
                <p className="font-extrabold text-zinc-800">© 2026 STROLLO SNEAKERS. Tous droits réservés.</p>
                <p className="mt-1">Boutique physique à Karpala près de la Clinique Kassam, Ouagadougou.</p>
              </div>

            </div> {/* Viewport ends */}

            {/* FLOATING CART BAR */}
            {cart.length > 0 && !isCartOpen && (
              <motion.button 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={() => {
                  setIsCartOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="absolute bottom-4 left-4 right-4 z-40 bg-black hover:bg-zinc-900 text-white text-xs font-extrabold tracking-widest uppercase py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-between transition-all duration-300 cursor-pointer border border-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-red-600" />
                  <span>Mon Panier ({cart.reduce((s, c) => s + c.quantity, 0)})</span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <span>{cartTotal.toLocaleString()} F</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            )}

            {/* STORIES MODAL */}
            <AnimatePresence>
              {activeStory && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed lg:absolute inset-0 z-[60] bg-black overflow-hidden flex flex-col justify-between"
                  id="story-modal"
                >
                  {/* Indicators */}
                  <div className="px-3 pt-4 pb-2 shrink-0 flex gap-1 z-50">
                    {activeStory.slides.map((_, sIdx) => {
                      let fillPercentage = 0;
                      if (sIdx < activeStoryIdx) fillPercentage = 100;
                      if (sIdx === activeStoryIdx) fillPercentage = storyProgress;
                      return (
                        <div key={sIdx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-600 transition-all duration-[80ms] ease-linear" 
                            style={{ width: `${fillPercentage}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Info Header */}
                  <div className="px-4 py-2 flex items-center justify-between z-50 shrink-0 text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-zinc-900 overflow-hidden flex items-center justify-center font-bold text-xs italic border border-red-600">
                        S
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-wider uppercase">{activeStory.title}</p>
                        <p className="text-[9px] text-zinc-400">STROLLO Sneakers Story</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveStory(null);
                        setActiveStoryIdx(0);
                      }}
                      className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Viewport tap areas */}
                  <div className="flex-1 relative flex items-center justify-center p-3 select-none">
                    <div 
                      onClick={() => {
                        if (activeStoryIdx > 0) {
                          setActiveStoryIdx(activeStoryIdx - 1);
                          setStoryProgress(0);
                        }
                      }}
                      className="absolute left-0 top-0 bottom-0 w-1/3 z-40 cursor-w-resize" 
                    />
                    
                    <div 
                      onClick={() => {
                        if (activeStoryIdx < activeStory.slides.length - 1) {
                          setActiveStoryIdx(activeStoryIdx + 1);
                          setStoryProgress(0);
                        } else {
                          setActiveStory(null);
                        }
                      }}
                      className="absolute right-0 top-0 bottom-0 w-1/3 z-40 cursor-e-resize"
                    />

                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeStoryIdx}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner flex items-center"
                      >
                        <img 
                          src={activeStory.slides[activeStoryIdx].image} 
                          alt="Story description content"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
                        
                        {/* Caption Box */}
                        <div className="absolute bottom-6 left-5 right-5 z-20 text-white">
                          <h4 className="font-sans text-base font-black tracking-wide text-white uppercase mb-1">
                            {activeStory.slides[activeStoryIdx].title}
                          </h4>
                          <p className="text-xs text-zinc-200 leading-relaxed font-normal">
                            {activeStory.slides[activeStoryIdx].description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="p-4 bg-zinc-950/80 border-t border-zinc-900 flex gap-2 shrink-0 select-none z-50">
                    <button
                      onClick={() => {
                        setActiveStory(null);
                        showToast('Bon shopping !');
                      }}
                      className="flex-1 bg-white text-zinc-950 hover:bg-red-600 hover:text-white text-xs font-bold py-3 rounded-xl tracking-wider transition-all cursor-pointer text-center"
                    >
                      Découvrir la Boutique
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QUICK DETAIL MODAL BOTTOM SHEET */}
            <AnimatePresence>
              {selectedProduct && (
                <div className="fixed lg:absolute inset-0 bg-black/60 z-[70] flex flex-col justify-end">
                  <div className="absolute inset-0 -z-10" onClick={() => setSelectedProduct(null)} />
                  
                  <motion.div 
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                    transition={perf.springTransitionConfig}
                    className="bg-white rounded-t-3xl max-h-[85%] overflow-y-auto no-scrollbar flex flex-col relative border-t border-zinc-100 shadow-2xl text-zinc-900"
                  >
                    <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto my-3 shrink-0" />

                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-100 text-zinc-600 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="px-5 pb-8 flex flex-col">
                      <div className="flex gap-4 mb-5 items-start mt-1">
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.name} 
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 rounded-2xl object-cover bg-zinc-50 border border-zinc-100 flex-shrink-0" 
                        />
                        <div className="flex-grow">
                          <span className="text-[9.5px] uppercase font-extrabold text-red-600 tracking-wider">{selectedProduct.category}</span>
                          <h2 className="text-sm font-black text-black tracking-tight leading-tight uppercase mt-0.5">{selectedProduct.name}</h2>
                          
                          <div className="flex items-center gap-1.5 my-1.5 font-mono">
                            <span className="text-sm font-extrabold text-red-650 text-red-600">{selectedProduct.price.toLocaleString()} FCFA</span>
                            {selectedProduct.originalPrice && (
                              <span className="text-xs text-zinc-400 line-through">{selectedProduct.originalPrice.toLocaleString()} F</span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                            <Star className="w-3.5 h-3.5 fill-red-650 text-red-605 fill-red-600 text-red-600 stroke-0" />
                            <span className="font-extrabold text-zinc-900">{selectedProduct.rating.toFixed(1)}</span>
                            <span>• {selectedProduct.reviewsCount} avis clients</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-xs text-zinc-650 leading-relaxed">
                        <div>
                          <h4 className="font-sans font-extrabold text-black uppercase tracking-wider text-xs mb-1">Histoire de la Paire</h4>
                          <p>{selectedProduct.description}</p>
                        </div>

                        <div>
                          <h4 className="font-sans font-extrabold text-black uppercase tracking-wider text-xs mb-1">Détails de Conception</h4>
                          <ul className="grid grid-cols-1 gap-1 pl-1 list-none">
                            {selectedProduct.ingredientsOrDetails.map((ing, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-sans font-extrabold text-black uppercase tracking-wider text-xs mb-1">Conseils d’Entretien</h4>
                          <p className="italic bg-zinc-50 p-3 rounded-xl border-l-[3px] border-red-600 text-zinc-700">
                            {selectedProduct.usageTips}
                          </p>
                        </div>

                        {/* Avis vérifiés */}
                        <div>
                          <h4 className="font-sans font-extrabold text-black uppercase tracking-wider text-xs mb-2 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                            Avis Clients de la Boutique
                          </h4>
                          <div className="space-y-2.5">
                            {CLIENT_REVIEWS.map((rev) => (
                              <div key={rev.id} className="p-3 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-[11px] text-zinc-900">{rev.author}</span>
                                  <span className="text-[9px] text-zinc-400">{rev.date}</span>
                                </div>
                                <div className="flex items-center gap-0.5 mb-1.5">
                                  {[...Array(rev.rating)].map((_, rIdx) => (
                                    <Star key={rIdx} className="w-2.5 h-2.5 fill-red-600 text-red-600 stroke-0" />
                                  ))}
                                </div>
                                <p className="text-[10px] text-zinc-600 italic">
                                  "{rev.comment}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-3">
                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            setSelectedProduct(null);
                          }}
                          className="flex-1 bg-black hover:bg-red-600 text-white text-xs font-extrabold tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Ajouter au Panier
                        </button>
                      </div>

                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* SHOPPING BAG SHEET */}
            <AnimatePresence>
              {isCartOpen && (
                <div className="fixed lg:absolute inset-0 bg-black/60 z-[80] flex flex-col justify-end">
                  <div className="absolute inset-0 -z-10" onClick={() => setIsCartOpen(false)} />
                  
                  <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={perf.springTransitionConfig}
                    className="bg-white rounded-t-3xl max-h-[85%] flex flex-col shadow-2xl relative border-t border-zinc-200 overflow-hidden text-zinc-900"
                  >
                    <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto my-3 shrink-0" />

                    {/* Header */}
                    <div className="px-5 pb-3 border-b border-zinc-100 flex items-center justify-between shrink-0 select-none">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4.5 h-4.5 text-red-600" />
                        <h3 className="font-sans text-xs font-black text-black tracking-wide uppercase">Mon Panier</h3>
                        <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                          {cart.reduce((s, c) => s + c.quantity, 0)}
                        </span>
                      </div>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="p-1 rounded-full hover:bg-zinc-150 text-zinc-700 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {checkoutStep === 'idle' && (
                      <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                          {cart.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
                              <ShoppingBag className="w-12 h-12 stroke-[1] text-zinc-400 mb-3" />
                              <p className="text-xs font-bold text-zinc-850">Votre panier est vide</p>
                              <p className="text-[11px] mt-1 text-zinc-500">Ajoutez des sneakers et commencez votre style.</p>
                            </div>
                          ) : (
                            cart.map((item) => (
                              <div key={item.product.id} className="flex gap-3.5 items-center pb-3.5 border-b border-zinc-100">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  referrerPolicy="no-referrer"
                                  className="w-14 h-14 rounded-xl object-cover bg-zinc-100 border border-zinc-200 shrink-0" 
                                />
                                
                                <div className="flex-grow">
                                  <h3 className="text-xs font-extrabold text-zinc-900 line-clamp-1">{item.product.name}</h3>
                                  <span className="text-[10px] text-zinc-450 uppercase font-semibold">{item.product.category} • {item.product.price.toLocaleString()} F</span>
                                  
                                  <div className="flex items-center gap-2 mt-1.5 select-none">
                                    <button 
                                      onClick={() => updateCartQty(item.product.id, -1)}
                                      className="w-5 h-5 rounded bg-zinc-100 flex items-center justify-center text-zinc-900 font-bold hover:bg-zinc-200 transition-all cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="text-[11px] font-bold font-mono text-zinc-800 w-4 text-center">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateCartQty(item.product.id, 1)}
                                      className="w-5 h-5 rounded bg-zinc-100 flex items-center justify-center text-zinc-900 font-bold hover:bg-zinc-200 transition-all cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <div className="text-right shrink-0 flex flex-col items-end gap-1.5 justify-between">
                                  <span className="text-xs font-bold font-mono text-zinc-900">
                                    {(item.product.price * item.quantity).toLocaleString()} F
                                  </span>
                                  <button 
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-[10px] text-red-600 hover:underline cursor-pointer font-bold"
                                  >
                                    Retirer
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Coupon Promo Segment */}
                        {cart.length > 0 && (
                          <div className="px-5 py-3.5 border-t border-b border-zinc-100 bg-zinc-50">
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Code promo (Ex: SOL15)" 
                                value={promoInput}
                                onChange={(e) => {
                                  setPromoInput(e.target.value);
                                  setPromoError(null);
                                }}
                                className="flex-grow bg-white text-xs px-3 py-2 rounded-xl border border-zinc-200 outline-none"
                              />
                              <button 
                                onClick={applyCouponCode}
                                className="bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-650 hover:bg-red-600 transition-colors cursor-pointer"
                              >
                                Appliquer
                              </button>
                            </div>
                            {promoError && (
                              <p className="text-[10px] text-red-600 font-medium mt-1 pl-1">{promoError}</p>
                            )}
                            {activeDiscount && (
                              <p className="text-[10px] text-green-700 font-semibold mt-1 pl-1 flex items-center gap-1">
                                <Check className="w-3 h-3 stroke-[3.5]" />
                                Réduction active : '{activeDiscount.code}' (-{activeDiscount.percent}%)
                              </p>
                            )}
                          </div>
                        )}

                        {/* Bottom Total & Checkout Actions */}
                        <div className="p-5 bg-zinc-50 border-t border-zinc-100 select-none shrink-0 space-y-3.5">
                          {cart.length > 0 && (
                            <div className="space-y-1.5 text-xs text-zinc-650">
                              <div className="flex justify-between items-center">
                                <span>Sous-total Panier</span>
                                <span className="font-mono">{cartSubtotal.toLocaleString()} FCFA</span>
                              </div>
                              {activeDiscount && (
                                <div className="flex justify-between items-center text-green-700 font-bold">
                                  <span>Réduction Code (-{activeDiscount.percent}%)</span>
                                  <span className="font-mono">-{discountAmount.toLocaleString()} FCFA</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center">
                                <span>Livraison (Express Boutique)</span>
                                <span className="font-mono">
                                  {deliveryFee === 0 ? <strong className="text-red-600 font-bold uppercase">GRATUITE</strong> : `${deliveryFee.toLocaleString()} FCFA`}
                                </span>
                              </div>
                              <div className="pt-2 border-t border-zinc-200 flex justify-between items-center font-bold text-sm text-black">
                                <span>Total Estimé</span>
                                <span className="font-mono text-base text-red-600">{cartTotal.toLocaleString()} FCFA</span>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={startCheckout}
                            disabled={cart.length === 0}
                            className="w-full text-xs font-extrabold tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all bg-black text-white hover:bg-red-650 hover:bg-red-600 cursor-pointer disabled:opacity-40"
                          >
                            Passer à la Caisse (Sécurisé)
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {checkoutStep === 'shipping' && (
                      <div className="flex-1 overflow-y-auto px-5 py-4">
                        <div className="flex items-center gap-2 text-xs text-red-600 font-bold mb-3 uppercase">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Validation de la commande</span>
                        </div>
                        
                        <form onSubmit={submitPayment} className="space-y-3.5 pb-8">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-900 uppercase tracking-wider mb-1">Nom Complet</label>
                            <input 
                              type="text" 
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleCheckoutFormChange}
                              placeholder="Inoussa Traoré" 
                              className="w-full bg-zinc-50 text-zinc-900 text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-red-600 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-900 uppercase tracking-wider mb-1">Adresse E-mail</label>
                              <input 
                                type="email" 
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleCheckoutFormChange}
                                placeholder="client@strollo.com" 
                                className="w-full bg-zinc-50 text-zinc-900 text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-red-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-900 uppercase tracking-wider mb-1">Zone / Ville</label>
                              <input 
                                type="text" 
                                name="zip"
                                required
                                value={formData.zip}
                                onChange={handleCheckoutFormChange}
                                placeholder="Ouagadougou / Karpala" 
                                className="w-full bg-zinc-50 text-zinc-900 text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-red-600 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-zinc-900 uppercase tracking-wider mb-1">Numéro WhatsApp pour livraison</label>
                            <input 
                              type="tel" 
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleCheckoutFormChange}
                              placeholder="+226 64 28 47 73" 
                              className="w-full bg-zinc-50 text-zinc-900 text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-red-600 outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-zinc-900 uppercase tracking-wider mb-1">Indications adresse précise</label>
                            <input 
                              type="text" 
                              name="address"
                              required
                              value={formData.address}
                              onChange={handleCheckoutFormChange}
                              placeholder="Karpala, face à la Clinique Kassam" 
                              className="w-full bg-zinc-50 text-zinc-900 text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-red-600 outline-none select-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-zinc-900 uppercase tracking-wider mb-2">Mode de règlement préféré</label>
                            <div className="grid grid-cols-2 gap-2 text-zinc-900 select-all">
                              {[
                                { id: 'orange_money', label: 'Orange Money 🧡', desc: 'Faire un dépôt OM' },
                                { id: 'wave', label: 'Wave Mobile 💙', desc: 'Transfert Wave rapide' },
                                { id: 'moov_money', label: 'Moov Money 💚', desc: 'Moov Flooz' },
                                { id: 'cash', label: 'Espèces à la livraison 💵', desc: 'À la remise du colis' }
                              ].map((option) => (
                                <label 
                                  key={option.id}
                                  className={`p-3 rounded-xl border flex flex-col cursor-pointer transition-all ${
                                    formData.paymentMethod === option.id 
                                      ? 'border-orange-500 bg-orange-50/20 shadow-sm font-bold' 
                                      : 'border-zinc-200 hover:bg-zinc-50'
                                  }`}
                                >
                                  <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value={option.id} 
                                    checked={formData.paymentMethod === option.id}
                                    onChange={handleCheckoutFormChange}
                                    className="sr-only"
                                  />
                                  <span className="text-[11px] font-black">{option.label}</span>
                                  <span className="text-[9px] text-zinc-400 mt-0.5">{option.desc}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-zinc-100 flex gap-3 text-xs">
                            <button 
                              type="button"
                              onClick={() => setCheckoutStep('idle')}
                              className="w-1/3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-3.5 rounded-xl tracking-wider text-center cursor-pointer transition-all"
                            >
                              Retour
                            </button>
                            <button 
                              type="submit"
                              className="w-2/3 bg-black hover:bg-red-600 text-white font-bold py-3.5 rounded-xl tracking-wider text-center cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              Valider • {cartTotal.toLocaleString()} F
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {checkoutStep === 'submitting' && (
                      <div className="flex-1 py-16 flex flex-col items-center justify-center text-center px-4">
                        <div className="w-10 h-10 border-4 border-zinc-200 border-t-red-600 rounded-full animate-spin mb-4" />
                        <h4 className="font-sans text-sm font-black text-black uppercase tracking-wider">Mise de côté du Colis</h4>
                        <p className="text-[11px] text-zinc-500 mt-1 max-w-[240px]">Validation de votre réservation exclusive de baskets croustillantes en cours...</p>
                      </div>
                    )}

                    {checkoutStep === 'success' && (
                      <div className="flex-1 py-6 px-4 flex flex-col text-left">
                        {orderFinished ? (
                          <div id="order-finished-sticker-view" className="flex-1 py-10 px-4 flex flex-col items-center justify-center text-center animate-fade-in">
                            {/* Cute Circular stamp / sticker for validation */}
                            <div className="relative mb-6 flex items-center justify-center">
                              {/* Glowing pulse rings */}
                              <div className="absolute w-24 h-24 rounded-full bg-sky-200/40 animate-ping opacity-75" />
                              <div className="absolute w-20 h-20 rounded-full bg-sky-100/60 animate-pulse" />
                              
                              {/* Small validation sticker */}
                              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#e3edf2] via-[#f0f7fa] to-white border-[3px] border-double border-sky-400 text-sky-850 flex flex-col items-center justify-center p-3 relative select-none transform rotate-[-4deg] shadow-lg">
                                <Check className="w-9 h-9 text-sky-600 stroke-[3.5] mb-0.5" />
                                <span className="text-[8px] tracking-[0.2em] font-sans font-black text-sky-700 uppercase">SUCCÈS</span>
                                
                                {/* Aesthetic starburst or dashed inner detail of seal */}
                                <div className="absolute inset-1 border border-dashed border-sky-300/60 rounded-full pointer-events-none" />
                              </div>
                            </div>

                            <span className="font-sans text-[10px] tracking-widest font-black text-sky-700 uppercase mb-3 px-2.5 py-0.5 rounded bg-sky-50 border border-sky-200/50">
                              COMMANDE VALIDÉE
                            </span>

                            <h3 className="font-sans text-xs font-black text-zinc-950 uppercase tracking-widest leading-snug">
                              Merci pour votre commande !
                            </h3>
                            
                            <p className="text-[10px] font-medium text-zinc-650 mt-2 max-w-[280px] leading-relaxed">
                              Le panier a été vidé à zéro ! Vos sneakers sont bien de côté. Vos détails de livraison ont été préparés pour WhatsApp.
                            </p>

                            <button
                              onClick={() => {
                                setCheckoutStep('idle');
                                setIsCartOpen(false);
                                setOrderFinished(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full mt-7 bg-zinc-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-center"
                            >
                              Fermer et continuer
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col items-center text-center mb-5">
                              <div className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3.5 border border-red-200">
                                <Check className="w-5 h-5 stroke-[3.5]" />
                              </div>
                              
                              <h3 className="font-sans text-[13px] font-black text-black uppercase tracking-wider">
                                Vos Baskets Sont Réservées !
                              </h3>
                              <p className="text-[10px] text-zinc-500 mt-1 max-w-[280px]">
                                Commande enregistrée ! Veuillez cliquer sur le bouton ci-dessous pour envoyer vos détails directement sur WhatsApp afin de fixer la livraison.
                              </p>
                            </div>

                            {/* Simple Recap Box */}
                            <div className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl my-4 text-left text-[11px] space-y-1.5 font-mono text-zinc-800">
                              <div className="flex justify-between font-bold border-b border-zinc-200 pb-1 text-xs text-black uppercase">
                                <span>RÉSERVATION</span>
                                <span className="text-red-605 text-red-600 font-extrabold uppercase">CONFIRMÉE</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Client</span>
                                <span className="font-extrabold text-zinc-900">{formData.name || 'Aimable Client(e)'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>WhatsApp</span>
                                <span className="text-zinc-900">{formData.phone || 'Non renseigné'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lieu</span>
                                <span className="truncate max-w-[150px] text-zinc-900">{formData.address || 'Karpala, Ouaga'}</span>
                              </div>
                              <div className="flex justify-between font-bold text-black border-t border-zinc-200 pt-1.5 mt-1">
                                <span>Montant Total</span>
                                <span>{(lastCompletedOrder?.total || 0).toLocaleString()} FCFA</span>
                              </div>
                            </div>

                            {/* Email Notice */}
                            <div className="w-full bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl my-4 text-left text-[11px] text-emerald-800 space-y-1">
                              <span className="font-extrabold flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                Alerte Administrateur active
                              </span>
                              <p className="opacity-90 leading-tight">
                                Avis d'achat imminent envoyé à l'adresse gérante : <strong className="underline text-emerald-950">rubensia065@gmail.com</strong>.
                              </p>
                            </div>

                            {/* WhatsApp primary CTA */}
                            <a 
                              href={getWhatsAppOrderLink()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md mb-3 cursor-pointer select-none text-center"
                              onClick={() => {
                                setOrderFinished(true);
                                setCart([]); // Reset actual basket/cart size to zero
                                setActiveDiscount(null); // Clear discount
                                showToast('Merci ! Redirection vers WhatsApp...');
                              }}
                            >
                              Envoyer la Commande par WhatsApp
                            </a>

                            <button
                              onClick={() => {
                                setCheckoutStep('idle');
                                setIsCartOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full bg-zinc-900 hover:bg-black text-white text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer text-center"
                            >
                              Retour au Catalogue
                            </button>
                          </>
                        )}
                      </div>
                    )}

                  </motion.div>
                </div>
              )}
            </AnimatePresence>



      </div>

    </div>
  );
}
