import React from "react";
import {render, screen} from "@testing-library/react";
import {SubBreedSelector} from "./SubBreedSelector";

describe('Given the SubBreedSelector component', () => {

    test('it will render the sub breed component when the sub breed list has elements', () => {
        //arrange
        const subBreedList: Array<string> = ["boston", "english", "french"];

        //act
        render(<SubBreedSelector subBreedList={subBreedList}/>);
        const subBreedSelector = screen.queryByTestId("subBreedSelector");
        const subBreedEmptyMessage = screen.queryByTestId("subBreedEmptyMessage");

        //assert
        expect(subBreedEmptyMessage).not.toBeInTheDocument();
        expect(subBreedSelector).toBeInTheDocument();
    });

    test('it will hide the sub breed component when the sub breed list is empty', () => {
        //arrange
        const subBreedList: Array<string> = [];

        //act
        render(<SubBreedSelector subBreedList={subBreedList}/>);
        const subBreedSelector = screen.queryByTestId("subBreedSelector");
        const subBreedEmptyMessage = screen.queryByTestId("subBreedEmptyMessage");

        //assert
        expect(subBreedEmptyMessage).toBeInTheDocument();
        expect(subBreedSelector).not.toBeInTheDocument();
    });
});
