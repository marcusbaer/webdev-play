// https://deno.land/manual/getting_started/first_steps#making-an-http-request

const url = Deno.args[0];
const res = await fetch(url);

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);