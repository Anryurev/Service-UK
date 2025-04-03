import React, {useState} from "react";
import {objectsData} from "../../data/objectsData";
import {Navbar} from "../../components/Navbar";

export function CreateBookingPage() {
    const [selectedObject, setSelectedObject] = useState<number | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedObject(selectedId);
    };

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <form className="form-control">
                    <select className="form-control mb-2" value={selectedObject || ""} onChange={handleChange}>
                        <option value="" disabled>
                            Выберите объект
                        </option>
                        {objectsData.map(obj => (
                            <option key={obj.id} value={obj.id}>
                                {`${obj.street}, ${obj.house}, кв. ${obj.apartment}`}
                            </option>
                        ))}
                    </select>
                    <label className="form-label" htmlFor="dateOfCheckin">Дата заезда</label>
                    <input type="date" id="dateOfCheckin" className="form-control mb-2"/>
                    <label className="form-label" htmlFor="dateOfCheckin">Дата выезда</label>
                    <input type="date" id="dateOfLeaving" className="form-control mb-2"/>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Создать</button>
                    </div>
                </form>
            </div>
        </>
    )
}