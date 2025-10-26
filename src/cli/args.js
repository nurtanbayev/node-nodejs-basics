const parseArgs = () => {
    const args = process.argv.slice(2);
    const text = [];
    for (let i=0; i<args.length; i+=2) {
        text.push(`${args[i].slice(2)} is ${args[1]}`)
    }
    console.log(text.join(', '))
};

parseArgs();