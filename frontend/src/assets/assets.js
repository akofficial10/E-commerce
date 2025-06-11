import p_img1 from "./p_img1.png";
import p_img1_1 from "./p_img1_1.png";
import p_img1_2 from "./p_img1_2.png";
import p_img1_3 from "./p_img1_3.png";
import p_img1_4 from "./p_img1_4.png";
import p_img2_1 from "./p_img2_1.png";
import p_img2_2 from "./p_img2_2.png";
import p_img2_3 from "./p_img2_3.png";
import p_img2_4 from "./p_img2_4.png";
import p_img2 from "./p_img2.png";


import logo from "./logo.png";
import cart_icon from "./cart_icon.png";
import bin_icon from "./bin_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import profile_icon from "./profile_icon.png";
import quality_icon from "./quality_icon.png";
import search_icon from "./search_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import star_icon from "./star_icon.png";
import support_img from "./support_img.png";
import menu_icon from "./menu_icon.png";
import about_img from "./about_img.png";
import contact_img from "./contact_img.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import cross_icon from "./cross_icon.png";

export const assets = {
  logo,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  profile_icon,
  quality_icon,
  search_icon,
  star_dull_icon,
  star_icon,
  bin_icon,
  support_img,
  menu_icon,
  about_img,
  contact_img,
  razorpay_logo,
  stripe_logo,
  cross_icon,
};

export const products = [
  {
    _id: "aaaaa",
    name: "DermoDazzle SPF 50+ Body Sunscreen",
    description:
      "A broad-spectrum sunscreen that protects, corrects, and moisturizes skin while offering high sun protection. Ideal for daily use with SPF 50+ PA++. Keeps skin shielded and hydrated.",
    price: 350,
    image: [p_img1, p_img1_1, p_img1_2, p_img1_3, p_img1_4],
    benefits: [
      "SPF 50+ PA++++ protection",
      "Non-greasy formula",
      "Hydrates for 24 hours",
      "Suitable for all skin types",
    ],
    keyIngredients: [
      "Zinc Oxide",
      "Hyaluronic Acid",
      "Vitamin E",
      "Aloe Vera Extract",
    ],
    skinType: "All skin types",
    volume: "30ml",
    bestseller: true,
    rating: 4.8,
    reviewCount: 142,
  },

  {
    _id: "aaaab",
    name: "DermoDazzle Vitamin C Youthful Serum",
    description:
      "A keratin-powered serum that reduces frizz and provides heat protection up to 250°C. Infused with Vitamin C to retain moisture and enhance shine. Includes SPF 50 for added sun defense.",
    price: 420,
    image: [p_img2, p_img2_1, p_img2_2, p_img2_3, p_img2_4],
    benefits: [
      "Brightens complexion and evens skin tone",
      "Reduces appearance of fine lines and wrinkles",
      "Provides antioxidant protection against pollution",
      "Hydrates and plumps skin for 24 hours",
      "Non-comedogenic and suitable for all skin types",
    ],
    keyIngredients: [
      "15% Vitamin C (L-ascorbic acid)",
      "Hyaluronic Acid",
      "Vitamin E",
      "Ferulic Acid",
      "Aloe Vera Extract",
    ],
    skinType: "All skin types",
    volume: "30ml",
    bestseller: true,
    rating: 4.9,
    reviewCount: 102,
  },
  
];