import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {Alert, Button, Form, FormGroup, Image, Modal} from 'react-bootstrap'
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";
import api from "../../api";
import {IReport, IRole} from "../../models";
import {useNavigate, useParams} from "react-router-dom";

export function ReportPage () {
    const {requestId} = useParams<{ requestId: string }>()
    const [photos, setPhotos] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [showCamera, setShowCamera] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const [role, setRole] = useState<IRole | null>(null)
    const {worker} = getAuthDataFromLocalStorage()
    const navigate = useNavigate()
    const [report, setReport] = useState<IReport>({
        id_report: -1,
        request_id: Number(requestId),
        worker_id: worker?.id? worker.id : 0,
        description: "",
        dateTime: new Date(),
        status: "3",
        photos: null,
        add_Parametrs: [],
    })

    const LoadingData = async () => {
        const roleId = worker?.id_Role
        const responseRole = await api.get(`/Role/${roleId}`)
        setRole(responseRole.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

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
    }

    const handleSubmit = async () => {
        console.log('submit report', report)
        await api.post(`/Report`, report)
    }

    const handleParamsChange = (paramId: number, checked: boolean) => {
        setReport(prev => {
            const currentParams = prev.add_Parametrs || []
            if (checked) {
                if (!currentParams.some(p => p.add_parametr_id === paramId)) {
                    return {
                        ...prev,
                        add_Parametrs: [
                            ...currentParams,
                            {
                                id_report_parametr: 0,
                                report_Id: -1,
                                add_parametr_id: paramId,
                                value: true
                            }
                        ]
                    }
                }
                return prev
            } else {
                return {
                    ...prev,
                    add_Parametrs: currentParams.filter(p => p.add_parametr_id !== paramId)
                }
            }
        })
    }

    return (
        <>
            <Navbar/>
            <div style={{paddingTop: '63px'}}>
                <div className="container mb-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Загрузите фотографии выполненной работы</Form.Label>

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
                                                src={preview}
                                                alt={`Preview ${index}`}
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

                        <Form.Group controlId="formComment" className="mb-3">
                            <Form.Label>Добавьте комментарий:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={report.description}
                                onChange={e =>
                                    setReport(prev => ({
                                        ...prev,
                                        description: e.target.value
                                    }))
                                }
                            />
                        </Form.Group>

                        <FormGroup className="mb-3">
                            {role && <Form.Label>Отметьте выполненные задачи</Form.Label>}
                            {role && role.add_Parametrs?.map(roleParam => (
                                <Form.Check
                                    key={roleParam.id_Parametr}
                                    type="checkbox"
                                    id={`param-${roleParam.id_Parametr}`}
                                    label={roleParam.parametr}
                                    checked={report.add_Parametrs?.some(
                                        reportParam => reportParam.add_parametr_id === roleParam.id_Parametr
                                    ) || false}
                                    onChange={(e) => handleParamsChange(roleParam.id_Parametr, e.target.checked)}
                                />
                            ))}
                        </FormGroup>

                        <Button
                            className="btn w-100 mb-2"
                            style={{ background: "#6096ba"}}
                            onClick={() => {
                                handleSubmit()
                                navigate(`/execut`)
                            }}
                        >
                            Завершить задание
                        </Button>

                        <Button
                            className="btn w-100"
                            style={{ background: "#6096ba"}}
                            onClick={() => {
                                handleSubmit()
                                navigate(`/execut/request`)
                            }}
                        >
                            Завершить задание и создать заявку
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