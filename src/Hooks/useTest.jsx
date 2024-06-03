import { useEffect, useState } from "react";


const useTest = () => {
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/test')
            .then(res => res.json())
            .then(data => {
                setTest(data);
                setLoading(false);
            })
    }, [])
    return [test, loading];

};

export default useTest;