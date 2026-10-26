const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Good Morning!';
    } else if (currentHour < 18) {
        return 'Good Afternoon!';
    } else {
        return 'Good Evening';
    }
};

const addLocalVariables = (req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
    res.locals.NODE_ENV = process.env.NODE_ENV/toLowerCase() || 'production';
    res.locals.queryParams = { ...req.query };
    res.locals.greeting = `<p>${getCurrentGreeting()}</p>`;

    const themes = ['blue-theme', 'green-theme', 'red-theme'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    res.locals.bodyClass = randomTheme;

    next();
};

export { addLocalVariables };