import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.css';
import {listAllBreedService} from "./services/ListAllBreedService";
import {breedMapperService} from "./services/BreedMapperService";
import {BreedSelector} from "./components/BreedSelector";
import {BreedModel} from "./models/BreedModel";
import {SubBreedSelector} from "./components/SubBreedSelector";


const App = () => {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [breedList, setBreedList]: [Array<BreedModel>, Dispatch<SetStateAction<Array<BreedModel>>>] = React.useState<Array<BreedModel>>([]);
    const [selectedBreed, setSelectedBreed]: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");

    const subBreedFromSelectedBreed = breedList
        .filter((breed: BreedModel) => breed.name === selectedBreed)
        .flatMap((breed: BreedModel) => breed.subBreed);

    useEffect(() => {
        listAllBreedService()
            .then((response: any) => {
                setLoading(false);
                const breedMapped = breedMapperService(response.data);
                setBreedList(breedMapped);
            });
    }, []);

    const breedSelectHandler = (breedName: string) => {
        setSelectedBreed(breedName);
    };


    return (
        <div className="App">
            <h3>Dog app</h3>
            <BreedSelector breedList={breedList} loading={loading} breedSelectHandler={breedSelectHandler}/>

            <SubBreedSelector subBreedList={subBreedFromSelectedBreed}/>
        </div>
    );
};

export default App;
