import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.css';
import {listAllBreedService} from "./services/ListAllBreedService";
import {breedMapperService} from "./services/BreedMapperService";
import {BreedSelector} from "./components/BreedSelector";
import {BreedModel} from "./models/BreedModel";


const App = () => {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [breedList, setBreedList]: [Array<BreedModel>, Dispatch<SetStateAction<Array<BreedModel>>>] = React.useState<Array<BreedModel>>([]);
    const [selectedBreed, setSelectedBreed]: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");

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

    const getSubBreedFromSelectedBreed = () => {
        return breedList
            .filter((breed: BreedModel) => breed.name === selectedBreed)
            .flatMap((breed: BreedModel) => breed.subBreed);
    };

    return (
        <div className="App">
            <h3>Dog app</h3>
            <BreedSelector breedList={breedList} loading={loading} breedSelectHandler={breedSelectHandler}/>


            <select name="subBreedSelector" data-testid={"subBreedSelector"}>
                {
                    getSubBreedFromSelectedBreed()
                        .map((subBreed: string) => (
                            <option key={subBreed} data-testid={"subBreedOption"} value={subBreed}>{subBreed}</option>)
                        )
                }
            </select>


        </div>
    );
};

export default App;
