fetch()
.then((response) => response.json())
.then((data) =>{
    const pagoList = data.results;
    pagoList.array.forEach(element => {
        
    });
})