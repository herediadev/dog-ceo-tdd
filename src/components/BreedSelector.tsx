import React from "react";

type BreedSelectorProps = {
    breedList: Array<any>,
    loading: boolean,
};
const BreedSelector = ({breedList, loading}: BreedSelectorProps) => {

    if (loading)
        return (
            <div data-testid={"loadingComponent"}>loading....</div>
        );

    if (breedList.length === 0)
        return (
            <div data-testid={"errorMessageComponent"}>Data is empty</div>
        );

    return (
        <select name="breedSelector" data-testid={"breedSelector"}>
            {breedList.map((breed: any) => (
                <option key={breed.name} data-testid={"breedsOptions"} value={breed.name}>
                    {breed.name}
                </option>
            ))}
        </select>
    );
};

export {
    BreedSelector,
}
