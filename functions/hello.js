export async function onRequest(context) {
  return new Response("Hello, world!", {
    headers: { "Content-Type": "text/plain" },
  });
}