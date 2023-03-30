import React, { useState } from 'react';
import './tablet.scss';
import { Button } from 'react-bootstrap';
import { CreateSizePopup } from '../popups/size/CreateSizePopup';
import { UpdateSizePopup } from '../popups/size/UpdateSizePopup';
import { Size } from 'shared/models/sizes/Size';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { useColumns } from 'shared/hook/useColumns';
import { SIZES_TABLE_COLUMNS } from './columns/sizesColumns';
import { useSortBy, useTable } from 'react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface Props {
  data: Size[];
  refresh: () => void;
}

export const SizeTablet = (props: Props) => {
  const { data, refresh } = props;

  const columns = useColumns(SIZES_TABLE_COLUMNS);
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
  const [size, setSize] = useState<Size>();

  const [confirmation, setConfirmatin] = useState(false);
  const [sizeToDelete, setSizeToDelete] = useState<Size>();

  const onDeleteSize = (size: Size) => {
    setSizeToDelete(size);
    setConfirmatin(true);
  }

  const deleteSize = (id: string) => {
    deleteRequest(`Size/Delete?id=${id}`)
      .then(() => {
        setConfirmatin(false);
        refresh();
      });
  }

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  }

  const onUpdateSize = (size: Size) => {
    setSize(size);
    setUpdateModalIsOpen(true);
  }

  return (
    <div className="App">
      <div>
        <h2 className="adminPageTitle">Sizes</h2>
        <Button className="btn btn-success" onClick={openCreateModal}>Create Size</Button>
      </div>
      <table  {...getTableProps()}>
        <thead>
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

        <tbody  {...getTableBodyProps()}>
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
                    <Button className="btn btn-info" onClick={() => onUpdateSize(row.original)}>Edit</Button>
                    <Button className="btn btn-danger" onClick={() => onDeleteSize(row.original)}>Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <CreateSizePopup modalIsOpen={createModalIsOpen} closeModal={() => setCreateModalIsOpen(false)} refresh={refresh} />
      {size && <UpdateSizePopup modalIsOpen={updateModalIsOpen} closeModal={() => setUpdateModalIsOpen(false)} refresh={refresh} size={size} setSize={setSize} />}
      {sizeToDelete && <ConfirmationPopup onDelete={() => deleteSize(sizeToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={sizeToDelete.name}></ConfirmationPopup>}
    </div>
  );
}