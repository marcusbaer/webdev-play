const now = new Date();

const encoder = new TextEncoder();
const data = encoder.encode(`Hello world\n\nIt\'s ${now}`);

await Deno.writeFile('hello.txt', data);
await Deno.writeFile('hello2.txt', data);