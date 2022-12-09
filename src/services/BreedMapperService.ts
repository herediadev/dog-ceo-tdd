const breedMapperService = (data: any) => {
    console.log("breedMapperService",data);
    return Object.entries(data.message)
        .reduce((previousValue:any, currentValue:any) => {
            previousValue.push({name: currentValue[0], subBreed: currentValue[1]});
            return previousValue;
    },[]);
};

export {
    breedMapperService,
};
