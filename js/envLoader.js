export async function loadEnv() {
    try {
        const response = await fetch('/.env'); // Fetches the .env file from the root
        if (!response.ok) throw new Error("Could not find .env file");
        
        const text = await response.text();
        const env = {};

        text.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return; // Skip comments/blanks

            const [key, ...valueParts] = trimmed.split('=');
            let value = valueParts.join('=').trim();
            value = value.replace(/^["']|["']$/g, ''); // Remove quotes
            
            env[key.trim()] = value;
        });
        return env;
    } catch (err) {
        console.error("Manual .env Load Error:", err);
        return {};
    }
}