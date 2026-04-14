import "dotenv/config";

const getOpenAIAPIResponse = async (prompt) => {

    try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    return data.candidates[0].content.parts[0].text;

  } catch (err) {
    console.error("Gemini API Error:", err.message);
    throw new Error(err.message);
  }

}


export default getOpenAIAPIResponse;