const nodeEnv = process.env.NODE_ENV || 'production';
const port = Number.parseInt(process.env.PORT || 8080);

if (!Number.isInteger(port) || port < 0 || port > 65432) {
    throw new Error('PORT must be an integer between 0 and 65432');
}

const config = Object.freeze({
    nodEnv, 
    port, 
    isDevelopment: nodeEnv.includes('dev'),
});

export default config;