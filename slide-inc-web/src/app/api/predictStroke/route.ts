const token = process.env.TOKEN;

export async function GET(request: Request) {
    return new Response('Predict Heart Ai');
}

export async function POST(request: Request) {
    let body = await request.json()
    console.log("body: ", body)

    const res = await fetch('http://127.0.0.1:5000/predictStroke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'API-Key': process.env.DATA_API_KEY!,
      },
      body: JSON.stringify(body),
    })
   
    const data = await res.json()
    console.log("DATA Stroke: ", data)
    return Response.json(data)
  }