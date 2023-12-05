const token = process.env.TOKEN;

export async function GET(request: Request) {
    return new Response('Predict Lung Ai');
}

export async function POST(request: Request) {
    const query = `
    query {
      user(login: "MenaiAla") {
          avatarUrl
    }
  `;

    fetch('http://127.0.0.1:5000/predictLung', {
        method: 'POST',
        body: JSON.stringify(request),
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}