export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    try {
        // The exchange code for token using secret this is done only on the server-side keeping the client secret safe
        const response = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                }),
            }
        );

        const data = await response.json();

        if (data.error) {
            return res.status(502).json({ error: data.error_description });
        }

        return res.status(200).json({ access_token: data.access_token });

    } catch {
        return res.status(500).json({ error: "Token exchange failed" });
    }
}