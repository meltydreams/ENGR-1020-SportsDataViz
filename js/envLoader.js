export async function loadEnv() {
    try {
        const response = await fetch('.env');
        if (!response.ok) throw new Error("Could not find .env file");
        
        const text = await response.text();
        const env = {};

        text.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return; //skipping blanks/comments

            const [key, ...valueParts] = trimmed.split('=');
            let value = valueParts.join('=').trim();
            value = value.replace(/^["']|["']$/g, ''); //removing quotes
            
            env[key.trim()] = value;
        });
        return env;
    } catch (err) {
        console.error("Manual .env Load Error:", err);
        return {};
    }
}