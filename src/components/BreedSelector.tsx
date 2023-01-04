import React, {ChangeEvent} from "react";

type BreedSelectorProps = {
    breedList: Array<any>,
    loading: boolean,
    breedSelectHandler: (breedName: string) => void
};
const BreedSelector = ({breedList, loading, breedSelectHandler}: BreedSelectorProps) => {

    if (loading)
        return (
            <div data-testid={"loadingComponent"}>loading....</div>
        );

    if (breedList.length === 0)
        return (
            <div data-testid={"errorMessageComponent"}>Data is empty</div>
        );

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        breedSelectHandler(event.target.value);
    };

    return (
        <select name="breedSelector" data-testid={"breedSelector"} onChange={selectHandler}>
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
