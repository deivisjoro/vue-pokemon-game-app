import pokemonApi from "@/api/pokemonApi";

const getPokemonsOptions = async () => {
    const mixedNumbers = getNumbers().sort( () => Math.random() - 0.5 );
    return await getPokemons(mixedNumbers.splice(0,4));
}

const getNumbers = () => {
    const array = [];
    for(let i=1; i<=650; i++) array.push(i);
    return array;
}

const getPokemons = async ( [n1,n2,n3,n4] ) => {
    const arrayPromises = [
        pokemonApi.get(`/${n1}`),
        pokemonApi.get(`/${n2}`),
        pokemonApi.get(`/${n3}`),
        pokemonApi.get(`/${n4}`)
    ];
    
    const [p1, p2, p3, p4] = await Promise.all(arrayPromises);

    return [
        { name: p1.data.name, id: n1 },
        { name: p2.data.name, id: n2 },
        { name: p3.data.name, id: n3 },
        { name: p4.data.name, id: n4 }
    ]
}

export default getPokemonsOptions;