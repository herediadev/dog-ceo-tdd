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

    function hasSubBreed() {
        return subBreedFromSelectedBreed.length > 0;
    }

    return (
        <div className="App">
            <h3>Dog app</h3>
            <BreedSelector breedList={breedList} loading={loading} breedSelectHandler={breedSelectHandler}/>

            {hasSubBreed() &&
                <select name="subBreedSelector" data-testid={"subBreedSelector"}>
                    {
                        subBreedFromSelectedBreed
                            .map((subBreed: string) => (
                                <option key={subBreed} data-testid={"subBreedOption"}
                                        value={subBreed}>{subBreed}</option>)
                            )
                    }
                </select>
            }

        </div>
    );
};

export default App;
