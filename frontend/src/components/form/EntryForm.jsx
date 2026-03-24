import React, { useEffect, useRef, useState } from "react";

const EntryForm = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [cameraOn, setCameraOn] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [stream, setStream] = useState(null);

    const [entryType, setEntryType] = useState(""); // 🔥 delivery / visitor

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        deliveryPartner: "",
        building: "",
        flat: "",
    });

    // 🏢 BUILDING DATA
    const buildingFlats = {
        A: Array.from({ length: 10 }, (_, i) => i + 1),
        B: Array.from({ length: 10 }, (_, i) => i + 11),
        C: Array.from({ length: 10 }, (_, i) => i + 21),
        D: Array.from({ length: 10 }, (_, i) => i + 31),
        E: Array.from({ length: 10 }, (_, i) => i + 41),
    };

    // 🎥 CAMERA
    useEffect(() => {
        if (cameraOn) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: "environment" } })
                .then((mediaStream) => {
                    setStream(mediaStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.message);
                });
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [cameraOn]);

    // 📸 CAPTURE
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        setPhoto(canvas.toDataURL("image/png"));

        stream?.getTracks().forEach((t) => t.stop());
        setCameraOn(false);
    };

    const retakePhoto = () => {
        setPhoto(null);
        setCameraOn(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!photo) {
            alert("Photo lena zaruri hai 📸");
            return;
        }

        const payload = {
            ...formData,
            entryType,
            photo,
        };

        console.log("FINAL PAYLOAD:", payload);
        alert("Entry Submitted 🚀");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md p-5 rounded-2xl shadow-xl">

                <h2 className="text-xl font-bold text-center mb-4">
                    Guard Entry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">



                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    {/* ENTRY TYPE */}
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="entryType"
                                value="DELIVERY"
                                onChange={(e) => setEntryType(e.target.value)}
                            />
                            Delivery
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="entryType"
                                value="VISITOR"
                                onChange={(e) => setEntryType(e.target.value)}
                            />
                            Visitor
                        </label>
                    </div>
                    {/* DELIVERY PARTNER */}
                    {entryType === "DELIVERY" && (
                        <select
                            name="deliveryPartner"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            required
                        >
                            <option value="">Select Partner</option>
                            <option>Amazon</option>
                            <option>Flipkart</option>
                            <option>Swiggy</option>
                            <option>Zomato</option>
                        </select>
                    )}

                    {/* BUILDING */}
                    <select
                        name="building"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        <option value="">Select Building</option>
                        {Object.keys(buildingFlats).map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>

                    {/* FLAT */}
                    <select
                        name="flat"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        <option value="">Select Flat</option>
                        {formData.building &&
                            buildingFlats[formData.building].map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                    </select>

                    {/* CAMERA */}
                    {!cameraOn && !photo && (
                        <button
                            type="button"
                            onClick={() => setCameraOn(true)}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg"
                        >
                            Open Camera
                        </button>
                    )}

                    {cameraOn && (
                        <div className="relative">
                            <video
                                ref={videoRef}
                                autoPlay
                                className="w-full h-64 rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={capturePhoto}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full"
                            >

                            </button>
                        </div>
                    )}

                    {photo && (
                        <div>
                            <img src={photo} className="rounded-lg" />
                            <button
                                type="button"
                                onClick={retakePhoto}
                                className="mt-2 text-red-500"
                            >
                                Retake
                            </button>
                        </div>
                    )}

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
                        Submit 
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EntryForm;