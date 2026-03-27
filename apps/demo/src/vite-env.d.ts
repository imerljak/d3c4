/// <reference types="vite/client" />

declare module '*.dsl?raw' {
    const content: string;
    export default content;
}
