import React, {ChangeEvent, useContext, useRef, useState} from "react";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {IRequest} from "../../models";
import {useNavigate} from "react-router-dom";
import {Navbar} from "../../components/Navbar";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";
import {useRequest} from "../../storage/Request/useRequest";
import {Alert, Button, Form, Image, Modal} from "react-bootstrap";

export function CreateRequestExecutPage(){

    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const [showCamera, setShowCamera] = useState(false)
    const [previews, setPreviews] = useState<Array<{ id_photo: number; url: string }>>([])
    const [photos, setPhotos] = useState<File[]>([])
    const [error, setError] = useState<string | null>(null)

    const edemContext = useContext(EdembackContext)
    const {worker} = getAuthDataFromLocalStorage()
    const {getRequestFromLocalStorage} = useRequest()
    const requestO: IRequest = getRequestFromLocalStorage()
    const [request, setRequest] = useState<IRequest>({
        request_Id: -1,
        type_Work: "Администратор",
        description: "",
        roles_Id: null,
        workers_Id: [requestO.admin_Id],
        object_Id: requestO.object_Id,
        status: "Создано",
        urgency: false,
        admin_Id: worker? worker.id : 0,
        issue_Time: new Date(),
        completion_Time: new Date(new Date().getDate() + 1),
        photos: []
    })
    const navigate = useNavigate()

    const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        processFiles(files)
    }

    const processFiles = (files: FileList | null) => {
        console.log('files', files)
        if (files){
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
            const newPhotos: File[] = []
            const newPreviews: Array<{ id_photo: number; url: string }> = []

            for (let i = 0; i < files.length; i++){
                const file = files[i]

                if(validImageTypes.includes(file.type)){
                    newPhotos.push(file)

                    const reader = new FileReader()
                    reader.onload = (event) => {
                        if (event.target?.result) {
                            const newPreview = {
                                id_photo: Date.now() + i, // Генерируем уникальный ID
                                url: event.target.result as string
                            }
                            newPreviews.push(newPreview);
                            console.log(newPreviews);
                            setPreviews([...newPreviews])
                            request.photos.push(newPreview)
                            console.log('request photo', request.photos)
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
        try {
            setShowCamera(true)
            await new Promise(resolve => setTimeout(resolve, 100))

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
                streamRef.current = stream
            }
        } catch (err) {
            setError("Не удалось получить доступ к камере")
            console.error(err)
            setShowCamera(false)
        }
    };

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

    const removePhoto = (index: number) => {
        // Удаляем фото из массива фотографий
        setPhotos(prevPhotos => {
            const updatedPhotos = [...prevPhotos]
            updatedPhotos.splice(index, 1)
            return updatedPhotos
        })

        // Удаляем превью из массива превью
        setPreviews(prevPreviews => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        })

        request.photos.splice(index, 1)
    }

    const handleClickCreate = () => {
        console.log('обратный request', request)
        edemContext.createRequest(request)
        navigate('/execut')
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setRequest({
            ...request,
            [name]: type === 'checkbox' ? checked : value
        })
    }
    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '63px'}}>
                <main className="flex-grow-1">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Загрузите фотографии</Form.Label>

                        <div className="d-flex flex-column gap-2">
                            {/* Кнопка загрузки файлов */}
                            <div className="d-grid">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                    size="lg"
                                >
                                    <i className="bi bi-upload me-2"></i>
                                    Выбрать из галереи
                                </Button>
                                <Form.Control
                                    id="fileInput"
                                    type="file"
                                    onChange={handleChangeInputFile}
                                    multiple
                                    accept="image/jpeg, image/png, image/gif"
                                    className="d-none"
                                />
                            </div>

                            {/* Или разделитель */}
                            <div className="d-flex align-items-center my-1">
                                <div className="flex-grow-1 border-top"></div>
                                <span className="px-2 small text-muted">или</span>
                                <div className="flex-grow-1 border-top"></div>
                            </div>

                            {/* Кнопка камеры */}
                            <div className="d-grid">
                                <Button
                                    variant="primary"
                                    onClick={startCamera}
                                    size="lg"
                                >
                                    <i className="bi bi-camera me-2"></i>
                                    Сделать фото
                                </Button>
                            </div>
                        </div>

                        {/* Превью фотографий */}
                        <div className="mt-3">
                            <div className="d-flex flex-wrap gap-2">
                                {previews.map((preview, index) => (
                                    <div key={index} className="position-relative">
                                        <Image
                                            src={preview.url}
                                            alt={`Preview ${preview.id_photo}`}
                                            thumbnail
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover"
                                            }}
                                        />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute top-0 end-0 rounded-circle p-0"
                                            style={{
                                                width: "24px",
                                                height: "24px"
                                            }}
                                            onClick={() => removePhoto(index)}
                                        >
                                            <i className="bi bi-x"></i>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <Alert variant="danger" className="mt-2 d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {error}
                            </Alert>
                        )}
                    </Form.Group>
                    <div className="col-sm-6 border-black border-3">
                        <div className="mb-1">
                            <label htmlFor="description" className="form-label mb-1">Описание</label>
                            <textarea
                                rows={10}
                                className="form-control"
                                name="description"
                                value={request.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </main>
                <footer className="p-3 bg-light">
                    <div className="col-sm-1 d-flex flex-column">
                        <button type="button" className="btn-sm button_calendar" onClick={handleClickCreate}>Создать заявку</button>
                    </div>
                </footer>
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
                        muted
                        style={{ width: '100%', maxHeight: '70vh' }}
                        onError={() => setError("Ошибка при подключении камеры")}
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