const Test = () => {
    const query = new URLSearchParams({
        where: `_id=1`,
        load: `category=category:newsCategories,region=region:regions`
    });

    const w = fetch(`http://localhost:3030/data/news?${query}`)
        .then(res => res.json())
        .then(res => console.log(res));

    return (
        <>
            Test
        </>
    );
}

export default Test;