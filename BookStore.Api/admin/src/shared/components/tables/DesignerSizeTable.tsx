import React from 'react';
import { Button } from 'react-bootstrap';
import { Category } from 'shared/models/category/Category';
import { ProductType } from 'shared/models/category/ProductType';
import { DesignerSize } from 'shared/models/designer/DesignerSize';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { CreateDesignerSizePopup } from '../popups/designer/CreateDesignerSizePopup';
import { UpdateDesignerSizePopup } from '../popups/designer/UpdateDesignerSizePopup';

interface Props {
    data: DesignerSize[];
    designerId: string;
    refresh: () => void;
    categories: Category[];
}

export const DesignerSizeTable = (props: Props) => {
    const { data, refresh, designerId, categories } = props;
    
    const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);
    const [designerSizeToUpdate, setDesignerSizeToUpdate] = React.useState<DesignerSize>();

    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    }

    const ondDeleteSize = (id: string) => {
        deleteRequest(`DesignerSize/Delete?id=${id}`)
            .then(() => {
                refresh();
            });
    }

    const onUpdateHandle = (item: DesignerSize) => {
        setDesignerSizeToUpdate(item);
        setUpdateModalIsOpen(true);
    }
    return (
        <>
            <div>
                <h2>Designer Sizes</h2>
                <Button className="btn btn-success" onClick={openCreateModal}>Create Size</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Breast</th>
                        <th>Height</th>
                        <th>Hips</th>
                        <th>Type</th>
                        <th>Waist</th>
                        <th>Slipsole</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.breast}</td>
                                <td>{val.height}</td>
                                <td>{val.hips}</td>
                                <td>{ProductType[val.type]}</td>
                                <td>{val.waist}</td>
                                <td>{val.slipsole}</td>
                                <td>
                                    <Button className="btn btn-info" onClick={() => onUpdateHandle(val)}>Edit</Button>
                                    <Button className="btn btn-danger" onClick={() => ondDeleteSize(val.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <CreateDesignerSizePopup
                designerId={designerId}
                modalIsOpen={createModalIsOpen}
                refresh={refresh}
                closeModal={() => setCreateModalIsOpen(false)}
                categories={categories}
            ></CreateDesignerSizePopup>
            {designerSizeToUpdate &&
                <UpdateDesignerSizePopup
                    modalIsOpen={updateModalIsOpen}
                    closeModal={() => setUpdateModalIsOpen(false)}
                    refresh={refresh}
                    designerSize={designerSizeToUpdate}
                    setDesignerSize={setDesignerSizeToUpdate}
                    categories={categories}
                ></UpdateDesignerSizePopup>
            }
        </>
    );
}