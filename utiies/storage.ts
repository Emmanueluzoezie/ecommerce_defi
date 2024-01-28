
export const addItemAndSaveNft = (item: string) => {
    let myArray: string[] = JSON.parse(localStorage.getItem('nft') || '[]');
    if (!myArray.includes(item)) {
        myArray.push(item);
        localStorage.setItem('nft', JSON.stringify(myArray));
    }
};
export const getNftAddress = (): string[] => {
    return JSON.parse(localStorage.getItem('nft') || '[]');
};