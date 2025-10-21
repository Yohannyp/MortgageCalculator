# Mortgage Calculator Dashboard

A modern, responsive mortgage calculator built with Next.js, React, and Tailwind CSS. Features real-time mortgage rate data from API Ninjas, comprehensive payment calculations, and an AI-powered chatbot assistant.

🔗 **Live Demo:** [View on GitHub](https://github.com/Yohannyp/MortgageCalculator)

## ⚠️ Important Security Note

**Never commit your `.env` file to version control!** The `.env` file contains sensitive API keys and is already included in `.gitignore`. Always keep your API keys private and create your own `.env` file locally using the `.env.example` template.

## Features

- 🏠 **Real-time Mortgage Rates** - Fetches current rates from API Ninjas (with fallback mock data)
- 💰 **Payment Calculator** - Calculate monthly payments, total payment, and total interest
- 📊 **Multiple Loan Types** - View rates for 30-year fixed, 15-year fixed, ARM, FHA, and VA loans
- 🤖 **AI Chatbot Assistant** - Ask questions about mortgages, loans, and home buying powered by OpenAI
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🌓 **Dark Mode** - Automatic dark mode support
- 📱 **Mobile Responsive** - Optimized for all screen sizes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` or `.env.local` file in the root directory
   
   **For AI Chatbot (Required):**
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Get your API key from [API Keys page](https://platform.openai.com/api-keys)
   - Add to your `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   **For Mortgage Rates (Optional):**
   - Sign up for a free account at [API Ninjas](https://api-ninjas.com/)
   - Get your API key
   - Add to your `.env` file:
   ```
   API_NINJAS_KEY=your_api_key_here
   ```
   - **Note:** The app works with mock rate data if no API Ninjas key is provided

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Mortgage Calculator
1. **View Current Rates** - See the latest mortgage rates in the left panel
2. **Click a Rate** - Click any rate to automatically populate the interest rate field
3. **Enter Loan Details**:
   - Loan Amount: Total price of the property
   - Down Payment: Amount you'll pay upfront
   - Interest Rate: Annual interest rate (%)
   - Loan Term: Duration of the loan (10, 15, 20, or 30 years)
4. **View Results** - See your monthly payment, total payment, and total interest instantly

### AI Chatbot Assistant
1. **Open Chat** - Click the chat button in the bottom-right corner
2. **Ask Questions** - Type any mortgage-related question
3. **Get Instant Answers** - Receive AI-powered responses about:
   - Mortgage types and terms
   - Interest rates and calculations
   - Down payments and closing costs
   - Home buying process
   - Refinancing options
   - Credit score impacts
4. **Suggested Questions** - Use quick-start questions for common topics

## Technology Stack

- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript
- **AI:** OpenAI GPT-3.5-turbo
- **APIs:** API Ninjas Mortgage Rate API, OpenAI Chat API

## Project Structure

```
mortgage-calculator/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # OpenAI chat API route
│   │   └── mortgage-rates/
│   │       └── route.ts          # API route for fetching rates
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── Chatbot.tsx               # AI chatbot component
│   └── MortgageCalculator.tsx    # Main calculator component
├── public/                       # Static assets
├── .env                          # Environment variables
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## Mortgage Calculation Formula

The monthly payment is calculated using the standard mortgage formula:

```
M = P[r(1+r)^n]/[(1+r)^n-1]

Where:
M = Monthly payment
P = Principal (loan amount - down payment)
r = Monthly interest rate (annual rate / 12)
n = Number of payments (years × 12)
```

## Build for Production

```bash
npm run build
npm start
```

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the repository.
