import React, {ChangeEvent, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {Alert, Button, Form, FormGroup, Image} from 'react-bootstrap'

export function ReportPage () {
    const [photos, setPhotos] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files){
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
            const newPhotos: File[] = []
            const newPreviews: string[] = []

            for (let i = 0; i < files.length; i++){
                const file = files[i]

                if(validImageTypes.includes(file.type)){
                    newPhotos.push(file)

                    const reader = new FileReader()
                    reader.onload = (event) => {
                        if(event.target?.result){
                            newPreviews.push(event.target.result as string)
                            console.log(newPreviews)
                            setPreviews([...newPreviews])
                        }
                    }
                    reader.readAsDataURL(file)
                } else{
                    setError("Загружен неверный формат файлов. Ожидаемый формат: JPEG, PNG, GIF.")
                    return
                }

            }

            setPhotos(newPhotos)
            setError(null)
        }
    }

    return (
        <>
            <Navbar/>
            <div style={{paddingTop: '60px'}}>
                <div className="container mb-4">
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Загрузите фотографии</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleChangeInputFile}
                                multiple
                                accept="image/jpeg, image/png, image/gif"
                            />
                            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                        </Form.Group>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                            {previews.map((preview, index) => (
                                <Image
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    thumbnail
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            ))}
                        </div>

                        <Form.Group controlId="formComment" className="mb-3">
                            <Form.Label>Добавьте комментарий:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <FormGroup className="mb-3">
                            <Form.Label>Укажите, чего не хватает на объетке:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id={`checkboxMissing`}
                                label={`Постельное белье`}
                            />
                            <Form.Check
                                type="checkbox"
                                id={`checkboxMissing`}
                                label={`Полотенце`}
                            />
                            <Form.Check
                                type="checkbox"
                                id={`checkboxMissing`}
                                label={`Средства гигиены`}
                            />
                        </FormGroup>

                        <Button style={{ background: "#6096ba"}}>
                            Отправить
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}