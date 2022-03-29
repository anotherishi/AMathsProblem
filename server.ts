async function listAll(dig: number): Promise<String[]> {
    let arr = [];
    for (let i = 0; i < +dig.toString().repeat(dig) + 1; i++) {
        let cd = i.toString().padStart(dig, "0");
        if (await numcheck(cd)) arr.push(cd);
    }
    return arr;
}

async function numcheck(num: String): Promise<Boolean> {
    for (let i = 0; i < num.length; i++)
        if (num[0] === "0" || (await count(num, i.toString())) != +num[i]) return false;
    return true;
}

async function count(str: String, char: String): Promise<number> {
    let c = 0;
    for (const i of str) if (i == char) c += 1;
    return c;
}

// ====================================================================

import { serve } from "https://deno.land/std@0.130.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
    const endp = req.url.split("/").slice(3)[0];

    if (endp) {
        let arr = await listAll(+endp);
        return new Response(JSON.stringify(arr), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const body = await Deno.readFile("index.html");
    return new Response(body, {
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
    });
}

serve(handler, { port: 3000 });
