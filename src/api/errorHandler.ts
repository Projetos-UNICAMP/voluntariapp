export function handleErrorWithLogging(error: unknown, message: string){
    console.error(message);
    console.error("Original error: ", error);
}