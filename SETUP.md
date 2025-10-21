# Setup Guide

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Yohannyp/MortgageCalculator.git
cd MortgageCalculator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your API keys:

```env
# Required for AI Chatbot
OPENAI_API_KEY=your_openai_api_key_here

# Optional for live mortgage rates (works with mock data if not provided)
API_NINJAS_KEY=your_api_ninjas_key_here
```

#### Getting API Keys:

**OpenAI API Key (Required for Chatbot):**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key and paste it in your `.env` file

**API Ninjas Key (Optional):**
1. Go to [API Ninjas](https://api-ninjas.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Chatbot Not Working

**Error: "Invalid OpenAI API key"**
- Make sure your `.env` file has no spaces around the `=` sign
- Correct: `OPENAI_API_KEY=sk-proj-...`
- Wrong: `OPENAI_API_KEY = "sk-proj-..."`
- Restart the dev server after changing `.env`

**Error: "I encountered an error"**
- Check that your OpenAI API key is valid and not expired
- Verify you have credits in your OpenAI account
- Check the browser console for detailed error messages

### Mortgage Rates Not Loading

- The app works with mock data if no API Ninjas key is provided
- If you have a key, verify it's correct in your `.env` file
- Check your API Ninjas account for rate limits

### Port Already in Use

If port 3000 is in use, Next.js will automatically try the next available port (3001, 3002, etc.)

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes (for chatbot) | OpenAI API key for the AI chatbot feature |
| `API_NINJAS_KEY` | No | API Ninjas key for live mortgage rates (uses mock data if not provided) |

## Security Best Practices

1. **Never commit `.env` files** - They contain sensitive API keys
2. **Use `.env.example`** - Commit this template without actual keys
3. **Rotate exposed keys** - If you accidentally expose a key, revoke it immediately
4. **Use environment variables in production** - Don't hardcode keys in your code

## Support

For issues or questions:
- Check the [README.md](README.md) for detailed documentation
- Open an issue on [GitHub](https://github.com/Yohannyp/MortgageCalculator/issues)
