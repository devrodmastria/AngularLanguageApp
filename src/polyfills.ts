(window as any).process = {
    env: { DEBUG: undefined },
};
console.log('polyfills as any OK')