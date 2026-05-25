export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "pizza" | "pasta" | "salad" | "drinks" | "dessert";
  image: string;
  popular?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "pizza-margherita",
    name: "Margherita",
    description: "San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil",
    price: 14.99,
    category: "pizza",
    image: "🍕",
    popular: true,
  },
  {
    id: "pizza-diavola",
    name: "Diavola",
    description: "Spicy salami, tomato, mozzarella, chili flakes, basil",
    price: 17.99,
    category: "pizza",
    image: "🌶️",
    popular: true,
  },
  {
    id: "pizza-funghi",
    name: "Funghi e Tartufo",
    description: "Wild mushrooms, truffle cream, mozzarella, thyme, parmesan shavings",
    price: 19.99,
    category: "pizza",
    image: "🍄",
  },
  {
    id: "pizza-quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, fontina, parmesan, honey drizzle",
    price: 18.99,
    category: "pizza",
    image: "🧀",
  },
  {
    id: "pasta-carbonara",
    name: "Spaghetti Carbonara",
    description: "Guanciale, egg yolk, Pecorino Romano, black pepper",
    price: 16.99,
    category: "pasta",
    image: "🍝",
    popular: true,
  },
  {
    id: "pasta-amatriciana",
    name: "Rigatoni Amatriciana",
    description: "Guanciale, San Marzano tomato, Pecorino Romano, chili",
    price: 15.99,
    category: "pasta",
    image: "🍅",
  },
  {
    id: "salad-caesar",
    name: "Caesar Salad",
    description: "Romaine, house-made Caesar dressing, croutons, parmesan",
    price: 11.99,
    category: "salad",
    image: "🥗",
  },
  {
    id: "salad-caprese",
    name: "Insalata Caprese",
    description: "Buffalo mozzarella, heirloom tomatoes, basil, aged balsamic",
    price: 13.99,
    category: "salad",
    image: "🫒",
  },
  {
    id: "drink-wine-red",
    name: "Chianti Classico",
    description: "Tuscan red wine, medium body, notes of cherry and earthiness",
    price: 9.99,
    category: "drinks",
    image: "🍷",
  },
  {
    id: "drink-water",
    name: "San Pellegrino",
    description: "Sparkling mineral water, 750ml",
    price: 3.99,
    category: "drinks",
    image: "💧",
  },
  {
    id: "dessert-tiramisu",
    name: "Tiramisù",
    description: "Mascarpone, espresso-soaked ladyfingers, cocoa dusting",
    price: 8.99,
    category: "dessert",
    image: "🍰",
    popular: true,
  },
  {
    id: "dessert-panna-cotta",
    name: "Panna Cotta",
    description: "Vanilla bean cream, seasonal berry coulis",
    price: 7.99,
    category: "dessert",
    image: "🍮",
  },
];