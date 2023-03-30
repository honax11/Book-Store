import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface Props {
    images: ImageListType;
    setImages: (images: any) => void;
    upload: () => void;
    load: boolean;
}

export const UploadImageContainer = (props: Props) => {
    const { images, setImages, upload, load } = props;
    
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div className="btnAdminBanners ps-3">
                            <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                className="btn btn-dark me-2 mt-2"
                            >
                                Click or Drop here
                            </button>

                            <button disabled={images.length == 0 || load} onClick={onImageRemoveAll} className="btn btn-dark me-2 mt-2">Remove all images</button>

                            <button disabled={images.length == 0 || load} onClick={upload} className="btn btn-dark mt-2">Завантажити</button>

                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}