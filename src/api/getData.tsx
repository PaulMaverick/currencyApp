export const getData = async() => {
    const response = await fetch('http://localhost:3000/api/currencies')
    const data = await response.json();

    const converted = Object.keys(data).map(currency => currency)
    return converted
};


/*

 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 


export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url)

		switch(url.pathname) {
			case "/":
				return new Response('Hello World!');
			case "/currencies":
				const response = await fetch(`${env.API_BASE_URL}/currencies`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();
				console.log(data)
				return new Response(data);
			case "/convert":

				console.log(url.searchParams.get("user"))
				return new Response('convert');
			default:
				return new Response('404', {
					status: 404,
				})
		}

	},

};


*/