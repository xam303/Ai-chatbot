const OpenAI = require('openai');

// Create an OpenAI instance using the API key directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Access the API key from environment variables
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Using the OpenAI chat completion API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      res.status(200).json({ reply: response.choices[0].message.content.trim() });
    } catch (error) {
      console.error("Error interacting with OpenAI:", error);
      res.status(500).json({ error: "Error interacting with AI" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
