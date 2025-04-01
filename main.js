// import dbFuncs from "./db";

const test = fetch("http://localhost:3000/")
test.then((response) => {
    const text = response.json()
    text.then((result) => {
        console.log(result)
    })
})