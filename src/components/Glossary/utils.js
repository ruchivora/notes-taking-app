export async function getGlossaryData(plainText) {

  const apiKey = import.meta.env.VITE_API_KEY;

  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Can you provide a glossary in the following format for the text: "${plainText}" Each glossary entry should be an object with 'term' and 'explanation' keys. Example: [{"term": "exampleTerm", "explanation": "exampleExplanation"}]`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const glossary = JSON.parse(data.choices[0].message.content);
    return glossary;
  } catch (error) {
    console.error('Error fetching glossary:', error);
    return error;
  }
}

export function highlightGlossaryTerms(plainText, glossaryData) {
  let highlightedText = plainText;

  glossaryData.forEach(({ term, explanation }) => {
    // Escape any special characters in the term
    const escapedTerm = escapeRegExp(term);  
    // Word boundary for accurate matching
    const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');  
    
    // Replace all instances of the term (case-insensitive) with the highlighted version
    highlightedText = highlightedText.replace(regex, (match) => {
      return `<strong title="${explanation}">${match}</strong>`;
    });
  });

  return highlightedText;
}

function escapeRegExp(string) {
  // Escapes special characters
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');  
}



export function convertHTMLStringToText(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};