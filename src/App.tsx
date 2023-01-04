import React, {useEffect} from 'react';
import './App.css';
import {listAllBreedService} from "./services/ListAllBreedService";
import {breedMapperService} from "./services/BreedMapperService";
import {BreedSelector} from "./components/BreedSelector";


const App = () => {
    const [breedList, setBreedList]: Array<any> = React.useState<Array<any>>([]);
    const [loading, setLoading] = React.useState<boolean>(true);


    useEffect(() => {
        listAllBreedService()
            .then((response: any) => {
                setLoading(false);
                const breedMapped = breedMapperService(response.data);
                setBreedList(breedMapped);
            });
    }, []);

    const breedSelectHandler = () => {
    };

    return (
        <div className="App">
            <h3>Dog app</h3>
            <BreedSelector breedList={breedList} loading={loading} breedSelectHandler={breedSelectHandler}/>

            <select name="subBreedSelector" id="subBreedSelector" data-testid={"subBreedSelector"}>
                <option value="test">test</option>
            </select>
        </div>
    );
};

export default App;
