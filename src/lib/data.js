export const products = [
  {
    id: 1,
    name: "BAKING PAPER CUPS",
    slug: "baking-paper-cups",
    category: "PAPER CUPS",
    images: [
      {
        id: "img_cups_1",
        url: "/shop/BAKING PAPER CUPS.png",
        alt: "Baking Paper Cups Assorted Colors",
      },
    ],
    tableData: [],
  },
  {
    id: 2,
    name: "Brownie Mould",
    slug: "brownie-mould",
    category: "MOULDS", // Yahan images array format mein hoti hain (agar future mein multiple images add karni hon)
    images: [
      {
        id: "img_brownie_1",
        url: "/shop/Brownie Mould.png",
        alt: "Brownie Mould on Grass",
      },
    ], // Yahan table data bhi array of objects hota hai (jo mapping/loops ke liye standard hai)
    tableData: [
      {
        itemCode: "BM-5025",
        length: 50,
        width: 50,
        height: 25,
      },
      {
        itemCode: "BM-6530",
        length: 65,
        width: 65,
        height: 28,
      },
    ],
  },
  {
    id: 3,
    name: "Burger Paper",
    slug: "burger-paper",
    category: "FOOD WRAPPING",
    images: [
      {
        id: "img_burger_1",
        url: "/shop/Burger Paper.png",
        alt: "Burger Paper Designs",
      },
    ],
    tableData: [
      {
        item: "9x12",
        width: 9,
        length: 12,
        packing: "40,000",
      },
      {
        item: "10x12",
        width: 10,
        length: 12,
        packing: "40,000",
      },
      {
        item: "12x12",
        width: 12,
        length: 12,
        packing: "23,000",
      },
      {
        item: "18x24",
        width: 18,
        length: 24,
        packing: "23,000",
      },
      {
        item: "20x30",
        width: 20,
        length: 30,
        packing: "20,000",
      },
    ],
  },
  {
    id: 4,
    name: "Butter Paper",
    slug: "butter-paper",
    category: "SHEET",
    images: [
      {
        id: "img_butter_1",
        url: "/shop/Butter Paper.png",
        alt: "Butter Paper Sheets",
      },
    ],
    tableData: [
      {
        item: "60x90",
        width: 60,
        length: 90,
        packing: 1000,
      },
      {
        item: "65x95",
        width: 65,
        length: 95,
        packing: 1000,
      },
      {
        item: "70x110",
        width: 70,
        length: 110,
        packing: 1000,
      },
    ],
  },
  {
    id: 5,
    name: "Cake Base Board",
    slug: "cake-base-board",
    category: "CAKE",
    images: [
      {
        id: "img_cake_base_1",
        url: "/shop/Cake Base Board.png",
        alt: "Cake Base Board Gold and Silver",
      },
      {
        id: "img_cake_base_2",
        url: "/shop/Cake Base Board2.png",
        alt: "Stacked Cake Base Boards",
      },
    ],
    tableData: [
      {
        size: 6,
        moq: 5200,
      },
      {
        size: 6.5,
        moq: 5200,
      },
      {
        size: 7,
        moq: 5200,
      },
      {
        size: 7.5,
        moq: 5200,
      },
      {
        size: 8,
        moq: 5200,
      },
    ],
  },
  {
    id: 6,
    name: "Cake Box",
    slug: "cake-box",
    category: "BOX, CAKE",
    images: [
      {
        id: "img_cake_box_1",
        url: "/shop/Cake Box.png",
        alt: "Gold Cake Box with Transparent Window",
      },
      {
        id: "img_cake_box_2",
        url: "/shop/Cake Box2.png",
        alt: "Various Cake Boxes and Packaging",
      },
    ],
    tableData: [
      {
        item: "6x6x4",
        base: "7x7",
        length: 4,
        packing: 100,
      },
      {
        item: "7x7x4",
        base: "9x9",
        length: 4,
        packing: 100,
      },
      {
        item: "8x8x5",
        base: "10x10",
        length: 5,
        packing: 100,
      },
      {
        item: "9x9x5",
        base: "7x7",
        length: 5,
        packing: 100,
      },
      {
        item: "10x10x5",
        base: "9x9",
        length: 5,
        packing: 100,
      },
      {
        item: "12x12x5",
        base: "10x10",
        length: 5,
        packing: 100,
      },
    ],
  },
  {
    id: 7,
    name: "Cup Cake Liner",
    slug: "cup-cake-liner",
    category: "CAKE, PAPER CUPS",
    images: [
      {
        id: "img_cup_cake_liner_1",
        url: "/shop/Cup Cake Liner.png",
        alt: "Cup Cake Liner Polka Dot Designs",
      },
    ],
    tableData: [],
    features: [
      "High-Quality Material: Made from premium, food-grade paper that ensures safe and hygienic baking.",
      "Greaseproof & Non-Stick: Prevents sticking and oil seepage, keeping cupcakes and muffins perfectly shaped.",
      "Vibrant Colors & Designs: Available in a wide range of colors and patterns to match any occasion or theme.",
      "Perfect for All Occasions: Ideal for birthdays, parties, weddings, festivals, and bakery displays.",
      "Multiple Sizes Available: Choose from standard, mini, or large liners to suit different baking needs.",
      "Eco-Friendly Choice: Biodegradable and recyclable materials that support sustainable baking practices.",
      "Easy to Use: Fits standard cupcake/muffin trays for hassle-free baking and removal.",
    ],
  },
  {
    id: 8,
    name: "Curl Cup Mould",
    slug: "curl-cup-mould",
    category: "MOULDS",
    images: [
      {
        id: "img_curl_cup_mould_1",
        url: "/shop/Curl Cup Mould.png",
        alt: "Curl Cup Mould Assorted Colors on Wooden Tray",
      },
    ],
    tableData: [
      {
        itemCode: "CCM-3025",
        base: 30,
        height: 25,
        moq: 10000,
      },
      {
        itemCode: "CCM-3830",
        base: 38,
        height: 30,
        moq: 10000,
      },
      {
        itemCode: "CCM-4435",
        base: 44,
        height: 35,
        moq: 10000,
      },
      {
        itemCode: "CCM-5040",
        base: 50,
        height: 40,
        moq: 10000,
      },
    ],
  },
  {
    id: 9,
    name: "Food Wrapping Envelop",
    slug: "food-wrapping-envelop",
    category: "ENVELOP",
    images: [
      {
        id: "img_food_wrapping_envelop_1",
        url: "/shop/Food Wrapping Envelop.png",
        alt: "Food Wrapping Envelop Designs",
      },
    ],
    tableData: [
      {
        gusset: 60,
        width: 110,
        length: 180,
        capacity: 1000,
      },
      {
        gusset: 60,
        width: 110,
        length: 270,
        capacity: 1000,
      },
      {
        gusset: 70,
        width: 150,
        length: 270,
        capacity: 1000,
      },
      {
        gusset: 70,
        width: 150,
        length: 320,
        capacity: 1000,
      },
      {
        gusset: 70,
        width: 150,
        length: 410,
        capacity: 1000,
      },
    ],
  },
  {
    id: 10,
    name: "Food Wrapping Roll",
    slug: "food-wrapping-roll",
    category: "FOOD WRAPPING",
    images: [
      {
        id: "img_food_wrapping_roll_1",
        url: "/shop/Food Wrapping Roll.png",
        alt: "Food Wrapping Roll with Green Delicious Print",
      },
    ],
    tableData: [
      {
        item: "11 mtr.",
        width: "290mm",
        length: "11 mtr.",
        packing: 35,
      },
      {
        item: "25 mtr.",
        width: "290mm",
        length: "25 mtr.",
        packing: 35,
      },
      {
        item: "1/2 kg",
        width: "290mm",
        packing: 25,
      },
      {
        item: "1 kg",
        width: "290mm",
        packing: 20,
      },
    ],
  },
  {
    id: 11,
    name: "Panettone Baking Mould Cup",
    slug: "panettone-baking-mould-cup",
    category: "MOULDS",
    images: [
      {
        id: "img_panettone_baking_mould_cup_1",
        url: "/shop/Panettone Baking Mould Cup.png",
        alt: "Panettone Baking Mould Cup Assorted Designs",
      },
    ],
    tableData: [
      {
        itemCode: "PBM-5045",
        base: 50,
        height: 45,
        packing: 3500,
      },
      {
        itemCode: "PBM-6050",
        base: 60,
        height: 50,
        packing: 3500,
      },
      {
        itemCode: "BPM-6045",
        base: 60,
        height: 45,
        packing: 3000,
      },
      {
        itemCode: "BPM-6050",
        base: 60,
        height: 50,
        packing: 3000,
      },
      {
        itemCode: "BPM-7045",
        base: 70,
        height: 45,
        packing: 2080,
      },
      {
        itemCode: "BPM-7050",
        base: 70,
        height: 50,
        packing: 2000,
      },
    ],
  },
  {
    id: 12,
    name: "Paper Envelop",
    slug: "paper-envelop",
    category: "ENVELOP",
    images: [
      {
        id: "img_paper_envelop_1",
        url: "/shop/Paper Envelop.png",
        alt: "Paper Envelop with Newspaper Print",
      },
    ],
    tableData: [
      {
        gusset: 60,
        width: 110,
        length: 180,
        capacity: 1000,
      },
      {
        gusset: 60,
        width: 110,
        length: 270,
        capacity: 1000,
      },
      {
        gusset: 70,
        width: 150,
        length: 270,
        capacity: 1000,
      },
      {
        gusset: 70,
        width: 150,
        length: 320,
        capacity: 1000,
      },
      {
        gusset: 70,
        width: 150,
        length: 410,
        capacity: 1000,
      },
    ],
  },
  {
    id: 13,
    name: "Paper Wrap",
    slug: "paper-wrap",
    category: "SHEET",
    images: [
      {
        id: "img_paper_wrap_1",
        url: "/shop/Paper Wrap.png",
        alt: "Paper Wrap Rolls Assorted Designs",
      },
    ],
    tableData: [],
    description:
      "Labella offers food-grade paper wraps made from pure virgin paper. These wraps are greaseproof, breathable, and maintain food freshness. Perfect for various food items and suitable for different cooking methods, they are essential for restaurants and food businesses.",
  },
  {
    id: 14,
    name: "Pastry Base",
    slug: "pastry-base",
    category: "CAKE",
    images: [
      {
        id: "img_pastry_base_1",
        url: "/shop/Pastry Base.png",
        alt: "Pastry Base Gold Boards",
      },
    ],
    tableData: [
      {
        item: "90 mm Round",
        width: 90,
        length: 90,
        packing: 3000,
      },
      {
        item: "110 mm Round",
        width: 90,
        length: 90,
        packing: 3000,
      },
      {
        item: "75×115 mm Triangle",
        width: 75,
        length: 115,
        packing: 3000,
      },
      {
        item: "90×90 mm Square",
        width: 90,
        length: 90,
        packing: 3000,
      },
      {
        item: "70×150",
        width: 70,
        length: 150,
        packing: 3000,
      },
    ],
  },
  {
    id: 15,
    name: "Pizza Box",
    slug: "pizza-box",
    category: "BOX",
    images: [
      {
        id: "img_pizza_box_1",
        url: "/shop/Pizza Box.png",
        alt: "Pizza Box Red Design",
      },
    ],
    tableData: [
      {
        item: "7x7x1.5",
        base: "7x7",
        length: 1.5,
        packing: 100,
      },
      {
        item: "9x9x1.5",
        base: "9x9",
        length: 1.5,
        packing: 100,
      },
      {
        item: "10x10x1.5",
        base: "10x10",
        length: 1.5,
        packing: 100,
      },
    ],
  },
  {
    id: 16,
    name: "Plum cake Mould",
    slug: "plum-cake-mould",
    category: "MOULDS",
    images: [
      {
        id: "img_plum_cake_mould_1",
        url: "/shop/Plum cake Mould.png",
        alt: "Plum cake Mould with Baked Cake",
      },
    ],
    tableData: [
      {
        itemCode: "PCM-9550",
        length: 95,
        width: 50,
        moq: 5000,
      },
      {
        itemCode: "PCM-15050",
        length: 150,
        width: 65,
        moq: 5000,
      },
      {
        itemCode: "PCM-20065",
        length: 200,
        width: 65,
        moq: 5000,
      },
    ],
  },
  {
    id: 17,
    name: "Plumpy Mould",
    slug: "plumpy-mould",
    category: "MOULDS",
    images: [
      {
        id: "img_plumpy_mould_1",
        url: "/shop/Plumpy Mould.png",
        alt: "Plumpy Mould Rectangular Baking Cups",
      },
    ],
    tableData: [
      {
        itemCode: "PBM-5025",
        length: 158,
        width: 54,
        height: 50,
      },
      {
        itemCode: "PBM-6530",
        length: 198,
        width: 72,
        height: 60,
      },
    ],
  },
  {
    id: 18,
    name: "Rectangular paper cups",
    slug: "rectangular-paper-cups",
    category: "PAPER CUPS",
    images: [
      {
        id: "img_rectangular_paper_cups_1",
        url: "/shop/Rectangular paper cups.png",
        alt: "Rectangular paper cups White Design",
      },
    ],
    tableData: [
      {
        item: "65x23x24",
        bottom: "65x23",
        height: 24,
        packing: 30000,
      },
      {
        item: "70x30x25",
        bottom: "70x30",
        height: 25,
        packing: 30000,
      },
      {
        item: "85x35x25",
        bottom: "85x35",
        height: 25,
        packing: 25000,
      },
      {
        item: "104x40x24",
        bottom: "104x40",
        height: 24,
        packing: 20000,
      },
    ],
  },
  {
    id: 19,
    name: "Round Plum Cake mould",
    slug: "round-plum-cake-mould",
    category: "MOULDS",
    images: [
      {
        id: "img_round_plum_cake_mould_1",
        url: "/shop/Round Plum Cake mould.png",
        alt: "Round Plum Cake mould Brown Design",
      },
    ],
    tableData: [
      {
        itemCode: "RPC-10030",
        base: 100,
        height: 30,
        moq: 5000,
      },
      {
        itemCode: "RPC-12035",
        base: 120,
        height: 35,
        moq: 5000,
      },
      {
        itemCode: "RPC-15535",
        base: 155,
        height: 35,
        moq: 5000,
      },
      {
        itemCode: "RPC-15555",
        base: 155,
        height: 55,
        moq: 5000,
      },
      {
        itemCode: "RPC-17055",
        base: 170,
        height: 55,
        moq: 5000,
      },
    ],
  },
  {
    id: 20,
    name: "Royal Paper Cups",
    slug: "royal-paper-cups",
    category: "PAPER CUPS",
    images: [
      {
        id: "img_royal_paper_cups_1",
        url: "/shop/Royal Paper Cups.png",
        alt: "Royal Paper Cups Display",
      },
    ],
    tableData: [],
    description:
      "Serve your beverages in style with Royal Paper Cups – a premium quality disposable cup range from The Pack Hub. Crafted for both elegance and durability, these cups are perfect for hot and cold drinks alike. Whether you're hosting a party, running a café, or need an everyday solution for office refreshments, Royal Cups are designed to impress. Royal Cups are known for their smooth finish, clean print surface, and sturdy build. The elegant design gives a premium touch, making them ideal for cafes, corporate events, catering services, and takeaways. Custom branding options are also available – print your logo and brand message for better visibility and customer recall. Upgrade your beverage presentation with Royal Cups – the trusted choice for businesses that care about quality and sustainability.",
    features: [
      "Premium quality paper cups",
      "Suitable for hot & cold beverages",
      "Leak-proof & heat-resistant",
      "100% biodegradable & eco-friendly",
      "Available in multiple sizes",
      "Custom branding options",
      "Manufactured by The Pack Hub",
    ],
  },
  {
    id: 21,
    name: "Wrapping Sheet",
    slug: "wrapping-sheet",
    category: "SHEET",
    images: [
      {
        id: "img_wrapping_sheet_1",
        url: "/shop/Wrapping Sheet.png",
        alt: "Wrapping Sheet Golden Designs",
      },
    ],
    tableData: [
      {
        wrappingSheet: "12x16",
        paperSpecification: "40 to 70 gsm",
      },
      {
        wrappingSheet: "14x18",
        paperSpecification: "40 to 70 gsm",
      },
      {
        wrappingSheet: "16x20",
        paperSpecification: "40 to 70 gsm",
      },
      {
        wrappingSheet: "20x24",
        paperSpecification: "40 to 70 gsm",
      },
      {
        wrappingSheet: "24x28",
        paperSpecification: "40 to 70 gsm",
      },
      {
        wrappingSheet: "32x36",
        paperSpecification: "40 to 70 gsm",
      },
    ],
  },
];
