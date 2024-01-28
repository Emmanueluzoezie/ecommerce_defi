export const getUserNfts = async (url: string, nftAddresses: string[]): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mintAccounts: nftAddresses,
                includeOffChain: true,
                disableCache: false,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};