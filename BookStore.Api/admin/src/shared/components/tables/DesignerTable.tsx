import React, { useState } from 'react';
import './tablet.scss';
import { Button } from 'react-bootstrap';
import { CreateDesignerPopup } from '../popups/designer/CreateDesignerPopup';
import { UpdateDesignerPopup } from '../popups/designer/UpdateDesignerPopup';
import { Designer } from 'shared/models/designer/Designer';
import { Link } from 'react-router-dom';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { useColumns } from 'shared/hook/useColumns';
import { DESIGNERS_TABLE_COLUMNS } from './columns/designersColumns';
import { useSortBy, useTable } from 'react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface Props {
  data: Designer[];
  refresh: () => void;
}

export const DesignerTable = (props: Props) => {
  const { data, refresh } = props;

  const columns = useColumns(DESIGNERS_TABLE_COLUMNS);
  const table = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);

  const [confirmation, setConfirmatin] = useState(false);
  const [designerToDelete, setDesignerToDelete] = useState<Designer>();

  const [designer, setDesigner] = useState<Designer>();

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  }

  const onDeleteDesigner = (product: Designer) => {
    setDesignerToDelete(product);
    setConfirmatin(true);
  }

  const deleteDesigner = (id: string) => {
    deleteRequest(`Designer/Delete?id=${id}`)
      .then(() => {
        setConfirmatin(false);
        refresh();
      });
  }

  const onUpdateDesigner = (designer: Designer) => {
    setDesigner(designer);
    setUpdateModalIsOpen(true);
  }


  return (
    <div className="App">
      <div>
        <h2 className="adminPageTitle">Designers</h2>
        <Button className="btn btn-success" onClick={openCreateModal}>Create Designer</Button>
      </div>
      <table {...getTableProps()}>
        <thead >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? <FaArrowUp className='ms-2' /> : <FaArrowDown className='ms-2' />) : ""}</span>
                </th>
              ))}
              <td>Actions</td>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                  <td className="admin-panel-order-table">
                    <Link className="btn btn-info" to={`/admin/designer/${row.original.id}`}>Open</Link>
                    <Button className="btn btn-warning" onClick={() => onUpdateDesigner(row.original)}>Edit</Button>
                    <Button className="btn btn-danger" onClick={() => onDeleteDesigner(row.original)}>Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <CreateDesignerPopup modalIsOpen={createModalIsOpen} closeModal={() => setCreateModalIsOpen(false)} refresh={refresh} />
      {designer && <UpdateDesignerPopup modalIsOpen={updateModalIsOpen} closeModal={() => setUpdateModalIsOpen(false)} refresh={refresh} designer={designer} setDesigner={setDesigner} />}
      {designerToDelete && <ConfirmationPopup onDelete={() => deleteDesigner(designerToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={designerToDelete.firstName + " " + designerToDelete.lastName} ></ConfirmationPopup>}
    </div>
  );
}