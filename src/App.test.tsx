import React from 'react';
import {act, fireEvent, queries, render, screen} from '@testing-library/react';
import {setImmediate} from "timers";

import App from './App';

import {listAllBreedService} from "./services/ListAllBreedService";
import * as breedMapperServiceModule from "./services/BreedMapperService";


jest.mock("./services/ListAllBreedService");

const listAllBreedServiceMock = listAllBreedService as jest.MockedFunction<typeof listAllBreedService>;

const data = {
    "message": {
        "affenpinscher": [],
        "bulldog": [
            "boston",
            "english",
            "french"
        ],
        "bullterrier": ["staffordshire"],
    },
    "status": "success",
};

describe('Given the App component', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('renders learn react link', () => {
        //arrange
        listAllBreedServiceMock.mockImplementation(() => new Promise(resolve => {
        }));
        render(<App/>);

        //act
        const linkElement = screen.getByText(/dog app/i);

        //assert
        expect(linkElement).toBeInTheDocument();
    });

    test("it will find the select component for the breed list", async () => {
        //Arrange
        listAllBreedServiceMock.mockImplementation(() => Promise.resolve({
            data: data,
            headers: {},
            config: {},
            request: {},
            status: 200,
            statusText: "OK",
        }));
        render(<App/>);

        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedSelector = screen.queryByTestId("breedSelector");

        //Assertion
        expect(breedSelector).toBeInTheDocument();
    });

    test('it will render the option breed for the breed selector', async () => {
        //arrange
        jest.spyOn(React, "useState");
        jest.spyOn(breedMapperServiceModule, "breedMapperService");
        listAllBreedServiceMock.mockImplementation(() => Promise.resolve({
            data: data,
            headers: {},
            config: {},
            request: {},
            status: 200,
            statusText: "OK",
        }));
        render(<App/>);

        //act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedsOptions: Array<any> = screen.queryAllByTestId("breedsOptions");

        //assert
        expect(listAllBreedServiceMock).toHaveBeenCalledTimes(1);
        expect(breedMapperServiceModule.breedMapperService).toHaveBeenCalledTimes(1);
        expect(breedMapperServiceModule.breedMapperService).toHaveBeenCalledWith(data);
        expect(React.useState).toHaveBeenCalledTimes(6);
        expect(breedsOptions[0].value).toBe("affenpinscher");
        expect(breedsOptions[1].value).toBe("bulldog");
        expect(breedsOptions[2].value).toBe("bullterrier");
    });

    test('it will show a loading component when the service is been called', () => {
        //arrange
        listAllBreedServiceMock.mockImplementation(() => new Promise(resolve => {
        }));
        render(<App/>);

        //act
        const loadingComponent = screen.queryByTestId("loadingComponent");
        const breedSelector = screen.queryByTestId("breedSelector");

        //assert
        expect(loadingComponent).toBeInTheDocument();
        expect(breedSelector).not.toBeInTheDocument();
    });

    test('it will show the sub breed component with 3 children when the selected breed is bulldog', async () => {
        //arrange
        listAllBreedServiceMock.mockImplementation(() => Promise.resolve({
            data: data,
            headers: {},
            config: {},
            request: {},
            status: 200,
            statusText: "OK",
        }));
        render(<App/>);

        //act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });

        const breedSelector: ReturnType<queries.QueryByBoundAttribute<HTMLSelectElement>> = screen.queryByTestId<HTMLSelectElement>("breedSelector");

        await act(() => {
            fireEvent.change(breedSelector!, {target: {value: "bulldog"}});
        });

        const subBreedSelector = screen.queryByTestId("subBreedSelector");
        const subBreedOptions: Array<HTMLOptionElement> = screen.queryAllByTestId("subBreedOption");

        //assert
        expect(subBreedSelector).toBeInTheDocument();
        expect(subBreedOptions[0]).toBeInTheDocument();
        expect(subBreedOptions[0].value).toBe("boston");
        expect(subBreedOptions[1]).toBeInTheDocument();
        expect(subBreedOptions[1].value).toBe("english");
        expect(subBreedOptions[2]).toBeInTheDocument();
        expect(subBreedOptions[2].value).toBe("french");
        expect(subBreedOptions.length).toBe(3);

    });

    test('it will show the sub breed component with 1 children when the selected breed is bullterrier', async () => {
        //arrange
        listAllBreedServiceMock.mockImplementation(() => Promise.resolve({
            data: data,
            headers: {},
            config: {},
            request: {},
            status: 200,
            statusText: "OK",
        }));
        render(<App/>);

        //act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedSelector: ReturnType<queries.QueryByBoundAttribute<HTMLSelectElement>> = screen.queryByTestId<HTMLSelectElement>("breedSelector");

        await act(() => {
            fireEvent.change(breedSelector!, {target: {value: "bullterrier"}});
        });

        const subBreedSelector: ReturnType<queries.QueryByBoundAttribute<HTMLSelectElement>> = screen.queryByTestId<HTMLSelectElement>("subBreedSelector");
        const subBreedOptions: Array<HTMLOptionElement> = screen.queryAllByTestId("subBreedOption");

        //assert
        expect(breedSelector).toBeInTheDocument();
        expect(subBreedSelector).toBeInTheDocument();
        expect(subBreedOptions[0]).toBeInTheDocument();
        expect(subBreedOptions[0].value).toBe("staffordshire");
        expect(subBreedOptions.length).toBe(1);

    });


});
