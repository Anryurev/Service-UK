import React from "react";
import {IObject} from "../../models";
import {BookingObjectProps} from "../../data/bookingdata";
import {objectsData} from "../../data/objectsData";

interface DayCardProps {
    date: string;
    bookingObjects: BookingObjectProps[];
}

export const DayCard: React.FC<DayCardProps> = ({ date, bookingObjects }) => {

    const rentedObjects = bookingObjects.filter(
        objects => objects.objects.filter(
            object => objectsData[object.idObject].status !== "Свободно"
        )
    )

    console.log(rentedObjects)

    return (
        <div className="card m-2" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title text-center">{date}</h5>
                <div>
                    { rentedObjects.length > 0 ? (
                        <ul className="list-group">
                        {rentedObjects.map(objects =>
                            objects.objects.map(object => (
                                <li
                                    className="list-group-item note"
                                    key={object.id}
                                >
                                    <div>
                                        <h6>{objectsData[object.idObject].street + ' д. ' + objectsData[object.idObject].house + ' кв. ' + objectsData[object.idObject].apartment}</h6>
                                    </div>
                                </li>
                            ))
                            )}
                    </ul>) : (
                        <p>Нет сдаваемых объектов</p>
                    )
                    }
                </div>
                {/*<a href="#" className="card-link">Card link</a>*/}
                {/*<a href="#" className="card-link">Another link</a>*/}
            </div>
        </div>
    )
}