import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const findImdbId = async (movieName, year) => {
    try {
        const { data } = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: `Find the IMDb ID for "${movieName}" ${year ? `from ${year}` : ''}. Return ONLY the IMDb ID like "tt1234567" or "NOT_FOUND".` }] }] }
        );

        const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (result && result.startsWith('tt') && result.length >= 9) {
            return result;
        }

        return null;
    } catch (error) {
        return null;
    }
};

export const analyzeSentiment = async (reviewsText) => {
    if (!reviewsText?.trim()) return "No reviews available for analysis";

    try {
        const prompt = `Analyze these movie reviews and provide exactly this format:

SUMMARY: [2-3 sentences summarizing the overall audience opinion]
SENTIMENT: [Positive/Negative/Mixed]

Reviews:
${reviewsText.substring(0, 1500)}`;

        const { data } = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );

        const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (result) {
            const lines = result.split('\n').filter(line => line.trim());
            const summaryLine = lines.find(line => line.startsWith('SUMMARY:'));
            const sentimentLine = lines.find(line => line.startsWith('SENTIMENT:'));

            const summary = summaryLine ? summaryLine.replace('SUMMARY:', '').trim() : result;
            const sentiment = sentimentLine ? sentimentLine.replace('SENTIMENT:', '').trim() : 'Mixed';

            return `${summary} ${sentiment}`;
        }

        return "AI analysis unavailable";
    } catch (error) {
        const text = reviewsText.toLowerCase();
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'wonderful', 'fantastic', 'brilliant'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'boring', 'horrible', 'disappointing', 'waste'];

        const positiveCount = positiveWords.reduce((count, word) =>
            count + (text.split(word).length - 1), 0);
        const negativeCount = negativeWords.reduce((count, word) =>
            count + (text.split(word).length - 1), 0);

        const reviewCount = reviewsText.split('\n\n').length;

        if (positiveCount > negativeCount * 1.5) {
            return `Based on ${reviewCount} reviews, audiences generally praise this movie with positive feedback about the story, acting, and overall experience. Most viewers recommend it and found it entertaining. Positive`;
        } else if (negativeCount > positiveCount * 1.5) {
            return `Based on ${reviewCount} reviews, audiences have significant criticisms about this movie. Common complaints include issues with pacing, story, or execution that left viewers disappointed. Negative`;
        } else {
            return `Based on ${reviewCount} reviews, audiences have divided opinions about this movie. Some viewers enjoyed certain aspects while others found issues with different elements. Mixed`;
        }
    }
};