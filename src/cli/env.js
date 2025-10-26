const parseEnv = () => {
    const envVars = process.env;
    console.log(Object.entries(envVars).filter( a => a[0].startsWith('RSS_')).map( a => `${a[0]}=${a[1]}`).join('; '))
};

parseEnv();