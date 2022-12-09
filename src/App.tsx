import React, {useEffect, useState} from 'react';
import './App.css';
import {listAllBreedService} from "./services/ListAllBreedService";
import {breedMapperService} from "./services/BreedMapperService";

function App() {
    const [breedList, setBreedList]: Array<any> = useState<Array<any>>([]);

    useEffect(() => {
        listAllBreedService()
            .then((response: any) => {
                const breedMapped = breedMapperService(response.data);
                setBreedList(breedMapped);
            });
    }, []);

    return (
        <div className="App">
            <h3>Dog app</h3>
            <select name="breedSelector" id="breedSelector" data-testid={"breedSelector"}>
                {breedList.map((breed: any) => (
                    <option key={breed.name} data-testid={"breedsOptions"} value={breed.name}>
                        {breed.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default App;
