
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export const ModPoszt = () => {

    const navigate = useNavigate();
    const params = useParams();
    const id = params.posztId;

    // A módosítandó poszt adatai
    const [adat, setAdat] = useState({
        userId: '',
        title: '',
        body: ''
    });

    const [hiba, setHiba] = useState('');

    useEffect(() => {

        // Meglévő poszt adatainak lekérése
        (async () => {
            try {
                const response = await axios.get(
                    `https://harmadik.sulla.hu/Post/${id}`
                );

                setAdat(response.data);
            }
            catch (error) {
                console.error("Hiba a poszt betöltése közben:", error);
                setHiba(error.message);
            }
        })();

    }, [id]);

    // Űrlapmezők változásának kezelése
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setAdat((elozoAdat) => ({
            ...elozoAdat,
            [name]: name === 'userId' ? Number(value) : value
        }));
    };

    // Módosított poszt mentése
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(
                `https://harmadik.sulla.hu/Post/${id}`,
                adat
            );

            // Sikeres mentés után vissza a posztokhoz
            navigate('/posztok');
        }
        catch (error) {
            console.error("Hiba a poszt mentése közben:", error);
            setHiba(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Poszt módosítása</h2>

            {hiba && <p className="text-danger">{hiba}</p>}

            <form onSubmit={handleSubmit}>

                <div className="form-group row pb-3">
                    <label htmlFor="userId" className="form-label">
                        Felhasználó azonosító
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="userId"
                        name="userId"
                        value={adat.userId}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="title" className="form-label">
                        Cím
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={adat.title ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="body" className="form-label">
                        Tartalom
                    </label>
                    <textarea
                        className="form-control"
                        id="body"
                        name="body"
                        rows="5"
                        value={adat.body ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Mentés
                </button>

                <Link to="/posztok" className="btn btn-warning ms-2">
                    Vissza
                </Link>

            </form>
        </div>
    );
};
