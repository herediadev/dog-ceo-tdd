import axios from "axios";
const listAllBreedService = async () => {
    return await axios.get("https://dog.ceo/api/breeds/list/all", {
        headers: {
            "content-type": "application/json"
        }
    });
};

export {
    listAllBreedService,
}
