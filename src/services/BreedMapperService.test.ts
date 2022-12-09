import {breedMapperService} from "./BreedMapperService";

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
        const expected = [
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
        const result = breedMapperService(data);

        //assert
        expect(result).toEqual(expected);
    });
});
