import React, {ChangeEvent, useRef, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {Alert, Button, Form, FormGroup, Image, Modal} from 'react-bootstrap'

export function ReportPage () {
    const [photos, setPhotos] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [showCamera, setShowCamera] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        processFiles(files)
    }
    const processFiles = (files: FileList | null) => {
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

    const startCamera = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
                streamRef.current = stream
            }
            setShowCamera(true)
        } catch (err){
            setError("Не удалось получить доступ к камере")
            console.error(err)
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
        }
        setShowCamera(false)
    }

    const takePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas')
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            const ctx = canvas.getContext('2d')

            if(ctx){
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
                canvas.toBlob(blob => {
                    if(blob){
                        const file = new File([blob], `photo-${Date.now()}.jpg`, {
                            type: 'image/jpeg'
                        })

                        // Создаем FileList для совместимости с processFiles
                        const dataTransfer = new DataTransfer()
                        dataTransfer.items.add(file)
                        processFiles(dataTransfer.files)
                    }
                }, 'image/jpeg', 0.9)
            }
        }
        stopCamera()
    }

    return (
        <>
            <Navbar/>
            <div style={{paddingTop: '60px'}}>
                <div className="container mb-4">
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Загрузите фотографии</Form.Label>
                            <div className={"d-flex gap-2 mb-2"}>
                                <Form.Control
                                    type="file"
                                    onChange={handleChangeInputFile}
                                    multiple
                                    accept="image/jpeg, image/png, image/gif"
                                />
                                <Button
                                    variant="primary"
                                    onClick={startCamera}
                                >
                                    Сделать фото
                                </Button>
                            </div>
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

            {/* Модальное окно для камеры */}
            <Modal show={showCamera} onHide={stopCamera} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Сделайте фото</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{ width: '100%', maxHeight: '70vh' }}
                    />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="primary" onClick={takePhoto}>
                        Сделать снимок
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}