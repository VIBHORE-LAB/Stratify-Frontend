import { useResults } from "../hooks/useResult";

const Results = () =>{
    const {loading, results, error} = useResults();
    console.log("resultsss", loading, results, error);
}


export default Results;