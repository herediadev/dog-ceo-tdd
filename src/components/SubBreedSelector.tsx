import React from "react";

type SubBreedSelectorProps = {
    subBreedList: string[]
};
const SubBreedSelector = ({subBreedList}: SubBreedSelectorProps) => {
    const hasSubBreed = subBreedList.length > 0;

    if (!hasSubBreed)
        return (
            <div data-testid={"subBreedEmptyMessage"}>
                <span>La raza seleccionada no tiene sub razas</span>
            </div>
        );

    return (
        <>
            <select name="subBreedSelector" data-testid={"subBreedSelector"}>
                {
                    subBreedList
                        .map((subBreed: string) => (
                            <option key={subBreed} data-testid={"subBreedOption"}
                                    value={subBreed}>{subBreed}</option>)
                        )
                }
            </select>

        </>
    );
};

export {
    SubBreedSelector,
}
