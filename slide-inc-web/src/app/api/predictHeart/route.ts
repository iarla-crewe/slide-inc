const token = process.env.TOKEN;

export async function GET(request: Request) {
    return new Response('Predict Lung Ai');
}

export async function POST(request: Request) {
    let body = await request.json()
    console.log("body: ", body)

    const res = await fetch('http://127.0.0.1:5000/predictHeart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'API-Key': process.env.DATA_API_KEY!,
      },
      body: JSON.stringify(body),
    })
   
    const data = await res.json()
    console.log("DATA: ", data)
    return Response.json(data)
  }