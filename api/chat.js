const { Configuration, OpenAIApi } = require('openai');

// Log the API key to check if it's being read correctly
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Access the API key from environment variables
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: message,
        max_tokens: 100,
      });

      res.status(200).json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error interacting with AI" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
