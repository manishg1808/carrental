// Car data - This will be replaced with API calls later
const carsData = [
    {
        id: 1,
        name: "Toyota Camry",
        type: "Sedan",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 2500,
        image: "images/8.jpg",
        images: ["images/8.jpg", "images/2.jpg", "images/3.jpg"],
        description: "Comfortable and reliable sedan perfect for city drives and long journeys.",
        features: ["Air Conditioning", "Bluetooth", "USB Port", "Power Steering", "ABS", "Airbags"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "2.5L",
            "Mileage": "15 km/l",
            "Fuel Tank": "60L",
            "Boot Space": "470L"
        },
        available: true
    },
    {
        id: 2,
        name: "Honda CR-V",
        type: "SUV",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 3500,
        image: "images/2.jpg",
        images: ["images/2.jpg", "images/3.jpg", "images/4.jpg"],
        description: "Spacious SUV with excellent ground clearance, perfect for family trips.",
        features: ["Air Conditioning", "GPS Navigation", "Reverse Camera", "Power Steering", "ABS", "Airbags", "Sunroof"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.5L Turbo",
            "Mileage": "14 km/l",
            "Fuel Tank": "57L",
            "Boot Space": "522L"
        },
        available: true
    },
    {
        id: 3,
        name: "Maruti Swift",
        type: "Hatchback",
        transmission: "Manual",
        fuel: "Petrol",
        price: 1500,
        image: "images/3.jpg",
        images: ["images/3.jpg", "images/4.jpg", "images/5.jpg"],
        description: "Compact and fuel-efficient hatchback ideal for city commuting.",
        features: ["Air Conditioning", "Bluetooth", "USB Port", "Power Steering", "ABS", "Airbags"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.2L",
            "Mileage": "23 km/l",
            "Fuel Tank": "37L",
            "Boot Space": "268L"
        },
        available: true
    },
    {
        id: 4,
        name: "Hyundai Creta",
        type: "SUV",
        transmission: "Automatic",
        fuel: "Diesel",
        price: 3200,
        image: "images/4.jpg",
        images: ["images/4.jpg", "images/5.jpg", "images/6.jpg"],
        description: "Premium SUV with modern features and powerful performance.",
        features: ["Air Conditioning", "GPS Navigation", "Reverse Camera", "Power Steering", "ABS", "Airbags", "Sunroof", "Wireless Charging"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.5L Diesel",
            "Mileage": "17 km/l",
            "Fuel Tank": "50L",
            "Boot Space": "433L"
        },
        available: true
    },
    {
        id: 5,
        name: "Honda City",
        type: "Sedan",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 2800,
        image: "images/5.jpg",
        images: ["images/5.jpg", "images/6.jpg", "images/1.jpg"],
        description: "Elegant sedan with premium interiors and advanced safety features.",
        features: ["Air Conditioning", "GPS Navigation", "Reverse Camera", "Power Steering", "ABS", "Airbags", "Sunroof"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.5L",
            "Mileage": "17 km/l",
            "Fuel Tank": "40L",
            "Boot Space": "506L"
        },
        available: true
    },
    {
        id: 6,
        name: "Tata Nexon EV",
        type: "SUV",
        transmission: "Automatic",
        fuel: "Electric",
        price: 4000,
        image: "images/6.jpg",
        images: ["images/6.jpg", "images/1.jpg", "images/2.jpg"],
        description: "Eco-friendly electric SUV with zero emissions and modern technology.",
        features: ["Air Conditioning", "GPS Navigation", "Reverse Camera", "Power Steering", "ABS", "Airbags", "Wireless Charging", "Fast Charging"],
        specs: {
            "Seating Capacity": "5",
            "Battery": "30.2 kWh",
            "Range": "312 km",
            "Charging Time": "8-9 hours",
            "Boot Space": "350L"
        },
        available: true
    },
    {
        id: 7,
        name: "Mahindra XUV700",
        type: "SUV",
        transmission: "Automatic",
        fuel: "Diesel",
        price: 4500,
        image: "images/8.jpg",
        images: ["images/8.jpg", "images/9.jpg", "images/1.jpg"],
        description: "Powerful 7-seater SUV with luxury features and robust performance.",
        features: ["Air Conditioning", "GPS Navigation", "Reverse Camera", "Power Steering", "ABS", "Airbags", "Sunroof", "Wireless Charging", "360 Camera"],
        specs: {
            "Seating Capacity": "7",
            "Engine": "2.2L Diesel",
            "Mileage": "15 km/l",
            "Fuel Tank": "60L",
            "Boot Space": "240L"
        },
        available: true
    },
    {
        id: 8,
        name: "Hyundai i20",
        type: "Hatchback",
        transmission: "Manual",
        fuel: "Petrol",
        price: 1800,
        image: "images/9.jpg",
        images: ["images/9.jpg", "images/1.jpg", "images/2.jpg"],
        description: "Stylish hatchback with sporty design and excellent fuel efficiency.",
        features: ["Air Conditioning", "Bluetooth", "USB Port", "Power Steering", "ABS", "Airbags", "Touchscreen"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.2L",
            "Mileage": "20 km/l",
            "Fuel Tank": "37L",
            "Boot Space": "311L"
        },
        available: true
    },
    {
        id: 9,
        name: "Toyota Innova Crysta",
        type: "MUV",
        transmission: "Automatic",
        fuel: "Diesel",
        price: 4200,
        image: "images/1.jpg",
        images: ["images/1.jpg", "images/2.jpg", "images/8.jpg"],
        description: "Spacious MUV designed for comfortable family and group travel.",
        features: ["Air Conditioning", "Rear AC", "Power Steering", "ABS", "Airbags", "Touchscreen"],
        specs: {
            "Seating Capacity": "7",
            "Engine": "2.4L Diesel",
            "Mileage": "13 km/l",
            "Fuel Tank": "55L",
            "Boot Space": "300L"
        },
        available: true
    },
    {
        id: 10,
        name: "Kia Carens",
        type: "MUV",
        transmission: "Manual",
        fuel: "Petrol",
        price: 3100,
        image: "images/2.jpg",
        images: ["images/2.jpg", "images/5.jpg", "images/9.jpg"],
        description: "Feature-packed MUV with smooth ride quality for city and highway use.",
        features: ["Air Conditioning", "Android Auto", "Apple CarPlay", "ABS", "Airbags", "Rear Camera"],
        specs: {
            "Seating Capacity": "6",
            "Engine": "1.5L",
            "Mileage": "16 km/l",
            "Fuel Tank": "45L",
            "Boot Space": "216L"
        },
        available: true
    },
    {
        id: 11,
        name: "Mercedes-Benz C-Class",
        type: "Luxury",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 7000,
        image: "images/6.jpg",
        images: ["images/6.jpg", "images/3.jpg", "images/8.jpg"],
        description: "Executive luxury sedan with premium comfort and refined performance.",
        features: ["Dual Zone AC", "Panoramic Sunroof", "Premium Audio", "ABS", "Airbags", "Ambient Lighting"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "2.0L Turbo",
            "Mileage": "13 km/l",
            "Fuel Tank": "66L",
            "Boot Space": "455L"
        },
        available: true
    },
    {
        id: 12,
        name: "BMW i4",
        type: "Luxury",
        transmission: "Automatic",
        fuel: "Electric",
        price: 8500,
        image: "images/4.jpg",
        images: ["images/4.jpg", "images/1.jpg", "images/9.jpg"],
        description: "Premium electric luxury car with fast acceleration and advanced technology.",
        features: ["Fast Charging", "360 Camera", "Premium Audio", "Wireless Charging", "Airbags", "ADAS"],
        specs: {
            "Seating Capacity": "5",
            "Battery": "83.9 kWh",
            "Range": "590 km",
            "Charging Time": "8.5 hours",
            "Boot Space": "470L"
        },
        available: true
    },
    {
        id: 13,
        name: "Audi A5",
        type: "Coupe",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 7800,
        image: "images/5.jpg",
        images: ["images/5.jpg", "images/2.jpg", "images/6.jpg"],
        description: "Sporty coupe offering dynamic performance and premium interiors.",
        features: ["Sport Seats", "Cruise Control", "Premium Audio", "ABS", "Airbags", "Sunroof"],
        specs: {
            "Seating Capacity": "4",
            "Engine": "2.0L Turbo",
            "Mileage": "12 km/l",
            "Fuel Tank": "54L",
            "Boot Space": "465L"
        },
        available: true
    },
    {
        id: 14,
        name: "Ford Mustang GT",
        type: "Coupe",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 9000,
        image: "images/8.jpg",
        images: ["images/8.jpg", "images/4.jpg", "images/1.jpg"],
        description: "Iconic performance coupe for enthusiasts seeking thrilling drives.",
        features: ["Launch Control", "Sport Mode", "Reverse Camera", "ABS", "Airbags", "Premium Audio"],
        specs: {
            "Seating Capacity": "4",
            "Engine": "5.0L V8",
            "Mileage": "8 km/l",
            "Fuel Tank": "61L",
            "Boot Space": "382L"
        },
        available: true
    },
    {
        id: 15,
        name: "Mini Cooper Convertible",
        type: "Convertible",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 6500,
        image: "images/3.jpg",
        images: ["images/3.jpg", "images/9.jpg", "images/5.jpg"],
        description: "Stylish open-top convertible for fun city rides and weekend escapes.",
        features: ["Soft Top Roof", "Touchscreen", "Bluetooth", "ABS", "Airbags", "Parking Sensors"],
        specs: {
            "Seating Capacity": "4",
            "Engine": "2.0L",
            "Mileage": "14 km/l",
            "Fuel Tank": "44L",
            "Boot Space": "160L"
        },
        available: true
    },
    {
        id: 16,
        name: "BMW Z4",
        type: "Convertible",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 9200,
        image: "images/9.jpg",
        images: ["images/9.jpg", "images/6.jpg", "images/2.jpg"],
        description: "Premium roadster convertible with sharp handling and bold styling.",
        features: ["Soft Top Roof", "Sport Seats", "Premium Audio", "ABS", "Airbags", "Cruise Control"],
        specs: {
            "Seating Capacity": "2",
            "Engine": "3.0L",
            "Mileage": "11 km/l",
            "Fuel Tank": "52L",
            "Boot Space": "281L"
        },
        available: true
    },
    {
        id: 17,
        name: "Isuzu D-Max",
        type: "Pickup",
        transmission: "Manual",
        fuel: "Diesel",
        price: 4800,
        image: "images/1.jpg",
        images: ["images/1.jpg", "images/4.jpg", "images/6.jpg"],
        description: "Rugged pickup truck built for hauling, off-road travel, and utility use.",
        features: ["4x4 Drive", "Power Steering", "ABS", "Airbags", "Touchscreen", "Rear Camera"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.9L Diesel",
            "Mileage": "14 km/l",
            "Fuel Tank": "55L",
            "Payload": "1045 kg"
        },
        available: true
    },
    {
        id: 18,
        name: "Toyota Hilux",
        type: "Pickup",
        transmission: "Automatic",
        fuel: "Diesel",
        price: 5600,
        image: "images/2.jpg",
        images: ["images/2.jpg", "images/8.jpg", "images/4.jpg"],
        description: "Premium pickup with strong build quality and reliable performance.",
        features: ["4x4 Drive", "Hill Assist", "ABS", "Airbags", "Touchscreen", "Cruise Control"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "2.8L Diesel",
            "Mileage": "12 km/l",
            "Fuel Tank": "80L",
            "Payload": "470 kg"
        },
        available: true
    },
    {
        id: 19,
        name: "Kia Seltos",
        type: "SUV",
        transmission: "Automatic",
        fuel: "Petrol",
        price: 3400,
        image: "images/4.jpg",
        images: ["images/4.jpg", "images/3.jpg", "images/6.jpg"],
        description: "Modern compact SUV with comfortable cabin and premium connectivity features.",
        features: ["Sunroof", "Wireless Charging", "ABS", "Airbags", "Touchscreen", "Rear Camera"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.5L",
            "Mileage": "16 km/l",
            "Fuel Tank": "50L",
            "Boot Space": "433L"
        },
        available: true
    },
    {
        id: 20,
        name: "Tata Altroz",
        type: "Hatchback",
        transmission: "Manual",
        fuel: "Diesel",
        price: 1900,
        image: "images/5.jpg",
        images: ["images/5.jpg", "images/1.jpg", "images/3.jpg"],
        description: "Premium hatchback with solid build quality and great everyday practicality.",
        features: ["Air Conditioning", "Bluetooth", "ABS", "Airbags", "Power Steering", "Rear Parking Sensors"],
        specs: {
            "Seating Capacity": "5",
            "Engine": "1.5L Diesel",
            "Mileage": "21 km/l",
            "Fuel Tank": "37L",
            "Boot Space": "345L"
        },
        available: true
    }
];
