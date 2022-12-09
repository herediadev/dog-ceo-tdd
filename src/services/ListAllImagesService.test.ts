import {listAllImagesService} from "./ListAllImagesService";

import axios from "axios";

jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

const data = {
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_12364.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1917.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_3374.jpg"
    ],
    "status": "success"
};

describe('Given the ListAllImagesService', () => {

    test('it will call the service and get random images', async () => {
        //arrange
        axiosMock.get.mockImplementation(() => Promise.resolve({
            status: 200,
            statusText: "OK",
            data: data
        }));

        //act
        const result = await listAllImagesService("hound/afghan");

        //assert
        expect(result).toBeDefined();
        expect(axios.get).toHaveBeenCalledWith("https://dog.ceo/api/breed/hound/afghan/images/random/3",{"headers": {"content-type": "application/json"}});
        expect(result.status).toBe(200);
        expect(result.statusText).toBe("OK");
        expect(result.data.status).toBe("success");
        expect(result.data.message.length).toBe(3);
    });
});
