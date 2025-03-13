import React from "react";
import {IObject} from "../../models";
import objectContaining = jasmine.objectContaining;

interface ICalendarCard {
    objects: IObject[]


}

export const CalendarCard = ({ objects }: ICalendarCard) => {

    return (
        <div className="card m-2" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title text-center">{new Date().toLocaleDateString()}</h5>
                <div>
                    <ul className="list-group">
                        {objects.filter(object => object.status === "Забронировано").map(object => (
                            <li
                                className="list-group-item note"
                                key={object.id}
                            >
                                <div>
                                    <h6>{object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</h6>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/*<a href="#" className="card-link">Card link</a>*/}
                {/*<a href="#" className="card-link">Another link</a>*/}
            </div>
        </div>
    )
}