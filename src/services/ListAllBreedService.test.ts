import {listAllBreedService} from "./ListAllBreedService";

import axios from "axios";

jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

const data = {
    "message": {
        "affenpinscher": [],
        "african": [],
        "airedale": [],
    },
    "status": "success",
};

describe('Given the ListAllBreedService', () => {

    test('it will call the service and get all the breed list', async () => {
        //arrange
        axiosMock.get.mockImplementation(() => {
            return Promise.resolve({
                status: 200,
                statusText: "OK",
                data: data
            });
        });

        //act
        const result = await listAllBreedService();

        //assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.statusText).toBe("OK");
        expect(result.data.status).toBe("success");
        expect(result.data.message).toBeDefined();

    });
});
