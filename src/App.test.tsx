import React from 'react';
import {act, render, screen} from '@testing-library/react';
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

    test("it will find the select component for the breed list", () => {
        //Arrange
        listAllBreedServiceMock.mockImplementation(() => new Promise(resolve => {
        }));
        render(<App/>);

        //Act
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
        expect(React.useState).toHaveBeenCalledTimes(2);
        expect(breedsOptions[0].value).toBe("affenpinscher");
        expect(breedsOptions[1].value).toBe("bulldog");
        expect(breedsOptions[2].value).toBe("bullterrier");
    });

    test('it will not render the option breed for the breed selector when the breed list is empty', async () => {
        //arrange
        listAllBreedServiceMock.mockImplementation(() => new Promise(resolve => {
        }));
        render(<App/>);

        //act
        const breedSelector = screen.queryByTestId("breedSelector");
        const breedsOptions: Array<any> = screen.queryAllByTestId("breedsOptions");

        //assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedsOptions.length).toBe(0);
    });
});
