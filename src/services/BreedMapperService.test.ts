import {breedMapperService} from "./BreedMapperService";
import {BreedModel} from "../models/BreedModel";

describe('"Given the BreedMapperService', () => {

    test('it will map the response from the service to a array', () => {
        //arrange
        const data = {
            "message": {
                "affenpinscher": [],
                "bulldog": [
                    "boston",
                    "english",
                    "french"
                ],
                "bullterrier": [
                    "staffordshire"
                ],
            },
            "status": "success",
        };
        const expected: Array<BreedModel> = [
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

        //act
        const result: Array<BreedModel> = breedMapperService(data);

        //assert
        expect(result).toEqual(expected);
    });
});
