
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export const UjPoszt = () => {

    const navigate = useNavigate();

    // Új poszt mentése
    const handleSubmit = async (event) => {
        event.preventDefault();

        const ujPoszt = {
            userId: Number(event.target.userId.value),
            title: event.target.title.value,
            body: event.target.body.value
        };

        try {
            await axios.post(
                'https://harmadik.sulla.hu/Post',
                ujPoszt
            );

            // Sikeres mentés után visszalépünk a posztokhoz
            navigate('/posztok');

        } catch (error) {
            console.error("Hiba a poszt mentése közben:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Új poszt</h2>

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
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Mentés
                </button>

                <button type="reset" className="btn btn-danger ms-2">
                    Reset
                </button>

            </form>
        </div>
    );
};
