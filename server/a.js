function test () {
    let a = 1;
    {
        let a = 4;
        let a = 2;
        console.log(a); // 2
    }
    console.log(a); // 1
}

test(); 