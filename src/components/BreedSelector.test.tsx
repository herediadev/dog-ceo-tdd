import {fireEvent, render, screen} from "@testing-library/react";
import {BreedSelector} from "./BreedSelector";
import {BreedModel} from "../models/BreedModel";

describe('Given the BreedSelector component', () => {

    test('it will render the loading component when the loading is true', () => {
        //arrange
        const breedSelectHandler = jest.fn();
        render(<BreedSelector breedList={[]} loading={true} breedSelectHandler={breedSelectHandler}/>);

        //act
        const loadingComponent = screen.queryByTestId("loadingComponent");

        //assert
        expect(loadingComponent).toBeInTheDocument();
    });

    test('it will render an error message component when the loading is false and the breed list is empty', () => {
        //arrange
        const breedSelectHandler = jest.fn();
        render(<BreedSelector breedList={[]} loading={false} breedSelectHandler={breedSelectHandler}/>);

        //act
        const loadingComponent = screen.queryByTestId("loadingComponent");
        const errorMessageComponent = screen.queryByTestId("errorMessageComponent");

        //assert
        expect(errorMessageComponent).toBeInTheDocument();
        expect(loadingComponent).not.toBeInTheDocument();
    });

    test('it will render the select breed and the option when the loading is false and the breed list is not empty', () => {
        //arrange
        const breedSelectHandler = jest.fn();
        const breedList: Array<BreedModel> = [
            {
                name: "affenpinscher",
                subBreed: []
            },
            {
                name: "bulldog",
                subBreed: [
                    "boston",
                    "english",
                    "french"
                ]
            },
            {
                name: "bullterrier",
                subBreed: [
                    "staffordshire"
                ],
            }
        ];

        render(<BreedSelector breedList={breedList} loading={false} breedSelectHandler={breedSelectHandler}/>);

        //act
        const breedSelector = screen.queryByTestId("breedSelector");
        const breedOptions = screen.queryAllByTestId("breedsOptions");
        const loadingComponent = screen.queryByTestId("loadingComponent");
        const errorMessageComponent = screen.queryByTestId("errorMessageComponent");

        //assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedOptions.length).toBeGreaterThan(0);
        expect(errorMessageComponent).not.toBeInTheDocument();
        expect(loadingComponent).not.toBeInTheDocument();
    });

    test('it will select the bulldog breed when the event is triggered', () => {
        //arrange
        const breedSelectHandler = jest.fn();
        const breedList: Array<BreedModel> = [
            {
                name: "affenpinscher",
                subBreed: []
            },
            {
                name: "bulldog",
                subBreed: [
                    "boston",
                    "english",
                    "french"
                ]
            },
            {
                name: "bullterrier",
                subBreed: [
                    "staffordshire"
                ],
            }
        ];

        render(<BreedSelector breedList={breedList} loading={false} breedSelectHandler={breedSelectHandler}/>);

        //act
        const breedSelector: any = screen.queryByTestId("breedSelector");
        fireEvent.change(breedSelector, {target: {value: "bulldog"}});

        //assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedSelectHandler).toHaveBeenCalledWith("bulldog");
    });
});
